import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData, AuthProps, Horoscope } from '@/types/types';
import { formatUser, getTodaysDate, getZodiacSign  } from '@/utils/utils';
import Navbar from '../components/Navbar';
import { useRouter } from "next/router";
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
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [userInsights, setUserInsights] = useState<Horoscope>();
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [date] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    const addNewUser = async (user: PassageUserInfo) => {
      const formattedUser = formatUser(user);
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
          router.push("/registrationform");
        } else {
          console.log('Error:', res.statusText);
          setServerError(true);
        }
      } catch (err) {
        console.error(err);
        setServerError(true)
      }
    };

    const getCurrentUserInfo = async (userID: string | number) => {
      const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;
    
      if (!passageAppId) {
        throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
      }
      if (userID !== 'ABrrCENR3M0I6XZ7NLA7gNCY') {
        const passage = new Passage(passageAppId);
        const userPass = passage.getCurrentUser();
        const userInfo = await userPass.userInfo();
        const isUserInSupaBase = await checkForUser()
        if (userInfo && !isUserInSupaBase) {
          addNewUser(userInfo);
        }
        else {
          setServerError(true);
        }
      }
    }

    if (!isAuthorized) {
      router.push("/");
    } 
    else if (data && data.length) {
      setUser(data[0]);
      setLoading(false);
    } 
    else if (data && !data.length) {
      getCurrentUserInfo(userID);
    }
  }, [isAuthorized, data, userID, router]);

  useEffect(() => {
    if (user) {
      getHoroscope(getTodaysDate(new Date()), user?.zodiac_sign as string)
      .then(data => {
        setUserInsights(data[0]);
      })
      .catch(err => {
        setError(true);
        console.error(err);
      })
    }
  },[user])

  const checkForUser = async () => {
    try {
      const res = await fetch(`/api/getUser`);
      const parsed = await res.json();
      if (!parsed.length) {
        return false;
      }
      return true;
    }
    catch (err) {
      console.error(err);
      setServerError(true);
    }
  }

  const renderDashboard = () => {
    return (
      <div className='mt-10 h-full'>
      <CelestialLogo />
      <h1 className='mt-7 text-center text-3xl'>Daily Horoscope for {user ? user.name : ''}</h1>
      <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
      <div className='flex justify-center items-center flex-col mb-28'>
        <Image width={250} height={100} style={{ width: '60%', height: 'auto', maxWidth: '300px' }} alt="Logo" src={`/images/${user ? user.zodiac_sign : 'capricorn'}.png`} priority/>
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
