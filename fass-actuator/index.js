import { enforceCanon } from "./canon/enforceCanon.js";
enforceCanon();
import { validateAuthority } from "./authority/authority.js";
import { checkConstraints } from "./constraints/constraints.js";
import { executeActuator } from "./execution/execute.js";
import { recordWitness } from "./witness/witness.js";

export function runIntent(intent) {
  const auth = validateAuthority(intent);
  if (!auth.ok) {
    recordWitness({ intent, decision: "DENIED", reason: auth.reason });
    return { ok: false, decision: "DENIED", reason: auth.reason };
  }

  const constraints = checkConstraints(intent);
  if (!constraints.ok) {
    recordWitness({
      intent,
      decision: "DENIED",
      reason: constraints.violations
    });
    return { ok: false, decision: "DENIED", reason: constraints.violations };
  }

  const result = executeActuator(intent);

  recordWitness({
    intent,
    decision: "EXECUTED",
    result
  });

  return { ok: true, decision: "EXECUTED" };
}
