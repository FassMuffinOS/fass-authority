#!/usr/bin/env node

import dgram from "dgram";
import crypto from "crypto";
import fs from "fs";
import { ADAPTER_REGISTRY } from "../../runner/adapters/index.js";

const PORT = process.env.FASS_PORT || 15353;

const CANON_PATH = "canon/root/dns.binding.json";
const WITNESS_PATH = "witness/logs/dns.binding.sha256";

function verifyAuthority() {
  const bytes = fs.readFileSync(CANON_PATH);
  const expected = fs.readFileSync(WITNESS_PATH, "utf8").trim();
  const actual = crypto.createHash("sha256").update(bytes).digest("hex");

  if (actual !== expected) {
    throw new Error("AUTHORITY_TAMPER_DETECTED");
  }

  return JSON.parse(bytes);
}

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  try {
    const intent = JSON.parse(msg.toString("utf8"));

    const authority = verifyAuthority();
    const adapter = ADAPTER_REGISTRY[authority.adapter];
    if (!adapter) throw new Error("ADAPTER_NOT_FOUND");

    const result = adapter.execute(intent, authority);

    const witness = {
      intent_hash: crypto.createHash("sha256").update(msg).digest("hex"),
      authority_hash: crypto.createHash("sha256")
        .update(fs.readFileSync(CANON_PATH))
        .digest("hex"),
      result,
      timestamp: new Date().toISOString()
    };

    const out = `witness/logs/udp.exec.${Date.now()}.json`;
    fs.writeFileSync(out, JSON.stringify(witness, null, 2));

    const response = Buffer.from(JSON.stringify({ ok: true, result }));
    server.send(response, rinfo.port, rinfo.address);

  } catch (err) {
    const response = Buffer.from(JSON.stringify({
      ok: false,
      error: err.message
    }));
    server.send(response, rinfo.port, rinfo.address);
  }
});

server.bind(PORT, () => {
  console.log(`FASS53D listening on UDP ${PORT}`);
});
