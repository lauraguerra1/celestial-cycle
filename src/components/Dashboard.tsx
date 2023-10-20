import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData, ComponentProps, Horoscope } from '@/types/types';
import { getTodaysDate } from '@/utils/utils';
import Navbar from '../components/Navbar';
import Router from "next/router";
import CelestialLogo from '@/components/CelestialLogo';

type DashboardProps = ComponentProps & {
  logOut: () => void;
};

export default function Dashboard({ isAuthorized, data, logOut }: DashboardProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<Horoscope>()

  const getHoroscope = (date: string, sign: string) => {
    fetch(`/api/horoscope?date=${date}&sign=${sign[0].toUpperCase()}${sign.substring(1)}`)
      .then((response) => response.json())
      .then(data => {
        console.log('horoscope', data)
        setUserInsights(data[0])
        return data;
      })
      .catch(err => {
        setError(true)
        console.log('eroor')
        console.error(err)
      })
  };

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }

    if (data) setUser(data[0])
    if (user) getHoroscope(getTodaysDate(new Date()), user?.zodiac_sign as string)
    
  }, [isAuthorized, user]);

  return (
    <div className='relative h-full flex flex-col fade-in'>
      <div className='mt-10 h-full'>
        <CelestialLogo />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope</h1>
        <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} alt='Logo' src={`/images/${user?.zodiac_sign}.png`} />
          <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
            <p>{error ? "Error loading horoscope, please refresh page" : userInsights?.description}</p>
          </div>
        </div>
      </div>
      <Navbar logOut={logOut} />
    </div>
  );
}
