import { ProductComponent } from '@/components/Product';
import React, { memo, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useProducts } from './view-model';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Product } from '@/interfaces/product';
import { Typography } from '@/components/Typography';
import { BottomSheet } from './components/bottom-sheet';
import { styles } from './styles';
import { useTheme } from '@/hooks/useTheme';

export const ListProducts = () => {
  const {data, loading, addFavorite} = useProducts()
  const color = useTheme('primary')

  const MemorizedProduct = memo(({ item, onFavorite }: { item: Product; onFavorite: () => void }) => (
    <ProductComponent.Container>
      <ProductComponent.Image uri={item.image}/>
      <ProductComponent.Title title={item.title}/>
      <ProductComponent.Description title={item.description}/>
      <ProductComponent.Rate rate={4.3}/>
      <ProductComponent.Footer 
        price={item.price} 
        onFavorite={onFavorite}
        isFavorite={item.isFavorite}
      />
    </ProductComponent.Container>
  ))


  const item: ListRenderItem<Product> = useCallback(({item}) => {
    return (
      <MemorizedProduct
        item={item}
        onFavorite={() => addFavorite(item.id)}
      />
    )
  },[addFavorite])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={color} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList 
        data={data}
        renderItem={item}
        estimatedItemSize={200}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20,  paddingHorizontal: 12}}
        ListEmptyComponent={
          <Typography 
            variant="normalRegular" 
            color='text' 
            style={styles.text}>
              Sem itens a serem exibidos
          </Typography>
        }
      />
      <BottomSheet />
    </View>
  )
}
