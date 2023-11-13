import CalendarPage, {CalendarProps} from "@/components/Calendar";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";
import { GetServerSideProps } from "next";
import { DEMO_USER_ID } from "@/utils/utils";

export default function calendar({isAuthorized, data, updateEntryDate, selections, setSelections}: CalendarProps) {
  return (<CalendarPage setSelections={setSelections} selections={selections} isAuthorized={isAuthorized} data={data} updateEntryDate={updateEntryDate}/>);
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