import Lottie from 'react-lottie-player'
import animationData from '@/assets/icons/preloader.json'

const Preloader = (props) => {
  const { size } = props

  return (
    <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: size, height: size }}
    />
  )
}

export default Preloader
