import Link from "next/link";
import { ArrowRight, LucideLink } from "lucide-react";
import { getServerSession } from "next-auth";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import LogOutButton from "./LogOutButton";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="w-full bg-zinc-100">
      <MaxWidthWrapper className="flex items-center justify-between py-2">
        <Link href={"/"} className="flex gap-x-3 font-bold text-xl">
          <LucideLink className="font-black w-6" /> Short URL
        </Link>
        {session === null ? (
          <Link
            href={"/sign-up"}
            className={cn(
              "flex gap-x-2",
              buttonVariants({
                variant: "default",
              })
            )}
          >
            Sign up <ArrowRight className="w-5" />
          </Link>
        ) : (
          <LogOutButton />
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
