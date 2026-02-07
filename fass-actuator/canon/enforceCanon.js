import fs from "fs";
import { execSync } from "child_process";

function hashCanonDirectory() {
  const output = execSync(
    "find docs/CANON -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum",
    { encoding: "utf8" }
  );
  return output.trim().split(" ")[0];
}

export function enforceCanon() {
  const active = fs.readFileSync("canon/ACTIVE_CANON", "utf8").trim();

  const hashFile =
    active === "CANON_V1.0"
      ? "canon/CANON_v1.hash"
      : active === "CANON_V1.1"
      ? "canon/CANON_v1_1.hash"
      : null;

  if (!hashFile) {
    throw new Error("UNKNOWN_ACTIVE_CANON");
  }

  const expected = fs.readFileSync(hashFile, "utf8").trim();
  const actual = hashCanonDirectory();

  if (actual !== expected) {
    throw new Error("CANON_TAMPER_DETECTED");
  }
}
