#!/usr/bin/env node

import fs from "fs";
import crypto from "crypto";
import { ADAPTER_REGISTRY } from "../adapters/index.js";

/*
 * FASS Runtime — Clean Rebuild
 * Canonical enforcement order:
 * 1. Authority
 * 2. Scope
 * 3. Binding
 * 4. Execution
 */

// ---------- AUTHORITY ----------
function enforceAuthorityPreflight(intent) {
  if (!intent?.adapter || !intent?.operation) {
    throw new Error("ABE-F-01: malformed intent");
  }

  if (!intent.authority) {
    throw new Error("ABE-F-01: missing authority");
  }

  if (intent.authority === "GRANTED") {
    const mandatory = process.env.MANDATORY_AUTHORITY === "true";
    if (mandatory) {
      console.error(JSON.stringify({
        ok: false,
        decision: "DENIED",
        failure: "ABE-F-01-MANDATORY",
        reason: "Literal authority disabled; Authority Envelope required",
        operation: intent.operation,
        timestamp: new Date().toISOString()
      }, null, 2));
      process.exit(1);
    }
    console.warn("DEPRECATED: literal authority used");
    return;
  }

  if (typeof intent.authority === "object") {
    verifyAuthorityEnvelope(intent.authority);
    return;
  }

  throw new Error("ABE-F-01: invalid authority format");
}

function verifyAuthorityEnvelope(authority) {
  const pubKeyPath = "canon/root/AUTHORITY_ISSUER_FASS_ROOT.pub";
  if (!fs.existsSync(pubKeyPath)) {
    throw new Error("ABE-F-02: missing issuer public key");
  }

  const payload = JSON.stringify({
    issuer: authority.issuer,
    issued_at: authority.issued_at,
    expires_at: authority.expires_at,
    scope: authority.scope
  });

  const valid = crypto.verify(
    null,
    Buffer.from(payload),
    fs.readFileSync(pubKeyPath),
    Buffer.from(authority.signature, "base64")
  );

  if (!valid) throw new Error("ABE-F-02: invalid signature");
  if (new Date().toISOString() > authority.expires_at) {
    throw new Error("ABE-F-03: authority expired");
  }
  enforceRevocation(authority);
}

// ---------- SCOPE ----------
function enforceScopePreflight(intent) {
  if (intent.scope !== undefined) {
    if (!Array.isArray(intent.scope)) {
      throw new Error("ABE-F-01-SCOPE: scope must be array");
    }
    if (!intent.scope.includes(intent.operation)) {
      console.error(JSON.stringify({
        ok: false,
        decision: "DENIED",
        failure: "ABE-F-01-SCOPE",
        operation: intent.operation,
        scope: intent.scope
      }, null, 2));
      process.exit(1);
    }
  }
}

// ---------- MAIN ----------
const intentPath = process.argv[2];
if (!intentPath) {
  console.error("Usage: fass-run <intent.json>");
  process.exit(1);
}

const intentRaw = fs.readFileSync(intentPath, "utf8");
const intent = JSON.parse(intentRaw);

enforceAuthorityPreflight(intent);
enforceScopePreflight(intent);

const adapter = ADAPTER_REGISTRY[intent.adapter];
if (!adapter) throw new Error("Unknown adapter");

const result = adapter.execute(intent, {});

console.log(JSON.stringify(result, null, 2));

// ---------- REVOCATION ----------
function enforceRevocation(authority) {
  const listPath = "canon/root/REVOCATION_LIST.json";

  if (!fs.existsSync(listPath)) return;

  const list = JSON.parse(fs.readFileSync(listPath, "utf8"));

  if (!Array.isArray(list.revoked)) {
    throw new Error("ABE-F-03: invalid revocation list");
  }

  if (list.revoked.includes(authority.signature)) {
    console.error(JSON.stringify({
      ok: false,
      decision: "DENIED",
      failure: "ABE-F-03",
      reason: "Authority explicitly revoked",
      issuer: authority.issuer,
      timestamp: new Date().toISOString()
    }, null, 2));
    process.exit(1);
  }
}
