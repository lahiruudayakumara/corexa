import type { ModelDescriptor, RuntimeHealth, WorkspaceSummary } from "@corexa/shared";
import { readNdjsonStream } from "./streaming.js";

export class CorexaRuntimeClient {
  constructor(private readonly baseUrl: string) {}

  async health(): Promise<RuntimeHealth> {
    const response = await fetch(`${this.baseUrl}/v1/runtime/health`);
    return response.json() as Promise<RuntimeHealth>;
  }

  async models(): Promise<ModelDescriptor[]> {
    const response = await fetch(`${this.baseUrl}/v1/models`);
    return response.json() as Promise<ModelDescriptor[]>;
  }

  async workspaceSummary(rootPath: string): Promise<WorkspaceSummary> {
    const response = await fetch(`${this.baseUrl}/v1/workspaces/summary`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ rootPath }),
    });

    return response.json() as Promise<WorkspaceSummary>;
  }

  async *streamChat(payload: Record<string, unknown>): AsyncGenerator<unknown> {
    const response = await fetch(`${this.baseUrl}/v1/chat/stream`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.body) {
      return;
    }

    yield* readNdjsonStream(response.body);
  }
}
