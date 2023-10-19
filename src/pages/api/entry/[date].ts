import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';

export type SingleEntryData = {
  data: { flow: string | null, mood: string | null, craving: string | null, symptom: string | null, user_id: string | null, date: string}
}

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<SingleEntryData | PostgrestError | Error>
) {
  const { date, user_id } = req.body;
  const supabase = getSupabase(user_id);

  try {
    const { data, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", user_id)
      .eq("date", date)
    
      if (error) {
        return res.status(400).json(error);
      }
  
      res.status(200).json({
        message: `Entry successfully added for ${date}`,
        data: data[0]
      });
  
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}
