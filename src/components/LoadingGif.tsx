import Image from 'next/image';
import loadingGif from '../../public/images/loadingStars.gif';

const LoadingGif = () => {
  return (
    <div className='flex flex-col h-70vh  justify-center items-center'>
      <Image className='opacity-60 rounded-full' width={300} height={300} src={loadingGif} alt='flickering stars and sparkles as we wait for your data to load' />
      <p className='thin-regular m-3'>Loading...</p>
    </div>
  )
}

export default LoadingGif;