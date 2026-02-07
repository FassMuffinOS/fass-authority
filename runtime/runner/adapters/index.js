import { DNSAdapter } from "./dns/index.js";
import { WorkersAdapter } from "./workers/index.js";

export const ADAPTER_REGISTRY = {
  dns: DNSAdapter,
  workers: WorkersAdapter
};
