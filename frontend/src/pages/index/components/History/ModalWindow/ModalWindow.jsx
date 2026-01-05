import styles from './ModalWindow.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Button from '@/global-components/Button/Button'
import { Context } from '@/main'
import Preloader from '@/global-components/Preloader/Preloader'

const ModalWindow = (props) => {
  const { page, version, color, color10 } = props

  const { store } = useContext(Context)

  const listRef = useRef(null)

  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSliderClosing, setIsSliderClosing] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showTopShadow, setShowTopShadow] = useState(false)
  const [showBottomShadow, setShowBottomShadow] = useState(false)

  const openSlider = (index) => {
    setActiveImageIndex(index)
    setIsExpanded(true)
  }

  const closeSlider = () => {
    setIsSliderClosing(true)

    setTimeout(() => {
      setIsSliderClosing(false)
      setIsExpanded(false)
    }, 190)
  }

  useEffect(() => {
    const getImages = async () => {
      try {
        setIsLoading(true)
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
    listRef.current.addEventListener('scroll', () => {
      const element = listRef.current

      if (element.scrollTop === 0) {
        setShowTopShadow(false)
        setShowBottomShadow(true)
        return
      }

      if (element.scrollTop > element.scrollHeight - element.clientHeight - 5) {
        setShowBottomShadow(false)
        setShowTopShadow(true)
        return
      }

      setShowBottomShadow(true)
      setShowTopShadow(true)
    })
  }, [])

  useLayoutEffect(() => {
    setShowBottomShadow(
      listRef.current.scrollHeight > listRef.current.clientHeight
    )
  }, [images])

  return (
    <div className={styles.content}>
      {isExpanded && (
        <div
          className={`
              ${styles.expanded} 
              ${isSliderClosing && styles.closing}
          `}
          onClick={closeSlider}
        >
          <Swiper
            className={styles.expanded__slider}
            spaceBetween={50}
            slidesPerView={1}
            initialSlide={activeImageIndex}
            onSlideChange={(swiper) => {
              setActiveImageIndex(swiper.activeIndex)
            }}
          >
            {images.map((element, index) => {
              return (
                <SwiperSlide
                  className={styles.expanded__slide}
                  key={index}
                >
                  <img
                    className={styles.expanded__image}
                    src={element}
                    alt=''
                    draggable='false'
                    onClick={closeSlider}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
      <a
        className={styles.link}
        href={`/uploads/worlds/${page}.zip`}
        download={`${page}_${version}.zip`}
      >
        <Button
          color='light'
          className={styles.button}
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
      <div className={styles.imagesListWrapper}>
        <ul
          className={styles.imagesList}
          ref={listRef}
        >
          {images.map((element, index) => {
            return (
              <li
                key={index}
                className={styles.imagesItem}
              >
                <button
                  className={styles.imagesButton}
                  type='button'
                  onClick={() => openSlider(index)}
                >
                  <img
                    className={styles.imagesImage}
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
          className={`
              ${styles.shadow}
              ${showTopShadow && styles.shadowTop}
          `}
        ></div>
        <div
          className={`
              ${styles.shadow}
              ${showBottomShadow && styles.shadowBottom}
          `}
        ></div>
      </div>
    </div>
  )
}

export default ModalWindow
