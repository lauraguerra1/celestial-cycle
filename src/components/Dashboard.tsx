import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData, AuthProps, Horoscope } from '@/types/types';
import { getTodaysDate } from '@/utils/utils';
import Navbar from '../components/Navbar';
import { useRouter } from "next/router";
import CelestialLogo from '@/components/CelestialLogo';
import { getHoroscope } from '@/utils/apiCalls';
import LoadingGif from './LoadingGif';
import Link from 'next/link';

export default function Dashboard({ isAuthorized, data }: AuthProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [userInsights, setUserInsights] = useState<Horoscope>();
  const [loading, setLoading] = useState(true);
  const [date] = useState<Date>(new Date());
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    } 
    else if (data?.length) {
      setUser(data[0]);
      setLoading(false);
    } 
  }, [isAuthorized, data, router]);

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
  },[user]);

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
      <Navbar />
    </div>
  );
}
