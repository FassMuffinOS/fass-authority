import fs from "fs";
import crypto from "crypto";
import { ADAPTER_REGISTRY } from "../adapters/index.js";

function sha256(path) {
  return crypto.createHash("sha256")
    .update(fs.readFileSync(path))
    .digest("hex");
}

export function run(intentPath) {
  const intent = JSON.parse(fs.readFileSync(intentPath, "utf-8"));

  const bindingPath =
    `_FASS/ADAPTERS/${intent.adapter}/account.binding.json`;
  const witnessPath =
    `_FASS/WITNESS/${intent.adapter}.account.binding.sha256`;

  if (!fs.existsSync(bindingPath)) {
    throw new Error("AUTHORITY_BINDING_MISSING");
  }

  if (!fs.existsSync(witnessPath)) {
    throw new Error("WITNESS_MISSING");
  }

  const current = sha256(bindingPath);
  const witnessed = fs.readFileSync(witnessPath, "utf-8").trim();

  if (current !== witnessed) {
    throw new Error("AUTHORITY_TAMPER_DETECTED");
  }

  console.log("✓ Authority verified");

  const adapter = ADAPTER_REGISTRY[intent.adapter];
  if (!adapter) {
    throw new Error("ADAPTER_NOT_REGISTERED");
  }

  adapter.execute(intent);
}

