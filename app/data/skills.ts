export interface SkillItem {
  label: string
  /** filename in /icons/tech; omit for a monogram badge */
  icon?: string
  /** highlight as a specialty */
  featured?: boolean
}

export interface SkillGroup {
  titleKey: string
  items: SkillItem[]
}

export const skillGroups: SkillGroup[] = [
  {
    titleKey: 'skills.groups.frontend',
    items: [
      { label: 'Vue 3', icon: 'vuejs-original.svg' },
      { label: 'Nuxt', icon: 'nuxtjs-original.svg' },
      { label: 'React', icon: 'react.svg' },
      { label: 'TypeScript', icon: 'ts.svg' },
      { label: 'JavaScript', icon: 'js.svg' },
      { label: 'Redux', icon: 'redux.svg' },
      { label: 'HTML5', icon: 'html5.svg' },
      { label: 'CSS3', icon: 'css3.svg' },
      { label: 'SCSS', icon: 'sass-original.svg' },
    ],
  },
  {
    titleKey: 'skills.groups.backend',
    items: [
      { label: 'Effect-TS', featured: true },
      { label: 'Node.js', icon: 'node.svg' },
      { label: 'NestJS', icon: 'nestjs-plain.svg' },
      { label: 'GraphQL', icon: 'graphql.svg' },
      { label: 'Apollo', icon: 'apollo.svg' },
      { label: 'REST · Axios', icon: 'axios.svg' },
      { label: 'MongoDB', icon: 'mongodb-plain-wordmark.svg' },
    ],
  },
  {
    titleKey: 'skills.groups.tooling',
    items: [
      { label: 'Docker', icon: 'docker.svg' },
      { label: 'Git', icon: 'github_cat.svg' },
      { label: 'Webpack', icon: 'webpack.svg' },
      { label: 'npm', icon: 'npm.svg' },
      { label: 'Postman', icon: 'postman.svg' },
      { label: 'VS Code', icon: 'vscode.svg' },
    ],
  },
]
