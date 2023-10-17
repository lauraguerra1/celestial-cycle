import React, { useState } from 'react'
import logo from '../images/logo.PNG'
import Image from 'next/image';
import { User } from '@/types/types';
import { getTodaysDate } from '@/utils';
import zodiac from '../images/pisces.png';
import Navbar from './Navbar';

interface HomepageProps {
  user: User
}

const Homepage = ({ user }: HomepageProps) => {

  return (
    <div className='relative h-full flex flex-col'>
      <div className='mt-10 h-full'>
        <Image className='ml-5' width={300} height={100} alt="Logo" src={logo} />
        <h1 className='mt-7 text-center text-3xl'>Daily Horoscope</h1>
        <h2 className='text-center text-lg'>{getTodaysDate()}</h2>
        <div className='flex justify-center items-center flex-col'>
          <Image width={250} height={100} alt="Logo" src={zodiac} />
          <div className='w-2/3 h-45 mt-5 border border-white border-1 overflow-scroll rounded-lg'>
            <p>Spend time with the lover to share emotions and passion. Stay away from confrontations at the workplace and ensure you accomplish all assigned tasks. No major illness will disturb you today. You will also be good in terms of wealth.

              Pisces Love Horoscope Today
              Understand the feelings of the lover and this will help you strengthen the relationship. Do not let professional pressure impact your love life. Spare time for the lover and indulge in romantic acts which will strengthen the bonding. Those who have fallen in love in recent days must reaffirm their passion through words and actions. Avoid new relationships when you are already committed to someone.

              Pisces Career Horoscope Today
              Be innovative at team meetings and do not hesitate to give your opinions. Some Pisces natives will be successful in winning new contracts, financially benefitting the organization. Those Gemini natives who are team leaders or managers need to be diplomatic while handling team affairs today. In case you are in the notice period, expect new interview calls. Some businessmen will have trouble with partners. Maintain a cordial relationship with partners and try to solve every issue amicably.

              Pisces Money Horoscope Today
              No financial troubles are visible today and this means you can comfortably spend on luxury. Some females will be happy shopping for fashion accessories. The first half of the day is good to buy a new property or start renovating the house. Despite minor health issues, you don’t need to spend high on medical reasons. Businessmen will find funds to plan expansion.</p>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Homepage