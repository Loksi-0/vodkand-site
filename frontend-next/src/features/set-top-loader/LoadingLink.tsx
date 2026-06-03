'use client'

import Link from 'next/link'
import { LoaderContext } from './context/LoaderContext'
import { PropsWithChildren } from 'react'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { usePathname } from 'next/navigation'

type LoadingLinkProps = PropsWithChildren<{
  to: string
  className: string
}>

const LoadingLink = ({ to, children, ...props }: LoadingLinkProps) => {
  const { startLoading } = useCustomContext(LoaderContext)
  const pathname = usePathname()

  const handleClick = () => {
    if (pathname !== to) {
      startLoading()
    }
  }

  return (
    <Link
      href={to}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

export default LoadingLink
