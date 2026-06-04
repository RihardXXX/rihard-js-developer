// Minimal browser shim for Node's `util`, enough for Sanctuary's init
// (it references `util.inspect.custom`). Not a full polyfill.
const custom = Symbol.for('nodejs.util.inspect.custom')

export const inspect = Object.assign(
  (value: unknown): string => {
    try {
      return JSON.stringify(value)
    } catch {
      return String(value)
    }
  },
  { custom },
)

export default { inspect }
