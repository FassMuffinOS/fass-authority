# Trust Resolution Boundary v1

This document defines the boundary between authority verification
and trust resolution in FASS.

## Principle

FASS does not resolve trust.

FASS verifies:
- intent presence
- intent structure
- declarative semantics

FASS does NOT:
- authenticate identities
- validate cryptographic signatures
- resolve keys
- evaluate trustworthiness
- infer permission
- infer execution eligibility

## Boundary Definition

Trust resolution is an external concern.

It may be performed by:
- PKI systems
- hardware roots of trust
- policy engines
- legal contracts
- human governance

But it MUST NOT be performed:
- during intent verification
- during observe-only mode
- inside canon enforcement
- inside execution gating logic

## Guarantees

- Intent verification is deterministic
- Verification produces no side effects
- Verification cannot enable execution
- Verification cannot imply permission

## Canon Safety Rule

No component may:
- condition execution on trust resolution
- treat verification as trust
- bypass intent verification due to trust

Trust may inform decisions,
but it never substitutes authority.

## Summary

Authority is structural.
Trust is contextual.
Execution is conditional.

FASS governs only the first.
