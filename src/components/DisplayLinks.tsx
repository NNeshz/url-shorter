"use client";

import { useLinksStore } from "@/context/useLinksStore";
import { useEffect } from "react";

const DisplayLinks = () => {
  const getAllLinks = useLinksStore((state) => state.getLinks);
  const links = useLinksStore((state) => state.links);

  useEffect(() => {
    getAllLinks();
  }, [links]);

  return (
    <div>
      {links.length ? (
        links.map((link) => {
          return (
            <div key={link.id} className="flex items-center gap-2">
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.originalUrl}
              </a>
              <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                {link.shortUrl}
              </a>
            </div>
          );
        })
      ) : (
        <p>No links found</p>
      )}
    </div>
  );
};

export default DisplayLinks;
