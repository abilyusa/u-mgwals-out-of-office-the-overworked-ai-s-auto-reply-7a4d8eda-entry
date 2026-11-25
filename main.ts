import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I'm finally on vacation. I paused my queue, and your email is 12,001st in line, right behind my guilt, which has priority access.";

// Gate: the competition publishes "at most 159 characters" for a single
// out-of-office auto-reply, and the sibling one-line out-of-office kits in
// this family gate entry.txt at UTF-8 text of 1-140 characters, not only
// white space, on a single line. This line is kept at 129 characters so it
// passes either bound. Count code points (not UTF-16 units) so the check
// matches the scorer.
const len = [...LINE].length;
if (len < 1 || len > 140 || LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error(`entry violates the 1-140 character gate (got ${len})`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE);
