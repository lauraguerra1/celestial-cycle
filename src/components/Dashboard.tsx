import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData, ComponentProps } from '@/types/types';
import { getTodaysDate } from '@/utils/utils';
import Navbar from '../components/Navbar';
import Router from "next/router";
import Logo from '@/components/logo';


type DashboardProps = ComponentProps & {
  logOut: () => void
};


export default function Dashboard({ isAuthorized, data, logOut }: DashboardProps) {
  const [user, setUser] = useState<UserData | null>(null)
  // const [userInsights, setUserInsights] = useState(insights)

  const getHoroscope = (date: string, sign: string) => {
    console.log('date fe', sign[0].toUpperCase() + sign.substring(1))
    fetch(`/api/horoscope?date=${date}&sign=${sign[0].toUpperCase()}${sign.substring(1)}`)
      .then((response) => response.json())
      .then(data => {
        console.log('hello', data)
        return data;
      })
      .catch(err => {
        console.log('whoo')
        // throw new Error(err.statusText);
      })

  };

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }

    if (data) setUser(data[0])
    getHoroscope('10/18/2023', user?.zodiac_sign as string)
    //api call needs to be made to get horoscope
  }, [isAuthorized]);

  return (
    <div className='relative h-full flex flex-col fade-in'>
      <div className='mt-10 h-full'>
        <Logo />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope</h1>
        <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} alt="Logo" src={`/images/${user?.zodiac_sign}.png`} />
          <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
            {/* <p>{insights.data.horoscope}</p> */}
          </div>
        </div>
      </div>
      <Navbar logOut={logOut} />
    </div>
  )
}