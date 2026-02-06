#!/usr/bin/env node
import fs from "fs";
import crypto from "crypto";
import { ADAPTER_REGISTRY } from "../adapters/index.js";

const intentPath = process.argv[2];
if (!intentPath) {
  console.error("Usage: fass-run <intent.json>");
  process.exit(1);
}

// Read intent (safe to parse)
const intentRaw = fs.readFileSync(intentPath);
const intent = JSON.parse(intentRaw);

// Read authority binding AS BYTES ONLY
const bindingBytes = fs.readFileSync("_FASS/AUTHORITY/dns.binding.json");

// Read witness hash
const witness = fs.readFileSync("_FASS/WITNESS/dns.binding.sha256", "utf8").trim();

// Hash authority bytes
const bindingHash = crypto
  .createHash("sha256")
  .update(bindingBytes)
  .digest("hex");

if (bindingHash !== witness) {
  console.error("AUTHORITY_TAMPER_DETECTED");
  process.exit(2);
}

// Parse binding ONLY AFTER verification
const binding = JSON.parse(bindingBytes);

// Execute adapter
const adapter = ADAPTER_REGISTRY["dns"];
const result = adapter.execute(intent, binding);

// Write execution witness
const execWitness = {
  intent_hash: crypto.createHash("sha256").update(intentRaw).digest("hex"),
  binding_hash: bindingHash,
  result,
  timestamp: new Date().toISOString()
};

const out = `_FASS/WITNESS/dns.execution.${Date.now()}.json`;
fs.writeFileSync(out, JSON.stringify(execWitness, null, 2));

// Emit result
console.log(JSON.stringify(result, null, 2));
