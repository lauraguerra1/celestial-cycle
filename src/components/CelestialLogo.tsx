import React from 'react';
import logoImg from '../../public/images/logo.PNG';
import Image from 'next/image';
import Link from 'next/link';

const CelestialLogo = () => {
  return (
    <Link href="/">
      <Image className='ml-5' width={300} height={100} alt="Logo" src={logoImg} />
    </Link>
  );
}

export default CelestialLogo;