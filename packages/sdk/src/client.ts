import { CorexaRuntimeClient } from "@corexa/runtime-client";
import { loadWorkspaceSummary } from "./workspace.js";
import { streamChat } from "./chat.js";

export class CorexaClient {
  readonly runtime: CorexaRuntimeClient;

  constructor(baseUrl: string) {
    this.runtime = new CorexaRuntimeClient(baseUrl);
  }

  workspace(rootPath: string) {
    return loadWorkspaceSummary(this.runtime, rootPath);
  }

  chat(prompt: string) {
    return streamChat(this.runtime, prompt);
  }
}
