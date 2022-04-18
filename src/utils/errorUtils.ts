export function unauthorized(message: string) {
  return { statusCode: 401, message }
}

export function notFound(message: string) {
  return { statusCode: 404, message }
}

export function conflict(message: string) {
  return { statusCode: 409, message }
}

export function unprocessableEntity(message: string) {
  return { statusCode: 422, message}
}