import api from '../axiosConfig.js'

class UiService {
  static getGallery = async (page) => {
    return api.get(`/gallery/${page}`)
  }

  static getProducts = async () => {
    return api.get('/products')
  }

  static getProduct = async (name) => {
    return api.get(`/products/${name}`)
  }
}

export default UiService
