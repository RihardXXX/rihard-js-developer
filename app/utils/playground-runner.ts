// Run loop of the course playground. Plain erasable TS with no `~` imports:
// scripts/course-playground.test.mjs imports this file straight into Node.

export interface PlaygroundLib {
  alias: string
  mod: unknown
}

export interface PlaygroundRunner {
  run(code: string, libs: readonly PlaygroundLib[]): void
  clear(): void
}

export const formatValue = (item: unknown): string => {
  if (typeof item === 'string') return item
  try {
    return JSON.stringify(item, null, 2)
  } catch {
    return String(item)
  }
}

export const createPlaygroundRunner = (onOutput: (text: string) => void): PlaygroundRunner => {
  const run = (code: string, libs: readonly PlaygroundLib[]) => {
    const logs: unknown[] = []
    const sandboxConsole = {
      log: (...a: unknown[]) => logs.push(...a),
      error: (...a: unknown[]) => logs.push('ERROR: ' + a.join(' ')),
      warn: (...a: unknown[]) => logs.push('WARN: ' + a.join(' ')),
    }
    try {
      const aliases = libs.map((l) => l.alias)
      const mods = libs.map((l) => l.mod)
      // Runs the user's own code in the page context with the chosen libs injected.
      // eslint-disable-next-line no-new-func
      new Function('console', ...aliases, code)(sandboxConsole, ...mods)
      onOutput(logs.map(formatValue).join('\n'))
    } catch (e) {
      onOutput('Error: ' + (e instanceof Error ? e.message : String(e)))
    }
  }

  return { run, clear: () => onOutput('') }
}
