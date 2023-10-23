import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { getAuthenticatedUserFromSession } from '@/utils/passage';
import getInsightsFromAI from '@/utils/openai';
import { getCurrentLunarPhase } from '@/utils/lunar-phase';
import { DEMO_USER_ID, mapUserSignToHoroscopeSign } from '@/utils/utils';

export default async function getInsight(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const loginProps = await getAuthenticatedUserFromSession(req, res);
  const userID = loginProps?.userID || DEMO_USER_ID;

  const date = req.query.date as string;
  const supabase = getSupabase(userID);

  const existingInsight = await supabase
  .from("insights")
  .select()
  .eq("user_id", userID)
  .eq("date", date);
  
  if (existingInsight.error) {
    console.error(existingInsight.error);
    return res.status(400).json(existingInsight.error);
  } 

  const user = await supabase
  .from("users")
  .select()
  .eq("passage_user_id", userID);

  const horoscopes = await supabase
  .from("horoscopes")
  .select()
  .eq("zodiac_sign", mapUserSignToHoroscopeSign(user.data?.[0].zodiac_sign))
  .eq("date", date);
  const horoscope = horoscopes.data?.[0];
  
  const dailyEntries = await supabase
  .from("entries")
  .select()
  .eq("user_id", userID)
  .eq("date", date);
  const dailyEntry = dailyEntries.data?.[0];
  
  if (existingInsight.data?.length || !horoscope || !dailyEntry) {
    return res.json({
      horoscope,
      dailyEntry,
      insights: existingInsight.data?.[0],
    });
  }
  
  const insightContent = await getInsightsFromAI({
    sign: mapUserSignToHoroscopeSign(user.data?.[0].zodiac_sign),
    daysSinceLastPeriod: getDaysSinceLastPeriod(user.data?.[0], date),
    flowLengthDays: user.data?.[0].last_cycle_length,
    moonPhase: getCurrentLunarPhase(new Date(date)).description,
    mood: dailyEntry.mood,
    craving: dailyEntry.craving,
    horoscope: horoscope.description,
  });
  const insightEntry = {
    user_id: userID,
    date: date,
    description: insightContent.content
  }
  const result = await supabase
    .from("insights")
    .insert(insightEntry);
  if (result.error) {
    console.error(result.error);
    return res.status(400).json(result.error);
  }
  
  res.status(200).json({
    horoscope,
    dailyEntry,
    insights: insightEntry,
  });
}

function getDaysSinceLastPeriod(user: any, date: string) {
  // If this is "off by one" sometimes, there is probably
  // an issue with timezones (production server timezone might be UTC?)
  const dateObj = new Date(date);
  const lastPeriod = new Date(user.last_cycle_start);
  return (dateObj.getTime() - lastPeriod.getTime()) / 1_000 / 60 / 60 / 24;
}