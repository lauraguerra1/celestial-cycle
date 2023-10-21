import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import { formSections, getTodaysDate } from '@/utils/utils';
import { AuthProps, UserData, selectionType } from '@/types/types';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { useRouter } from 'next/router';
import { formatDateForDB } from '@/utils/utils';
import { getEntry, postEntry } from '@/utils/apiCalls';
import CelestialLogo from '@/components/CelestialLogo';
import LoadingGif from './LoadingGif';
import DatePicker from './DatePicker';

export type FormProps = AuthProps & {
  entryDate: Date;
  updateEntryDate: (date: Date) => void;
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>
  selections: selectionType
};

const Form = ({ entryDate, isAuthorized, data, updateEntryDate, selections, setSelections }: FormProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.push('/');
    }
    const getFormData = async () => {
      setLoading(true);
      try {
        const entryInfo = await getEntry(router.asPath.includes('demo'), formatDateForDB(entryDate), data ? data[0].passage_user_id : '');
        console.log({ entryInfo });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, entryDate]);

  const postForm = async () => {
    const infoOptions = [...Object.values(selections), symptoms];
    try {
      if (infoOptions.every((option) => !option)) {
        throw new Error('Please input something to save!');
      }
      const postedRes = await postEntry(router.asPath.includes('demo'), 'addEntry', {
        flow: selections.FLOW,
        craving: selections.CRAVINGS,
        mood: selections.MOOD,
        symptom: symptoms,
        user_id: data ? data[0].passage_user_id : '',
        date: `${new Date(entryDate).getFullYear()}-${new Date(entryDate).getMonth() + 1}-${new Date(entryDate).getDate()}`,
      });
      setError(null);
      router.push(`${router.asPath.includes('demo') ? '/demo' : ''}/insights`);
    } catch (error) {
      if (error instanceof Error) setError(error);
    }
  };

  const updateSelections = (title: string, option: string) => {
    const newOption = selections[title] === option ? null : option;
    setSelections((prev) => ({ ...prev, [title]: newOption }));
  };

  const formEls = formSections.map((section) => {
    let allOptions = section.options.map((option) => {
      return (
        <button key={option} onClick={() => updateSelections(section.title, option)} className='m-5 w-14 flex justify-content flex-col items-center'>
          <div className={`${selections[section.title] === option ? `${styles['selected-option']}` : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
            <Image width={64} height={64} className={`${option === 'Confident' ? 'rounded-bl-xl' : ''}` + ' w-5/6 h-5/6'} src={`/images/FormIcons/${option}.png`} alt={option} />
          </div>
          <p className='min-w-max text-white thin-regular'>{option}</p>
        </button>
      );
    });

    return (
      <div key={section.title}>
        <h3 className='ml-2 text-white thick-regular'>{section.title}</h3>
        <div className={`${styles['scroll-area-no-track']}` + ' flex max-w-100vw overflow-x-auto justify-between'}>{allOptions}</div>
      </div>
    );
  });

  return (
    <div className='mt-10 h-full fade-in'>
          <div className='form-page'>
            <CelestialLogo />
            <DatePicker updateEntryDate={updateEntryDate} entryDate={entryDate} />
      {error && <p className='thick-regular text-center'>{error.message}</p>}
      {loading ? <LoadingGif /> : (
        <>
            <div className='flex justify-between m-3'>
              <h2 className='celestial-cursive text-mellow-yellow text-xl'>Your Data</h2>
              <button className='rounded-lg bg-opacity-6 bg-grayblue w-40' onClick={postForm}>
                SAVE
              </button>
            </div>
            <div className='grid added-height pt-2' style={{ background: 'rgba(37, 54, 86, 0.73)' }}>
              {formEls}
              <input
                type='textarea'
                className='justify-self-center mt-2 bg-opacity-20 bg-gray-400 text-center text-white h-24 w-10/12 p-2 rounded-xl mb-20'
                placeholder='Enter notes about any symptoms here...'
                value={symptoms}
                onChange={(e) => {
                  setSymptoms(e.target.value);
                }}
              />
            </div>
        </>
      )}
      </div>
      <Navbar />
    </div>
  );
};

export default Form;
