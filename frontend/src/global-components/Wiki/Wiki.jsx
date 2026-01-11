import styles from './Wiki.module.scss'

import cx from 'clsx'

import usePageMetadata from '@/hooks/usePageMetadata.js'
import './markdown.scss'
import Navigation from '@/global-components/Wiki/Navigation/Navigation'
import Article from '@/global-components/Wiki/Article/Article'
import { useContext } from 'react'
import { WikiContext } from '@/context/WikiContext/wikiContext'

const Wiki = () => {
  const { definePageName, chapter, article } = useContext(WikiContext)

  usePageMetadata({
    title: article.title
      ? `${definePageName(chapter)} | ${article.title}`
      : definePageName(chapter),
    ogTitle: article.title,
    ogDescription: article.description,
    ogImage: article.icon
  })

  return (
    <section className={cx(styles.wiki, 'container-big')}>
      <h1 className='visually-hidden'>{definePageName(chapter)}</h1>
      <Navigation />
      <Article />
    </section>
  )
}

export default Wiki
