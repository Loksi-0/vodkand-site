'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import type { MouseEvent } from 'react'
import { toast } from 'sonner'
import useCustomContext from '@/shared/hooks/useCustomContext'
import axios from 'axios'

const useModalContent = ({ page }: { page?: string }) => {
  type ShadowPositionType = 'top' | 'bottom' | 'both' | 'none'

  const { uiStore } = useCustomContext(MainContext)

  const listRef = useRef<HTMLUListElement | null>(null)
  const expandedRef = useRef<HTMLDivElement | null>(null)
  const activeIndexRef = useRef(0)

  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isImageClosing, setIsImageClosing] = useState(false)
  const [shadowPosition, setShadowPosition] =
    useState<ShadowPositionType>('top')

  const openImage = (index: number) => {
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

  const zoomImage = (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation()

    if (isZoomed) {
      setIsZoomed((prev) => !prev)
      return
    }

    const expanded = expandedRef.current

    if (!expanded) {
      return
    }

    const cursorX = event.clientX
    const cursorY = event.clientY

    expanded.style.transformOrigin = `${String(cursorX)}px ${String(cursorY)}px`

    setIsZoomed((prev) => !prev)
  }

  useEffect(() => {
    const onMove = (event: globalThis.MouseEvent) => {
      const expanded = expandedRef.current

      if (!expanded) {
        return
      }

      const cursorX = event.clientX
      const cursorY = event.clientY

      expanded.style.transformOrigin = `${String(cursorX)}px ${String(cursorY)}px`
    }

    const isTouchDevice = !!(
      'ontouchstart' in window || navigator.maxTouchPoints
    )

    if (isZoomed && !isTouchDevice) {
      window.addEventListener('mousemove', onMove)
    }

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [isZoomed])

  useEffect(() => {
    const getImages = async () => {
      try {
        if (!page) {
          return
        }

        const response = await uiStore.getGallery(page)

        setIsLoading(false)
        setImages(response.data)
      } catch (e) {
        setIsLoading(false)

        if (axios.isAxiosError<ApiError>(e)) {
          toast.error(e.response?.data.message ?? e.message)
        }
      }
    }

    void getImages()
  }, [])

  useLayoutEffect(() => {
    const onScroll = () => {
      const element = listRef.current

      if (!element) {
        return
      }

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

    if (!listRef.current) {
      return
    }

    listRef.current.addEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const listElement = listRef.current

    if (!listElement) {
      return
    }

    const isShadow = listElement.scrollHeight > listElement.clientHeight

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
