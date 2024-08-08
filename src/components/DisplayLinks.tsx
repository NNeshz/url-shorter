"use client";

import { useLinksStore } from "@/context/useLinksStore";
import { useEffect } from "react";
import { Copy, Loader2, TrashIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "./ui/use-toast";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const DisplayLinks = () => {
  const { toast } = useToast();
  const { getLinks, links, deleteLink } = useLinksStore();

  useEffect(() => {
    getLinks();
  }, []);

  if (links.length === 0) {
    return (
      <p className="text-white text-center text-lg">
        You don&apos;t have any links yet
      </p>
    );
  }

  return (
    <div className="md:px-8 backdrop-filter backdrop-blur-lg bg-opacity-10">
      <Table className="px-4">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Copy size={24} />
            </TableHead>
            <TableHead>Shorted Link</TableHead>
            <TableHead>
              <TrashIcon size={24} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/${link.shortUrl}`
                    );
                    toast({
                      description: "Copied to clipboard :)",
                      duration: 2000,
                      className: "bg-green-500 text-white",
                    });
                  }}
                >
                  <Copy size={12} />
                </Button>
              </TableCell>
              <TableCell>
                {window.location.origin + "/" + link.shortUrl}
              </TableCell>
              <TableCell>
                <Button
                  className={cn(
                    buttonVariants({
                      variant: "destructive",
                    })
                  )}
                  onClick={() => {
                    deleteLink(link.id);
                    toast({
                      description: "Deleted successfully :)",
                      variant: "destructive",
                    });
                  }}
                >
                  <TrashIcon size={12} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayLinks;
