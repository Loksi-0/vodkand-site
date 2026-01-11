import { useEffect, useRef } from 'react'

const useNotFound = () => {
  const logoRef = useRef(null)
  const mainRef = useRef(null)
  const headerRef = useRef(null)

  const position = useRef({ x: 0, y: 0 })
  const velocity = useRef({ x: 2, y: 2 })

  useEffect(() => {
    const logo = logoRef.current
    const logoWidth = logo.clientWidth
    const header = headerRef.current
    const headerHeight = header.clientHeight
    const main = mainRef.current

    const boundingClientRect = logo.getBoundingClientRect()

    position.current.x = boundingClientRect.x
    position.current.y = boundingClientRect.y - headerHeight

    logo.style.top = `${position.current.y}px`
    logo.style.left = `${position.current.x}px`

    const { clientWidth, clientHeight } = main

    let logoHeight
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

      logo.style.top = `${position.current.y}px`
      logo.style.left = `${position.current.x}px`

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
