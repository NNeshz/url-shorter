"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLinksStore } from "@/context/useLinksStore";
import { useRouter } from "next/navigation";
import { ArrowRightCircleIcon } from "lucide-react";

const urlSchema = z.object({
  url: z.string().url(),
});

const FormLink = ({ isLogged }: { isLogged: boolean }) => {
  const router = useRouter();
  const { createShortLink } = useLinksStore();
  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof urlSchema>) => {
    try {
      const response = await createShortLink(data.url);
      if (response?.ok) {
        form.reset();
        router.refresh();
      }
    } catch (error) {
      console.error("Error Form", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl">
        {" "}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex w-full items-center space-x-2 rounded-full border border-white/10 bg-transparent px-3 py-2 shadow-sm">
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your long URL"
                    className="flex-1 border-none bg-transparent focus:ring-0 min-w-0"
                  />
                  <Button
                    type="submit"
                    disabled={!isLogged}
                    className="bg-blue-700 border border-white/10 px-1 md:px-4 py-2 rounded-full text-white font-semibold shadow-[0_0_10px_4px_rgba(59,130,246,0.5)] ring-2 ring-blue-500/50 transition-all duration-200 hover:bg-blue-700 whitespace-nowrap"
                  >
                    {" "}
                    <p className="hidden md:block">Shorten Now!</p>
                    <p className="block md:hidden">
                      <ArrowRightCircleIcon size={30} />
                    </p>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="text-center text-blue-700" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default FormLink;
