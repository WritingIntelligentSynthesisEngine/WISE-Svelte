// orval.config.js
export default {
  "backend-api": {
    input: "./src/lib/api/backend-api.json",
    output: {
      target: "./src/lib/api/backend-api.ts",
      client: "fetch",
    },
  },
};
