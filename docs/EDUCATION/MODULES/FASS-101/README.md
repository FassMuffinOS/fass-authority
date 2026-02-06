# FASS-101 — Authority vs Discovery

## Learning Objective
Understand why authority must be explicitly bound and why discovery-based
authorization is a security risk.

## Case Study
Cloudflare Wrangler deployment failed with a valid token due to hidden
membership discovery.

## Core Principle
Authority is not identity.
Authority is not membership.
Authority is an explicit binding.

## Exercise
1. Attempt a deployment relying on discovery
2. Observe failure or ambiguity
3. Bind authority explicitly
4. Observe deterministic success

## Outcome
Students learn to:
- Eliminate hidden dependencies
- Reduce attack surface
- Design authority-safe systems

