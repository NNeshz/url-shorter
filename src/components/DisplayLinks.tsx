"use client";

import { useLinksStore } from "@/context/useLinksStore";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Copy, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

const DisplayLinks = () => {
  const { toast } = useToast();
  const getAllLinks = useLinksStore((state) => state.getLinks);
  const links = useLinksStore((state) => state.links);
  const deleteLink = useLinksStore((state) => state.deleteLink);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad) {
      getAllLinks();
      setInitialLoad(true);
    }
  }, [getAllLinks, initialLoad]);

  return (
    <div className="flex justify-center">
      {links.length ? (
        <Table>
          <TableCaption>Thanks for using my service</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Copy size={24} />
              </TableHead>
              <TableHead>Short link</TableHead>
              <TableHead>Original link</TableHead>
              <TableHead>Delete</TableHead>
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
                        description: "Copied to clipboard",
                        duration: 2000,
                        className: "bg-green-500 text-white",
                      })
                    }}
                  >
                    <Copy size={12} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Link href={`/${link.shortUrl}`} target="_blank">
                    {`${window.location.origin}/${link.shortUrl}`}
                  </Link>
                </TableCell>
                <TableCell className="overflow-hidden">
                  {link.originalUrl}
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
                        description: "Deleted successfully",
                        variant: "destructive"
                      })
                    }}
                  >
                    <Trash2 size={12} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Badge variant={"default"} className="text-base mt-4">
          There is no links yet
        </Badge>
      )}
    </div>
  );
};

export default DisplayLinks;
