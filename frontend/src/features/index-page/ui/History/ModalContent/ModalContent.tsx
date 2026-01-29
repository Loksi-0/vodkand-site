import styles from './ModalContent.module.scss'

import cx from 'clsx'

import { memo } from 'react'
import Button from '@/shared/ui/Button'
import Preloader from '@/shared/ui/Preloader'
import useModalContent from '@/features/index-page/model/useModalContent'

type ModalContentProps = {
  page?: string
  version?: string
  color: string
  color10: string
}

const ModalContent = (props: ModalContentProps) => {
  const { page, version, color, color10 } = props

  const {
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
  } = useModalContent({ page })

  return (
    <div className={styles.modal}>
      {isExpanded && (
        <div
          className={cx(styles.expanded, {
            [styles.closing]: isImageClosing,
            [styles.zoomed]: isZoomed
          })}
          ref={expandedRef}
          onClick={closeImage}
        >
          <div className={styles.expanded__imageWrapper}>
            <img
              className={cx(styles.expanded__image, {
                [styles.zoomed]: isZoomed
              })}
              src={images[activeIndexRef.current]}
              alt=''
              draggable='false'
              onClick={(e) => {
                e.stopPropagation()

                zoomImage(e)
              }}
            />
            <div
              className={styles.expanded__buttonWrapper}
              onClick={closeImage}
            >
              <Button
                color='icon'
                className={styles.expanded__button}
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
            </div>
          </div>
        </div>
      )}
      <a
        className={styles.modal__link}
        href={`/uploads/worlds/${String(page)}.zip`}
        download={`${String(page)}_${String(version)}.zip`}
      >
        <Button
          color='light'
          className={styles.modal__button}
          style={{
            backgroundColor: color10,
            borderColor: color
          }}
          tabindex={-1}
        >
          Скачать мир сервера
        </Button>
      </a>
      {isLoading && (
        <div className={styles.preloader}>
          <Preloader size={50} />
        </div>
      )}
      <div className={styles.images}>
        <ul
          className={cx(styles.images__list, styles.list)}
          ref={listRef}
        >
          {images.map((element, index) => {
            return (
              <li
                key={index}
                className={styles.list__item}
              >
                <button
                  className={styles.list__button}
                  type='button'
                  onClick={() => {
                    openImage(index)
                  }}
                >
                  <img
                    className={styles.list__image}
                    src={element}
                    alt=''
                    draggable='false'
                  />
                </button>
              </li>
            )
          })}
        </ul>
        <div
          className={cx(styles.images__shadow, styles.images__shadowTop, {
            [styles.appeared]:
              shadowPosition === 'bottom' || shadowPosition === 'both'
          })}
        ></div>
        <div
          className={cx(styles.images__shadow, styles.images__shadowBottom, {
            [styles.appeared]:
              shadowPosition === 'top' || shadowPosition === 'both'
          })}
        ></div>
      </div>
    </div>
  )
}

export default memo(ModalContent)
