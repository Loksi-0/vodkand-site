import { useEffect } from 'react'
import { MainContext } from '@/app/context/MainContext'
import useCustomContext from '@/shared/hooks/useCustomContext'

const useApp = () => {
  const { userStore } = useCustomContext(MainContext)

  useEffect(() => {
    void userStore.initAuth()
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
