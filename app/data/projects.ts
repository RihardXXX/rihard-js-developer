export interface Project {
  slug: string
  name: string
  url: string
  /** base filename in /images/portfolio (without extension) */
  image: string
  sectorKey: string
  descKey: string
}

/** Real client projects (screenshots from the developer's commercial work). */
export const projects: Project[] = [
  {
    slug: 'krost',
    name: 'Концерн КРОСТ',
    url: 'https://krost.ru/',
    image: 'krost',
    sectorKey: 'projects.sectors.realEstate',
    descKey: 'projects.items.krost',
  },
  {
    slug: 'brusnika',
    name: 'Брусника',
    url: 'https://moskva.brusnika.ru/',
    image: 'brusnika',
    sectorKey: 'projects.sectors.realEstate',
    descKey: 'projects.items.brusnika',
  },
  {
    slug: 'vatutinki',
    name: 'Новые Ватутинки',
    url: 'https://vatutinki.ru/',
    image: 'vatutinki',
    sectorKey: 'projects.sectors.realEstate',
    descKey: 'projects.items.vatutinki',
  },
  {
    slug: 'lesart',
    name: 'ЖК «ЛесART»',
    url: 'https://lesart.ru/',
    image: 'lesart',
    sectorKey: 'projects.sectors.realEstate',
    descKey: 'projects.items.lesart',
  },
  {
    slug: '4d',
    name: '4D Development',
    url: 'https://4d.life/',
    image: '4D',
    sectorKey: 'projects.sectors.realEstate',
    descKey: 'projects.items.fourd',
  },
  {
    slug: 'amenu',
    name: 'А-Меню',
    url: 'https://a-menu.ru/',
    image: 'amenu',
    sectorKey: 'projects.sectors.saas',
    descKey: 'projects.items.amenu',
  },
  {
    slug: 'scrile',
    name: 'Scrile',
    url: 'https://www.scrile.com/',
    image: 'scrile',
    sectorKey: 'projects.sectors.saas',
    descKey: 'projects.items.scrile',
  },
  {
    slug: 'zki',
    name: 'Uralceramica (ЗКИ)',
    url: 'https://uralceramica.ru/',
    image: 'zki',
    sectorKey: 'projects.sectors.ecommerce',
    descKey: 'projects.items.zki',
  },
]

export interface RepoCase {
  name: string
  url: string
  tag: string
  descKey: string
}

/** Open-source / pet projects shown as engineering depth. */
export const repos: RepoCase[] = [
  {
    name: 'superset-custom',
    url: 'https://github.com/RihardXXX/superset-custom',
    tag: 'DevOps · Data',
    descKey: 'projects.repos.superset',
  },
  {
    name: 'pixi-skia-pdf',
    url: 'https://github.com/RihardXXX/pixi-skia-pdf',
    tag: 'Graphics · WASM',
    descKey: 'projects.repos.pixi',
  },
  {
    name: 'test-envy-feedback',
    url: 'https://github.com/RihardXXX/test-envy-feedback',
    tag: 'Fullstack · Laravel + Vue',
    descKey: 'projects.repos.envy',
  },
]
