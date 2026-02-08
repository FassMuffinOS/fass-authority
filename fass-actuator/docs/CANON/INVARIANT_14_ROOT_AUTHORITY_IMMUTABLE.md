# Invariant 14 — Root Authority Is Immutable

The Root Authority Public Key SHALL be immutable for the
lifetime of a Canon version.

Any change to the Root Authority requires:
- Canon version increment
- Explicit Root Authority re-declaration
- Full audit revalidation

Execution under a mismatched Root Authority is invalid.
