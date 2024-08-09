import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className="fixed w-full">
      <MaxWidthWrapper>
        <nav className="flex justify-between items-center w-full py-4">
          <Link
            href={"/"}
            className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-blue-500 bg-clip-text text-transparent"
          >
            Linkly
          </Link>
          <div>
            {session ? (
              <Button className="flex items-center gap-x-1 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full text-white font-semibold hover:bg-red-600">
                <LogOut size={18} />
              </Button>
            ) : (
              <section className="flex gap-x-4 items-center">
                <Link
                  href={"/sign-in"}
                  className="flex items-center gap-x-1 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full text-white font-semibold"
                >
                  Log in <LogIn size={18} />
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 border border-white/10 px-4 py-2 rounded-full text-white font-semibold shadow-[0_0_10px_4px_rgba(59,130,246,0.5)] ring-2 ring-blue-500/50 transition-all duration-200"
                >
                  Register now
                </Link>
              </section>
            )}
          </div>
        </nav>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
