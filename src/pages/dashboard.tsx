import React from 'react'
import Dashboard from '../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps, ComponentProps } from '@/types/types';

export default function dashboard ({isAuthorized, data, logOut}: ComponentProps){
  return (<Dashboard isAuthorized={isAuthorized} data={data} logOut={logOut} />)
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    const { data } = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps.userID);
    console.log(data);
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        data: data,
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        data: null
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;

