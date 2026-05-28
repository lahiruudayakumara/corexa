import { CorexaRuntimeClient } from "@corexa/runtime-client";

export async function loadWorkspaceSummary(
  client: CorexaRuntimeClient,
  rootPath: string,
) {
  return client.workspaceSummary(rootPath);
}
