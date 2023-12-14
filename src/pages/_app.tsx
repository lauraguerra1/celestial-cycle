import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { getTodaysDate } from '@/utils/utils';
import { Value } from '@/components/Calendar';
import { selectionType } from '@/types/types';
import CelestialLogo from '@/components/CelestialLogo';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [entryDate, setEntryDate] = useState(getTodaysDate(new Date()))
  const [selections, setSelections] = useState<selectionType>({ FLOW: null, MOOD: null, CRAVINGS: null });

  const updateEntryDate = (date: Value) => {
    setEntryDate(getTodaysDate(date));
  }
  
  const logIn = (id: number) => {
    router.push('./');
  }

  return (
    <main>
      <CelestialLogo />
      <Component {...pageProps}
        logIn={logIn}
        entryDate={entryDate}
        updateEntryDate={updateEntryDate}
        selections={selections}
        setSelections={setSelections}
      />
    </main>
  );
}
