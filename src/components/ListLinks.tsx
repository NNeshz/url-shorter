import { authOptions } from "@/lib/auth"
import DisplayLinks from "./DisplayLinks"
import { getServerSession } from "next-auth"

const ListLinks = async () => {
  
  const session = await getServerSession(authOptions)
  const name = session?.user.username
  
  return (
    <div className="flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-center">All links of {name}:</h3>
        <DisplayLinks />
    </div>
  )
}

export default ListLinks