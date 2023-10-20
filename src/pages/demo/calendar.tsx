import CalendarPage, {CalendarProps} from "@/components/Calendar";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";
import { GetServerSideProps } from "next";

export default function calendar({isAuthorized, data, updateEntryDate}: CalendarProps) {
  return (<CalendarPage isAuthorized={isAuthorized} data={data} updateEntryDate={updateEntryDate}/>)
}

export const getServerSideProps = (async (context) => {
  const supabase = getSupabase('ABrrCENR3M0I6XZ7NLA7gNCY');
  const { data } = await supabase
    .from("users")
    .select()
    .eq("passage_user_id", 'ABrrCENR3M0I6XZ7NLA7gNCY');
  return {
    props: {
      isAuthorized: true,
      userID: 'ABrrCENR3M0I6XZ7NLA7gNCY',
    },
  };
}) satisfies GetServerSideProps<AuthProps>;