# Corexa GitHub Issues

This document defines how Corexa should use GitHub Issues as an open source planning and execution system.

## Goals

- make it easy for contributors to file high-signal issues
- give maintainers a shared structure for triage and prioritization
- map issues clearly to milestones and workstreams
- keep roadmap intent connected to implementation work

## Issue Taxonomy

Use these issue types consistently:

- `bug`: incorrect behavior, crash, defect, broken workflow
- `enhancement`: user-facing or platform capability request
- `architecture`: design change affecting boundaries, contracts, or platform shape
- `documentation`: missing, inaccurate, or unclear docs
- `performance`: latency, startup, throughput, memory, or indexing regressions
- `plugin`: new extension, integration, or plugin-system request
- `epic`: a parent issue coordinating multiple child issues or deliverables

Recommended supporting labels:

- `triage`: newly filed and awaiting maintainer review
- `needs-design-review`: requires architectural review before implementation
- `good first issue`: approachable for new contributors
- `help wanted`: maintainers welcome community implementation help
- `priority/p0` to `priority/p3`: urgency scale
- `area/desktop`
- `area/cli`
- `area/runtime`
- `area/agents`
- `area/repo-intelligence`
- `area/memory`
- `area/plugins`
- `area/docs`
- `area/ci`

## Triage Standard

Every new issue should be reviewed for:

- correctness: is the report actionable and reproducible?
- scope: is it a bug, enhancement, architecture item, or epic?
- ownership: which area label and milestone should apply?
- urgency: which priority label fits the impact?
- contribution path: can it be marked `good first issue` or `help wanted`?

Target triage response:

- bugs and regressions: within 3 business days
- features and architecture proposals: within 5 business days
- docs issues: within 5 business days

## Milestone Mapping

Map issues into the current project milestones:

- `M0 Open Source Foundation`
- `M1 Local Runtime Alpha`
- `M2 Repository Intelligence Alpha`
- `M3 Desktop Workflow Beta`
- `M4 Agent Workflow Beta`
- `M5 Plugin and Enterprise Readiness`

## Starter Backlog

The following issues are ready to be created in GitHub.

### M0 Open Source Foundation

#### 1. Establish GitHub label taxonomy and triage automation

- Type: `enhancement`
- Labels: `enhancement`, `area/ci`, `priority/p1`
- Milestone: `M0 Open Source Foundation`
- Summary: Create and document the canonical label set for Corexa, then automate label sync and default triage expectations.
- Acceptance criteria:
- label taxonomy exists in repo docs
- maintainers can apply area and priority labels consistently
- new issues start from a predictable triage state

#### 2. Add a contributor environment validation command

- Type: `enhancement`
- Labels: `enhancement`, `area/cli`, `good first issue`
- Milestone: `M0 Open Source Foundation`
- Summary: Add a command or script that checks local prerequisites for working on Corexa and prints actionable setup guidance.
- Acceptance criteria:
- validates `pnpm`, Go, Rust, and Electron prerequisites
- reports missing tooling clearly
- is documented in the contributor guide

#### 3. Add docs link validation and markdown style enforcement to CI

- Type: `enhancement`
- Labels: `enhancement`, `area/docs`, `area/ci`
- Milestone: `M0 Open Source Foundation`
- Summary: Extend docs quality automation so broken links and malformed markdown are caught early.
- Acceptance criteria:
- markdown checks run in CI
- docs failures block regressions before merge
- contributor guidance explains how to run checks locally

### M1 Local Runtime Alpha

#### 4. Implement Corexa runtime provider contract for chat and embeddings

- Type: `architecture`
- Labels: `architecture`, `area/runtime`, `priority/p1`
- Milestone: `M1 Local Runtime Alpha`
- Summary: Finalize the provider abstraction so local inference backends share stable chat, streaming, and embedding interfaces.
- Acceptance criteria:
- runtime provider interface is documented
- chat and embeddings use a shared contract
- desktop and CLI can consume the contract without backend-specific logic

#### 5. Add model lifecycle APIs for install, health, and readiness

- Type: `enhancement`
- Labels: `enhancement`, `area/runtime`
- Milestone: `M1 Local Runtime Alpha`
- Summary: Add runtime endpoints and service logic for model inventory, readiness checks, and lifecycle state.
- Acceptance criteria:
- models can be listed and inspected
- readiness and health status are exposed
- failure states are visible to the desktop app and CLI

#### 6. Build streaming chat session APIs with cancellation support

- Type: `enhancement`
- Labels: `enhancement`, `area/runtime`, `priority/p1`
- Milestone: `M1 Local Runtime Alpha`
- Summary: Implement end-to-end streaming responses with session cancellation and structured event delivery.
- Acceptance criteria:
- client receives streamed tokens and lifecycle events
- cancellation is supported cleanly
- runtime tests cover session interruption and recovery

### M2 Repository Intelligence Alpha

#### 7. Implement workspace file discovery with ignore semantics

- Type: `enhancement`
- Labels: `enhancement`, `area/repo-intelligence`
- Milestone: `M2 Repository Intelligence Alpha`
- Summary: Build deterministic workspace scanning with support for `.gitignore`, generated files, and local privacy exclusions.
- Acceptance criteria:
- ignored files are skipped consistently
- scan behavior is documented and testable
- large repositories do not scan unexpected content

#### 8. Integrate Tree-sitter symbol extraction in the native indexer

- Type: `architecture`
- Labels: `architecture`, `area/repo-intelligence`, `priority/p1`
- Milestone: `M2 Repository Intelligence Alpha`
- Summary: Use the Rust indexer to extract symbols and syntax-aware chunks for supported languages.
- Acceptance criteria:
- symbol extraction works for initial target languages
- chunk metadata preserves file and symbol relationships
- native module contracts are documented

