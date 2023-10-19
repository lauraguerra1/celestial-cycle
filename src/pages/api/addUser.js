import { getSupabase } from '../../utils/supabase'

export default async function addUser(req, res) {
  const { userID, name, email, birthday, sign } = req.body
  const supabase = getSupabase(userID)
  const { data, error } = await supabase.from("users").insert({ name: name, email: email, birth_date: birthday, passage_user_id: userID, zodiac_sign: sign })
  console.log('DATA', data)
  console.log('ERROR', error)
  if (error) return res.status(400).json(error)

  res.status(200).json(data)
}
