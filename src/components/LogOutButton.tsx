"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <Button
      className={cn(
        "absolute top-2 left-2",
        buttonVariants({
          variant: "destructive",
        })
      )}
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
    >
      Log out <LogOut />
    </Button>
  );
};

export default LogOutButton;
