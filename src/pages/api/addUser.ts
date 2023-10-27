import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { getAuthenticatedUserFromSession } from '@/utils/passage';
import { DEMO_USER_ID } from '@/utils/utils';

export default async function addUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { name, email, birth_date, zodiac_sign, } = req.body;
  const loginProps = await getAuthenticatedUserFromSession(req, res);
  const userID = loginProps?.userID || DEMO_USER_ID;

  const supabase = getSupabase(userID);
  const { error } = await supabase
    .from("users")
    .insert({
      name,
      email,
      birth_date,
      passage_user_id: userID,
      zodiac_sign,
    });
  const { data } = await supabase.from("users").select().eq("passage_user_id", userID);

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
