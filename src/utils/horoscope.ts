// const cheerio = require("cheerio");
import cheerio from "cheerio";

export default async function getHoroscope(sign: string) {
  const signNumber = getSignNumber(sign);
  const hURL = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${signNumber}`;

  try {
    const response = await fetch(hURL);
    const $ = cheerio.load(await response.text());
    const horoscope: string = $(".main-horoscope p")
      .first()
      .contents()
      .filter((index, element) => element.type === "text")
      .text();

    if (horoscope.slice(0, 3) === " - ") {
      return horoscope.substring(3);
    } else {
      return horoscope;
    }
  } catch (error) {
    console.error(error);
  }
}

function getSignNumber(sign: string) {
  if (sign === "Aries") return 1;
  if (sign === "Taurus") return 2;
  if (sign === "Gemini") return 3;
  if (sign === "Cancer") return 4;
  if (sign === "Leo") return 5;
  if (sign === "Virgo") return 6;
  if (sign === "Libra") return 7;
  if (sign === "Scorpio") return 8;
  if (sign === "Sagittarius") return 9;
  if (sign === "Capricorn") return 10;
  if (sign === "Aquarius") return 11;
  if (sign === "Pisces") return 12;
}
