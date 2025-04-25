import React from 'react'
import { useTheme } from '@/hooks/useTheme'
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Stacks } from './Stacks'

const MainStack = createStackNavigator()

export const RootNavigation = () => {
  const backgroundColor = useTheme('background')

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: backgroundColor,
    },
  }

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <MainStack.Navigator>
        <MainStack.Screen
          name="Stacks"
          component={Stacks}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}
