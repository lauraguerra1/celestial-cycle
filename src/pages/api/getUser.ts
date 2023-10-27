import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { getAuthenticatedUserFromSession } from '@/utils/passage';
import { DEMO_USER_ID } from '@/utils/utils';

export default async function getUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const loginProps = await getAuthenticatedUserFromSession(req, res);
  const userID = loginProps?.userID || DEMO_USER_ID;

  const supabase = getSupabase(userID);
  const { data, error } = await supabase.from("users").select().eq("passage_user_id", userID);

  if (error) {
    return res.status(500).json({ error: "Error fetching userID" });
  }

  res.status(200).json(data);
}