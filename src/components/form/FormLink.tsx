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

const urlSchema = z.object({
  url: z.string().url(),
});

const FormLink = ({ isLogged }: { isLogged: boolean }) => {
  const router = useRouter();
  const createShortLink = useLinksStore((state) => state.createShortLink);
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
      {!isLogged && (
        <p className="text-red-500 text-sm">
          You need to be logged in to use Short URL
        </p>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-2"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="www.example.com"
                  {...field}
                  className="md:w-96"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLogged ? false : true}>
          Short
        </Button>
      </form>
    </Form>
  );
};

export default FormLink;
