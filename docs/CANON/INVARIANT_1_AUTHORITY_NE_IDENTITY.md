# Invariant 1 — Authority ≠ Identity

Authority is not derived from identity.

Identity may authenticate a requester.
Authority must be independently granted, scoped, and verifiable.

A valid identity does NOT imply:
- permission to act
- permission to execute
- permission to mutate state

Authority exists only as an explicit, inspectable Intent.

No system component may:
- infer authority from identity
- infer authority from network position
- infer authority from authentication success

All execution-capable systems MUST:
- require a valid Intent
- verify Intent structure prior to enforcement
- allow Intent verification without execution

This invariant is foundational and non-negotiable.

Violation of this invariant invalidates system trust.
