# Invariant 13 — Invalid Authority Equals No Boot

## Statement

Any execution environment governed by FASS SHALL NOT boot
unless the Authority Topology is present, valid, and bound to Canon.

## Requirements

The following conditions MUST be satisfied at boot time:

1. A Canon-bound Authority Topology JSON MUST exist.
2. A cryptographic hash of the Authority Topology MUST exist.
3. The hash of the runtime Authority Topology MUST match the Canon hash.
4. The Authority Topology MUST pass structural validation.
5. All validation MUST occur prior to any execution.

## Enforcement

Failure of any requirement SHALL result in immediate termination
of the execution process.

No partial execution is permitted.

## Prohibitions

- Authority MUST NOT be inferred.
- Authority MUST NOT be reconstructed after boot.
- Authority MUST NOT be bypassed, mocked, or disabled.
- Documentation SHALL NOT be parsed by runtime systems.

## Rationale

Authority that cannot be proven at boot
cannot be trusted during execution.

## Canonical Effect

Violation of this invariant constitutes an invalid execution state.
Such execution is non-authoritative and MUST be treated as void.
