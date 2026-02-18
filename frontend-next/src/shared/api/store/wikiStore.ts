import WikiService from '@/shared/api/service/wikiService/WikiService'
import { GenericAbortSignal } from 'axios'

class WikiStore {
  async getArticle(chapter: string, page: string, signal?: GenericAbortSignal) {
    const response = await WikiService.getArticle(chapter, page, signal)

    return response
  }

  async getNavigation(chapter: string) {
    const response = await WikiService.getNavigation(chapter)

    return response
  }
}

export default WikiStore
