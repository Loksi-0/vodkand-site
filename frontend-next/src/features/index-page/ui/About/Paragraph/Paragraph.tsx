import Image, { type StaticImageData } from 'next/image'
import styles from './Paragraph.module.scss'

import cx from 'clsx'

type ParagraphType = {
  image: string | StaticImageData
  title: string
  description: string
  reversed?: boolean
}

const Paragraph = (props: ParagraphType) => {
  const { image, title, description, reversed = false } = props

  return (
    <div className={cx(styles.paragraph, { [styles.reversed]: reversed })}>
      {image && (
        <Image
          className={styles.paragraph__image}
          src={image}
          alt=''
          draggable='false'
          loading='lazy'
          width={500}
          height={200}
        />
      )}

      <div className={styles.paragraph__body}>
        <h2 className={styles.paragraph__title}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default Paragraph
