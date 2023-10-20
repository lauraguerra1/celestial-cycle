import CalendarPage, {CalendarProps} from "@/components/Calendar";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";
import { GetServerSideProps } from "next";

export default function calendar({isAuthorized, logOut, data, updateEntryDate, entryDate, selections, setSelections}: CalendarProps) {
  return (<CalendarPage setSelections={setSelections} selections={selections} entryDate={entryDate} isAuthorized={isAuthorized} logOut={logOut} data={data} updateEntryDate={updateEntryDate}/>)
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
