export interface HttpRequest<T = any, P = any> {
  body?: T
  params?: P
}

export interface HttpResponse<T = any> {
  statusCode: number
  body: T
}
