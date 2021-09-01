import type { TResponse } from './_type'
import axios from 'axios';
/**
 * @generics T 返り値の型
 * @generics B bodyの型
 */
export async function baseAPI<
  T extends Record<string, unknown> | Array<Record<string, unknown>> | void,
  B = Record<string, any>
>({
  endpoint,
  options = { auth: true },
  method = 'GET',
  body,
}: {
  endpoint: string
  options?: { auth: boolean; timeout?: number }
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: B
}): Promise<T> {

  const controller = new AbortController()
  const timeoutId = setTimeout(() => {
    controller.abort()
  }, options.timeout || 10 * 1000) // デフォルトでは10秒でタイムアウト

  const res = await axios({
    method : method,
    url    : `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
    data   : body 
  }).finally(() => clearTimeout(timeoutId))


  if (res.statusText !== 'OK') {
    let err: TResponse
    try {
      err = await res.data
    } catch {
      err = {
        statusCode: res.status,
        message: res.statusText,
      }
    }
    throw err
  }
  try {
    return await res.data
  } catch {
    return {} as T
  }
}

