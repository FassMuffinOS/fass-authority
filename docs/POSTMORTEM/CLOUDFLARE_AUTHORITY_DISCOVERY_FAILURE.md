# POSTMORTEM: Cloudflare Authority Discovery Failure

## Summary
Wrangler deployment failed when using a valid API token due to a hidden dependency
on the Cloudflare membership discovery endpoint (/memberships).

The UI no longer exposes membership permissions, but the CLI still depends on them.

This mismatch created a false authentication failure.

## Observed Failure
- Endpoint: /memberships
- Error Code: 10000
- Message: Authentication error
- Token Status: VALID and ACTIVE

## Root Cause
Wrangler attempts to infer authority by querying memberships instead of requiring
explicit authority binding.

This violates capability-based security principles.

## Corrective Action
Authority was explicitly bound using:
- CLOUDFLARE_ACCOUNT_ID
- Minimal scoped API token
- No discovery permissions

Deployment succeeded immediately.

## Security Implication
Discovery-based authorization introduces:
- Unnecessary attack surface
- Privilege escalation vectors
- Tooling drift vulnerabilities

## FASS Model Validation
FASS requires:
- Explicit authority
- Immutable binding
- No discovery paths

This incident proves the FASS authority model is correct and safer.

## Conclusion
Any system relying on discovery to determine authority is vulnerable by design.

Capability + binding is sufficient.
Discovery is optional and dangerous.

