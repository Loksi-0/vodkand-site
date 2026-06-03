'use client'

import styles from './Modal.module.scss'

import cx from 'clsx'

import { PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import Button from '@/shared/ui/Button'
import useModal from '../model/useModal'

type ModalProps = PropsWithChildren<{
  isOpen: boolean
  onClose: () => void
  title: string
}>

const Modal = (props: ModalProps) => {
  const { isOpen, onClose, children, title } = props

  const { isClosing, closeModal } = useModal({ isOpen, onClose })

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div
      className={cx(styles.modal, { [styles.isClosing]: isClosing })}
      onClick={closeModal}
    >
      <div className={cx(styles.modal__container, 'container')}>
        <div
          className={styles.modal__content}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <header className={styles.modal__header}>
            <h3 className='h3'>{title}</h3>
            <Button
              color='icon'
              className={styles.modal__closeButton}
              onClick={closeModal}
            >
              <svg
                width='800px'
                height='800px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
                  fill='#0F1729'
                />
              </svg>
            </Button>
          </header>
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
