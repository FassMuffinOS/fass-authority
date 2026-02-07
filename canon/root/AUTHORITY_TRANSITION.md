# Authority Transition Policy (FASS Canon)

FASS enforces Authority-Bound Execution (ABE) through a staged transition model.

## Phase 1 — Compatibility Mode (DEFAULT)
- Literal authority ("GRANTED") is accepted for backward compatibility.
- Every literal use MUST emit an explicit deprecation warning.
- Execution remains fully auditable via witness output.

## Phase 2 — Mandatory Authority Mode
- Enabled via runtime flag: MANDATORY_AUTHORITY=true
- All execution MUST present a valid Authority Envelope.
- Missing or invalid authority MUST fail closed.

## Phase 3 — Revocation-Enforced Mode
- Authority envelopes are subject to revocation lists.
- Expired or revoked authority MUST fail execution.

Rationale: staged rollout supports regulator-safe adoption without breaking legacy flows.
