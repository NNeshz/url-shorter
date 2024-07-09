import { buttonVariants } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
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
    );
  }

  return <div>Welcome {session?.user.username}</div>;
};

export default Page;
