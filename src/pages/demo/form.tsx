import Form, { FormProps } from "@/components/Form";
import { AuthProps } from "@/types/types";
import { getSupabase } from "@/utils/supabase";
import { GetServerSideProps } from "next";

export default function form({entryDate, updateEntryDate, isAuthorized, data}: FormProps) {
  return (<Form isAuthorized={isAuthorized} data={data} entryDate={entryDate} updateEntryDate={updateEntryDate}/>)
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