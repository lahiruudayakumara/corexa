# Corexa Execution Plan

## Planning Horizon

This plan is meant to guide the next several major iterations of Corexa while keeping room for learning and contributor input.

## Workstreams

### 1. Platform foundation

- stabilize workspace tooling
- harden runtime contracts
- mature CI and repository automation
- improve docs and contributor onboarding

### 2. Local runtime and inference

- finalize provider abstractions
- standardize streaming and embedding interfaces
- expose runtime health and model lifecycle controls

### 3. Repository intelligence

- implement file discovery and ignore behavior
- add Tree-sitter parsing and symbol extraction
- ship chunking, embeddings, and vector indexing
- build semantic retrieval APIs

### 4. Desktop and CLI experience

- stabilize Electron shell and preload bridge
- mature chat and workspace navigation
- add terminal workflows and diagnostics
- align CLI workflows with runtime contracts

### 5. Agent system

- define agent contracts and execution graph
- add planning, coding, review, and debugging loops
- connect agent flows to memory and repository services

### 6. Open source operations

- define maintainership model
- create contribution, security, and support docs
- automate dependency hygiene and release flow

## Delivery Philosophy

- ship foundations before ecosystems
- prefer narrow, reusable interfaces
- avoid magical behavior without traceability
- keep docs synchronized with architecture decisions

## Definition Of Progress

Progress is not just more code. A workstream is healthy when:

- behavior is testable
- contracts are documented
- contributors can extend the area without guessing
- risk and follow-up work are visible
