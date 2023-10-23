import React from 'react'
import Dashboard, { DashboardProps } from '../../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import RegistrationForm from '@/components/RegistrationForm';

export default function registrationform ({isAuthorized, userID, data }: DashboardProps){
  return (<RegistrationForm isAuthorized={isAuthorized} userID={userID} data={data} />)
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
      data
    },
  };
}) satisfies GetServerSideProps<AuthProps>;