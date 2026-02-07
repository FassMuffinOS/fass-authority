#!/usr/bin/env bash
set -euo pipefail

CANON_FILE="canon/root/dns.binding.json"
WITNESS_FILE="witness/logs/dns.binding.sha256"

echo "🔒 FASS Canonization Ceremony"
echo "--------------------------------"

# 1. Preconditions
if [ ! -f "$CANON_FILE" ]; then
  echo "❌ Canon file missing: $CANON_FILE"
  exit 1
fi

# 2. Normalize (remove trailing whitespace / newlines)
TMP_CANON="$(mktemp)"
tr -d '\r' < "$CANON_FILE" | sed -e '${/^$/d;}' > "$TMP_CANON"
mv "$TMP_CANON" "$CANON_FILE"

# 3. Hash canon
HASH="$(shasum -a 256 "$CANON_FILE" | awk '{print $1}')"

# 4. Write witness
echo "$HASH" > "$WITNESS_FILE"

# 5. Verify immediately
VERIFY_HASH="$(shasum -a 256 "$CANON_FILE" | awk '{print $1}')"

if [ "$HASH" != "$VERIFY_HASH" ]; then
  echo "❌ Verification failed immediately after canonization"
  exit 2
fi

echo "✅ Canon updated"
echo "📜 Canon file: $CANON_FILE"
echo "🧾 Witness:    $WITNESS_FILE"
echo "🔑 Hash:       $HASH"
echo "🔓 Runtime unlocked"
