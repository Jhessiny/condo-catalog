import { type HttpRequest, type HttpResponse } from './http'

export interface Controller<T = any, P = any> {
  handle: (request: HttpRequest<T, P>) => Promise<HttpResponse>
}
