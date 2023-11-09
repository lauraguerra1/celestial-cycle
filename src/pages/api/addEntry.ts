import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { getAuthenticatedUserFromSession } from '@/utils/passage';
import { DEMO_USER_ID } from '@/utils/utils';

type StringOrNullData = string | null

export type EntryData = {
  message: string, 
  data: { flow: StringOrNullData, mood: StringOrNullData, craving: StringOrNullData, symptom: StringOrNullData, date: string}
};

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<EntryData | PostgrestError | Error>
) {
  const { flow, mood, craving, symptom, date } = req.body;
  const loginProps = await getAuthenticatedUserFromSession(req, res);
  const userID = loginProps?.userID || DEMO_USER_ID;

  const supabase = getSupabase(userID);
  try {
    let { data:entries, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", userID)
      .eq("date", date)
    
    if (error) {
      return res.status(400).json(error);
    }
    
    const command = !entries?.length ? 'insert' : 'update'
    const firstEq = !entries?.length ? 'user_id' : 'date'
    const secondEq = !entries?.length ? userID : date 

    let { error: upsertErr } = await supabase
      .from("entries")
      [command]({
        date,
        flow,
        mood,
        craving,
        symptom,
        user_id: userID,
      })
      .eq("user_id", userID)
      .eq(firstEq, secondEq)
  
    if (upsertErr) {
      return res.status(400).json(upsertErr);
    }

    let { data:entriesWithFlow, error:selectionError } = await supabase
        .from('entries')
        .select()
        .eq('user_id', userID)
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
      .eq('passage_user_id', userID)
    
    if (updateErr) {
      return res.status(400).json(updateErr);
    }

    res.status(200).json({
      message: `Entry successfully added for ${date}`,
      data: req.body
    });
  
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}