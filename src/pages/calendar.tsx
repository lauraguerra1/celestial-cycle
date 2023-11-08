import CalendarPage, {CalendarProps} from "@/components/Calendar";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";
import { GetServerSideProps } from "next";

export default function calendar({isAuthorized, data, updateEntryDate, selections, setSelections}: CalendarProps) {
  return (<CalendarPage setSelections={setSelections} selections={selections} isAuthorized={isAuthorized} data={data} updateEntryDate={updateEntryDate}/>);
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
        userID: loginProps.userID,
        data
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