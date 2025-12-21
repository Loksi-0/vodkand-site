import { Link, useLocation } from 'react-router-dom'
import { useRouteLoading } from '../LoaderProvider'

const LoadingLink = ({ to, children, ...props }) => {
    const { startLoading } = useRouteLoading()
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