import { NextApiRequest, NextApiResponse } from "next";
import processDailyHoroscope from "@/utils/horoscope";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await processDailyHoroscope();

  if (!result) {
    res.status(204).end();
    return;
  }
  if (result.error) {
    console.error("Error inserting data into Supabase:", result.error);
    res.status(500).end();
  } else {
    res.status(200).json({ success: true });
  }
}
