import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';

type Data = {
  message: string, 
  data: {flow: string, mood: string, craving: string, symptom: string, user_id: string}
}

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<Data | PostgrestError | Error>
) {
  const { flow, mood, craving, symptom, date, userID } = req.body;
  const supabase = getSupabase(userID);

  try {
    const { data, error } = await supabase
      .from("entries")
      .insert({
        date,
        flow,
        mood,
        craving,
        symptom,
        user_id: userID,
      })
      .eq("user_id", userID)
      .single();

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json({
      message: `Entry successfully added for ${date}`,
      data: data
    });
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}
