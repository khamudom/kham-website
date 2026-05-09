export type AccessibilityIssueSeverity = "critical" | "serious" | "moderate" | "minor";

export interface AccessibilityIssue {
  id: string;
  title: string;
  description: string;
  remediation_code: string;
  severity: AccessibilityIssueSeverity;
  selector?: string;
  details?: string;
}

export interface AccessibilityAuditSummary {
  totalIssues: number;
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  recommendations: string[];
}

export interface AccessibilityAuditReport {
  tool: string;
  passed: boolean;
  issues: AccessibilityIssue[];
  summary: AccessibilityAuditSummary;
}

export interface SemanticAuditInput {
  html: string;
}

export interface AriaAuditInput {
  html: string;
}

export interface InteractionAuditInput {
  html: string;
}

export interface VisualContrastAuditInput {
  foreground: string;
  background: string;
  cssContext?: Record<string, string>;
}
