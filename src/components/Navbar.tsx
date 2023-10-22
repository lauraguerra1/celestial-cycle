import React from 'react';
import home from '../../public/images/house.png';
import calendar from '../../public/images/calendar.png';
import user from '../../public/images/user.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className='flex fixed bottom-0 h-20 w-full bg-lightgray'>
      <div className='flex w-full h-20 icon-container items-center'>
        <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'>
          <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/calendar`}>
            <div className='rounded-xl bg-darkgray p-33 icon'>
              <Image width={45} height={45} alt='calendar logo' src={calendar} />
            </div>
            <p>Calendar</p>
          </Link>
        </div>
        <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'> 
          <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/dashboard`}>
          <div className='rounded-xl bg-darkgray p-33 icon'>
            <Image width={45} height={45} alt='home logo' src={home} />
          </div>
          <p>Home</p>
          </Link>
        </div>
        <div className='h-5/6 w-20 flex p-5 justify-center flex-col items-center'>
          <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/profile`}>
          <div className='rounded-xl bg-darkgray p-33 icon'>
            <Image width={45} height={45} alt='user logo' src={user} />
          </div>
          </Link>
          <p>Profile</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;