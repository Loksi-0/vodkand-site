import Header from '@/global-components/Header/Header'
import Footer from '@/global-components/Footer/Footer'
import Hero from './components/Hero/Hero'
import History from './components/History/History'
import About from './components/About/About'
import Accordion from '@/global-components/Accordion/Accordion'
import NavigationTile from '@/global-components/NavigationTile/NavigationTile'
import usePageMetadata from '@/hooks/usePageMetadata'
import frog from '@/assets/images/frog.png'
import BuyPassBanner from './components/BuyPassBanner/BuyPassBanner'

const Index = () => {
  const accordionList = [
    {
      title: 'Что значит Forever world?',
      content:
        'Это значит, что на этом сервере никогда не будет вайпа. Здесь вы постоянно добавляете в мир что-то новое, делая его всё более насыщенным и интересным, зная, что ваш вклад останется навсегда. Даже если сервер закроется, мы выложим последнее сохранение мира в наш дискорд'
    },
    {
      title: 'Можно ли играть с пиратки?',
      content:
        'Да, на сервер можно зайти как с лицензионной, так и с пиратской версии'
    },
    {
      title: 'Есть ли на сервере приваты?',
      content:
        'Классической системы приватов нет, однако все постройки и вещи игроков находятся под защитой. Гриферство строго карается баном'
    },
    {
      title: 'Как часто обновляется сервер?',
      content:
        'Сервер обновляется тогда, когда на новую версию будет стабильное ядро (Paper), а также когда игрокам будет комфортно перейти на нее (скачать все необходимые моды, обновить сборку). Так как у нас нет границы мира, после обновления вы всегда можете отправиться в новые, еще не сгенерированные чанки, чтобы найти свежие структуры и блоки'
    },
    {
      title: 'Есть ли на сервере донат?',
      content:
        'Нет, вы платите только за проходку. Разбан за деньги также невозможен'
    },
    {
      title: 'Почему доступ платный?',
      content:
        'Платная проходка нужна в первую очередь как защита от гриферов. При этом мы держим цену минимально низкой, чтобы вход оставался доступным для нормальных игроков'
    }
  ]

  usePageMetadata({
    title: 'Vodkand',
    description:
      'Ванильный майнкрафт сервер с неограниченными возможностями для творчества',
    keywords:
      'Vodkand, Водканд, майнкрафт сервер, Forever world, ванильный сервер',
    ogTitle: 'Vodkand',
    ogDescription:
      'Forever world с неограниченными возможностями для творчества',
    ogImage: frog
  })

  return (
    <>
      <Header sticky={false} />
      <main>
        <Hero />
        <About />
        <History />
        <Accordion list={accordionList} />
        <BuyPassBanner />
        <NavigationTile />
      </main>
      <Footer />
    </>
  )
}

export default Index
