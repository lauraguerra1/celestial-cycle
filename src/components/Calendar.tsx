import React, { useEffect } from 'react';
import { AuthProps, ComponentProps } from '@/types/types'
import Router, { useRouter } from "next/router";
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { getTodaysDate } from '@/utils/utils';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import CelestialLogo from '@/components/CelestialLogo';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export type CalendarProps = ComponentProps & {
  updateEntryDate: (date: Value) => void;
};

export default function CalendarPage({ isAuthorized, data, logOut, updateEntryDate }: CalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [date, setDate] = useState<string>("")
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

  const goToEntry = () => {
    updateEntryDate(value);
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

  return (
    <div className='mt-10 h-full fade-in'>
      <CelestialLogo />
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
          {/* <button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>Add Today&#39;s Data</button> */}
          {/* <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/insights`}>
            <button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>View Today&#39;s Insights</button>
          </Link> */}
          <button onClick={goToEntry} className='bg-grayblue w-60 p-3 m-3 rounded-xl'>
            Add Today&#39;s Data
          </button>
        </div>
      </div>
      <Navbar logOut={logOut} />
    </div>
  );
}
