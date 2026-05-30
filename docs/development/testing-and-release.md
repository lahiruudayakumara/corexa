# Testing and Release

## Quality Gates

Corexa expects proportional validation before merge.

Typical checks:

```bash
pnpm lint
pnpm typecheck
go -C runtime/daemon test ./...
cargo test --manifest-path native/tree-sitter-indexer/Cargo.toml
```

## CI

The repository uses GitHub Actions for:

- JavaScript and TypeScript checks
- Go tests
- Rust tests
- markdown documentation link validation
- release automation
- security analysis

## Releases

Corexa uses Changesets to manage package-facing changes and release notes generation.

Typical workflow:

1. add a changeset for package-level changes
2. merge to `main`
3. let the release workflow prepare or publish version changes

## Dependency Hygiene

Dependabot is configured to watch:

- `pnpm` workspace dependencies
- GitHub Actions workflows
- Go modules
- Cargo dependencies

## Release Readiness Checklist

- docs updated
- tests passing
- architecture implications understood
- breaking changes called out
- follow-up work tracked
