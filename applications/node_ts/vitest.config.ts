import {defineConfig} from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
    },
    setupFiles: "./src/test/mock/prisma.ts"
  }
})