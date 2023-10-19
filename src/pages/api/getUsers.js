import { getSupabase } from '../../utils/supabase';

export default async function getUsers(req, res) {
    const supabase = getSupabase(); 
    const { data, error } = await supabase.from("users").select("passage_user_id");
    if (error) {
      return res.status(500).json({ error: "Error fetching user IDs" });
    }
    const userIds = data.map(user => user.passage_user_id);
    res.status(200).json(userIds);
}