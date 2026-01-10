import styles from './ModalContent.module.scss'

import cx from 'clsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import {
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import Button from '@/global-components/Button/Button'
import { Context } from '@/main'
import Preloader from '@/global-components/Preloader/Preloader'

const ModalContent = (props) => {
  const { page, version, color, color10 } = props

  const { store } = useContext(Context)

  const listRef = useRef(null)
  const activeIndexRef = useRef(0)

  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSliderClosing, setIsSliderClosing] = useState(false)
  const [shadowPosition, setShadowPosition] = useState('top')

  const openSlider = (index) => {
    activeIndexRef.current = index
    setIsExpanded(true)
  }

  const closeSlider = () => {
    setIsSliderClosing(true)

    requestAnimationFrame(() => {
      setTimeout(() => {
        setIsSliderClosing(false)
        setIsExpanded(false)
      }, 190)
    })
  }

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await store.getGallery(page)

        setIsLoading(false)
        setImages(response.data)
      } catch (e) {
        setIsLoading(false)
        console.error(e.response?.data?.message)
      }
    }

    getImages()
  }, [])

  useLayoutEffect(() => {
    const onScroll = () => {
      const element = listRef.current

      if (element.scrollTop < 10) {
        setShadowPosition('top')
        return
      }

      if (
        element.scrollTop >
        element.scrollHeight - element.clientHeight - 10
      ) {
        setShadowPosition('bottom')
        return
      }

      setShadowPosition('center')
    }

    listRef.current.addEventListener('scroll', onScroll)
  }, [])

  useLayoutEffect(() => {
    const isShadow = listRef.current.scrollHeight > listRef.current.clientHeight

    setShadowPosition(isShadow ? 'top' : 'none')
  }, [images])

  return (
    <div className={styles.modal}>
      {isExpanded && (
        <div
          className={cx(styles.expanded, { [styles.closing]: isSliderClosing })}
        >
          <Swiper
            className={styles.expanded__slider}
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={activeIndexRef.current}
            noSwiping
            noSwipingClass={styles.expanded__buttonWrapper}
            preventClicks
            preventClicksPropagation
            allowTouchMove={!isSliderClosing}
          >
            {images.map((element, index) => {
              return (
                <SwiperSlide
                  className={styles.expanded__slide}
                  key={index}
                >
                  <div className={styles.expanded__imageWrapper}>
                    <img
                      className={styles.expanded__image}
                      src={element}
                      alt=''
                      draggable='false'
                    />
                    <div
                      className={styles.expanded__buttonWrapper}
                      onClick={(event) => {
                        event.stopPropagation()

                        closeSlider()
                      }}
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
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
      <a
        className={styles.modal__link}
        href={`/uploads/worlds/${page}.zip`}
        download={`${page}_${version}.zip`}
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
                  onClick={() => openSlider(index)}
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
          className={cx(styles.images__shadow, {
            [styles.top]:
              shadowPosition === 'bottom' || shadowPosition === 'center'
          })}
        ></div>
        <div
          className={cx(styles.images__shadow, {
            [styles.bottom]:
              shadowPosition === 'top' || shadowPosition === 'center'
          })}
        ></div>
      </div>
    </div>
  )
}

export default memo(ModalContent)
