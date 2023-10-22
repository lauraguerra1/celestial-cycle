import React from 'react'
import Dashboard, { DashboardProps } from '../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';

export default function registrationform ({isAuthorized, userID, data }: DashboardProps){
  return (<Dashboard isAuthorized={isAuthorized} userID={userID} data={data} />)
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps.userID);
      console.log('FROM SUPABASE DATA', data)
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID,
        data: data
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        userID: '',
        data: null
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;