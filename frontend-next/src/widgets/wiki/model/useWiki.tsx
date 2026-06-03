'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { LoaderContext } from '@/features/set-top-loader/context/LoaderContext'
import type { ComponentProps } from 'react'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'
import { AxiosError } from 'axios'
import { useParams, usePathname, useRouter } from 'next/navigation'

export type UseWikiProps = {
  chapter: string
  firstPage: string
}

const useWiki = (props: UseWikiProps) => {
  type Article = {
    icon?: string
    title: string
    description?: string
    content?: string
    link?: string
  }

  type Navigation = {
    icon?: string
    title: string
    page?: string
  }

  const { chapter, firstPage } = props
  const { page } = useParams<{ page: string }>()
  const { stopLoading } = useCustomContext(LoaderContext)
  const router = useRouter()

  const { wikiStore } = useCustomContext(MainContext)

  const pathname = usePathname()

  const listRef = useRef<HTMLUListElement | null>(null)
  const currentRef = useRef<HTMLLIElement | null>(null)

  const [article, setArticle] = useState<Article | null>(null)
  const [navigation, setNavigation] = useState<Navigation[]>([])
  const [isArticleLoading, setIsArticleLoading] = useState(true)
  const [isNavigationLoading, setIsNavigationLoading] = useState(true)

  const controller = new AbortController()

  console.log(page, pathname)

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
          if (e.status === 404 && pathname !== `/${chapter}/${firstPage}`) {
            router.push(`/${chapter}/${firstPage}`)
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
        href={href}
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
