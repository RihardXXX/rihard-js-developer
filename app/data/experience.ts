export interface Job {
  key: string
  company: string
  period: string
  url?: string
  stack: string[]
}

/** Most recent first. Самолёт inserted once dates/role are confirmed. */
export const jobs: Job[] = [
  {
    key: 'redlab',
    company: 'RedLab',
    period: '2024 — 2025',
    stack: ['Vue 3', 'TypeScript', 'Pinia', 'REST'],
  },
  {
    key: 'rosbank',
    company: 'Росбанк',
    period: '2023 — 2024',
    stack: ['React', 'Vue 3', 'TypeScript', 'GraphQL', 'SSR'],
  },
  {
    key: 'idaproject',
    company: 'idaproject',
    period: '2021 — 2023',
    stack: ['Vue 2/3', 'Nuxt', 'TypeScript', 'GraphQL'],
  },
]
