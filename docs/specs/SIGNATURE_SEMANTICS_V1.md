# Signature Semantics v1

This document defines the meaning of "signature" in FASS.
No cryptographic validation is performed here.

## Definition

A signature is a declarative proof-of-authorship marker
attached to an Intent.

Signature ≠ cryptographic verification  
Signature ≠ trust  
Signature ≠ permission  

## Properties

- Signature MUST be present
- Signature MUST be inspectable
- Signature MAY be opaque
- Signature MAY be unverifiable at this stage

## Non-Guarantees

A signature does NOT imply:
- authenticity
- authority
- execution permission
- correctness

## Verification Rules

- Signature MUST be a non-empty string
- Signature MUST NOT trigger execution
- Signature MUST NOT require key resolution
- Signature MUST NOT imply trust

## Canon Boundary

Cryptographic validation (if any) occurs:
- AFTER structural verification
- OUTSIDE observe-only mode
- NEVER during canon verification

Signature semantics are declarative only.
