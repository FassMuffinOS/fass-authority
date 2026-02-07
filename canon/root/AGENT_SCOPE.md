# Agent Execution Scope (Canonical Reference)

## Definition
An Agent Execution Scope is an explicit allowlist of operations an agent may perform.

## Rules
- Scope MUST be explicit.
- Scope is an allowlist, not a denylist.
- Execution requires BOTH:
  1) authority = GRANTED
  2) requested operation ∈ scope

## Example
scope: ["WORKER_READ", "WORKER_LIST"]

## Non-Compliance
Any execution outside declared scope constitutes ABE-F-01-SCOPE violation.
