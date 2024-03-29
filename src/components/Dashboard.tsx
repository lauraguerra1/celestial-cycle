import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserData, AuthProps, Horoscope } from '@/types/types';
import { getTodaysDate } from '@/utils/utils';
import { useRouter } from "next/router";
import { getHoroscope } from '@/utils/apiCalls';
import LoadingGif from './LoadingGif';
import Link from 'next/link';

export default function Dashboard({ isAuthorized, data }: AuthProps) {
  const [user, setUser] = useState<UserData | null>(null);
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

  return (
    <div className='relative h-full flex flex-col fade-in'>
      {loading ? <LoadingGif /> : <RenderDashboard user={user} date={date}/>}
    </div>
  );
}

function RenderDashboard({user, date}: {user: UserData | null, date: Date}) {
  const [error, setError] = useState<boolean>(false);
  const [userInsights, setUserInsights] = useState<Horoscope>();
  const router = useRouter();

  useEffect(() => {
  if (user) {
    getHoroscope(getTodaysDate(new Date()), user?.zodiac_sign)
    .then(data => {
      setUserInsights(data[0]);
    })
    .catch(err => {
      setError(true);
      console.error(err);
    })
  }
},[user]);

  return (
    <div className='h-full'>
      <h1 className='lg:mt-6 mt-20 text-center text-3xl'>Daily Horoscope for {user ? user.name : ''}</h1>
      <h2 className='text-center text-lg'>{getTodaysDate(new Date())}</h2>
      <div className='flex justify-center items-center flex-col mb-20'>
        <Image width={250} height={100} style={{ width: '45%', height: 'auto', maxWidth: '250px' }} alt="Logo" src={`/images/${user ? user.zodiac_sign : 'capricorn'}.png`} priority/>
        <div className='w-3/4 lg:w-1/2 mt-2 border border-white border-1 overflow-scroll rounded-lg px-5 py-1'>
          <p className='md:text-xl'>{error ? "Error loading horoscope, please refresh page" : userInsights?.description}</p>
        </div>
        <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`}`}>
          <button className='bg-grayblue w-60 p-3 m-5 rounded-xl'>View Today&#39;s Insights</button>
        </Link>
      </div>
    </div>
  );
};
