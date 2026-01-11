import styles from './Whitelist.module.scss'

import cx from 'clsx'

import Button from '@/global-components/Button/Button'
import usePageMetadata from '@/hooks/usePageMetadata.js'
import { observer } from 'mobx-react-lite'
import useWhitelist from '@/pages/whitelist/useWhitelist'
import FormPageLayout from '@/layouts/FormPageLayout/FormPageLayout'

const Whitelist = observer(() => {
  const { loading, nick, error, handleSubmit, onChange } = useWhitelist()

  usePageMetadata({
    title: 'Whitelist',
    index: false,
    follow: false
  })

  return (
    <FormPageLayout>
      <form
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h1 className={cx(styles.form__title, 'h3')}>
          Добавьте свой ник в вайтлист
        </h1>
        <div className={styles.form__body}>
          <div className={styles.form__field}>
            <img
              className={styles.form__fieldIcon}
              src={
                nick
                  ? `https://mineskin.eu/helm/${nick}`
                  : `https://mineskin.eu/helm/null`
              }
              alt=''
              width={50}
              height={50}
              loading='lazy'
              draggable='false'
            />
            <input
              className={cx(styles.form__fieldInput, {
                [styles.form__fieldInputError]: error
              })}
              type='text'
              placeholder='nagibator777'
              value={nick}
              onChange={onChange}
            />
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <p className={cx(styles.form__disclaimer, 'gray')}>
            Потом поменять ник будет нельзя. Если вы неправильно вписали ник,
            обратитесь к администратору
          </p>
        </div>
        <Button
          className={styles.button}
          type='submit'
          color='accent'
          loading={loading}
        >
          Готово
        </Button>
      </form>
    </FormPageLayout>
  )
})

export default Whitelist
