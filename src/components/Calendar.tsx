import React, { useEffect } from 'react'
import { AuthProps } from '@/types/types';
import Router from "next/router";
import Navbar from '@/components/Navbar';
import Logo from '@/components/logo';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { getTodaysDate } from '@/utils';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarPage({ isAuthorized }: AuthProps) {
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/"); 
    }
  },[isAuthorized]);

  return (
    <div className='mt-10 h-full fade-in'>
      <Logo />
      <div className='mt-5 flex justify-center'>
        <Calendar onChange={onChange} value={value} />
      </div>
      <div className='background-text mt-5'>
        <div className='flex items-center justify-between px-5 mt-3'>
          <p className='text-xl celestial-cursive text-mellow-yellow'>{getTodaysDate(value)}</p>
          <p className='text-lg'>Quarter Moon 🌖</p>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <Link href='/insights'><button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>View Today&#39;s Insights</button></Link>
          <button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>Add Today&#39;s Data</button>
        </div>
      </div>
      <Navbar/>
    </div>
  )
}