import { Context } from '@/main'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const useHero = () => {
  const { userStore } = useContext(Context)

  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 767)

  const onClick = () => {
    userStore.setCart('pass')

    navigate('/payment')
  }

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  })

  useEffect(() => {
    setIsMobile(window.innerWidth < 767)
  }, [width])

  return { isMobile, onClick, loading: userStore.isLoading }
}

export default useHero
