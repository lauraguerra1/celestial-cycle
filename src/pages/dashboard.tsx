import React from 'react'
import Dashboard from '../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import { getZodiacSign } from '@/utils/utils';

type UserMetaData = {name: string; birthday: string} | undefined | null

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
    const metaData = loginProps.passageUser?.user_metadata as UserMetaData;
    
    const userInfo = await supabase
      .from("users")
      .upsert({ name: metaData?.name, zodiac_sign: getZodiacSign(metaData?.birthday), email: loginProps.passageUser?.email, birth_date: metaData?.birthday, "passage_user_id": loginProps.userID }, { onConflict: "passage_user_id" })
      .select();

    const entries = await supabase
      .from("entries")
      .select()
      .eq("user_id", loginProps.userID);

    if (!entries.data?.length) {
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
        userID: '',
        data: null
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;

