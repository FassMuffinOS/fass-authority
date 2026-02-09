# Authority Revocation & Temporal Guarantees v1 (ARTG)

Status: CANONICAL — IMMUTABLE  
Scope: Authority lifecycle control  
Execution Authority: CONDITIONAL (time-bound)

---

## Definition

Authority Revocation & Temporal Guarantees (ARTG) define how granted authority
expires, is revoked, and fails closed over time.

Authority is never perpetual by default.
Time is a first-class safety boundary.

---

## Core Invariants

1. Authority is time-bounded
2. Authority is revocable
3. Revocation is forward-only
4. Revocation does not rewrite history
5. Absence of authority implies denial

Violation of any invariant constitutes a CANON BREACH.

---

## Authority Lifetime

Every authority escalation gate MAY define:
- issued_at
- expires_at

If expires_at is defined:
- Authority is invalid after expiration
- No grace period is implied
- Expiration MUST fail closed

If expires_at is absent:
- Authority MUST be explicitly revoked
- Long-lived authority is permitted but discouraged

---

## Revocation Mechanism

Revocation is an explicit, authoritative declaration that invalidates
one or more authority escalation gates.

A revocation MUST:
- Reference the gate_id or authority_id
- Be signed by a valid revocation authority
- Be time-stamped
- Be append-only

Example:
{
  "revocation_id": "rev_91ad3f",
  "target_gate_id": "aeg_42fc91",
  "revoked_by": "AUTH_ROOT_V1",
  "revoked_at": "2026-02-09T19:12:00Z",
  "reason": "Scope violation detected"
}

---

## Revocation Semantics

Upon revocation:
- All future evaluations of the target gate MUST deny
- Verification traces remain valid
- Past executions are not retroactively invalidated

Revocation is non-destructive and non-retroactive.

---

## Temporal Evaluation Rules

At evaluation time, authority MUST be checked for:
1. Structural validity
2. Signature validity
3. Scope validity
4. Revocation status
5. Temporal validity

Failure of any check MUST deny execution.

Evaluation MUST be deterministic and side-effect free.

---

## Failure Modes

The following conditions MUST result in denial:

- Missing authority gate
- Expired authority
- Revoked authority
- Ambiguous timestamps
- Clock skew beyond tolerance (implementation-defined)

Fail-open behavior is forbidden.

---

## Trace Requirements

Authority revocation and expiration checks MUST emit trace records:

- gate_id
- evaluation_time
- temporal_status (VALID | EXPIRED | REVOKED)
- decision (ALLOW | DENY)

Trace emission MUST NOT influence decision outcomes.

---

## Separation from Verification

Verification may succeed independently of authority state.

A verified artifact with revoked or expired authority:
- MAY be observed
- MUST NOT be executed

---

## Canon Closure

Any system that:
- Executes with expired authority
- Ignores revocation
- Retroactively alters verification history

is NON-COMPLIANT.

This canon is immutable.
