import { useState, useEffect } from 'react'

const useModal = (props) => {
  const { isOpen, onClose } = props

  const [isClosing, setIsClosing] = useState(false)
  const [focusableElements, setFocusableElements] = useState([])

  const closeModal = () => {
    setIsClosing(true)

    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 190)
  }

  useEffect(() => {
    const rootElement = document.querySelector('#root')

    const focusableElements = rootElement.querySelectorAll(
      `
          [tabindex]:not([tabindex="-1"]),
          a[href]:not([tabindex="-1"]), 
          button:not([tabindex="-1"]), 
          textarea:not([tabindex="-1"]), 
          input:not([tabindex="-1"]), 
          select:not([tabindex="-1"]), 
          summary:not([tabindex="-1"])
        `
    )

    setFocusableElements(focusableElements)
  }, [])

  useEffect(() => {
    const validateKeydown = (event) => {
      if (event.code !== 'Escape') {
        return
      }

      closeModal()
    }

    window.addEventListener('keydown', validateKeydown)
  }, [])

  useEffect(() => {
    focusableElements.forEach((element) => {
      if (isOpen) {
        element.setAttribute('tabindex', -1)
      } else {
        element.setAttribute('tabindex', 0)
      }
    })

    if (!isOpen) {
      document.documentElement.classList.remove('is-lock')
    } else {
      document.documentElement.classList.add('is-lock')
    }
  }, [isOpen])

  return {
    isClosing,
    closeModal
  }
}

export default useModal
