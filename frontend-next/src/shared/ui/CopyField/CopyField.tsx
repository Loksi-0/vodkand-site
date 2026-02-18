import styles from './CopyField.module.scss'

import { toast } from 'sonner'
import Button from '@/shared/ui/Button/Button'

type CopyFieldProps = {
  text: string
  subtitle?: string
}

const CopyField = (props: CopyFieldProps) => {
  const { text, subtitle = '' } = props

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Скопировано!')
      })
      .catch((error: unknown) => {
        toast.error(`Не удалось скопировать. ${String(error)}`)
      })
  }

  return (
    <div className={styles.copyField}>
      {subtitle && <p className={styles.copyField__subtitle}>{subtitle}</p>}
      <div className={styles.copyField__body}>
        <p className={styles.copyField__text}>{text}</p>
        <Button
          color='icon'
          onClick={handleCopy}
        >
          <div className={styles.copyField__icon}>
            <svg
              width='800px'
              height='800px'
              viewBox='0 0 24 24'
              role='img'
              xmlns='http://www.w3.org/2000/svg'
              aria-labelledby='copyIconTitle'
              stroke='#000000'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            >
              <title id='copyIconTitle'>Copy</title>
              <rect
                width='12'
                height='14'
                x='8'
                y='7'
              />
              <polyline points='16 3 4 3 4 17' />
            </svg>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default CopyField
