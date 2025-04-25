import React, { useCallback, useEffect, useRef } from 'react';
import { Typography } from '@/components/Typography';
import { useBottomSheet } from '@/store/bottom-sheet';
import BottomSheetComponent, { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { StyleSheet, View } from 'react-native';
import { Switch } from '@/components/Switch';
import { useSettings } from '@/store/settings';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/Button';
import { useUserStore } from '@/store/user';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/utils/routes';

export const BottomSheet = () => {
  const { setShowBottomSheet, showBottomSheet } = useBottomSheet()
  const { darkMode, onlyFavorites, setDarkMode, setOnlyFavorites } = useSettings()
  const { logout } = useUserStore()

  const { reset } = useNavigation()
  
  const backgroundColor = useTheme('secondary')
  const indicatorColor = useTheme('text')

  const bottomSheetRef = useRef<BottomSheetComponent>(null)

  const backAction = useCallback(() => {
    bottomSheetRef.current?.close()
    setShowBottomSheet(false)

    return true
  }, [setShowBottomSheet])

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === 0) {
        bottomSheetRef.current?.close()
        setShowBottomSheet(false)
      }
    },
    [backAction, setShowBottomSheet],
  )

  const renderBackDropComponent = useCallback(
    (props: BottomSheetBackdropProps) => {
      return (
        <BottomSheetBackdrop
          appearsOnIndex={1}
          disappearsOnIndex={-1}
          pressBehavior="close"
          {...props}
        />
      )
    },
    [],
  )

  const handleLogout = () => {
    logout()
    reset({
      index: 0,
      routes: [{ name: ROUTES.AUTHENTICATION as never }]
    })
  }

  return (
    <BottomSheetComponent
      snapPoints={['35%']}
      index={showBottomSheet ? 1 : -1}
      enablePanDownToClose
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      backdropComponent={renderBackDropComponent}
      enableContentPanningGesture
      onClose={() => setShowBottomSheet(false)}
      handleStyle={{ backgroundColor }}
      handleIndicatorStyle={{ backgroundColor: indicatorColor }}
    >
      <BottomSheetScrollView style={[styles.container, { backgroundColor }]}>
        <Typography variant="mediumBold" color='text' style={styles.title}>Configurações</Typography>

        <View style={styles.switchContainer}>
         <Switch 
          text='Modo Escuro' 
          value={darkMode} 
          onChange={setDarkMode}/>
         <Switch 
          text='Somente Favoritos'
          value={onlyFavorites} 
          onChange={setOnlyFavorites}/>
          <Button title="Sair" onPress={handleLogout} styles={styles.button}/>
        </View>
      </BottomSheetScrollView>
    </BottomSheetComponent>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1
  },
  title: {
    textAlign: 'center'
  },
  switchContainer: {
    gap: 12,
    marginTop: 20
  },
  button: {
    marginTop: 10
  }
})
