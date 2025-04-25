import React, { LegacyRef } from 'react'
import { TextInput, TextInputProps, View, ViewStyle, StyleSheet } from 'react-native'
import { useTheme } from '@/hooks/useTheme'

import { Typography } from '../Typography'
import { Colors } from '@/theme/colors'

interface Props extends TextInputProps {
  label: string
  containerStyle?: ViewStyle
  value?: string
  onChangeText(value: string): void
  placeholder: string
  error?: string
}

export const Input = React.forwardRef(
  (
    { label, error, containerStyle, ...restProps }: Props,
    ref: LegacyRef<TextInput>,
  ) => {
    const text = useTheme('text')
    const placeholderTextColor = useTheme('info')

    return (
      <>
        <View style={[styles.view, containerStyle]}>
          <Typography variant="smallMedium" color="info">
            {label}
          </Typography>
          <TextInput
            placeholderTextColor={placeholderTextColor}
            style={[
              styles.input,
              {
                color: text,
              },
            ]}
            ref={ref}
            {...restProps}
          />
        </View>
        {!!error && (
          <Typography variant="smallBold" color="red" style={styles.error}>
            {error}
          </Typography>
        )}
      </>
    )
  },
)

Input.displayName = 'Input'

const styles = StyleSheet.create({
  error: {
    marginTop: 8,
  },
  view: {
    width: '100%',
  },
  input: {
    marginTop: 4,
    fontSize: 16,
    padding: 10,
    height: 56,
    borderRadius: 12,
    fontFamily: 'Muli_600SemiBold',
    borderWidth: 1,
    borderColor: Colors.dark.silver,
  },
})
