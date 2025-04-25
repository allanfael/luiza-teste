import { Product } from "@/interfaces/product";

export interface ProductModel {
  data: Product[] | undefined
  favorites: Product[] | undefined
  loading: boolean
  addFavorite: (id: number) => void
}