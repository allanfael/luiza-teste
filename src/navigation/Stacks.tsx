import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import { createStackNavigator } from '@react-navigation/stack'

import { ListProducts } from '../screens/ListProducts/view'

import { ParamsRoute } from './ParamsRoute'
import { ROUTES } from '@/utils/routes'
import { Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useBottomSheet } from '@/store/bottom-sheet'
import { Authentication } from '@/screens/Authentication/view'

const Stack = createStackNavigator<ParamsRoute>()

export const Stacks = () => {
  const background = useTheme('background')
  const text = useTheme('text')
  const {setShowBottomSheet} = useBottomSheet()

  return (
    <Stack.Navigator 
      initialRouteName={ROUTES.AUTHENTICATION}
      screenOptions={{
        headerStyle: {
          backgroundColor: background,
        },
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: 'Muli_700Bold',
          color: text
        },
    }}>
      <Stack.Screen
        name={ROUTES.LIST_PRODUCTS}
        component={ListProducts}
        options={{
          headerTitle: 'Produtos',
          headerRight: () => (
            <Pressable onPress={() => setShowBottomSheet(true)}>
              <Ionicons name="settings-outline" size={22} color={text} />
            </Pressable>
          ),
          headerRightContainerStyle: {
            right: 16
          }
        }}
      />
      <Stack.Screen
        name={ROUTES.AUTHENTICATION}
        component={Authentication}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}
