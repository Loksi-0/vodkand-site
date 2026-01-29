import { useState, useEffect } from 'react'

type UseModalProps = {
  isOpen: boolean
  onClose: () => void
}

const useModal = (props: UseModalProps) => {
  const { isOpen, onClose } = props

  const [isClosing, setIsClosing] = useState(false)
  const [focusableElements, setFocusableElements] = useState<HTMLElement[]>([])

  const closeModal = () => {
    setIsClosing(true)

    setTimeout(() => {
      onClose()
      setIsClosing(false)
    }, 190)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const rootElement = document.querySelector('#root')!

    const focusableElements = rootElement.querySelectorAll<HTMLElement>(
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

    setFocusableElements(Array.from(focusableElements))
  }, [])

  useEffect(() => {
    const validateKeydown = (event: KeyboardEvent) => {
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
        element.setAttribute('tabindex', '-1')
      } else {
        element.setAttribute('tabindex', '0')
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
