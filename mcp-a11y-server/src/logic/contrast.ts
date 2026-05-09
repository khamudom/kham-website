import { z } from "zod";
import type {
  AccessibilityAuditReport,
  AccessibilityIssue,
  AccessibilityIssueSeverity,
  VisualContrastAuditInput,
} from "../types";

export const auditVisualContrastSchema = z.object({
  foreground: z.string().min(1, "Foreground color is required."),
  background: z.string().min(1, "Background color is required."),
  cssContext: z.record(z.string()).optional(),
});

export type AuditVisualContrastInput = z.infer<typeof auditVisualContrastSchema>;

const normalizeColorValue = (value: string): string => value.trim();

const resolveCssVariable = (
  value: string,
  cssContext: Record<string, string>,
  seen: Set<string> = new Set(),
): string => {
  const varPattern = /var\(\s*--([\w-]+)(?:\s*,\s*([^\)]+))?\s*\)/g;
  let resolved = value;
  let match: RegExpExecArray | null;

  while ((match = varPattern.exec(value)) !== null) {
    const variableName = match[1].trim();
    const fallback = match[2]?.trim();

    if (seen.has(variableName)) {
      throw new Error(`Detected cyclic CSS variable reference: --${variableName}`);
    }

    seen.add(variableName);
    const replacement = cssContext[variableName] ?? fallback;

    if (!replacement) {
      throw new Error(`Unable to resolve CSS variable --${variableName}. Provide it in cssContext.`);
    }

    const resolvedReplacement = resolveCssVariable(replacement, cssContext, new Set(seen));
    resolved = resolved.replace(match[0], resolvedReplacement);
  }

  return normalizeColorValue(resolved);
};

const parseHexColor = (value: string): [number, number, number] | null => {
  const hex = value.replace(/^#/, "").trim();
  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
    ];
  }

  if (/^[0-9a-fA-F]{6}$/.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }

  return null;
};

const parseRgbColor = (value: string): [number, number, number] | null => {
  const rgbPattern = /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i;
  const match = rgbPattern.exec(value);

  if (!match) {
    return null;
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const parseColor = (value: string): [number, number, number] => {
  const cleaned = normalizeColorValue(value);
  const hexColor = parseHexColor(cleaned);
  if (hexColor) {
    return hexColor;
  }

  const rgbColor = parseRgbColor(cleaned);
  if (rgbColor) {
    return rgbColor;
  }

  throw new Error(`Unsupported color format: ${value}. Use #RGB, #RRGGBB, rgb(), rgba(), or var() references in cssContext.`);
};

const toLinearChannel = (channel: number): number => {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
};

const relativeLuminance = ([r, g, b]: [number, number, number]): number => {
  return 0.2126 * toLinearChannel(r) + 0.7152 * toLinearChannel(g) + 0.0722 * toLinearChannel(b);
};

const contrastRatio = (foreground: [number, number, number], background: [number, number, number]): number => {
  const lum1 = relativeLuminance(foreground);
  const lum2 = relativeLuminance(background);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
};

const createIssue = (
  id: string,
  title: string,
  description: string,
  remediation_code: string,
  severity: AccessibilityIssueSeverity,
): AccessibilityIssue => ({
  id,
  title,
  description,
  remediation_code,
  severity,
});

export async function auditVisualContrast(
  input: AuditVisualContrastInput,
): Promise<AccessibilityAuditReport> {
  const parsed = auditVisualContrastSchema.parse(input);
  const cssContext = parsed.cssContext ?? {};

  const foreground = resolveCssVariable(parsed.foreground, cssContext);
  const background = resolveCssVariable(parsed.background, cssContext);

  const fgRgb = parseColor(foreground);
  const bgRgb = parseColor(background);
  const ratio = contrastRatio(fgRgb, bgRgb);

  const issues: AccessibilityIssue[] = [];
  const passed = ratio >= 4.5;

  if (!passed) {
    issues.push(
      createIssue(
        "contrast-insufficient-ratio",
        "Contrast ratio does not meet WCAG 2.1 AA",
        `The computed contrast ratio between foreground ${foreground} and background ${background} is ${ratio}:1. This is below the recommended 4.5:1 threshold for standard text.`,
        "```css
body {
  color: #222222;
  background-color: #ffffff;
}
```
Use stronger contrast by choosing a darker foreground or lighter background.",
        "serious",
      ),
    );
  }

  const summary = {
    totalIssues: issues.length,
    critical: issues.filter((issue) => issue.severity === "critical").length,
    serious: issues.filter((issue) => issue.severity === "serious").length,
    moderate: issues.filter((issue) => issue.severity === "moderate").length,
    minor: issues.filter((issue) => issue.severity === "minor").length,
    recommendations: issues.map((issue) => issue.title),
  };

  return {
    tool: "audit_visual_contrast",
    passed,
    issues,
    summary,
  };
}
