import React, { memo, ReactNode, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/theme/colors'
import { Typography } from '../Typography'
import {Image as ImageComponent} from 'expo-image'
import { MotiView } from 'moti'
import { currencyParse } from '@/utils/currencyParse'
import { useTheme } from '@/hooks/useTheme'
import * as Haptics from 'expo-haptics';

import { styles } from './styles'

const { height } = Dimensions.get('window')

const Container = ({children}: {children: ReactNode}) => {
  const cardHeight = height / 2.16
  const backgroundColor = useTheme('secondary')

  return (
    <View style={[styles.container, {height: cardHeight, backgroundColor} ]}>
      {children}
    </View>
  )
}

export const Rate = memo(({rate}: {rate: number}) => {
  return (
    <View style={styles.rate}>
      <Ionicons name="star" size={18} color={Colors.dark.yellow} />
      <Typography variant="normalRegular" color='text'>{rate}</Typography>
    </View>
  )
})

Rate.displayName = 'Rate'

export const Image = memo(({uri}: {uri: string}) => {
  return (
    <ImageComponent
      style={styles.image}
      source={{
        uri: uri,
      }}
      contentFit="cover"
      transition={200}
    />
  )
})

Image.displayName = 'Image'

export const Title = memo(({title}: {title: string}) => {
  return (
    <Typography variant="mediumBold" color='text' numberOfLines={4} style={styles.title}>{title}</Typography>
  )
})

Title.displayName = 'Title'

export const Description = memo(({title}: {title: string}) => {
  return (
    <Typography variant="normalRegular" color='text' numberOfLines={6} style={styles.description}>{title}</Typography>
  )
})

Description.displayName = 'Description'

interface FavoriteProps {
  onPress: () => void
  isFavorite: boolean
}

export const AnimatedFavorite = memo(({onPress, isFavorite = false}: FavoriteProps) => {
  const [favorite, setFavorite] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setFavorite(isFavorite)
  }, [isFavorite])

  const handlePress = () => {
    if(favorite) {
      setFavorite(false)
      onPress()
      return
    }

    setIsAnimating(true)
    onPress()
  }

  const onDidAnimate = () => {
    if (isAnimating) {
      setIsAnimating(false)
      setFavorite(true)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  }
  
  const animate = isAnimating ? {scale: 0.6, opacity: 0.3} : {scale: 1}

  return (
    <Pressable
      onPressOut={handlePress}
      >
      <MotiView
        from={{scale: 1, opacity: 1}}
        animate={animate}
        transition={{type: 'timing', duration: 150}}
        onDidAnimate={onDidAnimate}>
        {favorite ? (
          <Ionicons 
            name="heart" 
            size={22} 
            color={Colors.dark.red} 
          />
          ) : (
          <Ionicons 
            name="heart-outline" 
            size={22} 
            color={Colors.dark.red} 
          />
        )}
      </MotiView>
    </Pressable>
  )
})

AnimatedFavorite.displayName = 'AnimatedFavorite'


interface FooterProps {
  price: number
  onFavorite: () => void
  isFavorite: boolean
}

export const Footer = memo(({price = 0, onFavorite, isFavorite}: FooterProps) => {
  return (
    <View style={styles.footer}>
      <Typography variant="mediumBold" color='primary'>{currencyParse(price)}</Typography>

      <AnimatedFavorite onPress={onFavorite} isFavorite={isFavorite} />
    </View>
  )
})

Footer.displayName = 'Footer'



export const ProductComponent = {
  Container,
  Rate,
  Image,
  Title,
  Description,
  Footer
}

