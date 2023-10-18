import Dashboard from '../../components/Dashboard'
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { UserData, AuthProps, ComponentProps } from '@/types/types';

export default function dashboard ({isAuthorized, data, logOut}: ComponentProps){
  return (<Dashboard isAuthorized={isAuthorized} data={data} logOut={logOut} />)
}

export const getServerSideProps = (async (context) => {
  const supabase = getSupabase('ABrrCENR3M0I6XZ7NLA7gNCY');
  const { data } = await supabase
    .from("users")
    .select()
    .eq("passage_user_id", 'ABrrCENR3M0I6XZ7NLA7gNCY');
  console.log(data);
  return {
    props: {
      isAuthorized: true,
      data: data
    },
  };

}) satisfies GetServerSideProps<AuthProps>;
