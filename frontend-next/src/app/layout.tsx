import './styles/index.scss'

import type { Metadata } from 'next'
import { Abril_Fatface, PT_Serif, Yeseva_One } from 'next/font/google'

import cx from 'clsx'
import Providers from '@/app/providers'
import App from '@/app/App'

const abrilFatface = Abril_Fatface({
  weight: '400',
  variable: '--font-family-logo',
  subsets: ['latin', 'latin-ext']
})

const PTSerif = PT_Serif({
  weight: '400',
  variable: '--font-family-base',
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']
})

const yesevaOne = Yeseva_One({
  weight: '400',
  variable: '--font-family-accent',
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext']
})

export const metadata: Metadata = {
  title: 'Vodkand',
  description:
    'Ванильный майнкрафт сервер с неограниченными возможностями для творчества',
  keywords:
    'Vodkand, Водканд, майнкрафт сервер, Forever world, ванильный сервер',
  openGraph: {
    title: 'Vodkand',
    description:
      'Ванильный майнкрафт сервер с неограниченными возможностями для творчества'
  }
}

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='ru'>
      <body
        className={cx(
          abrilFatface.variable,
          PTSerif.variable,
          yesevaOne.variable,
          'antialiased'
        )}
      >
        <noscript>
          <h1>Vodkand</h1>
          <p>
            Vodkand — ванильный Minecraft-сервер без вайпов. Авторизация через
            Google используется для входа в аккаунт пользователя.
          </p>
        </noscript>

        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
