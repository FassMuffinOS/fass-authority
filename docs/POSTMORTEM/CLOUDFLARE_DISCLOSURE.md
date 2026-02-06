# Responsible Disclosure: Authority Discovery Drift in Wrangler

To: Cloudflare Security & Developer Experience Teams

## Summary
During a Cloudflare Workers deployment using Wrangler v4.63.0, a valid and active
User API Token failed deployment due to a hidden dependency on the
`/memberships` endpoint.

The Cloudflare dashboard no longer exposes "membership" permissions, yet Wrangler
implicitly depends on membership discovery to infer authority.

This creates a tooling-level authentication failure that is not caused by invalid
credentials, but by authority inference.

## Key Observation
- Token verified as valid and active via `/user/tokens/verify`
- Deployment failed with `/memberships` authentication error
- Deployment succeeded immediately once `CLOUDFLARE_ACCOUNT_ID` was explicitly bound

## Root Cause
Wrangler attempts to infer authority via discovery rather than requiring explicit
authority binding.

This introduces:
- Hidden permission coupling
- UI/CLI drift
- Unnecessary attack surface

## Recommendation
- Require explicit account binding OR
- Fail fast with a clear error indicating missing authority binding
- Remove implicit dependency on membership discovery

## Security Perspective
Capability-based authorization with explicit authority binding is safer than
discovery-based inference.

Thank you for reviewing.

