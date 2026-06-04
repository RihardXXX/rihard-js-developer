export type Theme = 'light' | 'dark'

/**
 * Theme state shared across the app. The initial `dark` class is applied
 * pre-paint by an inline script in nuxt.config (no FOUC); here we sync the
 * reactive state on mount and persist user choice.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')
  const mounted = useState<boolean>('theme-mounted', () => false)

  const setTheme = (value: Theme) => {
    theme.value = value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', value === 'dark')
      localStorage.setItem('theme', value)
    }
  }

  const toggle = () => setTheme(theme.value === 'dark' ? 'light' : 'dark')

  const init = () => {
    if (!import.meta.client || mounted.value) return
    const stored = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = stored ?? (prefersDark ? 'dark' : 'light')
    mounted.value = true
  }

  return { theme, mounted, setTheme, toggle, init }
}
