import auth from '@react-native-firebase/auth'

export const firebaseServices = {
  authentication: async ({ email, password }: { email: string, password: string }) => {
    const response = await auth().signInWithEmailAndPassword(email, password)
    return response
  },
  createUser: async ({ email, password }: { email: string, password: string }) => {
    const response = await auth().createUserWithEmailAndPassword(email, password)
    return response
  }
}