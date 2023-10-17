import Homepage from "@/components/Homepage"
import { useEffect, useState } from "react"
import { userData } from '../mockdata'
import { User } from "@/types/types"

export default function Home() {

  const [user, setUser] = useState<User>(userData)

  const renderMain = () => {
    return user ? <Homepage user={userData}/> : <h1>login</h1>
  }
  return (
    <>
      {renderMain()}
    </>
  )
}
