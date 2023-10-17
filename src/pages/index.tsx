import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })
import PassageLogin from "@/components/login";

type HomeProps = {
  logOut: () => void, 
}

export default function Home({logOut}: HomeProps) {
  return (
    <div>
      <PassageLogin />
      <button className='bg-white opacity-90 py-2 px-10 m-10 rounded-md'onClick={logOut}>LOG OUT</button>
    </div>
  );
}
