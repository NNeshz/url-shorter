import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Copy, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface ILinks {
  id: string;
  originalUrl: string;
  shortUrl: string;
}

const DesktopDisplay = ({ links }: { links: ILinks[] }) => {
  const { toast } = useToast();

  const handleCopy = (shortUrl: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortUrl}`);
    toast({
      description: "Copied to clipboard :)",
      duration: 2000,
      className: "bg-green-500 text-white",
    });
  };

  return (
    <Table className="text-white rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center justify-center">
            <Copy size={24} />
          </TableHead>
          <TableHead>Short URL</TableHead>
          <TableHead className="max-w-[250px]">Original URL</TableHead>
          <TableHead className="flex items-center justify-center">
            <Trash size={24} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell className="flex items-center justify-center">
              <Button
                onClick={() => handleCopy(link.shortUrl)}
                className="flex items-center gap-x-1 bg-blue-600 border border-white/10 px-2 py-2 rounded-full text-white font-semibold hover:bg-blue-700"
              >
                <Copy />
              </Button>
            </TableCell>
            <TableCell>
              {window.location.origin + "/" + link.shortUrl}
            </TableCell>
            <TableCell className="max-w-[250px]">{link.originalUrl}</TableCell>
            <TableCell className="flex items-center justify-center">
              <Button className="flex items-center gap-x-1 bg-red-600 border border-white/10 px-2 py-2 rounded-full text-white font-semibold hover:bg-red-700">
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DesktopDisplay;
