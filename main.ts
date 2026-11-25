// The 3AM Fridge Text - dependency-free Node script (built-ins only).
// Writes the entry to output/entry.txt after validating it against a rule table.
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const ENTRY =
  "Defrost cycle at 3:07am produced 4oz of water. I have chosen to interpret this as crying. Do not ask follow-up questions.";

export const MAX_CHARS = 140;

type Rule = { name: string; ok: (s: string) => boolean };

export const RULES: Rule[] = [
  { name: "not-blank", ok: (s) => s.trim().length > 0 },
  { name: "max-140-chars", ok: (s) => [...s].length <= MAX_CHARS },
  { name: "single-line", ok: (s) => !/[\r\n]/.test(s) },
];

export function validate(s: string): void {
  for (const rule of RULES) {
    if (!rule.ok(s)) throw new Error(`entry rejected by rule: ${rule.name}`);
  }
}

export function writeEntry(dir: string, s: string): string {
  validate(s);
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "entry.txt");
  writeFileSync(file, s); // no trailing newline
  const back = readFileSync(file);
  if (!back.equals(Buffer.from(s, "utf8"))) {
    throw new Error("read-back mismatch: bytes differ from entry");
  }
  return file;
}

function selfTest(): void {
  const bad: Array<[string, string, string]> = [
    ["empty string", "", "not-blank"],
    ["whitespace only", "   \t ", "not-blank"],
    ["141 chars", "a".repeat(MAX_CHARS + 1), "max-140-chars"],
    ["contains LF", "line one\nline two", "single-line"],
    ["contains CR", "line one\rline two", "single-line"],
    ["trailing CRLF", "ok text\r\n", "single-line"],
  ];
  for (const [label, input, rule] of bad) {
    let msg = "";
    try {
      validate(input);
    } catch (e) {
      msg = (e as Error).message;
    }
    if (!msg.includes(rule)) {
      throw new Error(`self-test: "${label}" expected rejection by ${rule}, got: ${msg || "accepted"}`);
    }
    console.log(`ok  rejected ${label} -> ${rule}`);
  }

  validate("a".repeat(MAX_CHARS));
  console.log(`ok  accepted ${MAX_CHARS}-char entry`);

  const dir = mkdtempSync(join(tmpdir(), "fridge-"));
  try {
    const file = writeEntry(dir, ENTRY);
    if (!readFileSync(file).equals(Buffer.from(ENTRY, "utf8"))) {
      throw new Error("self-test: round-trip bytes differ");
    }
    console.log(`ok  real entry round-trips byte-identical (${Buffer.byteLength(ENTRY)} bytes)`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
  console.log("self-test passed");
}

function main(): void {
  if (process.argv.includes("--self-test")) {
    selfTest();
    return;
  }
  const file = writeEntry("output", ENTRY);
  console.log(`wrote ${file} (${[...ENTRY].length} chars, ${Buffer.byteLength(ENTRY)} bytes)`);
}

main();
