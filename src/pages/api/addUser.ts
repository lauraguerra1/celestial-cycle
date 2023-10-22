import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';

export default async function addUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { name, email, birth_date, passage_user_id, zodiac_sign, } = req.body;
  console.log('REQ BODY', req.body)
  const supabase = getSupabase(passage_user_id);
  const { error } = await supabase.from("users").insert({
    name,
    email,
    birth_date,
    passage_user_id,
    zodiac_sign,
  });
  const { data } = await supabase.from("users").select().eq("passage_user_id", passage_user_id);
  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
}
