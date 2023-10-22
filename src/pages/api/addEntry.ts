import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';

export type EntryData = {
  message: string, 
  data: { flow: string | null, mood: string | null, craving: string | null, symptom: string | null, user_id: string | null, date: string}
};

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<EntryData | PostgrestError | Error>
) {
  const { flow, mood, craving, symptom, date, user_id } = req.body;
  const supabase = getSupabase(user_id);

  try {
    let entries;
    let { data, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", user_id)
      .eq("date", date)
    entries = data
    if (!entries || !entries.length) {
      const { data, error } = await supabase
        .from("entries")
        .insert({
          date,
          flow,
          mood,
          craving,
          symptom,
          user_id,
        })
        .eq("user_id", user_id)
      
        if (error) {
          return res.status(400).json(error);
        }
    
        res.status(200).json({
          message: `Entry successfully added for ${date}`,
          data: req.body
        });
    } else {
      const { data, error } = await supabase
        .from("entries")
        .update({
          date,
          flow,
          mood,
          craving,
          symptom,
          user_id,
        })
        .eq("user_id", user_id)
        .eq("date", date)
      
        if (error) {
          return res.status(400).json(error);
        }
    
        res.status(200).json({
          message: `Entry successfully added for ${date}`,
          data: req.body
        });
    }
  
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}
