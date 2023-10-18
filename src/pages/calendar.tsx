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
      <div className='background-text mt-10'>
        <div className='flex items-center justify-between px-5'>
          <p className='text-xl celestial-cursive text-mellow-yellow'>{getTodaysDate(value)}</p>
          <p className='text-xl'>Quater Moon 🌖</p>
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

