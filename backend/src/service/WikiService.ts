import path from 'path'
import fs from 'fs/promises'
import matter from 'gray-matter'
import ApiError from '../exceptions/ApiError.js'

type NavigationType = {
  order: number
  title: string
  icon?: string
}

class WikiService {
  basePath = path.join(process.cwd(), 'uploads/wiki')

  async getPage(chapter: string, page: string) {
    try {
      const filePath = path.join(this.basePath, chapter, `${page}.md`)

      const raw = await fs.readFile(filePath, 'utf-8')
      const { data, content } = matter(raw)

      return { ...data, page, content }
    } catch (e: unknown) {
      if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
        throw ApiError.NotFound('Страница не найдена')
      }

      throw ApiError.InternalError('Ошибка на сервере')
    }
  }

  async getNavigation(chapter: string) {
    const dirPath = path.join(this.basePath, chapter)
    const files = await fs.readdir(dirPath)

    const pages = await Promise.all(
      files.map(async (file) => {
        const raw = await fs.readFile(path.join(dirPath, file), 'utf-8')
        const { data } = matter(raw)

        const nav = data as NavigationType

        return {
          page: file.replace('.md', ''),
          order: nav.order,
          title: nav.title,
          icon: nav.icon
        }
      })
    )

    if (!pages[0]) {
      throw ApiError.NotFound('Нет страниц для навигации')
    }

    pages.sort((a, b) => a.order - b.order)

    return pages
  }
}

export default new WikiService()
