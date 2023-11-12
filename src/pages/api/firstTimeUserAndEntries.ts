import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabase } from '../../utils/supabase';
import { getAuthenticatedUserFromSession } from '@/utils/passage';
import { getZodiacSign } from '@/utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { name, birth_date, last_cycle_start, last_cycle_length } = req.body;
	const loginProps = await getAuthenticatedUserFromSession(req, res);
	const userID = loginProps?.userID;
	const supabase = getSupabase(userID);
	const userInfo = await supabase
	    .from("users")
	    .insert({
			name,
			email: loginProps?.passageUser?.email,
			birth_date,
			passage_user_id: userID,
			zodiac_sign: getZodiacSign(birth_date),
			last_cycle_start,
			last_cycle_length,
	    })
	    .select();

	const cycleEntries = [];
    for (let i = 0; i < parseInt(last_cycle_length); i++){
		const newDate = new Date(last_cycle_start as string);
		newDate.setDate(newDate.getDate() + (i + 1));

		cycleEntries.push({
			flow: "Medium",
			craving: null,
			mood: null,
			symptom: null,
			date: `${new Date(newDate).getFullYear()}-${new Date(newDate).getMonth() + 1}-${new Date(newDate).getDate()}`,
			user_id: userID,
		});
	}

  	const entries = await supabase
	  	.from("entries")
	    .insert(cycleEntries)
	    .select();
	if (userInfo.error || entries.error) {
		return res.status(400).json(userInfo.error || entries.error);
	}

	res.status(200).json({user:userInfo.data, entries: entries.data});
}