import { EntryData } from "@/pages/api/addEntry"

export const postEntry = async (demo: boolean, endpoint: string, entry: EntryData["data"]): Promise<EntryData> => {
  const response = await fetch(`${demo ? '..' : ''}/api/${endpoint}`, {
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