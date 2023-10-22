import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';

export default async function getHorosopes (req: NextApiRequest, res: NextApiResponse) {
    const { date, sign } = req.query;
  
    const supabase = getSupabase(); 
    const { data: horoscopes, error } = await supabase
    .from('horoscopes')
    .select()
    .eq("date", date)
    .eq("zodiac_sign", sign) 
  
    if (error) {
      return res.status(500).json({ error: "Error fetching horoscope data" });
    }
    
    res.status(200).json(horoscopes);
}