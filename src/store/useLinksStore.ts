import { create } from "zustand";
import { Link } from "@/types/types";

interface LinksStore {
  links: Link[];
  linkLoading: boolean;
  deleteLoading: boolean;
  errors: string[];
}

interface LinksStoreActions {
  createShortLink: (url: string) => Promise<Response | undefined>;
  getLinks: () => Promise<void>;
  deleteLink: (id: string) => Promise<void>;
}

export const useLinksStore = create<LinksStore & LinksStoreActions>((set) => ({
  links: [],
  errors: [],
  linkLoading: false,
  deleteLoading: false,
  createShortLink: async (url) => {
    try {
      set({ linkLoading: true });
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
          links: [link.link, ...state.links],
        }));
      }

      set({ linkLoading: false });
      return response;
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, "Failed to create short link"],
      }));
    }
  },
  getLinks: async () => {
    try {
      set({ linkLoading: true });
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
      set({ linkLoading: false });
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, "Failed to fetch links"],
      }));
    }
  },
  deleteLink: async (id) => {
    try {
      set({ deleteLoading: true });
      const response = await fetch("api/links/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        set((state) => ({
          links: state.links.filter((link) => link.id !== id),
        }));
      }
      set({ deleteLoading: false });
    } catch (error) {
      console.log(error);
      set((state) => ({
        errors: [...state.errors, "Failed to delete link"],
      }));
    }
  },
}));
