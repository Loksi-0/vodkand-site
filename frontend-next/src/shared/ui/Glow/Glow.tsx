import styles from './Glow.module.scss'

import cx from 'clsx'

type GlowProps = {
  color: 'accent' | 'warm' | 'custom'
  size?: 'small' | 'medium' | 'large'
  className?: string
  style?: {
    backgroundColor: string
    boxShadow: string
  }
}

const Glow = (props: GlowProps) => {
  const { color, className = '', style = {}, size = 'medium' } = props

  return (
    <div
      className={cx(
        styles.glow,
        styles[size],
        color !== 'custom' ? styles[color] : '',
        className
      )}
      style={style}
    ></div>
  )
}

export default Glow
