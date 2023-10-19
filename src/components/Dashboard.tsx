import React, { useEffect, useRef, useState } from 'react'
import logo from '../../public/images/logo.PNG'
import Image from 'next/image';
import { getTodaysDate, getZodiacSign } from '@/utils';
import Navbar from '../components/Navbar';
import { insights } from '@/mockdata';
import Router from "next/router";
import { Passage } from '@passageidentity/passage-js';
import { PassageUserInfo } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import { AuthProps } from '@/types/types';

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

export default function Dashboard({ isAuthorized, userID }: AuthProps) {
  const [user, setUser] = useState<PassageUserInfo | undefined>(undefined);
  // const [userInsights, setUserInsights] = useState(insights)
  const hasUpdatedUser = useRef(false);

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
      email: user.email,
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

// other way to check this would be to check if the user exists in the supabase "users" table, if not, add them

  useEffect(() => {
    if (user) {
      if (!hasUpdatedUser.current) {
        updateUser(user);
        hasUpdatedUser.current = true; // Set the flag to true once it has run
      } else {
        // Handle the case when a new user is received
        // You can reset the flag or perform any other necessary actions
        hasUpdatedUser.current = false;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='relative h-full flex flex-col'>
      <div className='mt-10 h-full'>
        <Image className='ml-5' width={300} height={100} style={{ width: '100%', height: 'auto' }} alt="Logo" src={logo} />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope {user ? user.user_metadata?.name : ''}</h1>
        <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} style={{ width: '80%', height: 'auto' }} alt="Logo" src={`/images/${user ? getZodiacSign(user.user_metadata?.birthday) : 'capricorn'}.png`} priority/>
          <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
            <p>{insights.data.horoscope}</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}