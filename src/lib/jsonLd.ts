// JSON.stringify doesn't escape "<", so a literal "</script>" inside any
// value (a course description, a FAQ answer, ...) would prematurely close
// the surrounding <script> tag. None of the current content contains that,
// but this makes it impossible regardless of what gets typed into these
// fields later — the escape is invisible to JSON.parse on the consuming end.
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
