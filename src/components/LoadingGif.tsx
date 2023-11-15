import Image from 'next/image';
import loadingGif from '../../public/images/loadingStars.gif';

const LoadingGif = () => {
  return (
    <div className='flex flex-col items-center h-2/4'>
      <Image className='opacity-60 rounded-full' width={250} height={250} src={loadingGif} alt='flickering stars and sparkles as we wait for your data to load' />
      <p className='thin-regular m-3'>Loading...</p>
    </div>
  );
}

export default LoadingGif;