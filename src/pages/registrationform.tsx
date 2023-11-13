import React from 'react'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import RegistrationForm from '@/components/RegistrationForm';

export default function registrationform ({isAuthorized, data }: AuthProps){
  return (<RegistrationForm isAuthorized={isAuthorized} data={data} />)
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