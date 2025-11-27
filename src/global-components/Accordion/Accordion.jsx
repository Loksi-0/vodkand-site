import styles from './Accordion.module.scss'

const Accordion = () => {
    const list = [
        {
            title: 'Что значит Forever world?',
            content: 'Это значит, что на этом сервере никогда не будет вайпа. Здесь вы постоянно добавляете в мир что-то новое, делая его всё более насыщенным и интересным, зная, что ваш вклад останется навсегда. Даже если сервер закроется, мы выложим последнее сохранение мира в наш дискорд'
        },
        {
            title: 'Можно ли играть с пиратки?',
            content: 'Да, на сервер можно зайти как с лицензионной, так и с пиратской версии'
        },
        {
            title: 'Есть ли на сервере приваты?',
            content: 'Классической системы приватов нет, однако все постройки и вещи игроков находятся под защитой. Гриферство строго карается баном'
        },
        {
            title: 'Как часто обновляется сервер?',
            content: 'Сервер обновляется тогда, когда на новую версию будет стабильное ядро (Paper), а также когда игрокам будет комфортно перейти на нее (скачать все необходимые моды, обновить сборку). Так как у нас нет границы мира, после обновления вы всегда можете отправиться в новые, еще не сгенерированные чанки, чтобы найти свежие структуры и блоки'
        },
        {
            title: 'Есть ли на сервере донат?',
            content: 'Нет, вы платите только за проходку. Разбан за деньги также невозможен'
        }
    ]

    return (
        <section className={`${styles.accordion} container`}>
            <div className={styles.accordion__inner}>
                {list.map((element, index) => {
                    return (
                        <div className={styles.element} key={index}>
                            <details className={styles.element__details} name="faq" open={index === 0}>
                                <summary className={styles.element__summary}>
                                    <h3 className={styles.element__title}>
                                        <span role="term" aria-details={`faq-${index + 1}`}>{element.title}</span>
                                    </h3>
                                </summary>
                            </details>
                            <div
                                className={styles.element__content}
                                id={`faq-${index + 1}`}
                                role="definition"
                            >
                                <div className={styles.element__contentInner}>
                                    <div className={styles.element__contentBody}>
                                        <p>{element.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                )})}
            </div>
        </section>
    )
}

export default Accordion