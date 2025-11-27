import styles from './Paragraph.module.scss'

const Paragraph = (props) => {
    const {
        image,
        title,
        description,
        reversed = false
    } = props

    return (
        <div className={`${styles.paragraph} ${reversed ? styles.reversed : ''}`}>
            {image && <img 
                className={styles.image}
                src={image} 
                alt="" 
                draggable='false' loading='lazy'
            />}

            <div className={styles.text}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}><big>{description}</big></p>
            </div>
        </div>
    )
}

export default Paragraph