import { z } from 'zod'

export const authenticationFormSchema = z.object({
  email: z
  .string({
    required_error: 'O e-mail é obrigatório',
  })
  .email('Preencha com formato de e-mail válido'),
  password: z.string({
    required_error: 'A senha é obrigatória',
  }),
})

export type AuthenticationFormType = z.infer<typeof authenticationFormSchema>
