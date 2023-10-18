import React, { useEffect } from 'react'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { DashboardProps } from '@/types/types';
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

export default function CalendarPage({ isAuthorized, data }: DashboardProps) {
  const [value, onChange] = useState<Value>(new Date());

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/"); 
    }

    console.log(data)
  },[]);

  useEffect(() => {
    console.log('date', getTodaysDate(value))
  },[value])

  return (
    <div className='mt-10 h-full'>
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
          <Link href='/insights'><button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>View Today's Insights</button></Link>
          <button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>Add Today's Data</button>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    const { data } = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps.userID);
    console.log(data);
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        data: data,
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
      },
    };
  }
}) satisfies GetServerSideProps<DashboardProps>;

