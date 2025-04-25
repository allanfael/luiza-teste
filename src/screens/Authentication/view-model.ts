import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'

import { authenticationFormSchema, AuthenticationFormType } from './schemas'
import { firebaseServices } from '@/services/firebase'
import { userInvalid } from '@/utils/firebaseErrors'
import { useNavigation } from '@react-navigation/native'
import { ROUTES } from '@/utils/routes'
import { AuthenticationModel } from './model'
import { useUserStore } from '@/store/user'


export const useAuthentication = (): AuthenticationModel => {
  const { save } = useUserStore()

  const { navigate } = useNavigation()

  const form = useForm<AuthenticationFormType>({
    resolver: zodResolver(authenticationFormSchema),
  })

  const { setError } = form

  const onSubmit = async (data: AuthenticationFormType) => {
    try {
      const response = await firebaseServices.authentication(data)

      save(response.user.email || '')

      navigate(ROUTES.LIST_PRODUCTS as never)
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

  const register = () => navigate(ROUTES.REGISTER as never)

  return {
    form,
    onSubmit,
    register
  }
}
