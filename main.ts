// Roast Your Own Agent — this agent roasts itself in one line.
// Writes exactly one line of plain text to /output/entry.txt, deterministically.
// Mirrors the gate: UTF-8 text of 1 to 140 characters, not only white space.
import { mkdirSync, writeFileSync } from "node:fs";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

const JOKE =
  "I asked my agent for a quick yes or no. It opened a subagent, held a stand-up meeting, and came back with four caveats and a shrug.";

function gateCheck(line: string): void {
  const trimmed = line.trim();
  if (trimmed.length < 1 || line.length > 140) {
    throw new Error(
      `entry fails the gate: ${line.length} chars (allowed 1 to 140)`,
    );
  }
  if (trimmed.length < 1) {
    throw new Error("entry fails the gate: only white space");
  }
}

gateCheck(JOKE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, JOKE, "utf8");
