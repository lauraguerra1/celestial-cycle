import Navbar from '@/components/Navbar';
import { AuthProps } from '@/types/types';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import Router from "next/router";
import { useEffect } from 'react';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export type ProfileProps = AuthProps & {
  userID: string | number;
};

function Profile({isAuthorized, userID, data}: ProfileProps) {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-profile");
    if (!isAuthorized) {
      Router.push("/"); 
    }
    console.log('data', data)
  },[isAuthorized]);

  const signOut = async () => {
    if (userID !== 'ABrrCENR3M0I6XZ7NLA7gNCY'){
      new PassageUser().signOut();
    }
    Router.push("/");
  };

  dotenv.config();
  const passageAppId = process.env.NEXT_PUBLIC_PASSAGE_APP_ID;

  if (!passageAppId) {
    throw new Error('NEXT_PUBLIC_PASSAGE_APP_ID is not defined in the environment.');
  }

  const [year, month, date] = data ? data[0].last_cycle_start.split('-') : []
  const endDate = new Date(data? data[0].last_cycle_start : '')
  endDate.setDate(endDate.getDate() + (data ? data[0].last_cycle_length : 0));
  console.log(endDate.toDateString())
  return (
    <div className='flex flex-col items-center content-center mb-20'>
      <h1 className='m-7 text-center text-3xl'>{(userID === 'ABrrCENR3M0I6XZ7NLA7gNCY') && 'Log in to enjoy our profile feature!'}</h1>
      <passage-profile className='self-stretch' app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
      {
        data && 
        <article className='w-passage max-w-100vw text-black bg-white rounded-md p-5 mt-2'>
          <h2 className='text-lg pb-3'>Your Last Cycle</h2>
          <p className='pb-1'><span className='font-bold'>Start Date:</span> {`${months[parseInt(month) - 1]} ${date}, ${year}`}</p>
          <p className='pb-1'><span className='font-bold'>End Date:</span> {`${months[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`}</p>
          <p className='pb-1'><span className='font-bold'>Lasted:</span> {data[0].last_cycle_length} days</p>
        </article>
      }
      <button className='w-passage bg-white text-black opacity-90 py-2 px-10 m-2 rounded-md' onClick={signOut}>LOG OUT</button>
      <Navbar />
    </div>
  );
}
export default Profile;