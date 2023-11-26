import React from 'react'
import Dashboard from '../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';

export default function dashboard ({isAuthorized, data }: AuthProps){
  return (<Dashboard isAuthorized={isAuthorized} data={data} />);
}

export const getServerSideProps = (async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(
    context.req,
    context.res
  );
  if (loginProps?.isAuthorized) {
    const supabase = getSupabase(loginProps.userID);
    
    const userInfo = await supabase
      .from("users")
      .select()
      .eq("passage_user_id", loginProps?.userID);

    if (!userInfo.data?.length) {
      return {
        redirect: {
          destination: '/registrationform',
          permanent: false,
        },
      }
    }
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        data: userInfo.data,
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

