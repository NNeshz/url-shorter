"use client";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
  return (
    <Button
      className={cn(
        "absolute top-2 center", // Agrega la clase "center" aquí
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
