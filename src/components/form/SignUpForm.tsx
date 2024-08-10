"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

const registrationSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  username: z.string().min(3).max(25, {
    message: "Username must be between 3 and 25 characters long",
  }),
});

const SignUpForm = () => {
  const router = useRouter();
  const { setAuthenticatedLoading, authenticatedLoading } = useAuthStore();
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registrationSchema>) => {
    try {
      setAuthenticatedLoading(true);
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      if (response.ok) {
        const signInResponse = await signIn("credentials", {
          username: data.username,
          password: data.password,
          redirect: false,
        });

        if (signInResponse?.ok) {
          router.push("/");
          router.refresh();
        } else {
          console.error(
            "An error ocurred while sign up: ",
            signInResponse?.error
          );
        }
      }
      setAuthenticatedLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white/10 px-4 md:px-4 py-8 rounded-md max-w-md">
      <h4 className="text-white font-bold text-2xl tracking-tight mb-2">
        Welcome to a new clean experience
      </h4>
      <p className="text-white text-sm mb-2">
        We area happy to have you here. Let&apos;s create your account in less
        than a minute, then you can start using our services.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input placeholder="nneshz" {...field} />
                </FormControl>
                <FormDescription className="text-white/50">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormDescription className="text-white/50">
                  Password must be at least 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={authenticatedLoading}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 border border-white/10 px-4 py-2 rounded-full text-white font-semibold shadow-[0_0_10px_4px_rgba(59,130,246,0.5)] ring-2 ring-blue-500/50 transition-all duration-200"
          >
            {authenticatedLoading ? (
              <p>
                <Loader2 className="animate-spin" />
              </p>
            ) : (
              <p>Sign up</p>
            )}
          </Button>
          <p className="text-sm text-center text-zinc-400">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-pink-500 cursor-pointer">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
