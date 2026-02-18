import api from '@/shared/api/axiosConfig'
import {
  GalleryType,
  ProductsType,
  ProductType
} from '@/shared/api/service/uiService/uiService.types'

class UiService {
  getGallery = async (page: string) => {
    return api.get<GalleryType>(`/gallery/${page}`)
  }

  getProducts = async () => {
    return api.get<ProductsType>('/products')
  }

  getProduct = async (name: string) => {
    return api.get<ProductType>(`/products/${name}`)
  }
}

export default new UiService()
