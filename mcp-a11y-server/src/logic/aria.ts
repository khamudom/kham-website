import { z } from "zod";
import type { AccessibilityAuditReport, AccessibilityIssue, AccessibilityIssueSeverity, SemanticAuditInput } from "../types";

export const auditAriaSchema = z.object({
  html: z.string().min(1, "HTML markup is required for ARIA auditing."),
});

export type AuditAriaInput = z.infer<typeof auditAriaSchema>;

const ariaRoles = new Set([
  "alert",
  "alertdialog",
  "application",
  "article",
  "banner",
  "button",
  "checkbox",
  "columnheader",
  "combobox",
  "complementary",
  "contentinfo",
  "definition",
  "dialog",
  "directory",
  "document",
  "feed",
  "figure",
  "form",
  "grid",
  "gridcell",
  "group",
  "heading",
  "img",
  "link",
  "list",
  "listbox",
  "listitem",
  "log",
  "main",
  "marquee",
  "math",
  "menu",
  "menubar",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "navigation",
  "none",
  "note",
  "option",
  "presentation",
  "progressbar",
  "radio",
  "radiogroup",
  "region",
  "row",
  "rowgroup",
  "rowheader",
  "scrollbar",
  "search",
  "searchbox",
  "separator",
  "slider",
  "spinbutton",
  "status",
  "switch",
  "tab",
  "table",
  "tablist",
  "tabpanel",
  "textbox",
  "timer",
  "toolbar",
  "tooltip",
  "tree",
  "treegrid",
  "treeitem",
]);

const ariaLiveValues = new Set(["off", "polite", "assertive"]);
const ariaBooleanValues = new Set(["true", "false"]);

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

const validateRoleAttributes = (element: Element): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const role = element.getAttribute("role");
  if (!role) {
    return issues;
  }

  const normalizedRole = role.trim().toLowerCase();
  if (!ariaRoles.has(normalizedRole)) {
    issues.push(
      createIssue(
        "aria-invalid-role",
        "Invalid ARIA role",
        `The element at selector ${getElementSelector(element)} uses role="${role}", which is not a recognized ARIA role.",
        "```html\n<div role=\"button\">\n  Clickable area\n</div>\n```\nUse a valid ARIA role or a native semantic element.",
        "serious",
        getElementSelector(element),
      ),
    );
  }

  if (normalizedRole === "dialog") {
    const ariaModal = element.getAttribute("aria-modal");
    if (!ariaModal) {
      issues.push(
        createIssue(
          "aria-dialog-missing-modal",
          "Dialog role missing aria-modal",
          "A dialog role should include aria-modal=\"true\" to indicate the component traps focus and behaves as a modal.",
          "```html\n<div role=\"dialog\" aria-modal=\"true\">\n  ...\n</div>\n```",
          "moderate",
          getElementSelector(element),
        ),
      );
    }
  }

  return issues;
};

const validateAriaAttributes = (element: Element): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const attrNames = Array.from(element.attributes).map((attr) => attr.name);

  attrNames.forEach((name) => {
    if (!name.startsWith("aria-")) {
      return;
    }

    const value = element.getAttribute(name)?.trim() ?? "";
    if (name === "aria-live" && value && !ariaLiveValues.has(value)) {
      issues.push(
        createIssue(
          "aria-live-invalid-value",
          "Invalid aria-live value",
          `The element at selector ${getElementSelector(element)} uses aria-live=\"${value}\". Valid values are off, polite, or assertive.",
          "```html\n<div aria-live=\"polite\">\n  Status update\n</div>\n```",
          "moderate",
          getElementSelector(element),
        ),
      );
    }

    if ((name === "aria-hidden" || name === "aria-modal" || name === "aria-expanded" || name === "aria-checked") && value && !ariaBooleanValues.has(value)) {
      issues.push(
        createIssue(
          "aria-boolean-invalid",
          "Invalid boolean ARIA value",
          `The element at selector ${getElementSelector(element)} uses ${name}=\"${value}\". ARIA boolean attributes must be true or false.",
          "```html\n<div aria-hidden=\"true\">\n  Hidden content\n</div>\n```",
          "moderate",
          getElementSelector(element),
        ),
      );
    }

    if ((name === "aria-labelledby" || name === "aria-describedby") && value) {
      const referencedIds = value.split(/\s+/).filter(Boolean);
      referencedIds.forEach((id) => {
        if (!element.ownerDocument?.getElementById(id)) {
          issues.push(
            createIssue(
              "aria-reference-missing-id",
              "ARIA reference target does not exist",
              `The element at selector ${getElementSelector(element)} references ${name}=\"${id}\" but no element with that id exists in the document.",
              "```html\n<div id=\"status\">Status message</div>\n<div aria-labelledby=\"status\">\n  ...\n</div>\n```",
              "serious",
              getElementSelector(element),
            ),
          );
        }
      });
    }
  });

  return issues;
};

export async function auditAria(input: AuditAriaInput): Promise<AccessibilityAuditReport> {
  const parsed = auditAriaSchema.parse(input);
  const doc = parseDocument(parsed.html);
  const issues: AccessibilityIssue[] = [];

  const allElements = Array.from(doc.querySelectorAll("*") as NodeListOf<Element>);
  allElements.forEach((element) => {
    issues.push(...validateRoleAttributes(element));
    issues.push(...validateAriaAttributes(element));
  });

  const summary = {
    totalIssues: issues.length,
    critical: issues.filter((issue) => issue.severity === "critical").length,
    serious: issues.filter((issue) => issue.severity === "serious").length,
    moderate: issues.filter((issue) => issue.severity === "moderate").length,
    minor: issues.filter((issue) => issue.severity === "minor").length,
    recommendations: issues.map((issue) => issue.title),
  };

  return {
    tool: "audit_aria",
    passed: issues.length === 0,
    issues,
    summary,
  };
}
