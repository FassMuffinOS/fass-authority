# Canonical Actor Descriptor v1 (CAD)

Status: CANONICAL — IMMUTABLE  
Scope: Attribution only  
Execution Authority: NONE

---

## Definition

A Canonical Actor Descriptor (CAD) is a minimal, non-executing, non-authoritative
descriptor used solely for attribution, observation, and audit reference.

A CAD identifies *who is being referenced*, not *who is allowed to act*.

---

## Core Invariants

1. Actor ≠ Authority
2. Actor ≠ Issuer
3. Actor ≠ Executor
4. Attribution does not imply permission
5. Presence does not imply trust
6. Verification does not imply allowance

Violation of any invariant constitutes a CANON BREACH.

---

## Actor Identifier

Each actor is identified by an opaque, non-semantic identifier.

Example:
actor_id: act_7f3c9a4e2d

Properties:
- Opaque (no embedded meaning)
- Non-human-readable
- Non-hierarchical
- Non-authoritative
- Non-executing

The identifier MAY be referenced.
The identifier MUST NOT grant power.

---

## Optional Metadata (Non-Normative)

Metadata MAY be attached for audit or provenance purposes.

Allowed:
- Display label
- Organizational hint
- Public fingerprint
- External reference pointer

Disallowed:
- Role implication
- Permission implication
- Capability implication
- Execution routing
- Trust scoring

Example:
{
  "actor_id": "act_7f3c9a4e2d",
  "label": "billing-audit-observer",
  "fingerprint": "sha256:9c4a…",
  "external_ref": "urn:corp:finance"
}

Metadata is advisory only.
Metadata is never authoritative.

---

## Explicit Prohibitions

A Canonical Actor Descriptor MUST NOT:

- Grant authority
- Imply permission
- Enable execution
- Bind to runtime privileges
- Bind to infrastructure roles
- Bind to IAM, RBAC, or ACL systems

Any system deriving power from CAD is NON-COMPLIANT.

---

## Relationship to Intent

An intent MAY reference an actor.
An intent MUST NOT derive authority from an actor.

Actor presence answers:
- "Who is referenced?"

Actor presence never answers:
- "Who is allowed?"
- "Who may execute?"
- "Who may approve?"

---

## Relationship to Verification

Verification MAY log actor references.
Verification MUST NOT infer permissions.

Audit visibility ≠ Operational permission.

---

## Canon Closure

This descriptor is intentionally minimal.

Any extension that introduces authority, execution, or permission semantics
requires a new canon version ratified via explicit governance.

This canon is immutable.
