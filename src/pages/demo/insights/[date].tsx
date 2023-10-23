import React from 'react'
import Insights from '../../../components/Insights'
import { getSupabase } from "../../../utils/supabase";
import { GetServerSideProps } from "next";
import { AuthProps, selectionType } from '@/types/types';
import { Value } from '@/components/Calendar';

type InsightProps = AuthProps & {
  updateEntryDate: (date: Value) => void,
  selections: selectionType
} 

export default function dashboard ({isAuthorized, data, updateEntryDate, selections}: InsightProps){
  return (<Insights selections={selections} updateEntryDate={updateEntryDate} isAuthorized={isAuthorized} data={data} />)
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
      data: data
    },
  };

}) satisfies GetServerSideProps<AuthProps>;
