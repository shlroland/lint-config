import type { Options } from "tsup";

export function config() {
  return {
    entry: ["index.ts"],
    format: ["esm", "cjs"],
    outDir: "lib",
    dts: true,
    clean: true,
  } satisfies Options;
}
