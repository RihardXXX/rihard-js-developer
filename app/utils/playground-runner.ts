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

type TimerCallback = (...args: unknown[]) => void

const errorLine = (e: unknown): string => 'Error: ' + (e instanceof Error ? e.message : String(e))

export const createPlaygroundRunner = (onOutput: (text: string) => void): PlaygroundRunner => {
  // Ends the current run: its console stops writing and its timers are cleared,
  // so `.then`/timer output of an old run never lands in a new one.
  let close = (): void => {}

  const run = (code: string, libs: readonly PlaygroundLib[]) => {
    close()
    const lines: string[] = []
    const timeouts = new Set<ReturnType<typeof setTimeout>>()
    const intervals = new Set<ReturnType<typeof setInterval>>()
    let alive = true
    close = () => {
      alive = false
      timeouts.forEach((id) => clearTimeout(id))
      intervals.forEach((id) => clearInterval(id))
    }

    const write = (items: string[]) => {
      if (!alive) return
      lines.push(...items)
      onOutput(lines.join('\n'))
    }
    const sandboxConsole = {
      log: (...a: unknown[]) => write(a.map(formatValue)),
      error: (...a: unknown[]) => write(['ERROR: ' + a.join(' ')]),
      warn: (...a: unknown[]) => write(['WARN: ' + a.join(' ')]),
    }
    // A throw inside a timer callback is printed instead of escaping to the page.
    // clearTimeout/clearInterval stay global: the wrappers hand out real timer ids.
    const call = (handler: TimerCallback, args: unknown[]) => {
      try {
        handler(...args)
      } catch (e) {
        write([errorLine(e)])
      }
    }
    const sandboxSetTimeout = (handler: TimerCallback, ms?: number, ...args: unknown[]) => {
      const id = setTimeout(() => {
        timeouts.delete(id)
        call(handler, args)
      }, ms)
      timeouts.add(id)
      return id
    }
    const sandboxSetInterval = (handler: TimerCallback, ms?: number, ...args: unknown[]) => {
      const id = setInterval(() => call(handler, args), ms)
      intervals.add(id)
      return id
    }

    try {
      const aliases = libs.map((l) => l.alias)
      const mods = libs.map((l) => l.mod)
      // Runs the user's own code in the page context with the chosen libs injected.
      // eslint-disable-next-line no-new-func
      new Function('console', 'setTimeout', 'setInterval', ...aliases, code)(
        sandboxConsole,
        sandboxSetTimeout,
        sandboxSetInterval,
        ...mods,
      )
      onOutput(lines.join('\n'))
    } catch (e) {
      close()
      onOutput(errorLine(e))
    }
  }

  const clear = () => {
    close()
    onOutput('')
  }

  return { run, clear }
}
