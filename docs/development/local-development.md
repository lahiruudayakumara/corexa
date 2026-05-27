# Local Development

## Toolchain

- Node.js 20+
- pnpm 10+
- Go 1.23+
- Rust stable

## Install

```bash
pnpm install
```

## Common Commands

```bash
pnpm dev
pnpm desktop:dev
pnpm cli:dev
pnpm runtime:dev
pnpm lint
pnpm test
pnpm typecheck
```

## Runtime Validation

```bash
go test ./runtime/daemon/...
cargo test --manifest-path native/tree-sitter-indexer/Cargo.toml
```

## Desktop Troubleshooting

If Electron is installed but the binary payload is missing:

```bash
pnpm --filter @corexa/desktop run repair:electron
```

If the renderer or local dev server cannot bind to a port, check for environment restrictions, firewall behavior, or local process conflicts.

## Development Expectations

- keep changes scoped
- update docs with architecture changes
- prefer shared contracts over duplicated app-specific logic
