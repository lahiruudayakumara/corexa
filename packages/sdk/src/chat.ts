import type { CorexaRuntimeClient } from "@corexa/runtime-client";

export async function* streamChat(
  client: CorexaRuntimeClient,
  prompt: string,
): AsyncGenerator<unknown> {
  yield* client.streamChat({
    prompt,
    mode: "assistant",
  });
}
