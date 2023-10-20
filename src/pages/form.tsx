import Form, { FormProps } from "@/components/Form";
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { GetServerSideProps } from "next";
import { getSupabase } from "@/utils/supabase";
import { AuthProps } from "@/types/types";

export default function form({entryDate, updateEntryDate, isAuthorized, data}: FormProps) {
  return (<Form isAuthorized={isAuthorized} data={data} entryDate={entryDate} updateEntryDate={updateEntryDate}/>)
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
        data: data,
      },
    };
  } else {
    return {
      props: {
        isAuthorized: false,
        data: null
      },
    };
  }
}) satisfies GetServerSideProps<AuthProps>;