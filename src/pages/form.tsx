import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css';
import Logo from '@/components/Logo';
import { selectionType } from '@/types/types';
import { formSections } from '@/utils';


const Form = () => { 
  const [symtpoms, setSymptoms] = useState('')
  const [selections, setSelections] = useState<selectionType>({FLOW: null, MOOD: null, CRAVINGS: null})

  const updateSelections = (title: string, option: string) => {
    const newOption = selections[title] === option ? null : option  
    setSelections(prev => ({...prev, [title]: newOption}))
  }

  const formEls = formSections.map(section => {
    let allOptions = section.options.map(option => {

      return (
        <button key={option} onClick={() => updateSelections(section.title, option)} className='m-5 w-14 flex justify-content flex-col items-center'>
          <div className={`${selections[section.title] === option ? `${styles['selected-option']}` : 'bg-white light-opacity-bg'}` + ' rounded-full h-14 w-14 flex justify-center items-center'}>
            <Image width={64} height={64} className={`${option === 'Confident' ? 'rounded-bl-xl': ''}` + ' w-5/6 h-5/6'}  src={`/images/FormIcons/${option}.png`} alt={option} />
          </div>
          <p className='min-w-max text-white thin-regular'>{option}</p>
        </button>
      )
    })

    return (
      <div className='my-4' key={section.title}>
          <h3 className='ml-2 text-white thick-regular'>{section.title}</h3>
          <div className='flex max-w-100vw overflow-x-auto justify-between scroll-area-no-track'>
            {allOptions}
          </div>
        </div>
    )
  })
  
  return (
    <>
      <Logo />
      <div className='grid rounded-bl' style={{background: 'rgba(37, 54, 86, 0.73)'}}>
        {formEls}
        <input
          type="textarea"
          className="mt-2 mb-4 bg-opacity-20 bg-gray-400 text-center text-white h-24 w-10/12 p-2 justify-self-center rounded-xl"
          placeholder="Enter notes about any symptoms here..."
        />
      </div>
    </>
  )
}

export default Form