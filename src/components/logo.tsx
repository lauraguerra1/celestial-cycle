import React from 'react'
import logoImg from '../../public/images/logo.PNG'
import Image from 'next/image'

const Logo = () => {
  return (
    <Image className='ml-5' width={300} height={100} alt="Logo" src={logoImg} />
  )
}

export default Logo