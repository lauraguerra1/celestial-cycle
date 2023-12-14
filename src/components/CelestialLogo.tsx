import React, { useState, useEffect } from 'react';
import logoImg from '../../public/images/logo.PNG';
import Image from 'next/image';
import Link from 'next/link';

const CelestialLogo = () => {
  const [scrolling, setScrolling] = useState<Boolean>(false);

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
    <Link href="/" className={`fixed top-0 left-0 z-10 w-full transition-opacity ${scrolling ? 'bg-deepblue' : ''}`}>
      <Image className='ml-5' width={300} height={100} alt="Logo" src={logoImg} />
    </Link>
  );
}

export default CelestialLogo;