"use client";

import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <Button
      className="flex items-center gap-x-1 bg-zinc-900 border border-white/10 px-4 py-2 rounded-full text-white font-semibold hover:bg-red-600"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Log out <LogOut size={18} />
    </Button>
  );
};

export default LogOutButton;
