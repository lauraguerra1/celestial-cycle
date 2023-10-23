import React, { useEffect, useState } from 'react';
import { UserData, Horoscope, selectionType, AuthProps } from '@/types/types';
import { convertStringToDate } from '@/utils/utils';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import CelestialLogo from './CelestialLogo';
import { getHoroscope } from '@/utils/apiCalls';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Image from 'next/image';
import DatePicker from './DatePicker';
import LoadingGif from './LoadingGif';

type InsightsProps = AuthProps & {
  updateEntryDate: (date: Value) => void;
  selections: selectionType
};

export default function Insights({ isAuthorized, data, updateEntryDate, selections }: InsightsProps) {
  const router = useRouter();
  const { date } = router.query;
  const [user, setUser] = useState<UserData | null>(null)
  const [error, setError] = useState<boolean>(false)
  const [emptyDay, setEmptyDay] = useState<boolean>(false)
  const [userInsights, setUserInsights] = useState<Horoscope>()
  const [chosenDate, setChosenDate] = useState<string>(date as string)
  const [loading, setloading] = useState<boolean>(false)
  
  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    }
    setloading(true)

    if (data) setUser(data[0])
    if (user) getHoroscope(chosenDate, user?.zodiac_sign as string)
    .then((data) => {
      
      if (data.length === 0) {
        setEmptyDay(true)
        setloading(false)
      } else {
        setUserInsights(data[0])
        setloading(false)
      }
    })
    .catch(err => {
      setError(true)
    })

    return () => {
      setloading(false)
      setError(false)
      setEmptyDay(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, user, date]);

  const goToEntry = () => {
    updateEntryDate(convertStringToDate(chosenDate));
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

  return (
    <div className='relative h-full flex flex-col fade-in'>
      <div className='mt-10 h-full'>
        <CelestialLogo />
        <DatePicker setChosenDate={setChosenDate} entryDate={convertStringToDate(date as string) as Date} updateEntryDate={updateEntryDate}/>
        <h2 className='text-center celestial-cursive text-xl mt-10'>Today&#39;s Insights</h2>
        <section className='insights mt-5 overflow-y-auto'>
          <div className='flex justify-end mt-3 mr-5'>
            <p className='text-lg'>{getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).emoji} {getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).description}</p>
          </div>
          <div className='p-5 insights-text text-lg'>
            {error ? "Error loading insights, please refresh the page" : 
              emptyDay ? "No insights loaded for this date, try a later date" : 
              loading? <LoadingGif /> : userInsights?.description}
          </div>
            <div className='flex justify-between mx-10 mt-3'>
            {selections.FLOW && <div className='flex flex-col'>
              <div className={`${'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
                <Image width={64} height={64} className={'rounded-bl-xl w-5/6 h-5/6'} src={`/images/FormIcons/${selections.FLOW}.png`} alt={selections.FLOW} />
              </div>
              <p className='min-w-max text-white thin-regular'>{selections.FLOW}</p>
            </div>}
            {selections.MOOD && <div className='flex flex-col'>
              <div className={`${'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
                <Image width={64} height={64} className={'rounded-bl-xl w-5/6 h-5/6'} src={`/images/FormIcons/${selections.MOOD}.png`} alt={selections.MOOD} />
              </div>
              <p className='min-w-max text-white thin-regular'>{selections.MOOD}</p>
            </div>}
            {selections.CRAVINGS && <div className='flex flex-col'>
              <div className={`${'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
                <Image width={64} height={64} className={'rounded-bl-xl w-5/6 h-5/6'} src={`/images/FormIcons/${selections.CRAVINGS}.png`} alt={selections.CRAVINGS} />
              </div>
              <p className='min-w-max text-white thin-regular'>{selections.CRAVINGS}</p>
            </div>}
          </div>
          <div className='flex justify-center'>
            <button onClick={goToEntry} className='bg-grayblue w-60 p-3 m-3 rounded-xl'>
            {`${selections.FLOW || selections.CRAVINGS || selections.MOOD ?
            "Edit" : "Add"} Today's Data`}
            </button>
          </div>
        </section>
      </div>
      <Navbar />
    </div>
  )
}