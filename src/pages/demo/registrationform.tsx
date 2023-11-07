import React from 'react'
import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import RegistrationForm from '@/components/RegistrationForm';
import { DEMO_USER_ID } from '@/utils/utils';

export default function registrationform ({isAuthorized, data }: AuthProps){
  return (<RegistrationForm isAuthorized={isAuthorized} data={data} />)
}

export const getServerSideProps = (async (context) => {
  const supabase = getSupabase(DEMO_USER_ID);
  const { data } = await supabase
    .from("users")
    .select()
    .eq("passage_user_id", DEMO_USER_ID);
  return {
    props: {
      isAuthorized: true,
      data
    },
  };
}) satisfies GetServerSideProps<AuthProps>;