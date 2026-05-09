import { z } from "zod";
import type { AccessibilityAuditReport, AccessibilityIssue, AccessibilityIssueSeverity, SemanticAuditInput } from "../types";

export const auditInteractionSchema = z.object({
  html: z.string().min(1, "HTML markup is required for interaction auditing."),
});

export type AuditInteractionInput = z.infer<typeof auditInteractionSchema>;

const createIssue = (
  id: string,
  title: string,
  description: string,
  remediation_code: string,
  severity: AccessibilityIssueSeverity,
  selector?: string,
): AccessibilityIssue => ({
  id,
  title,
  description,
  remediation_code,
  severity,
  selector,
});

const parseDocument = (html: string): Document => {
  if (typeof DOMParser === "undefined") {
    throw new Error("DOMParser is not available in this runtime environment.");
  }
  return new DOMParser().parseFromString(html, "text/html");
};

const getElementSelector = (element: Element): string => {
  if (element.id) {
    return `#${element.id}`;
  }
  const classes = element.className ? `.${[...element.classList].join(".")}` : "";
  return `${element.tagName.toLowerCase()}${classes}`;
};

const isFocusable = (element: Element): boolean => {
  if (element instanceof HTMLAnchorElement && element.hasAttribute("href")) {
    return true;
  }
  if (element instanceof HTMLButtonElement || element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
    return !element.hasAttribute("disabled");
  }
  const tabindex = element.getAttribute("tabindex");
  return tabindex !== null && Number(tabindex) >= 0;
};

const getFocusTrapIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const dialogs = Array.from(doc.querySelectorAll("[role=dialog], [aria-modal=true]"));

  dialogs.forEach((dialog) => {
    const selector = getElementSelector(dialog);
    const focusableInside = Array.from(dialog.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"));
    const hasFocusableDescendants = focusableInside.some((element) => isFocusable(element));

    if (!hasFocusableDescendants) {
      issues.push(
        createIssue(
          "interaction-dialog-no-focusable",
          "Dialog or modal has no focusable element",
          `The dialog at selector ${selector} does not contain a focusable control. This can create a keyboard trap or prevent keyboard users from interacting with the modal.",
          "```html\n<div role=\"dialog\" aria-modal=\"true\">\n  <button type=\"button\">Close</button>\n</div>\n```",
          "serious",
          selector,
        ),
      );
    }
  });

  return issues;
};

const getTabIndexIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const elements = Array.from(doc.querySelectorAll("[tabindex]"));

  elements.forEach((element) => {
    const value = element.getAttribute("tabindex")?.trim();
    if (!value) {
      return;
    }

    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      issues.push(
        createIssue(
          "interaction-tabindex-invalid",
          "Invalid tabindex value",
          `The element at selector ${getElementSelector(element)} uses tabindex=\"${value}\" which is not a valid integer.",
          "```html\n<div tabindex=\"0\">\n  Keyboard focus target\n</div>\n```",
          "moderate",
          getElementSelector(element),
        ),
      );
      return;
    }

    if (numeric > 0) {
      issues.push(
        createIssue(
          "interaction-positive-tabindex",
          "Positive tabindex detected",
          `The element at selector ${getElementSelector(element)} uses tabindex=\"${value}\". Positive tabindex values can disrupt natural keyboard order.",
          "```html\n<div tabindex=\"0\">\n  Interactive content\n</div>\n```",
          "moderate",
          getElementSelector(element),
        ),
      );
    }
  });

  return issues;
};

const getFocusableHiddenIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const focusableElements = Array.from(doc.querySelectorAll("a[href], button, input, textarea, select, [tabindex]"));

  focusableElements.forEach((element) => {
    const ariaHidden = element.getAttribute("aria-hidden");
    if (ariaHidden === "true" && isFocusable(element)) {
      issues.push(
        createIssue(
          "interaction-focusable-hidden",
          "Focusable element is hidden from assistive technology",
          `The element at selector ${getElementSelector(element)} is focusable while aria-hidden=\"true\". This creates inconsistent keyboard and screen reader behavior.",
          "```html\n<div aria-hidden=\"true\">\n  <button tabindex=\"0\">Close</button>\n</div>\n```",
          "serious",
          getElementSelector(element),
        ),
      );
    }
  });

  return issues;
};

const getRoleFocusabilityIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const interactiveRoles = new Set(["button", "link", "checkbox", "radio", "switch", "slider", "textbox"]);
  const elements = Array.from(doc.querySelectorAll("[role]") as NodeListOf<Element>);

  elements.forEach((element) => {
    const role = element.getAttribute("role")?.trim().toLowerCase();
    if (!role || !interactiveRoles.has(role)) {
      return;
    }

    if (!isFocusable(element)) {
      issues.push(
        createIssue(
          "interaction-role-not-focusable",
          "Interactive ARIA role is not keyboard focusable",
          `The element at selector ${getElementSelector(element)} has role=\"${role}\" but is not keyboard focusable.",
          "```html\n<div role=\"button\" tabindex=\"0\">\n  Click me\n</div>\n```",
          "serious",
          getElementSelector(element),
        ),
      );
    }
  });

  return issues;
};

export async function auditInteraction(input: AuditInteractionInput): Promise<AccessibilityAuditReport> {
  const parsed = auditInteractionSchema.parse(input);
  const doc = parseDocument(parsed.html);
  const issues: AccessibilityIssue[] = [
    ...getTabIndexIssues(doc),
    ...getFocusableHiddenIssues(doc),
    ...getRoleFocusabilityIssues(doc),
    ...getFocusTrapIssues(doc),
  ];

  const summary = {
    totalIssues: issues.length,
    critical: issues.filter((issue) => issue.severity === "critical").length,
    serious: issues.filter((issue) => issue.severity === "serious").length,
    moderate: issues.filter((issue) => issue.severity === "moderate").length,
    minor: issues.filter((issue) => issue.severity === "minor").length,
    recommendations: issues.map((issue) => issue.title),
  };

  return {
    tool: "audit_interaction",
    passed: issues.length === 0,
    issues,
    summary,
  };
}
