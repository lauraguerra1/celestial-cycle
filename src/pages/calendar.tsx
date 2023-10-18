import CalendarPage from "@/components/Calendar";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";
import { GetServerSideProps } from "next";

export default function calendar({isAuthorized}: AuthProps) {
  return (<CalendarPage isAuthorized={isAuthorized} userID={""} />)
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
    console.log(data);
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        userID: ''
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;