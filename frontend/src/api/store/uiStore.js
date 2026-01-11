import UserService from '@/api/service/UserService'

class UIStore {
  async getGallery(page) {
    const response = await UserService.getGallery(page)

    return response
  }
}

export default UIStore
