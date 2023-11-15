import React, { useEffect, useState, useRef } from 'react';
import { UserData, Horoscope, selectionType, AuthProps } from '@/types/types';
import { convertStringToDate, formatDateForDB } from '@/utils/utils';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import CelestialLogo from './CelestialLogo';
import { getInsights, getEntry } from '@/utils/apiCalls';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import Image from 'next/image';
import DatePicker from './DatePicker';
import LoadingGif from './LoadingGif';

type InsightsProps = AuthProps & {
  updateEntryDate: (date: Value) => void;
  selections: selectionType;
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>;
};

export default function Insights({ isAuthorized, data, updateEntryDate, selections, setSelections }: InsightsProps) {
  const router = useRouter();
  const { date } = router.query;
  const user = data?.[0] ?? null;
  const [error, setError] = useState<boolean>(false)
  const [emptyDay, setEmptyDay] = useState<boolean>(false)
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null)
  const [insights, setInsights] = useState<any>();
  const [chosenDate, setChosenDate] = useState<string>(date as string)
  const [loading, setLoading] = useState<boolean>(false)
  const loadOnce = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized, router]);

  useEffect(() => {
    if (loadOnce.current === chosenDate) {
      return;
    }

    loadOnce.current = chosenDate;

    async function loadPageData() {
      setLoading(true);
      try {
        const response = await getInsights(chosenDate);
        setEmptyDay(!response.insights && !response.horoscope)
        setInsights(response.insights ?? null)
        setHoroscope(response.horoscope ?? null)
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    }

    const getFormData = async () => {
      setLoading(true);
      try {
        const entryInfo = await getEntry(false, formatDateForDB(convertStringToDate(chosenDate)));

        if (entryInfo.data) {
          setSelections({ FLOW: entryInfo.data.flow, MOOD: entryInfo.data.mood, CRAVINGS: entryInfo.data.craving });
        } else {
          setSelections({ FLOW: null, MOOD: null, CRAVINGS: null });
        }
      } catch (err) {
        if (err instanceof Error) setError(true);
      }
      setLoading(false);
    };

    getFormData().then(loadPageData);

    return () => {
      setError(false);
    }

  }, [user, date, chosenDate, setSelections, router, data]);

  const goToEntry = () => {
    updateEntryDate(convertStringToDate(chosenDate));
    router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/form`);
  };

  const userEmojis = (selections: selectionType) => {
    return Object.keys(selections).map(type => {
      return selections[type] && <div className='flex flex-col' key={type}>
        <div className={`${'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className={'rounded-bl-xl w-5/6 h-5/6'} src={`/images/FormIcons/${selections[type]}.png`} alt={selections[type] || ""} />
        </div>
        <p className='min-w-max text-white thin-regular'>{selections[type]}</p>
      </div>
    })
  }

  return (
    <div className='relative h-full flex flex-col fade-in'>
      <div className='mt-10 h-full'>
        <CelestialLogo />
        <DatePicker setChosenDate={setChosenDate} entryDate={convertStringToDate(date as string) as Date} updateEntryDate={updateEntryDate} />
        <h2 className='text-center celestial-cursive text-xl mt-10'>Today&#39;s Insights</h2>
        <section className='insights mt-5 overflow-y-auto'>
          <div className='flex justify-end mt-3 mr-5'>
            <p className='text-lg'>{getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).emoji} {getCurrentLunarPhase(convertStringToDate(chosenDate) as Date).description}</p>
          </div>
          <div className='p-5 insights-text text-lg'>
            {error ? "Error loading insights, please refresh the page" :
              emptyDay ? "No insights loaded for this date, try a later date" :
                loading ? <LoadingGif /> : 
                  insights?.description ?? (<HoroscopeOnly horoscope={horoscope} />)}
          </div>
          <div className='flex justify-between mx-10 mt-3'>
            {userEmojis(selections)}
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
  );
}

function HoroscopeOnly({ horoscope }: { horoscope?: Horoscope | null }) {
  return (
    <div>
      <p>{horoscope?.description}</p>
      <p className='mt-3 font-black'>✨ Add data for more insights ✨</p>
    </div>
  );
}