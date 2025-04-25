import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'

import { authenticationFormSchema, AuthenticationFormType } from './schemas'
import { firebaseServices } from '@/services/firebase'
import { userInvalid } from '@/utils/firebaseErrors'
import { useNavigation } from '@react-navigation/native'
import { RegisterModel } from './model'

export const useRegister = (): RegisterModel => {
  const { goBack } = useNavigation()

  const form = useForm<AuthenticationFormType>({
    resolver: zodResolver(authenticationFormSchema),
  })

  const { setError } = form

  const onSubmit = async (data: AuthenticationFormType) => {
    try {
      await firebaseServices.createUser(data)
      
      goBack()

    } catch (e) {
      const error = e as FirebaseError

      const message = error.code

      if (userInvalid.includes(message)) {
        setError('password', {
          message: 'Usuário ou senha inválido',
        })

        return
      }

      setError('email', {
        message,
      })
    }
  }

  return {
    form,
    onSubmit,
  }
}
