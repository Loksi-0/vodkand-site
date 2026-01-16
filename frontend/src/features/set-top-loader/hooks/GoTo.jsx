import { useNavigate } from 'react-router'
import { useRouteLoading } from '../LoaderProvider'

const GoTo = (path) => {
  const navigate = useNavigate()
  const { setIsLoading } = useRouteLoading()

  setIsLoading(true)
  navigate(path)
}

export default GoTo
