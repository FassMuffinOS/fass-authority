# Authority Issuer Model v1

This document defines what an "issuer" means in FASS.
No cryptography, trust, or enforcement is implied.

## Definition

An issuer is a declared authority namespace
that claims authorship of an Intent.

Issuer ≠ identity  
Issuer ≠ user  
Issuer ≠ authentication subject  

An issuer is a role-bound authority label.

## Properties

- Issuers are named, not authenticated
- Issuers may exist without trust
- Issuers may be observed without permission
- Issuers may be denied without execution

## Non-Guarantees

Issuer presence does NOT imply:
- trustworthiness
- permission to execute
- ownership of resources
- correctness of intent

## Verification Rules

- Issuer MUST be a non-empty string
- Issuer MUST be inspectable
- Issuer MUST NOT cause execution
- Issuer MUST NOT be resolved during verification

## Resolution Boundary

Issuer trust resolution occurs:
- AFTER verification
- OUTSIDE this system
- NEVER during observe-only mode

## Canon Invariant

Verification MUST NOT require:
- identity lookup
- key trust
- network access
- external systems

Issuer semantics are declarative only.
