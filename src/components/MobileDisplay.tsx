"use client";

import { CopyIcon, Loader2, Trash } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useLinksStore } from "@/store/useLinksStore";

interface ILinks {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

const MobileDisplay = ({ links }: { links: ILinks[] }) => {
  const { toast } = useToast();
  const { deleteLink, deleteLoading } = useLinksStore();

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    toast({
      description: "Copied to clipboard :)",
      duration: 2000,
      className: "bg-green-500 text-white",
    });
  };

  const handleDelete = async (id: string) => {
    await deleteLink(id);
    toast({
      description: "Link deleted",
      duration: 2000,
      className: "bg-red-500 text-white",
    });
  };

  return (
    <div className="w-full text-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Your links</h2>
      {links.length !== 0 ? (
        <Accordion className="max-w-full" collapsible type="single">
          {links.map((link) => (
            <AccordionItem
              value={link.shortUrl}
              key={link.id}
              className="flex flex-col w-[310px]"
            >
              <div className="flex items-center justify-between">
                <Button
                  onClick={() => handleCopy(link.shortUrl)}
                  className="flex items-center gap-x-1 bg-blue-600 border border-white/10 px-2 py-2 rounded-full text-white font-semibold hover:bg-blue-700"
                >
                  <CopyIcon />
                </Button>
                <AccordionTrigger className="ml-4">
                  {window.location.origin + "/" + link.shortUrl}
                </AccordionTrigger>
              </div>
              <div className="w-full flex items-center justify-center">
                <AccordionContent className="max-w-[310px]">
                  <div className="flex items-center gap-x-4">
                    <Button
                      onClick={() => handleDelete(link.id)}
                      className="flex items-center gap-x-1 bg-red-600 border border-white/10 px-2 py-2 rounded-full text-white font-semibold hover:bg-red-700"
                    >
                      {deleteLoading ? (
                        <p>
                          <Loader2 className="animate-spin" />
                        </p>
                      ) : (
                        <p>
                          <Trash />
                        </p>
                      )}
                    </Button>
                    <p className="truncate">{link.originalUrl}</p>
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-white/50">There is no links yet</p>
      )}
    </div>
  );
};

export default MobileDisplay;
