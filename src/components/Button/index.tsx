import React from 'react'
import { ActivityIndicator, ViewStyle, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useTheme } from '@/hooks/useTheme'

import { Typography } from '../Typography'

interface Props {
  title: string
  styles?: ViewStyle
  loading?: boolean
  onPress(): void
  testID?: string
}

export const Button = ({ title, styles, onPress, loading, testID }: Props) => {
  const backgroundColor = useTheme('primary')

  return (
    <RectButton
      style={[
        styles,
        style.button,
        {
          backgroundColor,
        },
      ]}
      onPress={onPress}
      enabled={!loading}
      testID={testID}
    >
      {loading && <ActivityIndicator size="small" color='white' />}
      <Typography variant="normalBold" color="background">
        {title}
      </Typography>
    </RectButton>
  )
}

const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    elevation: 3,
  },
})
