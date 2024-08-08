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

const FormLink = () => {
  const router = useRouter();
  const { createShortLink, isLoading } = useLinksStore();
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-xl gap-2 md:px-4 mb-4"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="www.example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading ? true : false}
        >
          Short
        </Button>
      </form>
    </Form>
  );
};

export default FormLink;
