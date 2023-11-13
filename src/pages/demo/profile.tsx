import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import Profile from '../profile';
import { ProfileProps } from "@/components/Profile";
import { DEMO_USER_ID } from "@/utils/utils";

export default function dashboard ({isAuthorized, data, userID}: ProfileProps){
  return (<Profile isAuthorized={isAuthorized} data={data} userID={userID} />);
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
      userID: DEMO_USER_ID,
      data,
    },
  };
}) satisfies GetServerSideProps<AuthProps>;
