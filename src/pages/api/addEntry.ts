import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase'
import { PostgrestError } from '@supabase/supabase-js';

type Data = {
  name: string
}

export default async function addEntry(
  req: NextApiRequest,
  res: NextApiResponse<Data | PostgrestError>
) {
  const { userID, name, birthday, zodiacSign } = req.body
  const supabase = getSupabase(userID)
  const { data, error } = await supabase.from("users").insert({ name: name, birth_date: birthday, zodiac_sign: zodiacSign })
  
  if (error) return res.status(400).json(error)

  res.status(200).json(data)
}