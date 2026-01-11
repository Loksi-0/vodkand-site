import styles from './Navigation.module.scss'

import Button from '@/global-components/Button/Button'
import { pages } from '@/pages/index/components/History/history.data'

const Navigation = (props) => {
  const { back, forward, currentPage } = props

  return (
    <div className={styles.navigation}>
      <Button
        className={styles.navigation__button}
        color='gray'
        disabled={pages.indexOf(currentPage) === 0}
        onClick={back}
      >
        <span className='visually-hidden'>Назад</span>
        <svg
          width='800px'
          height='800px'
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
        >
          <path
            fill='#000000'
            d='M7.765 4.045a.75.75 0 10-1.03-1.09L2.237 7.203a.748.748 0 00-.001 1.093l4.499 4.25a.75.75 0 001.03-1.091L4.636 8.5h8.614a.75.75 0 000-1.5H4.636l3.129-2.955z'
          />
        </svg>
      </Button>
      <Button
        className={styles.navigation__button}
        color='gray'
        disabled={pages.indexOf(currentPage) === pages.length - 1}
        onClick={forward}
      >
        <span className='visually-hidden'>Вперед</span>
        <svg
          width='800px'
          height='800px'
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
        >
          <path
            fill='#000000'
            d='M8.235 4.045a.75.75 0 111.03-1.09l4.5 4.25a.75.75 0 010 1.09l-4.5 4.25a.75.75 0 01-1.03-1.09L11.364 8.5H2.75a.75.75 0 010-1.5h8.614L8.235 4.045z'
          />
        </svg>
      </Button>
    </div>
  )
}

export default Navigation
