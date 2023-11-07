import Dashboard from '../../components/Dashboard'
import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps } from '@/types/types';
import { DEMO_USER_ID } from '@/utils/utils';

export default function dashboard ({isAuthorized, data}: AuthProps){
  return (<Dashboard isAuthorized={isAuthorized} data={data} />);
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
      numberOfEntries: 1,
      data
    },
  };
}) satisfies GetServerSideProps<AuthProps>;
