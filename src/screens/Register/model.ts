import { UseFormReturn } from "react-hook-form"
import { AuthenticationFormType } from "./schemas"

export interface RegisterModel {
  form: UseFormReturn<AuthenticationFormType, any, any>
  onSubmit: (data: AuthenticationFormType) => Promise<void>
}