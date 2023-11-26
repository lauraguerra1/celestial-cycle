import React from 'react';
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import Profile, { ProfileProps } from '@/components/Profile';

export default function dashboard ({isAuthorized, data, userID}: ProfileProps){
  return (<Profile isAuthorized={isAuthorized} data={data} userID={userID}/>);
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
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID,
        data
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