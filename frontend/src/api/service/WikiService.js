import api from '@/api/axiosConfig.js'

class WikiService {
  static getArticle = async (chapter, page, signal) => {
    return api.get(`/wiki/${chapter}/${page}`, {
      signal
    })
  }

  static getNavigation = async (chapter) => {
    return api.get(`/wiki/${chapter}`)
  }
}

export default WikiService
