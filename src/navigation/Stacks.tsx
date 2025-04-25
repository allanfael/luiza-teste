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
import { Register } from '@/screens/Register/view'
import { useUserStore } from '@/store/user'

const Stack = createStackNavigator<ParamsRoute>()

export const Stacks = () => {
  const background = useTheme('background')
  const text = useTheme('text')
  const {setShowBottomSheet} = useBottomSheet()
  const { email } = useUserStore()

  return (
    <Stack.Navigator 
      initialRouteName={email ? ROUTES.LIST_PRODUCTS : ROUTES.AUTHENTICATION}
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
          },
          headerLeft: () => <></>,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name={ROUTES.AUTHENTICATION}
        component={Authentication}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={Register}
        options={{
          title: '',
          headerBackTitle: ''
        }}
      />
    </Stack.Navigator>
  )
}
