import Image from 'next/image'
import woman from '../../public/images/fullWoman.png'

const HomeLoading = () => {
  return (
    <section className='fade-in-out-continuous h-90vh flex flex-col justify-evenly items-center'>
      <Image width={200} height={200} src={woman} alt='' />
      <h1 className='text-4xl'>Celestial Cycle</h1>
    </section>
  )
}

export default HomeLoading