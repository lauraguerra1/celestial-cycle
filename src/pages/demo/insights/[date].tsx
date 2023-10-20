import React from 'react'
import Insights from '../../../components/Insights'
import { getSupabase } from "../../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps, ComponentProps } from '@/types/types';

export default function dashboard ({isAuthorized, data, logOut, updateEntryDate}: ComponentProps){
  return (<Insights updateEntryDate={updateEntryDate}isAuthorized={isAuthorized} data={data} logOut={logOut} />)
}

export const getServerSideProps = (async (context) => {
  const supabase = getSupabase('ABrrCENR3M0I6XZ7NLA7gNCY');
  const { data } = await supabase
    .from("users")
    .select()
    .eq("passage_user_id", 'ABrrCENR3M0I6XZ7NLA7gNCY');
  console.log(data);
  return {
    props: {
      isAuthorized: true,
      data: data
    },
  };

}) satisfies GetServerSideProps<AuthProps>;
