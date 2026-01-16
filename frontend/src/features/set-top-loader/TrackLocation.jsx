import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useRouteLoading } from '../LoaderProvider'

const TrackLocation = () => {
  const location = useLocation()
  const { setIsLoading } = useRouteLoading()

  useEffect(() => {
    setIsLoading(false)
  }, [location.pathname])
}

export default TrackLocation
