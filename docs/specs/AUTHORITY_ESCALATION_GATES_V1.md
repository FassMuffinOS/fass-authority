# Authority Escalation Gates v1 (AEG)

Status: CANONICAL — IMMUTABLE  
Scope: Authority transition only  
Execution Authority: CONDITIONAL (explicit)

---

## Definition

Authority Escalation Gates (AEG) define the **only permitted mechanism**
by which a verified artifact may transition into an enforceable context.

Verification alone is insufficient.
Execution is forbidden without an explicit authority gate.

---

## Core Principle

Verification answers:
- "Is this valid?"

Authority answers:
- "May this act?"

Escalation answers:
- "Under what explicit conditions does validity become enforceable?"

---

## Escalation Gate

An Authority Escalation Gate is an explicit, auditable, signed transition
between verification and enforcement phases.

An escalation gate MUST:
- Be explicit
- Be signed
- Be scope-limited
- Be time-bound (optional but recommended)
- Reference a specific authority issuer

Implicit escalation is forbidden.

---

## Required Gate Fields

Each escalation gate MUST contain:

- gate_id (opaque)
- target_artifact_hash
- issuing_authority_id
- authority_scope (explicit)
- allowed_actions (explicit enumeration)
- signature
- issued_at (UTC)
- expires_at (optional)

Example:
{
  "gate_id": "aeg_42fc91",
  "target_artifact_hash": "sha256:4e9b…",
  "issuing_authority_id": "AUTH_ROOT_V1",
  "authority_scope": "DNS_READ_ONLY",
  "allowed_actions": ["READ"],
  "signature": "sig_91af...",
  "issued_at": "2026-02-09T18:01:00Z",
  "expires_at": "2026-02-10T18:01:00Z"
}

---

## Non-Escalation Invariants

The following MUST NEVER cause escalation:

- Verification success
- Trace emission
- Actor identity presence
- Signature existence alone
- Runtime observation
- Policy inference

Only an explicit gate may escalate authority.

---

## Gate Evaluation Rules

Gate evaluation MUST:
- Occur before execution
- Be deterministic
- Be side-effect free
- Fail closed

If no valid gate exists:
- Execution MUST be denied
- Verification MAY still occur

---

## Separation from Identity

Authority gates reference authority issuers.
They MUST NOT reference identities as permission sources.

Identity ≠ Authority  
Authority ≠ Identity

This invariant is unbreakable.

---

## Revocation Semantics

Authority escalation gates:
- MAY be revoked
- MUST be revocation-checkable
- MUST fail closed upon revocation

Revocation does not retroactively alter verification traces.

---

## Traceability

Each gate evaluation MUST emit a trace record:

- gate_id
- evaluation_result (ALLOW | DENY)
- reason
- timestamp

Trace emission MUST NOT alter decision outcomes.

---

## Canon Closure

Any mechanism that:
- Infers authority
- Auto-escalates
- Couples verification to execution

is NON-COMPLIANT.

All future authority models MUST respect this gate boundary.

This canon is immutable.
