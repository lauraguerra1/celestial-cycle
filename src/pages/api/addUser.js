import { getSupabase } from '../../utils/supabase'

export default async function addUser(req, res) {
  const { userID, name, birthday, sign } = req.body
  const supabase = getSupabase(userID)
  const { data, error } = await supabase.from("users").insert({ name: name, birth_date: birthday, passage_user_id: userID, zodiac_sign: sign })
  if (error) return res.status(400).json(error)

  res.status(200).json(data)
}
