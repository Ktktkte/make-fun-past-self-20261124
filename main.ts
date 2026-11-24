import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const line1 =
  "That night your finger is hovering over Delete on the only copy of the project — step away from the keyboard.";
const line2 =
  "One keystroke would have erased a year of work, and the backup you make instead is the reason the project still exists.";

const text = `${line1}\n${line2}\n`;

// Gate: the sealed scorer requires 1-280 characters and exactly two lines.
if (text.length < 1 || text.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${text.length}`);
}
const lines = text.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly two lines, got ${lines.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? join(dirname(fileURLToPath(import.meta.url)), "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
