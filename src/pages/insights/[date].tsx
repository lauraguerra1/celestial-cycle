import React from 'react';
import Insights from '../../components/Insights';
import { getAuthenticatedUserFromSession } from "@/utils/passage";
import { getSupabase } from "../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps, selectionType } from '@/types/types';
import { Value } from '@/components/Calendar';

type InsightProps = AuthProps & {
  updateEntryDate: (date: Value) => void,
  selections: selectionType;
  setSelections: React.Dispatch<React.SetStateAction<selectionType>>;
}

export default function dashboard ({isAuthorized, data, updateEntryDate, selections, setSelections}: InsightProps ){
  return (<Insights setSelections={setSelections} selections={selections} updateEntryDate={updateEntryDate} isAuthorized={isAuthorized} data={data} />);
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

