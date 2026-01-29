import { useEffect } from 'react'

type PageMetadataProps = {
  title?: string
  ogTitle?: string
  description?: string
  ogDescription?: string
  ogImage?: string
  type?:
    | 'website'
    | 'article'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_station'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'
    | 'book'
  url?: string
  keywords?: string
  index?: boolean
  follow?: boolean
}

const usePageMetadata = (props: PageMetadataProps) => {
  const {
    title = '',
    ogTitle = '',
    description = '',
    ogDescription = '',
    ogImage = '',
    type = 'website',
    url = window.location.href,
    keywords = '',
    index = true,
    follow = true
  } = props

  useEffect(() => {
    document.title = title || document.title

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)

    setMetaTag('property', 'og:title', ogTitle)
    setMetaTag('property', 'og:description', ogDescription)
    setMetaTag('property', 'og:image', ogImage)
    setMetaTag('property', 'og:type', type)
    setMetaTag('property', 'og:url', url)

    setMetaTag('name', 'twitter:title', ogTitle)
    setMetaTag('name', 'twitter:description', ogDescription)
    setMetaTag('name', 'twitter:image', ogImage)

    setMetaTag(
      'name',
      'robots',
      [index ? 'index' : 'noindex', follow ? 'follow' : 'nofollow'].join(' ')
    )

    setLinkTag('canonical', url)
  }, [
    title,
    description,
    ogImage,
    type,
    url,
    keywords,
    ogTitle,
    ogDescription,
    index,
    follow
  ])
}

const setMetaTag = (attr: string, name: string, content: string) => {
  if (!content) {
    return
  }

  const selector = `meta[${attr}="${name}"]`
  let element = document.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, name)
    document.head.appendChild(element)
  }

  element.content = content
}

const setLinkTag = (rel: string, href: string) => {
  if (!href) {
    return
  }

  let element = document.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }

  element.href = href
}

export default usePageMetadata
