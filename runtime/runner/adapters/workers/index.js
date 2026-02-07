export const WorkersAdapter = {
  execute(intent, binding) {
    return {
      ok: true,
      decision: "AUTHORIZED",
      operation: intent.operation,
      worker: intent.worker,
      note: "READ_ONLY_STUB_NO_PROVIDER_CALL"
    };
  }
};
