import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typography } from '@/components/Typography'
import { Pressable, SafeAreaView } from 'react-native'
import { useRegister } from './view-model'
import { Image } from 'expo-image'

import logo from '@/assets/logo.png'
import { styles } from './styles'

export const Register = () => {
  const { form, onSubmit } = useRegister()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView style={styles.container}>
        <Typography variant="mediumBold" color="text">
          Cadastrar conta
        </Typography>
        <Typography variant="normalMedium" color="info">
          Preencha os campos abaixo para criar uma conta
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
          title="Cadastrar"
          styles={styles.button}
          loading={isSubmitting}
          testID="login-button"
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}


