const COUNTER_ID = 97775681

declare global {
  interface Window {
    ym?: ((id: number, action: string, ...args: unknown[]) => void) & {
      a?: unknown[]
      l?: number
    }
  }
}

/**
 * Yandex.Metrika — production only, with SPA navigation tracking.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  // Command queue stub (buffers calls until tag.js loads).
  window.ym =
    window.ym ||
    function (...args: unknown[]) {
      ;(window.ym!.a = window.ym!.a || []).push(args)
    }
  window.ym.l = Number(new Date())

  const src = 'https://mc.yandex.ru/metrika/tag.js'
  if (![...document.scripts].some((s) => s.src === src)) {
    const script = document.createElement('script')
    script.async = true
    script.src = src
    document.head.appendChild(script)
  }

  window.ym(COUNTER_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
  })

  useRouter().afterEach((to) => {
    window.ym?.(COUNTER_ID, 'hit', to.fullPath)
  })
})
