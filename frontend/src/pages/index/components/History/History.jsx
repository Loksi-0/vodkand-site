import styles from './History.module.scss'

import Button from '@/global-components/Button/Button'
import { useRef, useState } from 'react'

const History = () => {
    const pages = [
        {
            title: '“сервер Loksi”',
            year: 2022,
            description: 'Сервер, с которого начинается вся истроия водканда. Изначально был создан, чтобы просто играть с друзьями. Использовалась не совсем современная даже в то время версия 1.16.5',
            image: '/uploads/history/serverLoksi.jpg',
            color: 'rgba(89, 128, 212, 0.1)',
            color10: 'rgba(89, 128, 212, 0.05)'
        },
        {
            title: 'Vodkand',
            year: 2023,
            description: 'Первый сезон под знакомым названием. Сервер был обновлен до версии 1.19.2 и было добавлено больше плагинов. Впервые была введена избирательная система, и с этим было связано множество интересных моментов, в том числе и война Ярослава Лабутина против ГНР (Гумской народной республики)',
            image: '/uploads/history/vodkand.jpg',
            color: 'rgba(89, 212, 175, 0.1)',
            color10: 'rgba(89, 212, 175, 0.05)'
        },
        {
            title: 'Vodkand Politics',
            year: 2024,
            description: 'Самый насыщенный и неоднозначный сезон. На нём можно было воевать, иначе говоря, гриферить, поэтому там никогда не было спокойно, но тем не менее, с ним связано много веселых событий. Стоит также отметить, что на нем впервые был добавлен легендарный плагин на пивоварение',
            image: '/uploads/history/politics.jpg',
            color: 'rgba(193, 89, 212, 0.1)',
            color10: 'rgba(193, 89, 212, 0.05)'
        },
        {
            title: 'Vodkand Rebirth',
            year: 2024,
            description: 'После 4 месяцев "анархии" всем хотелось просто спокойно поиграть, из-за чего и появился Rebirth. Само название намекает, что мы вернулись к идеям старых сезонов, поэтому на сервере традиционно действовал запрет на гриф, кражу и любые попытки помешать игре, однако, в отличие от прошлых сезонов, здесь уже не было централизованного государства, поэтому можно сказать, что сервер стал просто ванильным выживанием',
            image: '/uploads/history/rebirth.jpg',
            color: 'rgba(183, 255, 173, 0.1)',
            color10: 'rgba(183, 255, 173, 0.05)'
        },
        {
            title: 'Vodkand',
            year: 2026,
            description: 'И спустя почти два года простоя Vodkand снова открылся. Теперь это место, где каждый может построить что-то своё и быть уверенным, что оно останется здесь надолго. Мы стараемся сохранить уютную атмосферу и ценим комьюнити, которое и делает сервер живым',
            image: '/uploads/history/vodkandNew.png',
            color: 'rgba(104, 233, 131, 0.2)',
            color10: 'rgba(104, 233, 131, 0.2)'
        }
    ]

    const contentRef = useRef(null)
    const paragraphRef = useRef(null)
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [nextImage, setNextImage] = useState(pages[1].image)
    const [opacity, setOpacity] = useState(1)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 767)

    const animateContent = (updateContent) => {
        const content = contentRef.current
        const paragraph = paragraphRef.current
        if (!content || !paragraph) return

        const startHeight = content.clientHeight
        const paragraphStartHeight = paragraph.clientHeight
        content.style.height = `${startHeight}px`

        content.getBoundingClientRect()
        paragraph.getBoundingClientRect()

        updateContent()

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const paragraphEndHeight = paragraph.clientHeight
                const endHeight = startHeight + (paragraphEndHeight - paragraphStartHeight)

                content.style.height = `${endHeight}px`
            })
        })

        setTimeout(() => {
            content.style.height = 'auto'
        }, 300)
    }

    const back = () => {
        setNextImage(pages[pages.indexOf(currentPage) - 1].image)
        setOpacity(0)
        
        setTimeout(() => {
            animateContent(() => {
                setCurrentPage(pages[pages.indexOf(currentPage) - 1])
            })
            setOpacity(1)
        }, 200)
    }

    const forward = () => {
        setNextImage(pages[pages.indexOf(currentPage) + 1].image)
        setOpacity(0)
        
        setTimeout(() => {
            animateContent(() => {
                setCurrentPage(pages[pages.indexOf(currentPage) + 1])
            })
            setOpacity(1)
        }, 200)
    }

    return (
        <section className={styles.history}>
            <div className={`${styles.history__inner} container`}>
                <h2 className={styles.history__title}>История проекта</h2>
                <article className={styles.article}>
                    <div className={styles.article__body}>
                        <div 
                            className={styles.article__content}
                            style={{ opacity: opacity }}
                            ref={contentRef}

                        >
                            <div className={styles.article__titleWrapper}>
                                <h3 className={styles.article__title}>
                                    {currentPage.title}
                                </h3>
                                <p className={styles.article__titleYear}>
                                    {currentPage.year}
                                </p>
                            </div>
                            <p 
                                className={styles.article__description}
                                ref={paragraphRef}
                            >
                                {currentPage.description}
                            </p>
                        </div>
                        <Button 
                            className={styles.article__button}
                            color='dark'
                            disabled={true}
                            title='Функция еще в разработке'
                        >
                            Посмотреть галерею
                        </Button>
                    </div>
                    <div className={styles.history__rightSide}>
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
                        {
                            !isMobile &&
                            <div className={styles.history__buttons}>
                                <Button 
                                    className={styles.history__buttonsButton}
                                    color='gray'
                                    disabled={pages.indexOf(currentPage) === 0}
                                    onClick={back}
                                >
                                    <span className='visually-hidden'>Назад</span>
                                    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                                        <path fill="#000000" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z"/>
                                    </svg>
                                </Button>
                                <Button 
                                    className={styles.history__buttonsButton}
                                    color='gray'
                                    disabled={pages.indexOf(currentPage) === pages.length - 1}
                                    onClick={forward}
                                >
                                    <span className='visually-hidden'>Вперед</span>
                                    <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                                        <path fill="#000000" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z"/>
                                    </svg>
                                </Button>
                            </div>
                        }
                    </div>
                </article>
                {
                    isMobile &&
                    <div className={styles.history__buttons}>
                        <Button 
                            className={styles.history__buttonsButton}
                            color='gray'
                            disabled={pages.indexOf(currentPage) === 0}
                            onClick={back}
                        >
                            <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path fill="#000000" d="M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z"/>
                            </svg>
                        </Button>
                        <Button 
                            className={styles.history__buttonsButton}
                            color='gray'
                            disabled={pages.indexOf(currentPage) === pages.length - 1}
                            onClick={forward}
                        >
                            <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
                                <path fill="#000000" d="M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z"/>
                            </svg>
                        </Button>
                    </div>
                }
            </div>
        </section>
    )
}

export default History