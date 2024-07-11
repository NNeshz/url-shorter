import { create } from "zustand";
import { Link } from "@/types/types";

interface LinksStore {
    links: Link[];
    errors: string[];
}

interface LinksStoreActions {
    createShortLink: (url: string) => Promise<Response | undefined>;
    getLinks: () => Promise<void>
}

export const useLinksStore = create<LinksStore & LinksStoreActions>((set) => ({
    links: [],
    errors: [],
    createShortLink: async (url) => {
        try {
            const response = await fetch("api/links/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            if (response.ok) {
                const link = await response.json();
                set((state) => ({
                    links: [link, ...state.links],
                }));
            }

            return response;
        } catch (error) {
            set((state) => ({
                errors: [...state.errors, "Failed to create short link"],
            }));
        }
    },
    getLinks: async () => {
        // Fetch links from the server
        try {
            const response = await fetch("api/links/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const links = await response.json();
                set({ links });
            }
        } catch (error) {
            set((state) => ({
                errors: [...state.errors, "Failed to fetch links"],
            }));         
        }
    }
}))