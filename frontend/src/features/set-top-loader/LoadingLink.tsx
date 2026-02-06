import { Link, useLocation } from 'react-router-dom'
import { LoaderContext } from './context/LoaderContext'
import { PropsWithChildren } from 'react'
import useCustomContext from '@/shared/hooks/useCustomContext'

type LoadingLinkProps = PropsWithChildren<{
  to: string
  className: string
}>

const LoadingLink = ({ to, children, ...props }: LoadingLinkProps) => {
  const { startLoading } = useCustomContext(LoaderContext)
  const loading = useLocation()

  const handleClick = () => {
    if (loading.pathname !== to) {
      startLoading()
    }
  }

  return (
    <Link
      to={to}
      {...props}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}

export default LoadingLink
