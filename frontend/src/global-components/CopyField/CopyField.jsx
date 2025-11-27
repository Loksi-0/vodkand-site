import styles from './CopyField.module.scss'
import copyIcon from '@/assets/icons/copy.svg'
import { toast } from "sonner"

const CopyField = (props) => {
    const {
        text,
        hasSubtitle = false,
        subtitle = ''
    } = props

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success('Скопировано!')
            })
            .catch(error => {
                toast.error('Не удалось скопировать. ', error)
            })
    }

    return (
        <div className={styles.copyField}>
            {hasSubtitle && <p className={styles.subtitle}>{subtitle}</p>}
            <div className={styles.field}>
                <p className={styles.text}>{text}</p>
                <div 
                    className={styles.copy}
                    onClick={handleCopy}
                >
                    <img 
                        className={styles.icon}
                        src={copyIcon}
                        alt="Copy" 
                    />
                </div>
            </div>
        </div>
    )
}

export default CopyField