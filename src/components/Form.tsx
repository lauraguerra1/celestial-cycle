import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import Logo from '@/components/logo';
import { selectionType } from '@/types/types';
import { formSections } from '@/utils';
import { useEffect } from 'react';
import Navbar from './Navbar';

export type FormProps = {
  entryDate: Date, 
  updateEntryDate: (date: Date) => void
  logOut: () => void
}

const Form = ({ entryDate, logOut}: FormProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [selections, setSelections] = useState<selectionType>({ FLOW: null, MOOD: null, CRAVINGS: null });

  const updateSelections = (title: string, option: string) => {
    const newOption = selections[title] === option ? null : option;
    setSelections((prev) => ({ ...prev, [title]: newOption }));
  };

  useEffect(() => { 
    console.log('entrydate', entryDate)
  }, [])

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
      <Logo />
      <h1 className='thin-regular text-center text-mellow-yellow text-2xl'>{entryDate.toString()}</h1>
      <div className='flex justify-between'>
        <h2 className='celestial-cursive text-mellow-yellow text-xl'>Your Data</h2>
        <button className='rounded-lg bg-opacity-6 bg-grayblue w-40' onClick={() => { console.log(selections, symptoms) }}>SAVE</button>
      </div>
      <div className={`${styles['scrolling-form']}` + ' px-2 grid overflow-x-hidden overflow-y-auto max-h-80vh'} style={{ background: 'rgba(37, 54, 86, 0.73)' }}>
        {formEls}
        <input type='textarea' className='justify-self-center mt-2 mb-4 bg-opacity-20 bg-gray-400 text-center text-white h-24 w-10/12 p-2 rounded-xl' placeholder='Enter notes about any symptoms here...' value={symptoms} onChange={(e) => {setSymptoms(e.target.value)}} />
      </div>
      <Navbar logOut={logOut} />
    </div>
  );
};

export default Form;
