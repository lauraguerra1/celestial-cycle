import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Form.module.css'
// import nicotine from '../../public/FormIcons'
import nicotine from '../../public/images/FormIcons/Nicotine.png'

type FormProps = {
  logOut: () => void, 
  user: number | null
}

const Form = ({ logOut, user }: FormProps) => { 

  
  type Indexable = {[key:string]: any}
  type selectionType = Indexable & { FLOW: null | string, MOOD: null | string, CRAVINGS: null | string}
  const [selections, setSelections] = useState<selectionType>({FLOW: null, MOOD: null, CRAVINGS: null})
  const formSections = [
    { title: 'FLOW', options: ['No Flow', 'Spotting', 'Light', 'Medium', 'Heavy', 'Super'] },
    { title: 'MOOD', options: ['Happy', 'Relaxed', 'Grateful', 'Confident', 'Fatigued', 'Angry', 'Anxious', 'Depressed', 'Annoyed'] },
    { title: 'CRAVINGS', options: ['Sweet', 'Salty', 'Sour', 'Chocolate', 'Dairy', 'Fried', 'Fats', 'Carbs', 'Protein', 'Alcohol', 'Nicotine'] }
  ]
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
      <div key={section.title}>
        <h3 className='text-white'>{section.title}</h3>
        <div className='flex max-w-100vw overflow-x-auto justify-between'>
          {allOptions}
        </div>
      </div>
    )
  })
  
  return (
      <div className='rounded-bl' style={{background: 'rgba(37, 54, 86, 0.73)'}}>
        {formEls}
        <input type='textarea' placeholder='Enter notes about your symtpoms here...'/> 
      </div>
  )
}

export default Form