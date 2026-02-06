export const DNSAdapter = {
  execute(intent, binding) {
    if (intent.intent_type !== "DNS_READ") {
      return { ok: false, decision: "REFUSED", reason: "OPERATION_NOT_ALLOWED" };
    }

    const zoneRule = binding.zones.find(z => z.zone === intent.zone);
    if (!zoneRule) {
      return { ok: false, decision: "REFUSED", reason: "ZONE_NOT_AUTHORIZED" };
    }

    if (!zoneRule.allowed_operations.includes("READ")) {
      return { ok: false, decision: "REFUSED", reason: "READ_NOT_AUTHORIZED" };
    }

    if (!zoneRule.record_types.includes(intent.record_type)) {
      return { ok: false, decision: "REFUSED", reason: "RECORD_TYPE_NOT_ALLOWED" };
    }

    return {
      ok: true,
      decision: "AUTHORIZED",
      operation: "DNS_READ",
      zone: intent.zone,
      record_type: intent.record_type,
      name: intent.name,
      note: "READ_ONLY_STUB_NO_PROVIDER_CALL"
    };
  }
};
