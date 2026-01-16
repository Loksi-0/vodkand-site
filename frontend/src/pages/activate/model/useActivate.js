import { useContext, useEffect, useState } from 'react'
import { MainContext } from '@/app/context/MainContext'
import { useLocation } from 'react-router'

const useActivate = () => {
  const location = useLocation()

  const { userStore } = useContext(MainContext)

  const [title, setTitle] = useState('Выполняется активация...')
  const [status, setStatus] = useState('pending')

  useEffect(() => {
    const activate = async () => {
      try {
        const activationLink = new URLSearchParams(location.search).get('link')

        await userStore.activate(activationLink)

        localStorage.setItem('isActivated', true)
        setTitle('Активация прошла успешно')
        setStatus('ok')
      } catch (e) {
        setTitle(e.message)
        setStatus('error')
      }
    }

    activate()
  }, [])

  return {
    title,
    status
  }
}

export default useActivate
