import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';
import { DEMO_USER_ID } from '@/utils/utils';
import { getAuthenticatedUserFromSession } from '@/utils/passage';

export type SingleEntryData = {
  data: { flow: string | null, mood: string | null, craving: string | null, symptom: string | null, date: string} | null
};

export default async function getEntry(
  req: NextApiRequest,
  res: NextApiResponse<SingleEntryData | PostgrestError | Error>
) {
  const { date } = req.query;
  const loginProps = await getAuthenticatedUserFromSession(req, res);
  const userID = loginProps?.userID || DEMO_USER_ID;

  const supabase = getSupabase(userID);

  try {
    const { data, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", userID)
      .eq("date", date);
    
      if (error) {
        return res.status(400).json(error);
      }
  
      res.status(200).json({
        data: data[0] ? data[0] : null
      });
  
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}
