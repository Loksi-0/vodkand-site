import styles from './Wiki.module.scss'

import cx from 'clsx'

import usePageMetadata from '@/shared/hooks/usePageMetadata'
import Navigation from './Navigation'
import Article from './Article'
import { useContext } from 'react'
import { WikiContext } from '../model/wikiContext'

import './markdown.scss'

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
