export type CreateOrderBody = {
  product: string
}

export type HandleNotificationBody = {
  object: {
    id: string
    metadata: {
      userId: string
    }
    status: 'succeeded' | 'canceled'
    paid: boolean
  }
}
