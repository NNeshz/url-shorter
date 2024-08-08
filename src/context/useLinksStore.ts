import { create } from "zustand";
import { Link } from "@/types/types";

interface LinksStore {
  links: Link[];
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
  isLoading: false,
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
          links: [link.link, ...state.links],
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
  },
  deleteLink: async (id) => {
    try {
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
    } catch (error) {
      set((state) => ({
        errors: [...state.errors, "Failed to delete link"],
      }));
    }
  },
}));
