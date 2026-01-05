import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useRouteLoading } from './LoaderProvider'

const TrackLocation = () => {
  const location = useLocation()
  const { setLoading } = useRouteLoading()

  useEffect(() => {
    setLoading(false)
  }, [location.pathname])
}

export default TrackLocation
