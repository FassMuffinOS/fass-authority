export const CloudflareAdapter = {
  execute(intent) {
    console.log("☁️ Cloudflare adapter invoked");
    return {
      ok: true,
      adapter: "cloudflare",
      intent
    };
  }
};

