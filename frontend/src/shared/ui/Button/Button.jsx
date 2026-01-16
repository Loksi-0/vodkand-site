import styles from './Button.module.scss'

import cx from 'clsx'

import Preloader from '@/shared/ui/Preloader/Preloader'
import { forwardRef } from 'react'

const Button = (props, ref) => {
  const {
    color,
    children,
    type = 'button',
    isBig = false,
    onClick = () => {},
    loading = false,
    disabled = false,
    className = '',
    style = {},
    title = '',
    tabindex = 0
  } = props

  return (
    <button
      ref={ref}
      type={type}
      className={cx(styles.button, styles[color], className, {
        [styles.isBig]: isBig,
        [styles.disabled]: disabled
      })}
      style={style}
      title={title}
      disabled={disabled}
      onClick={onClick}
      tabIndex={tabindex}
    >
      {loading ? <Preloader size={30} /> : children}
    </button>
  )
}

export default forwardRef(Button)
