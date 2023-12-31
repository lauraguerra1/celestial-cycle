import React, { useEffect, useState } from 'react';
import { AuthProps, selectionType } from '@/types/types'
import { useRouter } from "next/router";
import Navbar from '@/components/Navbar';
import Calendar from 'react-calendar';
import { formatDateForDB, formatDateQuery, getTodaysDate } from '@/utils/utils';
import 'react-calendar/dist/Calendar.css';
import Link from 'next/link';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import { getEntry } from '@/utils/apiCalls';

type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type CalendarProps = AuthProps & {
  updateEntryDate: (date: Value) => void;
  selections: selectionType
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>
};

export default function CalendarPage({ isAuthorized, data, updateEntryDate, selections, setSelections }: CalendarProps) {
  const [value, onChange] = useState<Value>(new Date());
  const [date, setDate] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.push('/');
    }

    setDate(formatDateQuery(value as Date, 0));
  },[isAuthorized, router, value]);

  useEffect(() => {
    getEntry(router.asPath.includes('demo'), formatDateForDB(value as Date))
    .then(entryInfo => {
      if (entryInfo.data) {
        setSelections({ FLOW: entryInfo.data.flow, MOOD: entryInfo.data.mood, CRAVINGS: entryInfo.data.craving });
      } else {
        setSelections({ FLOW: null, MOOD: null, CRAVINGS: null });
      }
    })
    .catch(err => {
      setError(true);
      console.error(err);
    });

   return () => { 
      setError(false);
   }
  }, [value, setSelections, router, data]);

  const goToEntry = () => {
    updateEntryDate(value);
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

  return (
    <div className='mt-20 lg:mt-6 h-full fade-in flex items-center flex-col'>
      {error && 'There was an error getting todays data, please refresh'}
      <div className='mt-5 flex justify-center'>
        <Calendar onChange={onChange} value={value} maxDate={new Date()}/>
      </div>
      <div className='h-96 bg-medblue flex flex-col mt-5 w-full'>
        <div className='flex items-center justify-around px-5 flex-col lg:flex-row mt-10'>
          <p className='text-xl celestial-cursive text-mellow-yellow'>{getTodaysDate(value)}</p>
          <p className='text-lg'>{getCurrentLunarPhase(value as Date).emoji} {getCurrentLunarPhase(value as Date).description}</p>
        </div>
        <div className='flex flex-col items-center mt-10'>
          <Link href={`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${date}`}><button className='bg-grayblue w-60 p-3 m-3 rounded-xl'>View Today&#39;s Insights</button></Link>
          <button onClick={goToEntry} className='bg-grayblue w-60 p-3 m-3 rounded-xl'>
            {`${selections.FLOW || selections.CRAVINGS || selections.MOOD ?
            "Edit" : "Add"} Today's Data`}
          </button>
        </div>
      </div>
      <Navbar/>
    </div>
  );
}