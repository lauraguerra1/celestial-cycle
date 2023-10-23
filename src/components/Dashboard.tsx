import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { UserData, AuthProps, Horoscope } from '@/types/types';
import { getTodaysDate, getZodiacSign  } from '@/utils/utils';
import Navbar from '../components/Navbar';
import Router, { useRouter } from "next/router";
import CelestialLogo from '@/components/CelestialLogo';
import { getHoroscope } from '@/utils/apiCalls';
import { PassageUserInfo } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import { Passage } from '@passageidentity/passage-js';
import LoadingGif from './LoadingGif';
import Link from 'next/link';
dotenv.config();

export type DashboardProps = AuthProps & {
  userID: string | number;
};

export default function Dashboard({ isAuthorized, userID, data }: DashboardProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<Horoscope>()
  const [loading, setLoading] = useState(true)
  const [serverError, setServerError] = useState(false)
  const [date, setDate] = useState<Date>(new Date())
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      Router.push("/");
    } 
    else if (data && data.length) {
      setUser(data[0])
      setLoading(false)
    } 
    else if (data && !data.length) {
      getCurrentUserInfo(userID)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  useEffect(() => {
    if (user) {
      getHoroscope(getTodaysDate(new Date()), user?.zodiac_sign as string)
      .then(data => {
        setUserInsights(data[0])
      })
      .catch(err => {
        setError(true)
      })
    }
  },[user])

  const getCurrentUserInfo = async (userID: string | number) => {
    const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;
  
    if (!passageAppId) {
      throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
    }
    if (userID !== 'ABrrCENR3M0I6XZ7NLA7gNCY') {
      const passage = new Passage(passageAppId);
      const userPass = passage.getCurrentUser();
      const userInfo = await userPass.userInfo();
      const isUserInSupaBase = await checkForUser(userID)
      if (userInfo && !isUserInSupaBase) {
        addNewUser(userInfo)
      }
      else {
        setServerError(true)
      }
    }
  }

  const checkForUser = async (userID: string | number) => {
    try {
      const res = await fetch(`/api/getUser?userID=${userID}`)
      const parsed = await res.json()
      if (!parsed.length) {
        return false
      }
      return true
    }
    catch (err) {
      setServerError(true)
    }
  }

  const formatUser = (user: PassageUserInfo) => {
    return {
      name: user.user_metadata?.name,
      email: user.email,
      birth_date: user.user_metadata?.birthday,
      passage_user_id: userID,
      zodiac_sign: getZodiacSign(user.user_metadata?.birthday),
    }
  } 

  const addNewUser = async (user: PassageUserInfo) => {
    const formattedUser = formatUser(user)
    try {
      const res = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedUser),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data[0])
        Router.push("/registrationform");
      }
    } catch (err) {
      setServerError(true)
    }
  };

  const renderDashboard = () => {
    return (
      <div className='mt-10 h-full'>
      <CelestialLogo />
      <h1 className='mt-7 text-center text-3xl'>Daily Horoscope for {user ? user.name : ''}</h1>
      <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
      <div className='flex justify-center items-center flex-col mb-28'>
        <Image width={250} height={100} style={{ width: '60%', height: 'auto' }} alt="Logo" src={`/images/${user ? user.zodiac_sign : 'capricorn'}.png`} priority/>
        <div className='w-2/3 h-45 mt-2 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
          <p>{error ? "Error loading horoscope, please refresh page" : 
            !loading? userInsights?.description : <LoadingGif />}</p>
        </div>
        <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`}`}><button className='bg-grayblue w-60 p-3 m-5 rounded-xl'>View Today&#39;s Insights</button></Link>
      </div>
    </div>
    )
  }

  return (
    <div className='relative h-full flex flex-col fade-in'>
      {loading ? <LoadingGif /> : renderDashboard()}
      {serverError && <p>Sorry, there seems to be an issue with our server at the moment, try again later!</p>}
      <Navbar />
    </div>
  );
}
