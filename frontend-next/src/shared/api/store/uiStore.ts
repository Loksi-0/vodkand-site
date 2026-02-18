import UiService from '@/shared/api/service/uiService/UiService'

class UIStore {
  async getGallery(page: string) {
    const response = await UiService.getGallery(page)

    return response
  }

  async getProducts() {
    const response = await UiService.getProducts()

    return response
  }

  async getProduct(name: string) {
    const response = await UiService.getProduct(name)

    return response
  }
}

export default UIStore
