import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import Profile from '../profile';

export default function dashboard ({isAuthorized, userID}: AuthProps){
  return (<Profile isAuthorized={isAuthorized} userID={userID} />)
}

export const getServerSideProps = (async (context) => {
  const supabase = getSupabase('ABrrCENR3M0I6XZ7NLA7gNCY');
  const { data } = await supabase
    .from("users")
    .select()
    .eq("passage_user_id", 'ABrrCENR3M0I6XZ7NLA7gNCY');
  return {
    props: {
      isAuthorized: true,
      userID: 'ABrrCENR3M0I6XZ7NLA7gNCY',
    },
  };
}) satisfies GetServerSideProps<AuthProps>;
