import styles from './Nick.module.scss'
import test_image from '@/assets/images/avatar-example.png'

const Nick = () => {
    return (
        <section className={styles.nick}>
            <img 
                className={styles.nickImage}
                src={test_image} 
                alt="" loading='lazy'
            />
            <div className={styles.nickField}>
                <h1 className={`${styles.nickField__nick} h3`}>Loksi</h1>
                <button className={styles.nickField__edit}>
                    <span className='visually-hidden'>Edit</span>
                </button>
            </div>
        </section>
    )
}

export default Nick