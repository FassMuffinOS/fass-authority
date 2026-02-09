# Intent JSON v0 (Canonical)

This schema defines the minimal structure required for intent verification.
No execution is implied.

## Structure

{
  "intent_id": string,
  "issuer": string,
  "action": string,
  "scope": string,
  "timestamp": number,
  "signature": string
}

## Rules

- intent_id MUST be unique
- issuer identifies the authority issuer, not the actor
- action is declarative, not imperative
- scope defines maximum possible authority, not granted authority
- timestamp is informational only
- signature verification MAY be deferred

## Guarantees

- Structural validity can be verified without execution
- Verification does not imply enforcement
- Enforcement does not imply permission

This schema is intentionally minimal.
