import { get } from "."
import { Product } from "../interfaces/product"

export const api = {
  getProducts: async (): Promise<Product[]> => {
    const response:Product[]  = await get({url: '/products'})
    return response
  }
}