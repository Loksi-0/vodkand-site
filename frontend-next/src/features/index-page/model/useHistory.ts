'use client'

import { PageType } from './history.data'
import { useCallback, useEffect, useRef, useState } from 'react'

type UseHistoryProps = {
  pages: PageType[]
}

const useHistory = ({ pages }: UseHistoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openGalleryButtonRef = useRef<HTMLButtonElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const paragraphRef = useRef<HTMLParagraphElement | null>(null)

  const [currentPage, setCurrentPage] = useState<PageType>(pages[0])
  const [nextImage, setNextImage] = useState(pages[1].image)
  const [opacity, setOpacity] = useState(1)

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 767 : false

  const animateContent = (updateContent: () => void) => {
    const content = contentRef.current
    const paragraph = paragraphRef.current

    if (!content || !paragraph) {
      return
    }

    const startHeight = content.clientHeight
    const paragraphStartHeight = paragraph.clientHeight
    content.style.height = `${String(startHeight)}px`

    content.getBoundingClientRect()
    paragraph.getBoundingClientRect()

    updateContent()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const paragraphEndHeight = paragraph.clientHeight
        const endHeight =
          startHeight + (paragraphEndHeight - paragraphStartHeight)

        content.style.height = `${String(endHeight)}px`
      })
    })

    setTimeout(() => {
      content.style.height = 'auto'
    }, 300)
  }

  const back = useCallback(() => {
    setNextImage(pages[pages.indexOf(currentPage) - 1].image)
    setOpacity(0)

    setTimeout(() => {
      animateContent(() => {
        setCurrentPage(pages[pages.indexOf(currentPage) - 1])
      })
      setOpacity(1)
    }, 200)
  }, [pages, currentPage])

  const forward = useCallback(() => {
    setNextImage(pages[pages.indexOf(currentPage) + 1].image)
    setOpacity(0)

    setTimeout(() => {
      animateContent(() => {
        setCurrentPage(pages[pages.indexOf(currentPage) + 1])
      })
      setOpacity(1)
    }, 200)
  }, [pages, currentPage])

  return {
    isModalOpen,
    setIsModalOpen,
    nextImage,
    opacity,
    isMobile,
    back,
    forward,
    openGalleryButtonRef,
    contentRef,
    paragraphRef,
    currentPage
  }
}

export default useHistory
