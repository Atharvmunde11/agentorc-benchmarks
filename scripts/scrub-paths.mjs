import { readFileSync, writeFileSync } from "node:fs";

const path = "results/benchmark.json";
const raw = readFileSync(path, "utf8");
const scrubbed = raw
  .replace(/C:\\\\Users\\\\ATHARV MUNDE\\\\Desktop\\\\Wolbarg\\\\benchmark\\\\data\\\\/g, "./data/")
  .replace(/C:\\\\Users\\\\ATHARV MUNDE\\\\Desktop\\\\wolbarg-benchmarks\\\\data\\\\/g, "./data/")
  .replace(/C:\\\\Users\\\\[^"\\]+/g, "./data/...");

writeFileSync(path, scrubbed);
console.log("scrubbed absolute paths");
