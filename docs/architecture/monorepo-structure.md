# Corexa Monorepo Structure

Corexa is organized as a polyglot local-first monorepo. JavaScript and TypeScript packages use `pnpm` workspaces and Turborepo, the runtime engine is implemented in Go, and performance-sensitive parsing modules live in Rust.

## Root Layout

```text
corexa/
├── .changeset/
│   ├── config.json
│   └── README.md
├── .github/
│   ├── CODEOWNERS
│   ├── FUNDING.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── architecture_proposal.yml
│   │   ├── bug_report.yml
│   │   ├── config.yml
│   │   ├── documentation_improvement.yml
│   │   └── feature_request.yml
│   ├── dependabot.yml
│   ├── release.yml
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── codeql.yml
│   │   ├── docs.yml
│   │   └── release.yml
│   └── pull_request_template.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── SECURITY.md
├── SUPPORT.md
├── agents/
│   ├── architect/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts
│   ├── coder/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts
│   ├── debugger/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts
│   ├── orchestrator/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts
│   ├── planner/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts
│   └── reviewer/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/index.ts
├── apps/
│   ├── cli/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── commands/
│   │       │   ├── chat.ts
│   │       │   ├── init.ts
│   │       │   ├── models.ts
│   │       │   ├── run-agent.ts
│   │       │   └── scan.ts
│   │       └── index.ts
│   └── desktop/
│       ├── electron.vite.config.ts
│       ├── package.json
│       ├── scripts/
│       │   └── verify-electron.mjs
│       ├── tsconfig.json
│       └── src/
│           ├── main/
│           │   ├── ipc.ts
│           │   ├── main.ts
│           │   └── windows.ts
│           ├── preload/
│           │   └── index.ts
│           └── renderer/
│               ├── index.html
│               └── src/
│                   ├── App.tsx
│                   ├── components/
│                   │   └── ChatWorkspace.tsx
│                   ├── main.tsx
│                   └── styles.css
├── docs/
│   ├── README.md
│   ├── architecture/
│   │   ├── corexa-platform-architecture.md
│   │   ├── monorepo-structure.md
│   │   └── README.md
│   ├── development/
│   │   ├── local-development.md
│   │   ├── README.md
│   │   └── testing-and-release.md
│   └── product/
│       ├── roadmap.md
│       └── vision.md
│   └── project/
│       ├── execution-plan.md
│       ├── goals.md
│       ├── milestones.md
│       ├── open-source-model.md
│       └── README.md
├── examples/
│   ├── plugins/
│   │   └── hello-world/
│   │       └── manifest.json
│   └── workflows/
│       └── bugfix-agent.yaml
├── infrastructure/
│   ├── compose/
│   │   └── qdrant.yml
│   ├── kubernetes/
│   │   └── runtime-deployment.yaml
│   └── observability/
│       └── otel-collector.yaml
├── memory/
│   └── qdrant/
│       ├── collections/
│       │   └── README.md
│       └── snapshots/
│           └── .gitkeep
├── native/
│   └── tree-sitter-indexer/
│       ├── Cargo.toml
│       └── src/
│           ├── lib.rs
│           └── main.rs
├── packages/
│   ├── memory-core/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── semantic-memory.ts
│   │       └── vector-store.ts
│   ├── plugin-kit/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── loader.ts
│   │       └── manifest.ts
│   ├── repo-intelligence/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── indexer.ts
│   │       ├── scanner.ts
│   │       └── tree-sitter.ts
│   ├── runtime-client/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── client.ts
│   │       ├── index.ts
│   │       └── streaming.ts
│   ├── sdk/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── chat.ts
│   │       ├── client.ts
│   │       ├── index.ts
│   │       └── workspace.ts
│   ├── shared/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── contracts.ts
│   │       ├── events.ts
│   │       └── index.ts
│   ├── ui/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── components/
│   │       │   └── Panel.tsx
│   │       └── index.ts
│   └── workspace-core/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── config.ts
│           ├── index.ts
│           └── policy.ts
├── runtime/
│   └── daemon/
│       ├── cmd/
│       │   └── corexad/
│       │       └── main.go
│       ├── go.mod
│       ├── internal/
│       │   ├── adapters/
│       │   │   ├── memory/
│       │   │   │   └── qdrant/client.go
│       │   │   ├── providers/
│       │   │   │   ├── corexa/client.go
│       │   │   │   └── registry/registry.go
│       │   │   └── terminal/
│       │   │       └── pty/session.go
│       │   ├── app/app.go
│       │   ├── config/config.go
│       │   ├── domain/
│       │   │   ├── chat/session.go
│       │   │   ├── model/provider.go
│       │   │   └── workspace/workspace.go
│       │   ├── transport/
│       │   │   ├── http/server.go
│       │   │   └── ipc/server.go
│       │   └── usecase/
│       │       ├── agent/service.go
│       │       ├── chat/service.go
│       │       └── indexing/service.go
│       └── pkg/
│           └── api/types.go
├── scripts/
│   ├── bootstrap.sh
│   ├── dev.sh
│   └── scan-workspace.sh
├── .editorconfig
├── .env.example
├── .gitignore
├── biome.json
├── LICENSE
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.base.json
└── turbo.json
```

## Monorepo Boundary Decisions

### `apps/`

- Houses end-user surfaces: the Electron desktop shell and the `corexa` CLI.
- Keeps UX delivery concerns separate from reusable platform packages.

### `agents/`

- Splits autonomous roles into isolated packages to support different prompts, policies, and future model assignments.
- Enables enterprise deployments to gate or disable roles independently.

### `packages/`

- Contains reusable libraries shared across the app, CLI, agents, and future integrations.
- Keeps SDK, contracts, repo intelligence, memory abstractions, plugin APIs, and workspace policy separate from product shells.

### `runtime/`

- Owns the Go daemon that manages provider execution, terminal sessions, indexing orchestration, and runtime APIs.
- Uses clean architecture layering so transport, provider adapters, and business logic evolve independently.

### `native/`

- Holds Rust modules for performance-critical workflows such as symbol extraction, AST traversal, and large-repo indexing.

### `memory/`

- Stores local vector database operational assets, backups, and collection metadata.
- Remains intentionally separate from `packages/memory-core` so storage concerns and application contracts do not blur.

### `infrastructure/`

- Captures local infrastructure manifests for Qdrant and observability plus future deployment assets for enterprise scaling.

### `docs/`

- Treats architecture and roadmap as first-class deliverables.
- Includes project direction, contributor onboarding, and development guidance.
