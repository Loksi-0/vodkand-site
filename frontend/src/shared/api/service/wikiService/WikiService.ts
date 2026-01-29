import api from '@/shared/api/axiosConfig.js'
import {
  ArticleType,
  NavigationType
} from '@/shared/api/service/wikiService/wiki.types'
import { GenericAbortSignal } from 'axios'

class WikiService {
  getArticle = async (
    chapter: string,
    page: string,
    signal?: GenericAbortSignal
  ) => {
    return api.get<ArticleType>(`/wiki/${chapter}/${page}`, {
      signal
    })
  }

  getNavigation = async (chapter: string) => {
    return api.get<NavigationType>(`/wiki/${chapter}`)
  }
}

export default new WikiService()
