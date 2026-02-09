# FASS Authority Canon v1

Status: FROZEN  
Date: 2026-02-09

This canon defines the foundational, non-negotiable rules governing
authority, intent, and execution boundaries within FASS.

---

## Canon Scope

This canon applies to:
- Intent verification
- Authority boundaries
- Execution gating
- Observability without enforcement

This canon explicitly does NOT:
- Grant permission
- Authorize execution
- Mutate system state

---

## Invariants

### Invariant 0 — Verification ≠ Execution
Verification MUST be possible without execution.
No verification step may cause enforcement or side effects.

### Invariant 1 — Authority ≠ Identity
Identity does not imply authority.
Authority exists only as explicit, inspectable Intent.

---

## Canonical Components

The following components are canon-locked:

- fass-authority/src/verifyIntent.ts
- fass-authority/src/observeOnly.ts
- fass-authority/src/traceVerification.ts
- docs/specs/INTENT_JSON_V0.md
- docs/specs/INVARIANT_1_AUTHORITY_NE_IDENTITY.md

---

## Enforcement Status

- Enforcement: DISABLED
- Execution: DISALLOWED
- Observation: ENABLED
- Verification: REQUIRED

---

## Canon Guarantee

Any system violating this canon:
- Loses authority validity
- Cannot claim compliance
- Invalidates trust assumptions

This canon may only be superseded by Canon v2 via explicit governance.

