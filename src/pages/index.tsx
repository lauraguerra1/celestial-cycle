// import Homepage from "@/components/Homepage"
import { useEffect, useState } from "react"
import { insights, userData } from '../mockdata'
import { User } from "@/types/types"
import { getZodiacSign } from "@/utils"
import Image from 'next/image'
import PassageLogin from "@/components/login";

type HomeProps = {
  logOut: () => void, 
  user: number | null
}

export default function Home({ logOut, user }: HomeProps) {
  useEffect(() => { 
    if(!user) logOut()
  }, [logOut, user])
  
  return (
    <div>
      <PassageLogin />
      <button className='bg-white opacity-90 py-2 px-10 m-10 rounded-md'onClick={logOut}>LOG OUT</button>
    </div>
  );

}
