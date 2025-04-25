import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typography } from '@/components/Typography'
import { SafeAreaView } from 'react-native'
import { useAuthentication } from './view-model'
import { Image } from 'expo-image'

import logo from '@/assets/logo.png'
import { styles } from './styles'

export const Authentication = () => {
  const { form, onSubmit } = useAuthentication()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView style={styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Typography variant="mediumBold" color="text">
          Bem vindo
        </Typography>
        <Typography variant="normalMedium" color="info">
          Entre para continuar
        </Typography>

        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="login-email"
              label="E-mail"
              containerStyle={styles.email}
              placeholder="Digite seu e-mail"
              textContentType="emailAddress"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="login-password"
              label="Senha"
              containerStyle={styles.input}
              placeholder="Digite sua senha"
              error={errors.password?.message}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="go"
              returnKeyLabel="Entrar"
            />
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          title="Entrar"
          styles={styles.button}
          loading={isSubmitting}
          testID="login-button"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}


