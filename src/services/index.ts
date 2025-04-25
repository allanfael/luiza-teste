import axios, { AxiosRequestConfig } from 'axios'

import ResponseError from './ResponseError'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  withCredentials: true,
})

interface Params {
  data?: object
  config?: AxiosRequestConfig
  url: string
}

api.interceptors.request.use(
  async (request) => {
    console.log(
      `\n\n📄 | BASE URL\n${request.baseURL || ''}\n\n📄 | ENDPOINT\n${
        request.url
      }\n\n📄 | HEADERS\n${JSON.stringify(request.headers)}\n\n📄 | BODY\n${
        JSON.stringify(request.data) || ''
      }\n\n`,
    )

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)

export async function get<R>(data: Params) {
  try {
    const response = await api.get<R>(data.url, {
      ...data.config,
      headers: {
        ...data.config?.headers,
      },
    })

    return response.data
  } catch (error: unknown) {
    throw new ResponseError(error)
  }
}

export async function post({ url, data, config }: Params) {
  try {
    const response = await api.post(
      url,
      {
        ...data,
      },
      {
        ...config,
        headers: {
          ...config?.headers,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) throw new ResponseError(error)
    throw new Error('Não foi possível conectar ao servidor')
  }
}

export default api
