import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';

export type EntryData = {
  message: string, 
  data: { flow: string | null, mood: string | null, craving: string | null, symptom: string | null, user_id: string | null, date: string}
}
 
export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<EntryData | PostgrestError | Error>
) {
  const { flow, mood, craving, symptom, date, user_id } = req.body;
  const supabase = getSupabase(user_id);

  try {
    let { data:entries, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", user_id)
      .eq("date", date)
    
    if (error) {
      return res.status(400).json(error);
    }
    
    const command = !entries?.length ? 'insert' : 'update'
    const firstEq = !entries?.length ? 'user_id' : 'date'
    const secondEq = !entries?.length ? user_id : date 

    let { error: upsertErr } = await supabase
      .from("entries")
      [command]({
        date,
        flow,
        mood,
        craving,
        symptom,
        user_id,
      })
      .eq("user_id", user_id)
      .eq(firstEq, secondEq)
  
    if (upsertErr) {
      return res.status(400).json(upsertErr);
    }

    let { data:entriesWithFlow, error:selectionError } = await supabase
        .from('entries')
        .select()
        .eq('user_id', user_id)
        .in('flow', ['Spotting', 'Light', 'Medium', 'Heavy', 'Super'])

    if (selectionError) {
      return res.status(400).json(selectionError);
    }

    const getLastDateAsNum = (dates: string[]) => {
      return new Date(dates[dates.length - 1]).setHours(0,0,0,0)
    }

    const mostRecentCycle: string[] | undefined = entriesWithFlow
      ?.sort((a, b) => new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0))
      .reduce((cycleDates: string[], currEntry) => {
        const currEntryDateAsNum = getLastDateAsNum([currEntry.date])
        const mostRecentCycleDateAsNum = getLastDateAsNum(cycleDates)

        if ((currEntryDateAsNum - mostRecentCycleDateAsNum) === 86400000) {
          cycleDates.push(currEntry.date);
        } else {
          cycleDates = [currEntry.date];
        }
          return cycleDates
      }, [])
    
    let { error:updateErr } = await supabase
      .from('users')
      .update({ 'last_cycle_start': mostRecentCycle ? mostRecentCycle[0] : null, 'last_cycle_length': mostRecentCycle?.length ?? null})
      .eq('passage_user_id', user_id)
    
    if (updateErr) {
      return res.status(400).json(updateErr);
    }

    res.status(200).json({
      message: `Entry successfully added for ${date}`,
      data: req.body
    });
  
  } catch (error) {
    console.log('error', error)
    res.status(500).json(new Error('Internal Server Error'));
  }
}