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

import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const loginSchema = z.object({
  username: z
    .string({
      message: "Please enter a valid username",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    }),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const singInData = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (singInData?.error) {
      console.error("Failed to sign in");
      return;
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white/10 px-4 md:px-4 py-8 rounded-md max-w-md">
      <h4 className="text-white font-bold text-2xl tracking-tight mb-2">
        Welcome back! We missed you.
      </h4>
      <p className="text-white text-sm mb-2">
        Sign in to your account, and let&apos;s get back to work with easy
        access to links and resources.
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
                  <Input placeholder="joserodriguez" {...field} />
                </FormControl>
                <FormDescription>
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
                <FormDescription>
                  Password must be at least 8 characters long.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={cn(
              buttonVariants({
                className: "w-full",
              })
            )}
          >
            Sign in
          </Button>
          <p className="text-sm text-center text-zinc-400">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-primary cursor-pointer">
              Sign up
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
