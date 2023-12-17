import Image from 'next/image';
import loadingGif from '../../public/images/loadingStars.gif';

const LoadingGif = () => {
  return (
    <div className='flex flex-col items-center h-1/2 w-full mt-0 lg:mt-20'>
      <Image className='opacity-60 rounded-full lg:w-48 lg:h-48' width={250} height={250} src={loadingGif} alt='flickering stars and sparkles as we wait for your data to load' />
      <p className='thin-regular m-3'>Loading...</p>
    </div>
  );
}

export default LoadingGif;