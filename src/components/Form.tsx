import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import Logo from '@/components/logo';
import { selectionType } from '@/types/types';
import { formSections } from '@/utils';
import { useEffect } from 'react';
import { ComponentProps } from '@/types/types';
import Navbar from './Navbar';
import { postEntry } from '@/utils/apiCalls';
import { useRouter } from 'next/router';

export type FormProps = ComponentProps & {
  entryDate: Date, 
  updateEntryDate: (date: Date) => void
  logOut: () => void
}

const Form = ({ entryDate, logOut, isAuthorized, data}: FormProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [selections, setSelections] = useState<selectionType>({ FLOW: null, MOOD: null, CRAVINGS: null });
  const router = useRouter();
  
  useEffect(() => {
    if (!isAuthorized) {
      router.push('/');
    }

    //need to set the user to data[0] or should this happen only once in dashboard and iether pass around user or use context ?? 
    // return () => setError(null)
  }, [isAuthorized]);

  
  useEffect(() => { 
    console.log('entrydate', entryDate)
    console.log('new date', `${new Date(entryDate).getFullYear()}-${new Date(entryDate).getMonth()}-${new Date(entryDate).getDate()}`)
    console.log('isAuthorized', isAuthorized)
    console.log('data', data)
    
    //need to make api call to get entry for this user and date if there already is one 
  }, [])

  const postForm = async () => {
    try {
      const postedRes = await postEntry(router.asPath.includes('demo'), 'addEntry', {
        flow: selections.FLOW,
        craving: selections.CRAVINGS,
        mood: selections.MOOD,
        symptom: symptoms,
        user_id:  data ? data[0].passage_user_id : '',
        date: `${new Date(entryDate).getFullYear()}-${new Date(entryDate).getMonth() + 1}-${new Date(entryDate).getDate()}`
      })
      console.log('postedRes', postedRes)
    } catch (error) {
      console.log('error', error)
      //if(error instanceof Error) setError(error)
    }
  }
  
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
        <Logo />
        <h1 className='thin-regular text-center text-mellow-yellow text-2xl'>{entryDate.toString()}</h1>
        <div className='flex justify-between'>
          <h2 className='celestial-cursive text-mellow-yellow text-xl'>Your Data</h2>
          <button className='rounded-lg bg-opacity-6 bg-grayblue w-40' onClick={postForm}>SAVE</button>
        </div>
        <div className='px-2 grid added-height' style={{ background: 'rgba(37, 54, 86, 0.73)' }}>
          {formEls}
          <input type='textarea' className='justify-self-center mt-2 mb-4 bg-opacity-20 bg-gray-400 text-center text-white h-24 w-10/12 p-2 rounded-xl mb-20' placeholder='Enter notes about any symptoms here...' value={symptoms} onChange={(e) => {setSymptoms(e.target.value)}} />
        </div>
      </div>
      <Navbar logOut={logOut} />
    </div>
  );
};

export default Form;
