export interface WorkspacePermissionRequest {
  scope: "filesystem" | "network" | "shell";
  reason: string;
  target: string;
}

export function requiresApproval(request: WorkspacePermissionRequest): boolean {
  if (request.scope === "network") {
    return true;
  }

  return request.target.startsWith("../") || request.target.startsWith("/");
}
