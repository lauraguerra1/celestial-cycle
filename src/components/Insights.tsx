import React, { useDebugValue, useEffect, useState } from 'react';
import { UserData, ComponentProps, Horoscope } from '@/types/types';
import { convertStringToDate, formatDateForDB, getTodaysDate } from '@/utils/utils';
import Navbar from './Navbar';
import Router from "next/router";
import { useRouter } from 'next/router';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import Link from 'next/link';
import CelestialLogo from './CelestialLogo';
import { getEntry, getHoroscope } from '@/utils/apiCalls';
import { Value } from 'react-calendar/dist/cjs/shared/types';

type InsightsProps = ComponentProps & {
  logOut: () => void
  updateEntryDate: (date: Value) => void;
};

export default function Insights({ isAuthorized, data, logOut, updateEntryDate }: InsightsProps) {
  const router = useRouter();
  const { date } = router.query;
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [emptyDay, setEmptyDay] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<Horoscope>()
  const [chosenDate, setChosenDate] = useState<string>(date as string)
  const [contentAvailable, setContentAvailable] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }

    if (data) setUser(data[0])
    if (user) getHoroscope(chosenDate, user?.zodiac_sign as string)
    .then((data) => {
      if (data.length === 0) {
        setEmptyDay(true) 
      } else {
        setUserInsights(data[0])
      }
    })
    .catch(err => {
      setError(true)
      console.error(err)
    })
    
  }, [isAuthorized, user]);

  useEffect(() => {
    console.log('hidate', convertStringToDate(chosenDate))
    getEntry(router.asPath.includes('demo'), formatDateForDB(convertStringToDate(chosenDate) as Date), data ? data[0].passage_user_id : '')
    .then(data => {
      console.log(data)
      if(data.data) {
        setContentAvailable(true)
      }
    })
    .catch(err => {
      setError(true)
      console.log('here')
      console.error(err)
    })

   return () => { 
      setError(false) 
      setContentAvailable(false)
   }
  }, [chosenDate])

  const goToEntry = () => {
    console.log('chosendate', convertStringToDate(chosenDate))
    updateEntryDate(convertStringToDate(chosenDate));
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

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
            <button onClick={goToEntry} className='bg-grayblue w-60 p-3 m-3 rounded-xl'>
              {`${contentAvailable ? 'Edit' : 'Add'} Today's Data`}
            </button>
          </div>
        </section>
      </div>
      <Navbar logOut={logOut} />
    </div>
  )
}