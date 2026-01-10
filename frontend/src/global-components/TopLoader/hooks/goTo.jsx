import { useNavigate } from 'react-router'
import { useRouteLoading } from '../LoaderProvider'

const GoTo = (path) => {
  const navigate = useNavigate()
  const { setLoading } = useRouteLoading()

  setLoading(true)
  navigate(path)
}

export default GoTo
