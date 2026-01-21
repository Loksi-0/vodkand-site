import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'

const useModalContent = ({ page }) => {
  const { uiStore } = useContext(MainContext)

  const listRef = useRef(null)
  const expandedRef = useRef(null)
  const activeIndexRef = useRef(0)

  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isImageClosing, setIsImageClosing] = useState(false)
  const [shadowPosition, setShadowPosition] = useState('top')

  const openImage = (index) => {
    activeIndexRef.current = index
    setIsExpanded(true)
  }

  const closeImage = () => {
    setIsImageClosing(true)

    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsImageClosing(false)
        setIsExpanded(false)
        setIsZoomed(false)
      }, 190)
    })
  }

  const zoomImage = (event) => {
    if (isZoomed) {
      return setIsZoomed((prev) => !prev)
    }

    const expanded = expandedRef.current

    const cursorX = event.clientX
    const cursorY = event.clientY

    expanded.style.transformOrigin = `${cursorX}px ${cursorY}px`

    setIsZoomed((prev) => !prev)
  }

  useEffect(() => {
    const onMove = (event) => {
      const expanded = expandedRef.current

      const cursorX = event.clientX
      const cursorY = event.clientY

      expanded.style.transformOrigin = `${cursorX}px ${cursorY}px`
    }

    const isTouchDevice = !!(
      'ontouchstart' in window || navigator.maxTouchPoints
    )

    if (isZoomed && !isTouchDevice) {
      window.addEventListener('mousemove', onMove)
    }

    return () => window.removeEventListener('mousemove', onMove)
  }, [isZoomed])

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await uiStore.getGallery(page)

        setIsLoading(false)
        setImages(response.data)
      } catch (e) {
        setIsLoading(false)
        toast.error(e.response?.data?.message ?? e.message)
      }
    }

    getImages()
  }, [])

  useLayoutEffect(() => {
    const onScroll = () => {
      const element = listRef.current

      if (element.scrollTop < 20) {
        setShadowPosition('top')
        return
      }

      if (
        element.scrollTop >
        element.scrollHeight - element.clientHeight - 20
      ) {
        setShadowPosition('bottom')
        return
      }

      setShadowPosition('both')
    }

    listRef.current.addEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const isShadow = listRef.current.scrollHeight > listRef.current.clientHeight

    setShadowPosition(isShadow ? 'top' : 'none')
  }, [images])

  return {
    isLoading,
    isExpanded,
    isImageClosing,
    shadowPosition,
    openImage,
    closeImage,
    activeIndexRef,
    images,
    listRef,
    zoomImage,
    isZoomed,
    expandedRef
  }
}

export default useModalContent
