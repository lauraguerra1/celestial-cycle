import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

type HomeProps = {
  logOut: () => void, 
  user: number | null
}

export default function Home({logOut, user}: HomeProps) {
  useEffect(() => { 
    if(!user) logOut()
  }, [logOut, user])
  return (
    <main>
      <button className='bg-white opacity-90 py-2 px-10 m-10 rounded-md'onClick={logOut}>LOG OUT</button>
    </main>
  )
}
