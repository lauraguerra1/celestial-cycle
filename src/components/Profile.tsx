import Navbar from '@/components/Navbar';
import { AuthProps } from '@/types/types';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import Router from "next/router";
import { useEffect } from 'react';

function Profile({isAuthorized, userID}: AuthProps) {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
    if (!isAuthorized) {
      Router.push("/"); 
    }
  },[isAuthorized]);

  const signOut = async () => {
    new PassageUser().signOut();
    Router.push("/");
  };

  dotenv.config();
  const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;

  if (!passageAppId) {
    throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
  }

  return (
    <div className='flex flex-col content-center mt-10'>
      <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
      <button className='bg-white text-black opacity-90 py-2 px-10 m-10 rounded-md'onClick={signOut}>LOG OUT</button>
      <Navbar />
    </div>
  );
}
export default Profile;