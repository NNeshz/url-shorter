import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

const UserNotLogged = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 text-white backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white/10 px-4 md:px-0 py-8 rounded-md max-w-md">
      <h1 className="text-6xl font-semibold text-center">Short URL</h1>
      <p className="text-center text-sm md:px-4 lg:px-10 break-keep">
        Welcome to our website for shortening URLs! With our service, you can
        easily create shorter and more manageable URLs for your long and complex
        ones.
      </p>
      <Link
        href="/sign-up"
        className={buttonVariants({
          size: "lg",
        })}
      >
        Get Started <ArrowRight size={20} className="ml-2" />
      </Link>
    </div>
  );
};

export default UserNotLogged;
