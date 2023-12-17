import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import { AuthProps, selectionType } from '@/types/types';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { formatDateForDB } from '@/utils/utils';
import { getEntry, postEntry } from '@/utils/apiCalls';
import CelestialLogo from '@/components/CelestialLogo';
import LoadingGif from './LoadingGif';
import DatePicker from './DatePicker';

// add arrows so user knows to scroll
// fix weird width and left align options
// save button elsewhere for more intuitive UI

export type FormProps = AuthProps & {
  entryDate: Date;
  updateEntryDate: (date: Date) => void;
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>;
  selections: selectionType;
};

const Form = ({ entryDate, isAuthorized, data, updateEntryDate, selections, setSelections }: FormProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [symptoms, setSymptoms] = useState('');

  const updateSelections = (title: string, option: string): void => {
    const newOption = title === option ? null : option;
    setSelections((prev) => ({ ...prev, [title]: newOption }));
  };

  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.push('/');
    }
    const getFormData = async () => {
      setLoading(true);
      try {
        const entryInfo = await getEntry(router.asPath.includes('demo'), formatDateForDB(entryDate as Date));

        if (entryInfo.data) {
          setSelections({ FLOW: entryInfo.data.flow, MOOD: entryInfo.data.mood, CRAVINGS: entryInfo.data.craving });
          setSymptoms(entryInfo.data.symptom ?? '');
        } else {
          setSelections({ FLOW: null, MOOD: null, CRAVINGS: null });
          setSymptoms('');
        }
      } catch (error) {
        if (error instanceof Error) setError(error);
      }
      setLoading(false);
    };
    getFormData();

    return () => setError(null);
  }, [isAuthorized, entryDate, data, router, setSelections]);

  const postForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const infoOptions = [...Object.values(selections), symptoms];
    try {
      if (infoOptions.every((option) => !option)) {
        throw new Error('Please input something to save!');
      }
      await postEntry(router.asPath.includes('demo'), {
        flow: selections.FLOW,
        craving: selections.CRAVINGS,
        mood: selections.MOOD,
        symptom: symptoms,
        date: `${new Date(entryDate).getFullYear()}-${new Date(entryDate).getMonth() + 1}-${new Date(entryDate).getDate()}`,
      });
      setError(null);
      router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/insights/${new Date(entryDate).getMonth()+1}-${new Date(entryDate).getDate()}-${new Date(entryDate).getFullYear()}`);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  return (
    <div className='fade-in'>
      <div className='flex flex-col items-center'>
        <div className={`w-full fixed top-10 z-10 lg:top-0 ${scrolling ? 'bg-deepblue' : ''}`}>
          <DatePicker updateEntryDate={updateEntryDate} entryDate={entryDate} />
        </div>
        {error && <p className='thick-regular text-center'>{error.message}</p>}
        {loading ? <LoadingGif /> : (
          <form onSubmit={e => postForm(e)}>
            <div className='flex justify-between m-3'>
              <h2 className='celestial-cursive text-mellow-yellow text-xl'>Add Data</h2>
              <button className='rounded-lg bg-opacity-6 bg-grayblue w-40' type="submit">
                SAVE
              </button>
            </div>
            <div className='grid added-height pt-2' style={{ background: 'rgba(37, 54, 86, 0.73)' }}>
              <div>
                <h3 className='ml-2 text-white thick-regular'>FLOW</h3>
                <div className={`${styles['scroll-area-no-track']}` + ' flex max-w-100vw overflow-x-auto justify-between'}>
                  <FlowOptions selections={selections} updateSelections={updateSelections}/>
                </div>
              </div>
              <div>
                <h3 className='ml-2 text-white thick-regular'>MOOD</h3>
                <div className={`${styles['scroll-area-no-track']}` + ' flex max-w-100vw overflow-x-auto justify-between'}>
                  <MoodOptions selections={selections} updateSelections={updateSelections}/>
                </div>
              </div>
              <div>
                <h3 className='ml-2 text-white thick-regular'>CRAVINGS</h3>
                <div className={`${styles['scroll-area-no-track']}` + ' flex max-w-100vw overflow-x-auto justify-between'}>
                  <CravingsOptions selections={selections} updateSelections={updateSelections}/>
                </div>
              </div>
              <textarea
                className='justify-self-center mt-2 bg-opacity-20 bg-gray-400 w-2/3 text-white w-10/12 md:w-1/3 p-2 rounded-xl mb-24'
                placeholder='Enter notes about any symptoms here...'
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}/>
            </div>
        </form>
      )}
      </div>
    </div>
  );
};


function FlowOptions({ selections, updateSelections }: {selections: selectionType, updateSelections: (title: string, option: string)=> void}) {
  const flows = ['No Flow', 'Spotting', 'Light', 'Medium', 'Heavy', 'Super'];

  return flows.map(flow => {
    return(
      <button type="button" key={flow} onClick={() => updateSelections("FLOW", flow)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.FLOW === flow ? `${styles['selected-option']}` : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${flow}.png`} alt={flow} />
        </div>
        <p className='min-w-max text-white thin-regular'>{flow}</p>
      </button>
    );
  });
}

function MoodOptions({ selections, updateSelections }: { selections: selectionType, updateSelections: (title: string, option: string)=> void}) {
  const moods = ['Angry', 'Annoyed', 'Anxious', 'Confident', 'Depressed', 'Fatigued', 'Grateful', 'Happy', 'Relaxed'];

  return moods.map(mood => {
    return(
      <button type="button" key={mood} onClick={() => updateSelections("MOOD", mood)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.MOOD === mood ? `${styles['selected-option']}` : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${mood}.png`} alt={mood} />
        </div>
        <p className='min-w-max text-white thin-regular'>{mood}</p>
      </button>
    );
  });
}

function CravingsOptions({ selections, updateSelections }: {selections: selectionType, updateSelections: (title: string, option: string)=> void}) {
  const cravings = ['Alcohol', 'Carbs', 'Chocolate', 'Dairy', 'Fats', 'Fried', 'Nicotine', 'Protein', 'Salty', 'Sour', 'Sweet'];

  return cravings.map(craving => {
    return(
      <button type="button" key={craving} onClick={() => updateSelections("CRAVINGS", craving)} className='m-5 w-14 flex justify-content flex-col items-center'>
        <div className={`${selections.CRAVINGS === craving ? `${styles['selected-option']}` : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
          <Image width={64} height={64} className='w-5/6 h-5/6' src={`/images/FormIcons/${craving}.png`} alt={craving} />
        </div>
        <p className='min-w-max text-white thin-regular'>{craving}</p>
      </button>
    );
  });
}

export default Form;