#### 9. Add embedding pipeline and vector persistence for workspaces

- Type: `enhancement`
- Labels: `enhancement`, `area/memory`
- Milestone: `M2 Repository Intelligence Alpha`
- Summary: Persist chunk embeddings and workspace metadata so indexing results can be reused across sessions.
- Acceptance criteria:
- embeddings are stored with workspace identifiers
- re-indexing can reuse unchanged chunks
- failure handling is traceable

#### 10. Build semantic repository search APIs and ranking

- Type: `enhancement`
- Labels: `enhancement`, `area/repo-intelligence`, `area/runtime`
- Milestone: `M2 Repository Intelligence Alpha`
- Summary: Expose semantic retrieval APIs that combine vector search with repository-aware ranking.
- Acceptance criteria:
- queries return relevant code chunks and symbols
- result scoring is explainable
- retrieval latency is benchmarked

### M3 Desktop Workflow Beta

#### 11. Stabilize Electron startup, window identity, and packaging across macOS and Windows

- Type: `bug`
- Labels: `bug`, `area/desktop`, `priority/p1`
- Milestone: `M3 Desktop Workflow Beta`
- Summary: Remove startup instability in dev and package flows, including native identity, icon, and startup path issues.
- Acceptance criteria:
- desktop dev startup works reliably on macOS and Windows
- native app name and icons render correctly
- startup failures emit actionable diagnostics

#### 12. Connect the desktop chat surface to live runtime sessions

- Type: `enhancement`
- Labels: `enhancement`, `area/desktop`, `area/runtime`
- Milestone: `M3 Desktop Workflow Beta`
- Summary: Replace UI-only chat state with real runtime-backed sessions, streaming, cancellation, and error handling.
- Acceptance criteria:
- desktop composer sends real requests
- responses stream live into the thread view
- failures and retries are visible in the UI

#### 13. Add terminal session management with logs and approvals

- Type: `enhancement`
- Labels: `enhancement`, `area/desktop`, `area/agents`
- Milestone: `M3 Desktop Workflow Beta`
- Summary: Add a terminal panel that can run tracked sessions, show logs, and support approval-aware workflows.
- Acceptance criteria:
- terminal sessions are visible and reconnectable
- command output is persisted to the UI
- approval prompts are surfaced consistently

### M4 Agent Workflow Beta

#### 14. Define planner, coder, reviewer, debugger, and architect agent contracts

- Type: `architecture`
- Labels: `architecture`, `area/agents`, `priority/p1`
- Milestone: `M4 Agent Workflow Beta`
- Summary: Formalize the role contracts, context exchange rules, and execution boundaries for the Corexa agent system.
- Acceptance criteria:
- each agent role has a documented responsibility
- shared context and handoff contracts are explicit
- orchestration can be tested without UI coupling

#### 15. Implement approval checkpoints for file edits and shell execution

- Type: `enhancement`
- Labels: `enhancement`, `area/agents`, `area/runtime`
- Milestone: `M4 Agent Workflow Beta`
- Summary: Add explicit approval checkpoints for high-impact actions in autonomous workflows.
- Acceptance criteria:
- edit and shell actions can pause for approval
- approval events are auditable
- desktop and CLI reflect the same approval model

#### 16. Add reviewer and debugger feedback loops to autonomous runs

- Type: `enhancement`
- Labels: `enhancement`, `area/agents`
- Milestone: `M4 Agent Workflow Beta`
- Summary: Expand autonomous task execution with reviewer and debugger loops that can inspect failures and request retries.
- Acceptance criteria:
- review findings can influence follow-up steps
- failure analysis is attached to the task run
- loop state is visible in logs or UI

### M5 Plugin and Enterprise Readiness

#### 17. Publish the plugin manifest schema and runtime loader contract

- Type: `architecture`
- Labels: `architecture`, `area/plugins`, `priority/p2`
- Milestone: `M5 Plugin and Enterprise Readiness`
- Summary: Define a stable plugin manifest and lifecycle contract for loading extensions safely.
- Acceptance criteria:
- plugin manifest schema is documented
- loader lifecycle and permissions are clear
- sample plugin works against the contract

#### 18. Add policy-based workspace permissions and sandbox profiles

- Type: `enhancement`
- Labels: `enhancement`, `area/runtime`, `area/plugins`, `priority/p1`
- Milestone: `M5 Plugin and Enterprise Readiness`
- Summary: Introduce configurable workspace isolation, command permissions, and policy enforcement for local-first enterprise use.
- Acceptance criteria:
- workspace permissions can be configured per project
- command execution policy is enforced consistently
- audit and security docs explain the model

#### 19. Design optional cloud sync boundaries for team workflows

- Type: `architecture`
- Labels: `architecture`, `area/runtime`, `area/memory`, `area/desktop`
- Milestone: `M5 Plugin and Enterprise Readiness`
- Summary: Define what may sync to cloud services versus what must remain local-first, including memory, telemetry, and workspace metadata.
- Acceptance criteria:
- sync boundary is documented
- privacy model is explicit
- future implementation can layer on without breaking local-first guarantees

## Maintainer Workflow

When creating or grooming issues:

- create or assign the correct milestone immediately
- apply one primary issue-type label and one or more area labels
- add a priority label for anything that affects roadmap sequencing
- link child issues back to an epic when work spans multiple deliverables
- keep acceptance criteria in the issue body so completion is unambiguous

## Related Docs

- [Project Goals](goals.md)
- [Execution Plan](execution-plan.md)
- [Milestones](milestones.md)
- [Open Source Model](open-source-model.md)
