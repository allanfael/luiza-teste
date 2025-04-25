import React from 'react';
import { View, Switch as SwitchComponent, StyleSheet } from 'react-native';
import { Typography } from '../Typography';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useTheme } from '@/hooks/useTheme';

type Props = {
 value: boolean
 onChange: (value: boolean) => void
 text: string
}

export const Switch = ({value, onChange, text}: Props) => {
  const primary = useTheme('primary')

  return (
    <View style={styles.container}>
      <SwitchComponent 
        value={value} 
        onValueChange={(value) => onChange(value)}
        trackColor={{true: primary}}
      />
      <Typography variant="normalRegular" color='text'>{text}</Typography>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  }
});

