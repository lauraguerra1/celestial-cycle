import { NextApiRequest, NextApiResponse } from "next";
import getHoroscope from "@/utils/horoscope";
import { getTodaysDate } from "@/utils";
import { getSupabase } from "@/utils/supabase";

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const supabase = getSupabase();
  const formattedDate = getTodaysDate(new Date());
  const checkExisting = await supabase
    .from("horoscopes")
    .select()
    .eq("date", formattedDate);

  if (checkExisting?.data?.length) {
    res.status(204).end();
    return;
  }

  const zodiacSigns = [
    "Capricorn",
    "Aquarius",
    "Pisces",
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
  ];

  const horoscopes = await Promise.all(
    zodiacSigns.map(async (sign) => {
      const horoscope = await getHoroscope(sign);
      return {
        zodiac_sign: sign,
        date: formattedDate,
        description: horoscope,
      };
    })
  );

  const { data, error } = await supabase.from("horoscopes").insert(horoscopes);
  if (error) {
    console.error("Error inserting data into Supabase:", error);
    res.status(500).end();
  } else {
    console.log("Data inserted into Supabase:", data);
    res.status(200).json({ success: true });
  }
}
