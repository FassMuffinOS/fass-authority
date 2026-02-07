import fs from "fs";
import { execSync } from "child_process";

function hashCanonDirectory() {
  const output = execSync(
    "find docs/CANON -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum",
    { encoding: "utf8" }
  );
  return output.trim().split(" ")[0];
}

function logWitness(record) {
  fs.appendFileSync(
    "canon/WITNESS_LOG.jsonl",
    JSON.stringify(record) + "\n",
    "utf8"
  );
}

export function enforceCanon() {
  const active = fs.readFileSync("canon/ACTIVE_CANON", "utf8").trim();
  const hashFile = `canon/${active.replace(".", "_")}.hash`;

  if (!fs.existsSync(hashFile)) {
    logWitness({
      type: "CANON_CONFIGURATION_ERROR",
      canon_version: active,
      timestamp: new Date().toISOString(),
      enforcer: "fass-actuator",
      decision: "DENIED",
      reason: "MISSING_CANON_HASH"
    });

    throw new Error("UNKNOWN_ACTIVE_CANON");
  }

  const expected = fs.readFileSync(hashFile, "utf8").trim();
  const actual = hashCanonDirectory();

  if (actual !== expected) {
    logWitness({
      type: "CANON_VIOLATION",
      canon_version: active,
      expected_hash: expected,
      actual_hash: actual,
      timestamp: new Date().toISOString(),
      enforcer: "fass-actuator",
      decision: "DENIED",
      reason: "CANON_TAMPER_DETECTED"
    });

    throw new Error("CANON_TAMPER_DETECTED");
  }
}
