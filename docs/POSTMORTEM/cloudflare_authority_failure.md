# Cloudflare Authority Postmortem

## Summary
Cloudflare API tokens were valid and active but failed under Wrangler
due to implicit membership resolution paths not exposed in UI permissions.

## Failure Mode
Wrangler internally queries:
- /memberships
- account resolution endpoints

These require permissions not explicitly documented or surfaced
in the token UI.

## Discovery
- Token verification succeeded via direct API
- Wrangler failed due to hidden authority dependency
- Deployment succeeded only after explicit account binding

## Root Cause
Cloudflare relies on implicit authority inheritance
instead of explicit authority declaration.

## Resolution (FASS)
- Authority binding declared explicitly
- Hash-based witness verification enforced
- Runner deployment validated post-binding

## Outcome
Cloudflare becomes deterministic when wrapped by FASS.
Without FASS, authority is implicit and brittle.

## Conclusion
FASS exposes hidden authority dependencies in otherwise mature systems.
This is a systemic vulnerability class, not a Cloudflare bug.

