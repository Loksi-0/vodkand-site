import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { LoaderContext } from '@/features/set-top-loader/context/LoaderContext'
import type { ComponentProps } from 'react'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { AxiosError } from 'axios'

export type UseWikiProps = {
  chapter: string
  firstPage: string
}

const useWiki = (props: UseWikiProps) => {
  type ArticleType = {
    icon?: string
    title: string
    description?: string
    content?: string
    link?: string
  }

  type NavigationType = {
    icon?: string
    title: string
    page?: string
  }

  const { chapter, firstPage } = props
  const { page } = useParams()
  const { stopLoading } = useCustomContext(LoaderContext)
  const navigate = useNavigate()

  const { wikiStore } = useCustomContext(MainContext)

  const location = useLocation()

  const listRef = useRef<HTMLUListElement | null>(null)
  const currentRef = useRef<HTMLLIElement | null>(null)

  const [article, setArticle] = useState<ArticleType | null>(null)
  const [navigation, setNavigation] = useState<NavigationType[]>([])
  const [isArticleLoading, setIsArticleLoading] = useState(true)
  const [isNavigationLoading, setIsNavigationLoading] = useState(true)

  const controller = new AbortController()

  useLayoutEffect(() => {
    const current = currentRef.current
    const list = listRef.current

    if (!current || !list) {
      return
    }

    const offset =
      current.offsetLeft - list.clientWidth / 2 + current.clientWidth / 2

    list.scrollTo({ left: offset })
  }, [isNavigationLoading])

  useEffect(() => {
    const getArticle = async () => {
      try {
        if (!page) {
          return
        }

        const response = await wikiStore.getArticle(
          chapter,
          page,
          controller.signal
        )

        setArticle(response.data)
      } catch (e) {
        if (e instanceof AxiosError) {
          if (
            e.status === 404 &&
            location.pathname !== `/${chapter}/${firstPage}`
          ) {
            void navigate(`/${chapter}/${firstPage}`)
            return
          }

          if (e.code === 'ERR_CANCELED') {
            return
          }

          setArticle({ title: e.message })
        }
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
        if (e instanceof AxiosError) {
          setNavigation([{ title: e.message }])
        }
      } finally {
        setIsNavigationLoading(false)
      }
    }

    void getArticle()
    void getNavigation()

    return () => {
      controller.abort()
    }
  }, [page])

  const definePageName = (name: string) => {
    switch (name) {
      case 'plugins':
        return 'Плагины'
      case 'rules':
        return 'Правила'
      case 'legal':
        return 'Правовые сведения'
    }
  }

  const modifyLink = ({ href, children }: ComponentProps<'a'>) => {
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

    return article.content.replace(
      '{{currentYear}}',
      new Date().getFullYear().toString()
    )
  }, [article?.content])

  return {
    article,
    definePageName,
    chapter,
    listRef,
    page,
    modifyLink,
    modifiedContent,
    navigation,
    currentRef,
    isArticleLoading,
    isNavigationLoading
  }
}

export type WikiContextValue = ReturnType<typeof useWiki>

export default useWiki
