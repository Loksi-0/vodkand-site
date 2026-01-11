import WikiService from '@/api/service/WikiService'

class WikiStore {
  async getArticle(chapter, page, signal = null) {
    const response = await WikiService.getArticle(chapter, page, signal)

    return response
  }

  async getNavigation(chapter) {
    const response = await WikiService.getNavigation(chapter)

    return response
  }
}

export default WikiStore
