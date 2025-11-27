import styles from './Hero.module.scss'

import Button from "@/global-components/Button/Button"
import Title from "../Title/Title"
import CopyField from "@/global-components/CopyField/CopyField"

const Hero = () => {
  return (
    <section className={`${styles.hero} container-big`}>
      <div className={styles.text}>
        <Title />
        <p className={styles.description}>
          sssssss
          Forever world с неограниченными возможностями для творчества
        </p>
      </div>
      <div className={styles.buttons}>
        <Button 
          color='accent'
          text='Купить проходку'
          isBig
        />
        <CopyField 
          text='play.vodkand.online'
          hasSubtitle={true}
          subtitle='1.21.8'
        />
      </div>
    </section>
  )
}

export default Hero