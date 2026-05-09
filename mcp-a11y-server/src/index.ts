import * as sdk from "@modelcontextprotocol/sdk";
import { auditSemanticSchema, auditSemantic } from "./logic/semantic";
import { auditVisualContrastSchema, auditVisualContrast } from "./logic/contrast";
import { auditAriaSchema, auditAria } from "./logic/aria";
import { auditInteractionSchema, auditInteraction } from "./logic/interaction";

const resolveTransport = (): any => {
  const transportConstructor = (sdk as any).StdioServerTransport ?? (sdk as any).StdioServerTransport;
  if (!transportConstructor) {
    throw new Error("Could not locate StdioServerTransport in @modelcontextprotocol/sdk.");
  }

  return new transportConstructor();
};

const resolveServer = (transport: any): any => {
  if (typeof (sdk as any).createServer === "function") {
    return (sdk as any).createServer({ transport });
  }

  const ServerConstructor = (sdk as any).McpServer ?? (sdk as any).MCPServer ?? (sdk as any).Server;
  if (typeof ServerConstructor === "function") {
    return new ServerConstructor({ transport });
  }

  throw new Error("Could not create an MCP server instance from @modelcontextprotocol/sdk.");
};

const run = async (): Promise<void> => {
  const transport = resolveTransport();
  const server = resolveServer(transport);

  if (typeof server.registerTool !== "function") {
    throw new Error("The server instance does not expose a registerTool method.");
  }

  server.registerTool("audit_semantic", {
    schema: auditSemanticSchema,
    handler: async (input: unknown) => {
      const parsed = auditSemanticSchema.parse(input);
      return auditSemantic(parsed);
    },
  });

  server.registerTool("audit_visual_contrast", {
    schema: auditVisualContrastSchema,
    handler: async (input: unknown) => {
      const parsed = auditVisualContrastSchema.parse(input);
      return auditVisualContrast(parsed);
    },
  });

  server.registerTool("audit_contrast", {
    schema: auditVisualContrastSchema,
    handler: async (input: unknown) => {
      const parsed = auditVisualContrastSchema.parse(input);
      return auditVisualContrast(parsed);
    },
  });

  server.registerTool("audit_aria", {
    schema: auditAriaSchema,
    handler: async (input: unknown) => {
      const parsed = auditAriaSchema.parse(input);
      return auditAria(parsed);
    },
  });

  server.registerTool("audit_interaction", {
    schema: auditInteractionSchema,
    handler: async (input: unknown) => {
      const parsed = auditInteractionSchema.parse(input);
      return auditInteraction(parsed);
    },
  });

  if (typeof server.start === "function") {
    await server.start();
  } else if (typeof server.listen === "function") {
    await server.listen();
  } else {
    throw new Error("The MCP server instance does not expose a start or listen method.");
  }

  console.log("Accessibility MCP server is listening on stdio.");
};

run().catch((error) => {
  console.error("Failed to start accessibility MCP server:", error);
  process.exit(1);
});
