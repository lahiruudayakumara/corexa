# Corexa

**Corexa** is an **AI Native Development Platform** built for local-first autonomous software engineering.

It combines a desktop IDE experience, a local AI runtime, autonomous coding agents, repository intelligence, vector memory, terminal execution, and extensible developer workflows inside a single production-oriented platform.

## Tagline

> AI Native Development Platform

## Platform Pillars

- Local-first AI execution with privacy-preserving workflows
- Autonomous coding agents with role-based orchestration
- Deep repository intelligence powered by Tree-sitter and embeddings
- Corexa-native inference runtime with pluggable backend support
- Desktop, CLI, SDK, and plugin surfaces for developer productivity
- Enterprise-ready scaling patterns for observability, governance, and extension

## Monorepo Overview

```text
apps/           Electron desktop app and CLI
agents/         Planner, coder, reviewer, debugger, architect, orchestrator
packages/       Shared SDKs, contracts, repo intelligence, memory, plugin kit
runtime/        Go runtime daemon and provider adapters
native/         Rust performance modules
memory/         Local vector database layouts and operational assets
infrastructure/ Local and production infra manifests
docs/           Architecture, roadmap, and operating documents
examples/       Example plugins and workflows
scripts/        Bootstrap, dev, and utility scripts
```

## Key Documents

- [Architecture Overview](/Users/lahiruudayakumara/corexa/docs/architecture/corexa-platform-architecture.md)
- [Monorepo Structure](/Users/lahiruudayakumara/corexa/docs/architecture/monorepo-structure.md)
- [Architecture Index](/Users/lahiruudayakumara/corexa/docs/architecture/README.md)

## Quick Start

```bash
pnpm install
pnpm dev
```

Start the local runtime separately when wiring the desktop app to the Go daemon:

```bash
pnpm runtime:dev
```

## Initial Scope

Phase 1 focuses on:

- Local chat with Corexa Runtime inference
- Repository scanning and indexing
- Desktop and CLI developer workflows
- Foundation services for agents, memory, and plugins

## Repository Standards

- `pnpm` workspaces + Turborepo for JavaScript and TypeScript packages
- Go runtime with clean architecture boundaries
- Rust acceleration for parsing and indexing hotspots
- Biome for formatting and linting
- GitHub Actions for CI, release, and quality enforcement

## License

Apache-2.0. See [LICENSE](/Users/lahiruudayakumara/corexa/LICENSE).
