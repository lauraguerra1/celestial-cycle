import React, { useDebugValue, useEffect, useState } from 'react';
import { UserData, ComponentProps, Horoscope } from '@/types/types';
import { convertStringToDate, getTodaysDate } from '@/utils/utils';
import Navbar from './Navbar';
import Router from "next/router";
import { useRouter } from 'next/router';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import Link from 'next/link';
import CelestialLogo from './CelestialLogo';

type InsightsProps = ComponentProps & {
  logOut: () => void
};

export default function Insights({ isAuthorized, data, logOut }: InsightsProps) {
  const router = useRouter();
  const { date } = router.query;
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [emptyDay, setEmptyDay] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<Horoscope>()
  const [chosenDate, setChosenDate] = useState<string>(date as string)
  
  //Im getting the horoscope for now, but are we actually using chatgpt for this part?
  const getHoroscope = (date: string, sign: string) => {
    fetch(`${router.asPath.includes('demo') ? '/..' : ''}/api/horoscope?date=${date}&sign=${sign[0].toUpperCase()}${sign.substring(1)}`)
      .then((response) => response.json())
      .then(data => {
        console.log(data)

        if (data.length === 0) {
          setEmptyDay(true) 
        } else {
          setUserInsights(data[0])
        }

        return data;
      })
      .catch(err => {
        setError(true)
        console.error(err)
      })
  };

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }

    if (data) setUser(data[0])
    if (user) getHoroscope(chosenDate, user?.zodiac_sign as string)
  }, [isAuthorized, user]);

  return (
    <div className='relative h-full flex flex-col fade-in'>
      <div className='mt-10 h-full'>
        <CelestialLogo />
        <h2 className='text-center text-xl mt-3'>{getTodaysDate(convertStringToDate(chosenDate))}</h2>
        <h2 className='text-center celestial-cursive text-xl mt-10'>Today&#39;s Insights</h2>
        <section className='insights mt-5'>
          <div className='flex justify-end mt-3 mr-5'>
            <p className='text-lg'>{getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).emoji} {getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).description}</p>
          </div>
          <p className='p-5 insights-text text-lg'>
            {error ? "Error loading insights, please refresh the page" : 
              emptyDay ? "No insights loaded for this date, try a later date" : userInsights?.description}
          </p>
          <div className='flex justify-center'>
            {/* add a conditional to show todays data and change button to edit? */}
            <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/form`}><button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>Add Today&#39;s Data</button></Link>
          </div>
        </section>
      </div>
      <Navbar logOut={logOut} />
    </div>
  )
}