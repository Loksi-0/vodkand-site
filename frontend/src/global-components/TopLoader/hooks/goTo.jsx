import { useNavigate } from "react-router"
import { useRouteLoading } from "../LoaderProvider"


const navigate = useNavigate()
const { setLoading } = useRouteLoading()

const goTo = (path) => {
    setLoading(true)
    navigate(path)
}

export default goTo