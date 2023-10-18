import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Logo from '@/components/Logo';
import { User } from '@/types/types';
import { getTodaysDate } from '@/utils';
import zodiac from '../images/pisces.png';
import Navbar from '../components/Navbar';
import { insights, userData } from '@/mockdata';
import Router from "next/router";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";

type DashboardProps = {
  isAuthorized: boolean;
  name?: string;
};

export default function Dashboard({ isAuthorized, name }: DashboardProps) {

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    }
  }, [isAuthorized]);
  
  const [user, setUser] = useState<User>(userData)
  const [userInsights, setUserInsights] = useState(insights)
  
  return (
    <div className='relative h-full flex flex-col'>
      <div className='mt-10 h-full'>
        <Logo />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope</h1>
        <h2 className='text-center text-lg'>{getTodaysDate()}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} alt="Logo" src={`/images/${user.data.sign}.png`} />
          <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
            <p>{insights.data.horoscope}</p>
          </div>
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
        // name: data?.[0].name as string,
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
