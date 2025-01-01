import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.gql",
  documents: ["./src/graphql/**/*.{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
    },
  },
};
export default config;
