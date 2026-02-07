# Regulatory Abstract — Authority-Bound Execution Failure (ABE-F-01)

## Failure Class
Authority-Bound Execution Failure (ABE-F-01)

## Description
ABE-F-01 occurs when execution is permitted prior to cryptographic verification of authority. Systems exhibiting this failure allow unauthorized execution regardless of operator intent.

## Canonical Incident
June 20, 2025 DNS Root Server Route Hijack — unauthorized BGP origination due to non-mandatory Route Origin Validation.

## Regulatory Finding
Execution systems relying on trust-based or optional authority validation are structurally non-compliant with critical infrastructure safety requirements.

## Mandate
Authority verification SHALL be mandatory, cryptographic, and enforced prior to execution. Optional validation constitutes non-compliance.

## Scope
Applicable to AI systems, autonomous agents, financial execution systems, and network control planes.

