#!/usr/bin/env node
/**
 * Authority Envelope Signer (FASS)
 */
import fs from "fs";
import crypto from "crypto";

const [,, inputPath, outputPath] = process.argv;

if (!inputPath || !outputPath) {
  console.error("Usage: sign_authority <input.json> <output.json>");
  process.exit(1);
}

const envelope = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const privateKey = fs.readFileSync("keys/authority/fass_root");

const payload = JSON.stringify({
  issuer: envelope.issuer,
  issued_at: envelope.issued_at,
  expires_at: envelope.expires_at,
  scope: envelope.scope
});

const signature = crypto.sign(null, Buffer.from(payload), privateKey).toString("base64");

const signed = {
  ...envelope,
  signature
};

fs.writeFileSync(outputPath, JSON.stringify(signed, null, 2));
console.log("Authority envelope signed.");
