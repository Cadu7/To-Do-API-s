import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            provider: "v8",
            include: ["src/app/**/*.ts"],
        },
        setupFiles: "./src/test/mock/prisma.ts"
    }
})