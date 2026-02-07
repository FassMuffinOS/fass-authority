# Authority Transition Policy (FASS Canon)

FASS enforces Authority-Bound Execution (ABE) through a staged transition model.

## Phase 1 — Compatibility Mode (DEFAULT)
- Literal authority ("GRANTED") is accepted
- All uses emit explicit deprecation warnings
- Execution remains auditable

## Phase 2 — Mandatory Authority Mode
- Enabled via runtime flag: MANDATORY_AUTHORITY=true
- All execution MUST present a valid Authority Envelope
- Missing or invalid authority fails closed

## Phase 3 — Revocation-Enforced Mode
- Authority envelopes are subject to revocation lists
- Expired or revoked authority MUST fail execution

This transition model mirrors historical security rollouts
(e.g., RPKI, TLS, OAuth) and enables regulator-safe adoption
without breaking existing systems.
