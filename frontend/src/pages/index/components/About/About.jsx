import styles from './About.module.scss'

import Paragraph from './Paragraph/Paragraph'
import bee from '@/assets/images/bee.png'
import sniffer from '@/assets/images/sniffer.png'

const About = () => {
    return (
        <section className={styles.about}>
            <div className={`${styles.about__inner} container`}>
                <Paragraph 
                    image={bee}
                    title='В чём прикол?'
                    description='Vodkand - это ванильный сервер, на котором никогда не будет вайпа, а значит, все ваши постройки и игровые достижения будут сохранены навсегда'
                />
                <Paragraph 
                    image={sniffer}
                    title='Что вам тут делать?'
                    description='У сервера нет определённого предназначения, поэтому вы можете не только строить, но и, например, выживать, вести бизнес или отыгрывать РП'
                    reversed
                />
            </div>
        </section>
    )
}

export default About