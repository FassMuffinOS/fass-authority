export default {
  fetch() {
    return new Response(
      "FASS Authority Gate — unbound, non-operational",
      {
        status: 403,
        headers: {
          "content-type": "text/plain",
          "x-fass-authority": "locked",
        },
      }
    );
  },
};

