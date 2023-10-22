import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { getTodaysDate } from '@/utils/utils';
import { Value } from '@/components/Calendar';
import { selectionType } from '@/types/types';

export default function App({ Component, pageProps }: AppProps) {
  // const [user, setUser] = useState<number | null>(null)
  const router = useRouter();
  const [entryDate, setEntryDate] = useState(getTodaysDate(new Date()))
  const [selections, setSelections] = useState<selectionType>({ FLOW: null, MOOD: null, CRAVINGS: null });

  const updateEntryDate = (date: Value) => {
    setEntryDate(getTodaysDate(date))
  }
  
  const logIn = (id: number) => {
    // setUser(id);
    router.push('./');
  }

  return (
    <>
      <Component {...pageProps}
        logIn={logIn}
        // user={user}
        entryDate={entryDate}
        updateEntryDate={updateEntryDate}
        selections={selections}
        setSelections={setSelections}
      />
    </>
  )
}
