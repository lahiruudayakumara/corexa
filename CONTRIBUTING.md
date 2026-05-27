# Contributing to Corexa

Thank you for contributing to Corexa.

Corexa is intended to become a serious open source platform for AI-native software engineering. That means we care about code quality, documentation quality, architectural coherence, and a healthy contributor experience.

## Ways To Contribute

- report bugs
- improve documentation
- propose architecture changes
- implement roadmap items
- improve developer tooling or workflows
- build example plugins and workflows
- add tests, benchmarks, and observability hooks

## Before You Start

Read these first:

- [README.md](README.md)
- [Documentation Hub](docs/README.md)
- [Architecture Overview](docs/architecture/corexa-platform-architecture.md)
- [Project Goals](docs/project/goals.md)
- [Governance](GOVERNANCE.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 10+
- Go 1.23+
- Rust stable

### Install Dependencies

```bash
pnpm install
```

### Common Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test
pnpm typecheck
go test ./runtime/daemon/...
cargo test --manifest-path native/tree-sitter-indexer/Cargo.toml
```

### Electron Note

If the desktop app fails because the Electron binary is missing:

```bash
pnpm --filter @corexa/desktop run repair:electron
```

## Contribution Workflow

1. Open an issue first for significant features, architecture changes, or large refactors.
2. Confirm the change aligns with [Project Goals](docs/project/goals.md) and [Milestones](docs/project/milestones.md).
3. Create a focused branch from `main`.
4. Make the smallest coherent change that solves the problem.
5. Add or update tests and documentation with the code.
6. Submit a pull request using the repository template.

## What Good Contributions Look Like

- scoped to a clear problem
- aligned with Corexa’s local-first and modular architecture
- documented well enough for future contributors
- tested proportionally to the risk
- respectful of existing abstractions and package boundaries

## Pull Request Expectations

Every pull request should include:

- a clear problem statement
- a concise solution summary
- validation steps
- risks or follow-up work
- docs updates for user-facing or architectural changes

For large changes, include:

- affected packages or apps
- migration impact
- release considerations
- open questions or tradeoffs

## Commit and Change Hygiene

- keep commits focused
- avoid unrelated refactors in feature PRs
- prefer incremental architectural movement over large rewrites
- update docs in the same PR when behavior or structure changes

## Testing Expectations

At minimum, run the checks relevant to your change.

Typical validation:

```bash
pnpm lint
pnpm typecheck
go test ./runtime/daemon/...
cargo test --manifest-path native/tree-sitter-indexer/Cargo.toml
```

If a check cannot be run, say so clearly in the pull request.

## Documentation Standards

Documentation is part of the product.

- write for future maintainers, not just current reviewers
- explain why when the design is non-obvious
- keep architecture docs synchronized with real code structure
- prefer concrete examples over vague statements

## Architecture Changes

Open an issue or draft PR before implementing changes that affect:

- runtime interfaces
- package boundaries
- agent contracts
- plugin APIs
- persistence or memory layout
- workspace security model

## Issue Triage Guidance

- bugs should include reproduction steps and environment details
- feature requests should describe the workflow gap, not only the solution
- architecture proposals should call out tradeoffs and migration impact
- documentation issues should point to the affected page or missing concept

## Review Philosophy

Corexa aims for high trust and high clarity.

Reviewers should:

- focus on correctness, maintainability, and alignment
- be direct but respectful
- explain objections in actionable terms
- distinguish blockers from suggestions

Contributors should:

- assume positive intent
- respond with context when needed
- prefer follow-up commits over defensive debate

## Need Help

- use [GitHub Discussions](https://github.com/opencorex-org/corexa/discussions) for open-ended questions
- use [SUPPORT.md](SUPPORT.md) for help channels
- use [SECURITY.md](SECURITY.md) for security disclosures
