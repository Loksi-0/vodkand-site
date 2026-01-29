import Lottie from 'react-lottie-player'
import animationData from '@/shared/assets/icons/preloader.json'

type PreloaderProps = {
  size: number
}

const Preloader = (props: PreloaderProps) => {
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
