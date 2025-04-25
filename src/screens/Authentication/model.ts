import { UseFormReturn } from "react-hook-form"
import { AuthenticationFormType } from "./schemas"

export interface AuthenticationModel {
  form: UseFormReturn<AuthenticationFormType, any, any>
  onSubmit: (data: AuthenticationFormType) => Promise<void>
  register: () => void
}