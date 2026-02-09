# Competitor Violation Map (Canonical Analysis)
## Why Cloudflare / OpenAI / AWS cannot do what FASS does

This is a structural comparison against the FASS authority canon:

- Invariant 1 — Authority ≠ Identity
- Intent JSON v0 — minimal canonical structure
- Verification without execution
- Observation without enforcement

If a system violates these, it is unsafe-by-construction for execution-grade domains.

---

## 1) Cloudflare — Identity-Coupled Enforcement

### What Cloudflare does
Cloudflare authorizes via:
- API tokens / service tokens
- mTLS / identity proofs
- account/zone/worker placement and scope

Authority is inferred from identity + position.

### Canon violations
- Violates **Authority ≠ Identity** (authority inferred after authentication)
- Violates **verification-before-execution** (no separate verification-only phase)
- Violates **intent-as-authority** (no inspectable per-request intent artifact)
- Violates **observation-without-enforcement** (policy is enforced inline with execution)

### Why Cloudflare cannot "patch" this cleanly
Workers are request-execution-first.
Their policy and runtime model does not require an explicit intent artifact
and does not provide a non-executing verification plane by default.

FASS introduces a missing layer: authority verification that is *causal-before*
execution is possible.

---

## 2) OpenAI — Execution-First Authority Inference

### What OpenAI does
OpenAI:
- authenticates via API key
- executes inference
- infers permission from successful completion and quota/billing

Execution is the verification.

### Canon violations
- Violates **verification without execution**
- Violates **observation without enforcement**
- Violates **intent-as-authority** (no required intent structure)
- Authority is inferred from authentication success and runtime response

### Why OpenAI cannot "patch" this cleanly
LLM inference is probabilistic and side-effectful by default.
They do not provide a deterministic, inspectable, verification-only gate that
can be asserted as non-executing across all workflows.

FASS does.

---

## 3) AWS IAM — Policy ≠ Intent

### What AWS does
IAM evaluates:
- identity (principal)
- resource
- action
- policy conditions

This is policy evaluation, not an explicit intent artifact.

### Canon violations
- Authority remains identity-bound (principal is central)
- No required per-request intent payload that is inspectable and logged
- No native verification-only mode that guarantees "no execution occurred"

### Why AWS cannot "patch" this cleanly
IAM is global and static; it is not a per-request intent artifact system.
Adding intent at runtime would expand the policy surface drastically and
break compatibility assumptions.

FASS treats intent as the canonical unit of authority, not policy.

---

## 4) OAuth / Zero Trust — Authentication Theater (Tokens ≠ Intent)

### What they do
Authenticate once -> issue token -> allow execution until expiry.
Tokens are identity artifacts with claims, not explicit action intent objects.

### Canon violations
- Authority inferred from authentication success
- No action-intent object required per operation
- No verification trace independent of execution

---

## 5) What FASS Does That They Cannot

FASS guarantees a precondition layer:

- Intent must exist and be structurally valid
- Verification can occur without execution
- Observation can occur without enforcement
- Authority is not derived from identity

FASS is not “more secure middleware.”
FASS is earlier in the causal chain than execution.

---

## Summary: The Missing Layer in Computation

Major platforms conflate permission with execution:
they decide authority after code is already capable of acting.

FASS decides authority before execution is even possible.

That is a foundational layer, not a feature.
