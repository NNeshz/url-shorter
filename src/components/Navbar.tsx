import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { getServerSession } from "next-auth";
import { LogIn } from "lucide-react";
import LogOutButton from "./LogOutButton";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <div className="fixed w-full">
      <MaxWidthWrapper>
        <nav className="flex justify-between items-center w-full py-4">
          <Link
            href={"/"}
            className="text-2xl font-extrabold bg-gradient-to-r from-brenaccent to-brensecondary bg-clip-text text-transparent"
          >
            Linkly
          </Link>
          <div>
            {session ? (
              <LogOutButton />
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
                  className="bg-brenverdi border border-brenverdi/80 px-4 py-2 rounded-full text-white font-semibold shadow-[0_0_10px_4px_rgba(111,255,233,0.5)] ring-2 ring-brenverdi/80 hover:bg-brenverdi/80 transition-all duration-200"
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
