import React from 'react'
import { Text, TextProps, TextStyle } from 'react-native'
import { Colors } from '@/theme/colors'

import typography from '../../theme/typography'
import { useTheme } from '@/hooks/useTheme'

interface TypographyProps extends TextProps {
  variant: keyof typeof typography
  children?: React.ReactNode
  style?: TextStyle
  color?: keyof typeof Colors.light
}

export function Typography(props: TypographyProps) {
  const { variant, children, style, color, ...restProps } = props

  const theme = useTheme(color ?? 'text')

  const styleSelected = {
    ...(typography[variant] as TextStyle),
  }

  if (color) {
    styleSelected.color = theme
  }

  return (
    <Text style={{ ...styleSelected, ...style }} {...restProps}>
      {children}
    </Text>
  )
}
