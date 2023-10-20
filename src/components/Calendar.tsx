import React, { useEffect } from 'react';
import { AuthProps, ComponentProps } from '@/types/types'
import Router, { useRouter } from "next/router";
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { formatDateForDB, getTodaysDate } from '@/utils/utils';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import CelestialLogo from '@/components/CelestialLogo';
import { getEntry } from '@/utils/apiCalls';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export type CalendarProps = ComponentProps & {
  updateEntryDate: (date: Value) => void;
  entryDate: Date
};

export default function CalendarPage({ isAuthorized, data, logOut, updateEntryDate, entryDate }: CalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [date, setDate] = useState<string>("")
  const [error, setError] = useState<boolean>(false);
  const [contentAvailable, setContentAvailable] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      Router.push('/');
    }
  },[]);

  useEffect(() => {
    const d = value as Date
    setDate(`${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`)
    console.log('date', `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}` )
  },[value])

  useEffect(() => {
    getEntry(router.asPath.includes('demo'), formatDateForDB(value as Date), data ? data[0].passage_user_id : '')
    .then(data => {
      console.log(data)
      if(data.data) {
        setContentAvailable(true)
      }
    })
    .catch(err => {
      setError(true)
      console.error(err)
    })

   return () => { 
      setError(false) 
      setContentAvailable(false)
   }
  }, [value])

  const goToEntry = () => {
    updateEntryDate(value);
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

  return (
    <div className='mt-10 h-full fade-in'>
      <CelestialLogo />
      {error && 'There was an error getting todays data, please refresh'}
      <div className='mt-5 flex justify-center'>
        <Calendar onChange={onChange} value={value} maxDate={new Date()}/>
      </div>
      <div className='background-text mt-5'>
        <div className='flex items-center justify-between px-5 mt-3'>
          <p className='text-xl celestial-cursive text-mellow-yellow'>{getTodaysDate(value)}</p>
          <p className='text-lg'>{getCurrentLunarPhase(value as Date).emoji} {getCurrentLunarPhase(value as Date).description}</p>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${date}`}><button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>View Today&#39;s Insights</button></Link>
          <button onClick={goToEntry} className='bg-grayblue w-60 p-3 m-3 rounded-xl'>
            {`${contentAvailable ? 'Edit' : 'Add'} Today's Data`}
          </button>
        </div>
      </div>
      <Navbar logOut={logOut} />
    </div>
  );
}
