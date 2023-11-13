import { EntryData } from "@/pages/api/addEntry";
import { mapUserSignToHoroscopeSign } from "./utils";

export const postEntry = async (demo: boolean, entry: EntryData["data"]): Promise<EntryData> => {
  const response = await fetch(`${demo ? '..' : ''}/api/addEntry`, {
    method: 'POST', 
    body: JSON.stringify(entry), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    throw new Error(`Error: ${response.status} Please try again.`)
  }
  const data = await response.json()
  return data
}

export const getEntry = async (demo: boolean, date: string): Promise<{ data: EntryData['data'] }> => {
  const response = await fetch(`${demo ? '..' : ''}/api/entry/${date}`)
  if (!response.ok) {
    throw new Error(`Error: ${response.status} Please try again.`)
  }
  const data = await response.json()
  return data
}

export const getHoroscope = async (date: string, sign: string) => {
    const response = await fetch(`/api/horoscope?date=${date}&sign=${mapUserSignToHoroscopeSign(sign)}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} Please try again.`)
    }

    const data = await response.json()
    return data;
  };


export const getInsights = async (date: string) => {
  const response = await fetch(`/api/getInsight?date=${date}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status} Please try again.`)
  }

  const data = await response.json()
  return data;
};