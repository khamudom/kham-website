# Accessibility MCP Server

A modular TypeScript MCP server providing accessibility auditing tools for agentic systems.

## Overview

This package exposes accessibility audit tools using `@modelcontextprotocol/sdk` and `zod` for schema validation.

Tools included:

- `audit_semantic` — checks DOM hierarchy, landmarks, heading structure, and alt text
- `audit_aria` — validates ARIA roles, attributes, and references
- `audit_interaction` — checks focus management, tabindex usage, and keyboard trap patterns
- `audit_visual_contrast` / `audit_contrast` — evaluates WCAG 2.1 contrast ratios with CSS variable resolution

## Installation

```bash
cd mcp-a11y-server
npm install
```

## Build

```bash
npm run build
```

## Run

```bash
npm start
```

This starts the MCP server on stdio for local IDE agent integration.

## Tool Inputs

### `audit_semantic`

```json
{
  "html": "<main><h1>Title</h1><img src='hero.png' alt='Hero image'></main>"
}
```

### `audit_aria`

```json
{
  "html": "<div role='button' aria-pressed='maybe'>Click me</div>"
}
```

### `audit_interaction`

```json
{
  "html": "<div role='dialog' aria-modal='true'><button>Close</button></div>"
}
```

### `audit_visual_contrast` / `audit_contrast`

```json
{
  "foreground": "var(--text-primary)",
  "background": "#ffffff",
  "cssContext": {
    "text-primary": "#333333"
  }
}
```

## Notes

- `cssContext` is a `Record<string, string>` used to resolve `var(--*)` CSS custom properties.
- Every audit result includes a `remediation_code` block for agent-driven fixes.
