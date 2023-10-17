import Homepage from "@/components/Homepage"
import { useState } from "react"



export default function Home() {

  const [user, setUser] = useState<number | null>(1)

  const renderMain = () => {
    return user ? <Homepage /> : <h1>login</h1>
  }
  return (
    <>
      {renderMain()}
    </>
  )
}
