import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    } else {
      getCurrentUser()
        .then((data) => {
          setUser(data)
          checkForUser(userID)
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  const checkForUser = async (userID: string | number) => {
    const res = await fetch('/api/getUsers')
    .then((res) => res.json())
    .then((allIDs) => {
      if (!allIDs.includes(userID) && user) {
        addNewUser(user)
      }
    })
  }

  const addNewUser = async (user: PassageUserInfo ) => {
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