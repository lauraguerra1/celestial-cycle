import React, { useState, useEffect } from 'react';
import logoImg from '../../public/images/logo.PNG';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CelestialLogo = () => {
  const [scrolling, setScrolling] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 z-10 transition-opacity max-sm:w-full ${scrolling ? 'bg-deepblue' : ''}`}>
      <Link href={router.asPath.includes('demo') ? '/demo/dashboard' : '/dashboard'}>
        <Image className='ml-5' width={300} height={100} alt="Logo" src={logoImg} />
      </Link>
    </div>
  );
}

export default CelestialLogo;