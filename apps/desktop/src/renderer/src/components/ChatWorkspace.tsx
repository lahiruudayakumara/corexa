import type { RuntimeHealth, WorkspaceSummary } from "@corexa/shared";

type ChatWorkspaceProps = {
  workspace: WorkspaceSummary | null;
  runtime: RuntimeHealth | null;
};

const quickActions = [
  "Scan repository",
  "Run planner agent",
  "Open terminal session",
  "Search semantic memory",
];

export function ChatWorkspace({ workspace, runtime }: ChatWorkspaceProps): JSX.Element {
  return (
    <section className="grid flex-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
      <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl shadow-cyan-950/20">
        <p className="mb-4 text-xs uppercase tracking-[0.32em] text-cyan-200/60">Workspace</p>
        <div className="space-y-4">
          <div>
            <p className="font-display text-xl">{workspace?.name ?? "Loading workspace"}</p>
            <p className="text-sm text-slate-300/70">{workspace?.rootPath ?? "Resolving root path"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/60">Languages</p>
            <p className="mt-2 text-sm text-slate-200">{workspace?.languages.join(", ") ?? "TypeScript, Go, Rust"}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/60">Repository state</p>
            <p className="mt-2 text-sm text-emerald-300">
              {workspace?.repositoryStatus ?? "Preparing intelligence graph"}
            </p>
          </div>
        </div>
      </aside>

      <div className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-2xl shadow-slate-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/60">Agent Console</p>
            <h1 className="mt-2 font-display text-3xl tracking-tight">
              Local-first autonomous engineering
            </h1>
          </div>
          <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-200">
            {runtime?.status ?? "starting"}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-300/10 via-slate-950/20 to-orange-300/10 p-6">
          <p className="max-w-3xl text-lg leading-8 text-slate-100/90">
            Corexa composes local models, repository intelligence, terminal execution, and
            role-based agents into a single AI-native workflow surface designed for privacy,
            speed, and developer trust.
          </p>
        </div>

        <div className="grid gap-3">
          {quickActions.map((action) => (
            <button
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              key={action}
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <aside className="grid gap-6">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-orange-200/70">Model routing</p>
          <p className="mt-4 font-display text-2xl">{runtime?.activeModel ?? "corexa-code-fast"}</p>
          <p className="mt-2 text-sm text-slate-300/70">
            Corexa Runtime routes across local engines, hardware-aware accelerators, and
            enterprise inference gateways through one platform contract.
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/70">Terminal</p>
          <p className="mt-4 text-sm text-slate-300/80">
            xterm.js and the runtime PTY adapter converge here for sandboxed agent execution,
            session replay, and permission gating.
          </p>
        </div>
      </aside>
    </section>
  );
}
