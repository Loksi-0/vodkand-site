import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { useRouteLoading } from '../../global-components/TopLoader/LoaderProvider'
import { Context } from '@/main'

const useWiki = (props) => {
  const { chapter, firstPage } = props
  const { page } = useParams()
  const { stopLoading } = useRouteLoading()
  const navigate = useNavigate()

  const { wikiStore } = useContext(Context)

  const location = useLocation()

  const listRef = useRef(null)
  const currentRef = useRef(null)

  const navSkeletonCount = 4

  const navWidths = useMemo(
    () =>
      Array.from({ length: navSkeletonCount }, () =>
        Math.floor(Math.random() * (200 - 90) + 90)
      ),
    []
  )

  const [article, setArticle] = useState({
    icon: 'loading',
    title: null,
    description: null
  })
  const [navigation, setNavigation] = useState(
    Array.from({ length: navSkeletonCount }, () => {
      return {}
    })
  )
  const [isArticleLoading, setIsArticleLoading] = useState(true)
  const [isNavigationLoading, setIsNavigationLoading] = useState(true)

  const controller = new AbortController()

  useLayoutEffect(() => {
    if (!listRef.current || !currentRef.current) {
      return
    }

    const current = currentRef.current
    const list = listRef.current

    const offset =
      current.offsetLeft - list.clientWidth / 2 + current.clientWidth / 2

    list.scrollTo({ left: offset })
  }, [isNavigationLoading])

  useEffect(() => {
    const getArticle = async () => {
      try {
        const response = await wikiStore.getArticle(
          chapter,
          page,
          controller.signal
        )

        setArticle(response.data)
      } catch (e) {
        if (
          e.status === 404 &&
          location.pathname !== `/${chapter}/${firstPage}`
        ) {
          navigate(`/${chapter}/${firstPage}`)
          return
        }

        if (e.code === 'ERR_CANCELED') {
          return
        }

        setArticle({ title: e.message })
      } finally {
        setIsArticleLoading(false)
        stopLoading()
      }
    }

    const getNavigation = async () => {
      try {
        const response = await wikiStore.getNavigation(chapter)

        setNavigation(response.data)
      } catch (e) {
        setNavigation([{ title: e.message }])
      } finally {
        setIsNavigationLoading(false)
      }
    }

    getArticle()
    getNavigation()

    return () => controller.abort()
  }, [page])

  const definePageName = (name) => {
    switch (name) {
      case 'plugins':
        return 'Плагины'
      case 'rules':
        return 'Правила'
      case 'legal':
        return 'Правовые сведения'
    }
  }

  const modifyLink = ({ href, children }) => {
    if (!href) {
      return children
    }

    return (
      <Link
        className='link'
        to={href}
      >
        {children}
      </Link>
    )
  }

  const modifiedContent = useMemo(() => {
    if (!article?.content) {
      return ''
    }

    return article.content.replace('{{currentYear}}', new Date().getFullYear())
  }, [article?.content])

  return {
    article,
    definePageName,
    chapter,
    listRef,
    page,
    modifyLink,
    modifiedContent,
    navWidths,
    navigation,
    currentRef,
    isArticleLoading,
    isNavigationLoading
  }
}

export default useWiki
