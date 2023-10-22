import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';

export type EntryData = {
  message: string, 
  data: { flow: string | null, mood: string | null, craving: string | null, symptom: string | null, user_id: string | null, date: string}
}
 
type CycleTracker = {start: string | null, cycleDates: string[]}

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<EntryData | PostgrestError | Error>
) {
  const { flow, mood, craving, symptom, date, user_id } = req.body;
  const supabase = getSupabase(user_id);

  const updateMostRecentCycle = async () => {

    try {
      let { data, error } = await supabase
        .from('entries')
        .select()
        .eq('user_id', user_id)
        .in('flow', ['Spotting', 'Light', 'Medium', 'Heavy', 'Super'])

      if (error) {
        return res.status(400).json(error);
      }

      const getLastDateAsNum = (dates: string[]) => {
        return new Date(dates[dates.length - 1]).setHours(0,0,0,0)
      }

      const mostRecentCycle:string[] | undefined= data?.sort((a, b) => new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0))
        .reduce((cycleDates: string[], currEntry) => {
        const currEntryDateAsNum = new Date(currEntry.date).setHours(0,0,0,0)
        const mostRecentCycleDateAsNum = getLastDateAsNum(cycleDates)
  
        if ((currEntryDateAsNum - mostRecentCycleDateAsNum) === 86400000) {
          cycleDates.push(currEntry.date);
        } else {
          cycleDates = [currEntry.date];
        }
          return cycleDates
        }, [])
      
      try {
        let { error } = await supabase
          .from('users')
          .update({ 'last_cycle_start': mostRecentCycle ? mostRecentCycle[0] : null, 'last_cycle_length': mostRecentCycle?.length ?? null})
          .eq('passage_user_id', user_id)
        
        if (error) {
          return res.status(400).json(error);
        }
      } catch (error) {
        res.status(500).json(new Error('Internal Server Error'));
      }
    } catch (error) {
      res.status(500).json(new Error('Internal Server Error'));
    }
  }

  try {
    let entries;
    let { data, error } = await supabase
      .from("entries")
      .select()
      .eq("user_id", user_id)
      .eq("date", date)
    
      if (error) {
        return res.status(400).json(error);
      }
    
    entries = data
    if (!entries?.length) {
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
      
        updateMostRecentCycle()
    
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
        
      updateMostRecentCycle()
    
      res.status(200).json({
        message: `Entry successfully added for ${date}`,
        data: req.body
      });
    }
  } catch (error) {
    res.status(500).json(new Error('Internal Server Error'));
  }
}

//query all entries 
  //where user_id = user_id.
//where flow !== null && flow !== 'No Flow'
//have a variable (maybe a date really far away in the past?)
  // have a variable that is an array of entries, 
  //iterate over the entries and if the date of the entries is closer to the current date than the variable, reset the date to that date 
