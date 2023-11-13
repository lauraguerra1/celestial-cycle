import Form, { FormProps } from "@/components/Form";
import { AuthProps } from "@/types/types";
import { getSupabase } from "@/utils/supabase";
import { DEMO_USER_ID } from "@/utils/utils";
import { GetServerSideProps } from "next";

export default function form({entryDate, updateEntryDate, isAuthorized, data, selections, setSelections}: FormProps) {
  return (<Form selections={selections} setSelections={setSelections} isAuthorized={isAuthorized} data={data} entryDate={entryDate} updateEntryDate={updateEntryDate}/>);
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
      data: data
    },
  };

}) satisfies GetServerSideProps<AuthProps>;