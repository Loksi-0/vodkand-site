'use client'

import { useEffect, useRef } from 'react'

const useNotFound = () => {
  const logoRef = useRef<HTMLImageElement | null>(null)
  const mainRef = useRef<HTMLElement | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)

  const position = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 2, y: 2 })

  useEffect(() => {
    const logo = logoRef.current
    const header = headerRef.current
    const main = mainRef.current

    if (!logo || !header || !main) {
      return
    }

    const logoWidth = logo.clientWidth
    const headerHeight = header.clientHeight

    const boundingClientRect = logo.getBoundingClientRect()

    position.current.x = boundingClientRect.x
    position.current.y = boundingClientRect.y - headerHeight

    logo.style.top = `${String(position.current.y)}px`
    logo.style.left = `${String(position.current.x)}px`

    const { clientWidth, clientHeight } = main

    let logoHeight: number
    setTimeout(() => {
      logoHeight = logo.clientHeight
    }, 50)

    const animate = () => {
      position.current.x += velocity.current.x
      position.current.y += velocity.current.y

      if (
        position.current.x <= 0 ||
        position.current.x + logoWidth >= clientWidth
      ) {
        velocity.current.x *= -1
      }

      if (
        position.current.y <= 0 ||
        position.current.y + logoHeight >= clientHeight
      ) {
        velocity.current.y *= -1
      }

      logo.style.top = `${String(position.current.y)}px`
      logo.style.left = `${String(position.current.x)}px`

      requestAnimationFrame(animate)
    }

    setTimeout(animate, 4200)
  }, [])

  return {
    logoRef,
    mainRef,
    headerRef
  }
}

export default useNotFound
