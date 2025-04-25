import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Muli_400Regular,
  Muli_600SemiBold,
  Muli_700Bold,
  useFonts,
} from '@expo-google-fonts/muli'
import * as SplashScreen from 'expo-splash-screen'

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigation } from '@/navigation';
import { useTheme } from '@/hooks/useTheme';
import { useSettings } from '@/store/settings';

export default function App() {
  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_600SemiBold,
    Muli_700Bold,
  })

  const backgroundColor = useTheme('background')

  const { darkMode } = useSettings()

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  onLayoutRootView()
  
  return (
    <SafeAreaProvider>
      <StatusBar style={darkMode ? 'light' : 'dark'} backgroundColor={backgroundColor} />
      <BottomSheetModalProvider>
        <RootNavigation />
      </BottomSheetModalProvider>      
    </SafeAreaProvider>
  );
}
