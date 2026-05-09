import { z } from "zod";
import type { AccessibilityAuditReport, AccessibilityIssue, AccessibilityIssueSeverity, SemanticAuditInput } from "../types";

export const auditSemanticSchema = z.object({
  html: z.string().min(1, "HTML markup is required for semantic auditing."),
});

export type AuditSemanticInput = z.infer<typeof auditSemanticSchema>;

const createIssue = (
  id: string,
  title: string,
  description: string,
  remediation_code: string,
  severity: AccessibilityIssueSeverity,
  selector?: string,
  details?: string,
): AccessibilityIssue => ({
  id,
  title,
  description,
  remediation_code,
  severity,
  selector,
  details,
});

const getElementSelector = (element: Element): string => {
  if (element.id) {
    return `#${element.id}`;
  }

  const classes = element.className ? `.${[...element.classList].join(".")}` : "";
  return `${element.tagName.toLowerCase()}${classes}`;
};

const parseDocument = (html: string): Document => {
  if (typeof DOMParser === "undefined") {
    throw new Error("DOMParser is not available in this runtime environment. Use Node 20+ or provide a DOM-compatible runtime.");
  }
  return new DOMParser().parseFromString(html, "text/html");
};

const getLandmarkIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const hasMain = !!doc.querySelector("main, [role='main']");
  const hasNav = !!doc.querySelector("nav, [role='navigation']");
  const hasHeader = !!doc.querySelector("header, [role='banner']");
  const hasFooter = !!doc.querySelector("footer, [role='contentinfo']");

  if (!hasMain) {
    issues.push(
      createIssue(
        "semantic-missing-main",
        "Missing primary landmark role",
        "The document does not contain a <main> element or an element with role=\"main\".",
        "```html\n<main>\n  <!-- primary page content -->\n</main>\n```",
        "critical",
      ),
    );
  }

  if (!hasNav) {
    issues.push(
      createIssue(
        "semantic-missing-navigation",
        "Navigation landmark is not present",
        "A navigation landmark helps assistive technologies identify the main page navigation.",
        "```html\n<nav>\n  <!-- navigation links -->\n</nav>\n```",
        "moderate",
      ),
    );
  }

  if (!hasHeader) {
    issues.push(
      createIssue(
        "semantic-missing-header",
        "Header landmark is missing",
        "A header or banner landmark provides a consistent page heading structure for screen reader users.",
        "```html\n<header>\n  <h1>Page title</h1>\n</header>\n```",
        "minor",
      ),
    );
  }

  if (!hasFooter) {
    issues.push(
      createIssue(
        "semantic-missing-footer",
        "Footer landmark is missing",
        "A footer or contentinfo landmark helps users locate page-level controls such as contact information or legal links.",
        "```html\n<footer>\n  <!-- footer links -->\n</footer>\n```",
        "minor",
      ),
    );
  }

  return issues;
};

const getAltTextIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const images = Array.from(doc.querySelectorAll("img"));

  images.forEach((image) => {
    const alt = image.getAttribute("alt");
    const ariaHidden = image.getAttribute("aria-hidden");
    const role = image.getAttribute("role");
    const selector = getElementSelector(image);

    if (ariaHidden === "true" || role === "presentation" || role === "none") {
      return;
    }

    if (alt === null) {
      issues.push(
        createIssue(
          "semantic-missing-alt",
          "Image is missing alt text",
          `The <img> element at selector ${selector} does not include an alt attribute.
Provide alternative text for meaningful images or use alt=\"\" for decorative images.",
          "```html\n<img src=\"hero.png\" alt=\"Illustration of the product dashboard\" />\n```",
          "serious",
          selector,
        ),
      );
      return;
    }

    if (alt.trim() === "") {
      issues.push(
        createIssue(
          "semantic-empty-alt",
          "Image has empty alt text",
          `The <img> element at selector ${selector} has an empty alt attribute. If the image conveys information, provide descriptive alt text.",
          "```html\n<img src=\"hero.png\" alt=\"Illustration of the product dashboard\" />\n```",
          "moderate",
          selector,
        ),
      );
    }
  });

  return issues;
};

const getHeadingIssues = (doc: Document): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  const headings = Array.from(doc.querySelectorAll("h1, h2, h3, h4, h5, h6"));
  const levels = headings.map((heading) => Number(heading.tagName.charAt(1)));

  if (headings.length === 0) {
    issues.push(
      createIssue(
        "semantic-missing-heading",
        "No headings found",
        "The document does not contain any heading elements. Headings are essential for screen reader users to understand structure.",
        "```html\n<h1>Page heading</h1>\n```",
        "critical",
      ),
    );
    return issues;
  }

  if (levels[0] !== 1) {
    issues.push(
      createIssue(
        "semantic-first-heading-not-h1",
        "The first heading should be an H1",
        "The first document heading should normally be an <h1> to establish the top-level page title.",
        "```html\n<h1>Primary page heading</h1>\n```",
        "serious",
        getElementSelector(headings[0]),
      ),
    );
  }

  const h1Count = levels.filter((level) => level === 1).length;
  if (h1Count > 1) {
    issues.push(
      createIssue(
        "semantic-multiple-h1",
        "Multiple H1 elements detected",
        "Using more than one <h1> can confuse assistive technology users about the main page title.",
        "```html\n<section>\n  <h2>Section heading</h2>\n</section>\n```",
        "serious",
      ),
    );
  }

  for (let index = 1; index < levels.length; index += 1) {
    const previous = levels[index - 1];
    const current = levels[index];

    if (current > previous + 1) {
      issues.push(
        createIssue(
          "semantic-heading-skip",
          "Heading level skipped",
          `Heading structure jumps from <h${previous}> to <h${current}>. Use a single-level increment for nested sections.",
          "```html\n<section>\n  <h3>Subsection heading</h3>\n</section>\n```",
          "moderate",
          getElementSelector(headings[index]),
        ),
      );
    }
  }

  return issues;
};

export async function auditSemantic(input: AuditSemanticInput): Promise<AccessibilityAuditReport> {
  const parsedInput = auditSemanticSchema.parse(input);
  const doc = parseDocument(parsedInput.html);

  const issues = [
    ...getLandmarkIssues(doc),
    ...getAltTextIssues(doc),
    ...getHeadingIssues(doc),
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
    tool: "audit_semantic",
    passed: issues.length === 0,
    issues,
    summary,
  };
}
