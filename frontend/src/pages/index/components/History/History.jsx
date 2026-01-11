import styles from './History.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import Modal from '@/global-components/Modal/Modal'
import ModalContent from './ModalContent/ModalContent'
import useHistory from '@/pages/index/components/History/useHistory'
import { pages } from '@/pages/index/components/History/history.data'
import Navigation from '@/pages/index/components/History/Navigation/Navigation'

const History = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    nextImage,
    opacity,
    isMobile,
    openGalleryButtonRef,
    contentRef,
    paragraphRef,
    back,
    forward,
    currentPage
  } = useHistory({ pages })

  return (
    <section className={styles.history}>
      <div className={cx(styles.history__inner, 'container')}>
        <h2>История проекта</h2>
        <article className={styles.article}>
          <div className={styles.article__body}>
            <div
              className={styles.article__content}
              style={{ opacity: opacity }}
              ref={contentRef}
            >
              <div className={styles.article__title}>
                <h3>{currentPage.title}</h3>
                <p className='gray'>{currentPage.year}</p>
              </div>
              <p ref={paragraphRef}>{currentPage.description}</p>
            </div>
            <Button
              className={styles.article__button}
              color='dark'
              disabled={pages.indexOf(currentPage) === pages.length - 1}
              onClick={() => setIsModalOpen(true)}
              ref={openGalleryButtonRef}
            >
              Посмотреть галерею
            </Button>
            <Modal
              title={currentPage.title}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                openGalleryButtonRef.current.focus()
              }}
            >
              <ModalContent
                page={currentPage.imageFolder}
                version={currentPage.version}
                color={currentPage.color}
                color10={currentPage.color10}
              />
            </Modal>
          </div>
          <div className={styles.article__right}>
            <div
              className={styles.article__imageWrapper}
              style={{
                borderColor: currentPage.color,
                backgroundColor: currentPage.color10
              }}
            >
              <img
                className={styles.article__image}
                src={currentPage.image}
                alt=''
                loading='lazy'
                draggable='false'
                style={{ opacity: opacity }}
              />
              <img
                className={styles.article__imageNext}
                src={nextImage}
                alt=''
                loading='lazy'
                draggable='false'
              />
            </div>
            {!isMobile && (
              <Navigation
                back={back}
                forward={forward}
                currentPage={currentPage}
              />
            )}
          </div>
        </article>
        {isMobile && (
          <Navigation
            back={back}
            forward={forward}
            currentPage={currentPage}
          />
        )}
      </div>
    </section>
  )
}

export default History
