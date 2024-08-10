"use client";

import { useLinksStore } from "@/store/useLinksStore";
import { useEffect } from "react";
import MobileDisplay from "./MobileDisplay";
import DesktopDisplay from "./DesktopDisplay";

const DisplayLinks = () => {
  const { getLinks, links } = useLinksStore();

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="w-full">
      <section className="flex justify-center items-center md:hidden">
        <MobileDisplay links={links} />
      </section>
      <section className="hidden md:flex justify-center items-center">
        <DesktopDisplay links={links} />
      </section>
    </div>
  );
};

export default DisplayLinks;
