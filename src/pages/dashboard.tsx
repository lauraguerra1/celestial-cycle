import React, { useEffect, useState } from 'react'
import logo from '../../public/images/logo.PNG'
import Image from 'next/image';
import { getTodaysDate, getZodiacSign } from '@/utils';
import Navbar from '../components/Navbar';
import { insights, userData } from '@/mockdata';
import Router from "next/router";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { Passage } from '@passageidentity/passage-js';
import { PassageUserInfo } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';

type DashboardProps = {
  isAuthorized: boolean;
  userID: string | number;
};

const getCurrentUser = async () => {
  dotenv.config();
  const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;

  if (!passageAppId) {
    throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
  }

  const passage = new Passage(passageAppId);
  const user = passage.getCurrentUser();
  const userInfo = await user.userInfo();
  return userInfo
}

export default function Dashboard({ isAuthorized, userID }: DashboardProps) {
  const [user, setUser] = useState<PassageUserInfo | undefined>(undefined);
  // const [userInsights, setUserInsights] = useState(insights)

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    } else {
      getCurrentUser()
        .then((data) => {
          setUser(data)
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [isAuthorized]);

  const updateUser = async (user: PassageUserInfo) => {
    const payload = {
      userID,
      name: user.user_metadata?.name,
      birthday: user.user_metadata?.birthday,
      sign: getZodiacSign(user.user_metadata?.birthday),
    }
    const res = await fetch('/api/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
  };

  // right now this is not the best way to updateUser as it sends the request twice for some reason
  useEffect(() => {
    if (user) {
      updateUser(user)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div className='relative h-full flex flex-col'>
      <div className='mt-10 h-full'>
        <Image className='ml-5' width={300} height={100} alt="Logo" src={logo} />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope {user ? user.user_metadata?.name : ''}</h1>
        <h2 className='text-center text-lg'>{getTodaysDate()}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} alt="Logo" src={`/images/${user ? getZodiacSign(user.user_metadata?.birthday) : 'capricorn'}.png`} />
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
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        userID: '',
      },
    };
  }
}) satisfies GetServerSideProps<DashboardProps>;
