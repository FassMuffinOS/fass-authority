#!/usr/bin/env node
import fs from "fs";
import crypto from "crypto";
import { ADAPTER_REGISTRY } from "../adapters/index.js";

const intentPath = process.argv[2];
if (!intentPath) {
  console.error("Usage: fass-run <intent.json>");
  process.exit(1);
}

const intentRaw = fs.readFileSync(intentPath);
const intent = JSON.parse(intentRaw);

// Choose adapter key
const adapterKey =
  intent.adapter ??
  (typeof intent.operation === "string" && intent.operation.startsWith("DNS_")
    ? "dns"
    : typeof intent.operation === "string" && intent.operation.startsWith("WORKER_")
      ? "workers"
      : null);

if (!adapterKey || !ADAPTER_REGISTRY[adapterKey]) {
  console.log(JSON.stringify({
    ok: false,
    decision: "REFUSED",
    reason: "UNKNOWN_ADAPTER",
    adapter: adapterKey
  }, null, 2));
  process.exit(2);
}

// Paths
const bindingPath = `canon/root/${adapterKey}.binding.json`;
const witnessPath = `_FASS/WITNESS/${adapterKey}.binding.sha256`;

// Read binding as BYTES (canonical)
const bindingBytes = fs.readFileSync(bindingPath);

// Read witness hash
const witness = fs.readFileSync(witnessPath, "utf8").trim().split(/\s+/)[0];

// Hash authority bytes
const bindingHash = crypto.createHash("sha256").update(bindingBytes).digest("hex");

if (bindingHash !== witness) {
  console.error("AUTHORITY_TAMPER_DETECTED");
  process.exit(2);
}

// Parse binding only AFTER verification
const binding = JSON.parse(bindingBytes.toString("utf8"));

// Check allowed operations
const allowed = Array.isArray(binding.allowed_operations) ? binding.allowed_operations : [];
if (!allowed.includes(intent.operation)) {
  console.log(JSON.stringify({
    ok: false,
    decision: "REFUSED",
    reason: "OPERATION_NOT_ALLOWED",
    adapter: adapterKey,
    operation: intent.operation
  }, null, 2));
  process.exit(0);
}

// Execute adapter
const adapter = ADAPTER_REGISTRY[adapterKey];
const result = adapter.execute(intent, binding);

// Write execution witness
fs.mkdirSync("witness/logs", { recursive: true });

const execWitness = {
  adapter: adapterKey,
  intent_hash: crypto.createHash("sha256").update(intentRaw).digest("hex"),
  binding_hash: bindingHash,
  result,
  timestamp: new Date().toISOString()
};

const out = `witness/logs/${adapterKey}.execution.${Date.now()}.json`;
fs.writeFileSync(out, JSON.stringify(execWitness, null, 2));

// Emit result
console.log(JSON.stringify(result, null, 2));
