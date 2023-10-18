import Navbar from '@/components/Navbar';
import '@passageidentity/passage-elements/passage-profile';
import { PassageUser } from '@passageidentity/passage-elements/passage-user';
import dotenv from 'dotenv';
import Router from "next/router";

function Profile() {

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
    <div>
      <passage-profile app-id={passageAppId}></passage-profile>
      <button className='bg-white text-black opacity-90 py-2 px-10 m-10 rounded-md'onClick={signOut}>LOG OUT</button>
      <Navbar />
    </div>
  );
}
export default Profile;