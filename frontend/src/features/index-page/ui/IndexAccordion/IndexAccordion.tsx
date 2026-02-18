import styles from './IndexAccordion.module.scss'

import Accordion from '@/shared/ui/Accordion'
import { accordionList } from '../../model/accordion.data'

const IndexAccordion = () => {
  return (
    <section className={styles.accordion}>
      <div className='container'>
        <Accordion list={accordionList} />
      </div>
    </section>
  )
}

export default IndexAccordion
