# Security Policy

## Supported Security Posture

Corexa is an AI-native engineering platform with local execution, terminal access, workspace permissions, and future plugin/runtime extensibility. Security is therefore a core project concern, not an afterthought.

## Reporting a Vulnerability

Please do not open public GitHub issues for suspected vulnerabilities.

Instead:

1. Share a private report with the maintainers through the private contact path documented in [SUPPORT.md](SUPPORT.md).
2. Include a clear description, impact, reproduction steps, affected files or components, and any mitigation ideas.
3. Mark whether the issue involves remote execution, workspace escape, secrets exposure, or permission bypass.

## What To Include

- affected version or branch
- component or subsystem
- attack prerequisites
- proof of concept or reproduction steps
- potential user or maintainer impact
- suggested remediation if known

## Response Commitments

The project aims to:

- acknowledge reports promptly
- validate impact before public disclosure
- coordinate fixes responsibly
- publish remediation guidance when appropriate

## Security Priorities

Corexa prioritizes issues involving:

- sandbox escapes
- workspace isolation failures
- unauthorized shell execution
- permission bypasses
- secrets leakage
- unsafe plugin execution paths
- insecure default configurations

## Disclosure Expectations

Please allow maintainers reasonable time to investigate and remediate before public disclosure.

## Hardening Areas

Important long-term security areas for Corexa include:

- runtime permission models
- plugin trust boundaries
- model/provider isolation
- local storage and memory protection
- audit logging and execution traceability
