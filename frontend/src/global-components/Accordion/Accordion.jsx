import styles from './Accordion.module.scss'

const Accordion = (props) => {
  const { list } = props

  return (
    <section className={`${styles.accordion} container`}>
      <div className={styles.accordion__inner}>
        {list.map((element, index) => {
          return (
            <div
              className={styles.element}
              key={index}
            >
              <details
                className={styles.element__details}
                name='faq'
                open={index === 0}
              >
                <summary className={styles.element__summary}>
                  <h3 className={`${styles.element__title} h4`}>
                    <span
                      role='term'
                      aria-details={`faq-${index + 1}`}
                    >
                      {element.title}
                    </span>
                  </h3>
                </summary>
              </details>
              <div
                className={styles.element__content}
                id={`faq-${index + 1}`}
                role='definition'
              >
                <div className={styles.element__contentInner}>
                  <div className={styles.element__contentBody}>
                    <p>{element.content}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Accordion
