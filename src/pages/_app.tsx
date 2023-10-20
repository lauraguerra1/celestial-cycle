import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { getTodaysDate } from '@/utils';
import { Value } from '@/components/Calendar';

export default function App({ Component, pageProps }: AppProps) {
  // const [user, setUser] = useState<number | null>(null)
  const router = useRouter();
  const [entryDate, setEntryDate] = useState(getTodaysDate(new Date()))
  
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
      />
    </>
  )
}
