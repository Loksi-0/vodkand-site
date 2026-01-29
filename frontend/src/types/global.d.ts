export {}

declare global {
  type ApiError = {
    message: string
    status: number
    errors?: string[]
  }
}
