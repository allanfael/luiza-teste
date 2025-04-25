import { RouteProp } from '@react-navigation/native'
import type { StackNavigationProp } from '@react-navigation/stack'
import { ROUTES } from '@/utils/routes'

export type ParamsRoute = {
  [ROUTES.LIST_PRODUCTS]: undefined
  [ROUTES.AUTHENTICATION]: undefined
  [ROUTES.REGISTER]: undefined
}

export type RouteProps = StackNavigationProp<ParamsRoute>
