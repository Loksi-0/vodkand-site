import UiService from '@/api/service/UiService'

class UIStore {
  async getGallery(page) {
    const response = await UiService.getGallery(page)

    return response
  }

  async getProducts() {
    const response = await UiService.getProducts()

    return response
  }

  async getProduct(name) {
    const response = await UiService.getProduct(name)

    return response
  }
}

export default UIStore
