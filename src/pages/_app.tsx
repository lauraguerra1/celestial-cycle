import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<number | null>(null)
  const router = useRouter();

  const logIn = (id: number) => {
    setUser(id);
    router.push('./');
  }

  const logOut = () => {
    setUser(null);
    router.push('/login');
  }

  return (
    <>
      <Component {...pageProps} logIn={logIn} user={user} logOut={logOut} />
    </>
  )
}
