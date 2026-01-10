import styles from './Accordion.module.scss'
import cx from 'clsx'

const Accordion = (props) => {
  const { list } = props

  return (
    <section className={cx(styles.accordion, 'container')}>
      <ul className={styles.list}>
        {list.map((element, index) => {
          return (
            <li
              className={styles.list__item}
              key={index}
            >
              <details
                className={styles.list__details}
                name='faq'
                open={index === 0}
              >
                <summary className={styles.list__summary}>
                  <h3 className={cx(styles.list__title, 'h4')}>
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
                className={styles.list__content}
                id={`faq-${index + 1}`}
                role='definition'
              >
                <div className={styles.list__contentInner}>
                  <div>
                    <p>{element.content}</p>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Accordion
