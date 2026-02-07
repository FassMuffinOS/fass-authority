# FASS ACTUATOR — CANON v1.0 (FROZEN)

Status: IMMUTABLE  
Scope: Authority-Bound Execution Substrate

## Canonical Invariants

1. Intent Separation
- Reasoning may propose actions.
- Execution requires explicit intent objects.
- No implicit execution.

2. Cryptographic Authority
- Every executable intent must be signed.
- Invalid or missing signatures deny execution.
- Authority revocation is absolute.

3. Deterministic Constraints
- Constraints are evaluated before execution.
- Constraint violation halts execution.
- Constraints cannot be bypassed.

4. Physical Execution Boxing
- All side effects occur inside explicit sandboxes.
- Path traversal and scope escape are hard failures.

5. Witnessed Reality
- Every decision is recorded.
- Ledger is append-only and hash-chained.
- Ledger is offline-verifiable.

6. Non-Bypassability
- No layer may be skipped:
  Proposal → Authority → Constraints → Execution → Witness

## Frozen Elements
The following cannot change without Canon v2:
- Intent → Authority → Execution ordering
- Cryptographic signing requirement
- Pre-execution constraint evaluation
- Hard sandbox enforcement
- Append-only witness ledger
- Offline verification capability
 
