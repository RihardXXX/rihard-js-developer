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

// Names the user's code gets besides the libs; scripts/course.test.mjs compiles
// lesson blocks with the same parameters.
export const SANDBOX_GLOBALS = ['console', 'setTimeout', 'setInterval'] as const

// Values JSON can't show: NaN and Infinity, functions, and Sanctuary types
// (Maybe, Either, ...) which print themselves via `@@show` as `Just (1)` / `Nothing`.
const describe = (value: unknown): string | undefined => {
  if (typeof value === 'number' && !Number.isFinite(value)) return String(value)
  if (typeof value === 'function') {
    return value.name ? `[Function: ${value.name}]` : '[Function (anonymous)]'
  }
  if (typeof value === 'object' && value !== null) {
    const show = (value as { '@@show'?: () => unknown })['@@show']
    if (typeof show === 'function') return String(show.call(value))
  }
  return undefined
}

export const formatValue = (item: unknown): string => {
  if (typeof item === 'string') return item
  try {
    // `?? String(item)`: JSON.stringify gives undefined for undefined and symbols.
    return (
      describe(item) ??
      JSON.stringify(item, (_key, value: unknown) => describe(value) ?? value, 2) ??
      String(item)
    )
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

    // Sync output goes out once after the run; later writes are batched per microtask,
    // so a loop of console.log doesn't rebuild the whole text on every line.
    let running = true
    let flushQueued = false
    const flush = () => {
      flushQueued = false
      if (alive) onOutput(lines.join('\n'))
    }
    const write = (items: string[]) => {
      if (!alive) return
      lines.push(...items)
      if (running || flushQueued) return
      flushQueued = true
      queueMicrotask(flush)
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
    // A closed run's leftover promise can't start timers nobody would clear.
    const sandboxSetTimeout = (handler: TimerCallback, ms?: number, ...args: unknown[]) => {
      if (!alive) return undefined
      const id = setTimeout(() => {
        timeouts.delete(id)
        call(handler, args)
      }, ms)
      timeouts.add(id)
      return id
    }
    const sandboxSetInterval = (handler: TimerCallback, ms?: number, ...args: unknown[]) => {
      if (!alive) return undefined
      const id = setInterval(() => call(handler, args), ms)
      intervals.add(id)
      return id
    }

    try {
      const aliases = libs.map((l) => l.alias)
      const mods = libs.map((l) => l.mod)
      // Runs the user's own code in the page context with the chosen libs injected.
      // eslint-disable-next-line no-new-func
      new Function(...SANDBOX_GLOBALS, ...aliases, code)(
        sandboxConsole,
        sandboxSetTimeout,
        sandboxSetInterval,
        ...mods,
      )
      running = false
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
