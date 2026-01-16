import { useContext, useEffect } from 'react'
import { MainContext } from '@/app/context/MainContext'

const useApp = () => {
  const { userStore } = useContext(MainContext)

  useEffect(() => {
    userStore.initAuth()
  }, [])

  let savedTheme = localStorage.getItem('theme')

  if (!savedTheme) {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    localStorage.setItem(
      'theme',
      prefersDark ? 'dark' : import.meta.env.VITE_INITIAL_THEME
    )
    savedTheme = prefersDark ? 'dark' : import.meta.env.VITE_INITIAL_THEME
  }

  document.documentElement.setAttribute(
    'theme',
    savedTheme === 'dark' ? 'dark' : 'light'
  )
}

export default useApp
