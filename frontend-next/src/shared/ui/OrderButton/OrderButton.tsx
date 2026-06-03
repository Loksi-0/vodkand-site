'use client'

import Button from '@/shared/ui/Button'
import useOrderButton from '@/shared/ui/OrderButton/useOrderButton'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type OrderButtonProps = PropsWithChildren<{
  product: string
  isBig?: boolean
}>

const OrderButton = observer((props: OrderButtonProps) => {
  const { children, product, isBig } = props

  const { onClick, isLoading } = useOrderButton(product)

  return (
    <Button
      color='accent'
      onClick={onClick}
      disabled={isLoading}
      isBig={isBig}
    >
      {children}
    </Button>
  )
})

export default OrderButton
