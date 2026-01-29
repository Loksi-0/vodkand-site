import styles from './Button.module.scss'

import cx from 'clsx'

import Preloader from '@/shared/ui/Preloader/Preloader'
import { MouseEventHandler, PropsWithChildren } from 'react'

type ButtonType = PropsWithChildren<{
  color: string
  ref?: HTMLButtonElement
  type?: 'button' | 'submit' | 'reset' | undefined
  isBig?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
  isLoading?: boolean
  disabled?: boolean
  className?: string
  style?: object
  title?: string
  tabindex?: number
}>

const Button = (props: ButtonType) => {
  const {
    color,
    children,
    ref = null,
    type = 'button',
    isBig = false,
    onClick,
    isLoading = false,
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
      {isLoading ? <Preloader size={30} /> : children}
    </button>
  )
}

export default Button
