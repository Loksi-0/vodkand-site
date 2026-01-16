import { useCallback, useMemo, useRef, useState } from 'react'

const useHistory = ({ pages }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openGalleryButtonRef = useRef(null)
  const contentRef = useRef(null)
  const paragraphRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(pages[0])
  const [nextImage, setNextImage] = useState(pages[1].image)
  const [opacity, setOpacity] = useState(1)
  const isMobile = useMemo(() => window.innerWidth < 767, [])

  const animateContent = (updateContent) => {
    const content = contentRef.current
    const paragraph = paragraphRef.current
    if (!content || !paragraph) {
      return
    }

    const startHeight = content.clientHeight
    const paragraphStartHeight = paragraph.clientHeight
    content.style.height = `${startHeight}px`

    content.getBoundingClientRect()
    paragraph.getBoundingClientRect()

    updateContent()

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const paragraphEndHeight = paragraph.clientHeight
        const endHeight =
          startHeight + (paragraphEndHeight - paragraphStartHeight)

        content.style.height = `${endHeight}px`
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
  }, [currentPage])

  const forward = useCallback(() => {
    setNextImage(pages[pages.indexOf(currentPage) + 1].image)
    setOpacity(0)

    setTimeout(() => {
      animateContent(() => {
        setCurrentPage(pages[pages.indexOf(currentPage) + 1])
      })
      setOpacity(1)
    }, 200)
  }, [currentPage])

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
