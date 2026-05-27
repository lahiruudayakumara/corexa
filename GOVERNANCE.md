# Corexa Governance

## Purpose

This document defines how Corexa makes decisions as an open source project.

The goal is to balance speed, architectural integrity, and contributor openness while Corexa grows from a bootstrap repository into a long-lived platform.

## Governance Principles

- architectural clarity over ad hoc expansion
- openness to contributors with explicit quality standards
- local-first and developer-first decision making
- transparent decision records
- maintainers are accountable for project coherence, not just merge velocity

## Roles

### Maintainers

Maintainers are responsible for:

- reviewing and merging pull requests
- stewarding architecture and package boundaries
- maintaining release quality
- triaging issues and discussions
- enforcing the Code of Conduct

### Contributors

Contributors are anyone improving the project through code, docs, design, testing, discussion, or issue triage.

### Review Owners

Review owners are maintainers or domain owners responsible for specific areas such as:

- desktop app
- runtime daemon
- agents
- repository intelligence
- memory and storage
- docs and community health

## Decision Making

### Day-to-day Changes

Routine fixes, docs updates, tests, and scoped improvements can proceed through normal pull request review.

### Significant Changes

Open an issue or draft PR before implementation for:

- new public APIs
- changes to runtime contracts
- new persistence models
- plugin system design changes
- security or sandbox model changes
- major UI/UX architecture shifts

### Decision Model

- consensus is preferred
- maintainers decide when consensus is not reached in a reasonable timeframe
- architectural consistency and long-term maintainability outweigh short-term convenience

## Proposal Lifecycle

1. Problem statement
2. Proposed solution
3. Tradeoffs and alternatives
4. Maintainer review
5. Decision and implementation path

## Release Authority

Maintainers control releases to ensure:

- quality gates are met
- migrations are documented
- release notes are accurate
- breaking changes are intentional and communicated

## Ownership

Code ownership is reflected operationally through:

- [CODEOWNERS](.github/CODEOWNERS)
- review requests
- package and subsystem expertise

## Transparency

Corexa aims to keep major decisions visible through:

- issues
- pull requests
- architecture documentation
- roadmap and milestone updates

## Governance Evolution

This governance model is intentionally lightweight in the early phase.

As the project matures, Corexa may introduce:

- formal working groups
- steering or technical advisory roles
- proposal templates and ADR requirements
- release and security response councils
