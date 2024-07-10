import { cn } from "@/lib/utils"
import { ArrowRight, XCircleIcon} from "lucide-react"
import Link from "next/link" 
import { buttonVariants } from "./ui/button"

const NotAuthorized = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
        <XCircleIcon className="h-36 w-36 text-red-600" />
        <h2 className="text-5xl font-bold">Unauthorized</h2>
        <p className="text-sm text-zinc-500">You need to be signed in to access this page.</p>
        <Link
          href="/sign-in"
          className={cn(
            "w-auto flex gap-x-2",
            buttonVariants({
              variant: "default",
            })
          )}
        >
          Sign in <ArrowRight className="w-5" />
        </Link>
      </div>
  )
}

export default NotAuthorized