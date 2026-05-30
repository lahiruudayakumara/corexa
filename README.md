# Corexa

**Corexa** is an **AI Native Development Platform** for local-first autonomous software engineering.

Corexa combines a desktop IDE experience, a local AI runtime, repository intelligence, vector memory, terminal execution, coding agents, and extensible developer workflows into one integrated engineering platform.

## Tagline

> AI Native Development Platform

## Why Corexa

Most developer AI products stop at chat. Corexa is designed as an execution environment:

- local-first by default
- privacy-aware and developer-controlled
- repository-native instead of prompt-only
- agent-capable, not single-assistant limited
- extensible across desktop, CLI, runtime, SDK, and plugins
- scalable toward enterprise governance and hybrid inference

## Platform Pillars

- Local AI execution and model orchestration
- Autonomous coding agents with explicit roles and approval boundaries
- Deep repository intelligence powered by parsing, chunking, embeddings, and graph traversal
- Corexa-native runtime contracts for inference, memory, terminal, and workspace services
- Desktop and CLI workflows designed for real software engineering loops
- Extensible open source architecture with enterprise-ready foundations

## Corexa Architecture At A Glance

```text
Electron Desktop
  -> IPC bridge
  -> Go runtime daemon
  -> provider adapters, terminal control, indexing, memory, APIs
  -> TypeScript agents, SDKs, and workspace services
  -> Rust acceleration for parsing and indexing hotspots
```

## Monorepo Overview

```text
apps/           Electron desktop app and CLI
agents/         Planner, coder, reviewer, debugger, architect, orchestrator
packages/       Shared SDKs, contracts, repo intelligence, memory, plugin kit
runtime/        Go runtime daemon and provider adapters
native/         Rust performance modules
memory/         Local vector database layouts and operational assets
infrastructure/ Local and production infra manifests
docs/           Architecture, roadmap, governance, and development guides
examples/       Example plugins and workflows
scripts/        Bootstrap, dev, and utility scripts
```

## Documentation

### Start Here

- [Documentation Hub](docs/README.md)
- [Architecture Overview](docs/architecture/corexa-platform-architecture.md)
- [Monorepo Structure](docs/architecture/monorepo-structure.md)
- [Project Goals](docs/project/goals.md)
- [Execution Plan](docs/project/execution-plan.md)
- [Milestones](docs/project/milestones.md)
- [Roadmap](docs/product/roadmap.md)

### Open Source and Community

- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Governance](GOVERNANCE.md)
- [Security Policy](SECURITY.md)
- [Support Guide](SUPPORT.md)

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+
- Go 1.23+
- Rust stable

### Install

```bash
pnpm install
```

### Start Corexa

```bash
pnpm dev
```

Start the local runtime separately when wiring the desktop app to the Go daemon:

```bash
pnpm runtime:dev
```

If Electron is installed but its runtime binary is missing:

```bash
pnpm --filter @corexa/desktop run repair:electron
```

## Development Commands

```bash
pnpm build
pnpm lint
pnpm test
pnpm typecheck
go -C runtime/daemon test ./...
cargo test --manifest-path native/tree-sitter-indexer/Cargo.toml
```

## Current Project Focus

### Phase 1

- Local chat and runtime APIs
- Repository scanning, parsing, and indexing
- Desktop and CLI developer workflows
- Memory and plugin foundations

### Phase 2

- Multi-agent orchestration
- Autonomous engineering workflows
- Richer terminal approvals and execution traces
- Semantic memory write-back and replay

### Phase 3

- Enterprise policy systems
- Plugin ecosystem and marketplace
- Hybrid local and remote inference
- Team memory, governance, and observability

## Open Source Standards

Corexa is being structured as a serious long-term open source project:

- clear contribution model
- documented governance and decision-making
- issue and PR templates
- Dependabot for dependency hygiene
- CODEOWNERS for review routing
- release automation through GitHub Actions and Changesets

## Repository Standards

- `pnpm` workspaces + Turborepo for JavaScript and TypeScript packages
- Go runtime with clean architecture boundaries
- Rust acceleration for performance-sensitive modules
- Biome for formatting and linting
- GitHub Actions for CI, release, and repository health

## License

Apache-2.0. See [LICENSE](LICENSE).
