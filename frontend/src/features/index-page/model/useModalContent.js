import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { toast } from 'sonner'

const useModalContent = ({ page }) => {
  const { uiStore } = useContext(MainContext)

  const listRef = useRef(null)
  const activeIndexRef = useRef(0)

  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSliderClosing, setIsSliderClosing] = useState(false)
  const [shadowPosition, setShadowPosition] = useState('top')

  const openSlider = (index) => {
    activeIndexRef.current = index
    setIsExpanded(true)
  }

  const closeSlider = () => {
    setIsSliderClosing(true)

    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsSliderClosing(false)
        setIsExpanded(false)
      }, 190)
    })
  }

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

      if (element.scrollTop < 10) {
        setShadowPosition('top')
        return
      }

      if (
        element.scrollTop >
        element.scrollHeight - element.clientHeight - 10
      ) {
        setShadowPosition('bottom')
        return
      }

      setShadowPosition('center')
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
    isSliderClosing,
    shadowPosition,
    openSlider,
    closeSlider,
    activeIndexRef,
    images,
    listRef
  }
}

export default useModalContent
