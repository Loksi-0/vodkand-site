import { useEffect } from 'react'
import { useLocation } from 'react-router'

function usePageMetadata(props) {
    const location = useLocation()

    const {
        title = '',
        ogTitle = '',
        description = '',
        ogDescription = '',
        ogImage = '',
        type = 'website',
        url = location.href,
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

        setMetaTag('name', 'robots', [ index ? 'index' : 'noindex', follow ? 'follow' : 'nofollow'].join(' '))

        setLinkTag('canonical', url)
    }, [title, description, ogImage, type, url])
}

function setMetaTag(attr, name, content) {
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

function setLinkTag(rel, href) {
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