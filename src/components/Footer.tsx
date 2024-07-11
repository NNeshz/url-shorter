import { GithubIcon, Linkedin, LucideLink } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <div className="w-full bg-zinc-100">
      <MaxWidthWrapper className="flex justify-between items-center py-6">
        <section>
          <Link href={"/"} className="flex gap-x-2 font-bold">
            <LucideLink /> Short URL
          </Link>
        </section>
        <section className="flex gap-x-8">
          <Link href={"#"} className="text-sm text-zinc-400 hover:text-zinc-600">About</Link>
          <Link href={"#"} className="text-sm text-zinc-400 hover:text-zinc-600">FAQ</Link>
        </section>
        <section className="flex gap-x-2">
          <Link href={"https://github.com/NNeshz/url-shorter"}>
            <GithubIcon className="w-5" />
          </Link>
          <Link href={"https://www.linkedin.com/in/nneshz/"}>
            <Linkedin className="w-5" />
          </Link>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
