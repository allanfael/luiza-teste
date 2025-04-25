import { useMemo } from "react"
import { ProductModel } from "./model"
import { useFetch } from "@/hooks/useFetch"
import { api } from "@/services/api"
import { Product } from "@/interfaces/product"
import { useFavoriteStore } from "@/store/favorite"
import { useSettings } from "@/store/settings"

export const useProducts = (): ProductModel => {
  const {ids, save} = useFavoriteStore()
  const { onlyFavorites } = useSettings()

  const { data, loading } = useFetch<Product[]>({
    request: async () => api.getProducts()
  })

  const dataWithFavorite = useMemo(() => {
    return data?.map(product => {
      return {
        ...product,
        isFavorite: ids.includes(product.id)
      }
    })
  }, [data, ids])

  const favorites = useMemo(() => {
    return dataWithFavorite?.filter(product => ids.includes(product.id))
  }, [dataWithFavorite, ids])

  const selectedData = useMemo(() => {
    return onlyFavorites ? favorites : dataWithFavorite
  }, [dataWithFavorite, favorites, onlyFavorites])

  return {
    data: selectedData,
    loading,
    favorites,
    addFavorite: save
  }
}