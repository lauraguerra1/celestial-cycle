import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';

export default async function getUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { userID } = req.query;
  const supabase = getSupabase();
  const { data, error } = await supabase.from("users").select().eq("passage_user_id", userID);

  if (error) {
    return res.status(500).json({ error: "Error fetching userID" });
  }
  // console.log('RETURN DATA', data)

  res.status(200).json(data);
}