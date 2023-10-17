import Homepage from "@/components/Homepage"
import { useEffect, useState } from "react"
import { insights, userData } from '../mockdata'
import { User } from "@/types/types"
import { getZodiacSign } from "@/utils"

export default function Home() {

  const [user, setUser] = useState<User>(userData)
  const [userInsights, setUserInsights] = useState(insights)

  useEffect(() => {
    //api call to BE to get today's horoscope? maybe GET api/v1/insights/:userID/:date
   console.log(getZodiacSign('04/24/1992'))
  },[])


  const renderMain = () => {
    return user ? <Homepage user={userData}/> : <h1>login</h1>
  }
  return (
    <>
      {renderMain()}
    </>
  )
}
