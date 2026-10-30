import type { Founder } from "@/types/content";
import { validateFounders } from "@/lib/content-guards";

// Portraits are the photos supplied by the client.
// Messages are draft copy. Flip `status` to "approved" once each founder signs off on the wording.
export const founders = validateFounders([
  {
    id: "aryan-sehgal",
    agency: "creator-edge",
    name: "Aryan Sehgal",
    title: "Founder, CreatorRise Media",
    image: {
      src: "/images/founders/aryan-sehgal.png",
      alt: "Aryan Sehgal",
      width: 768,
      height: 989,
      focalPosition: "50% 30%",
    },
    message: {
      text: "Every creator has a story worth discovering. Our mission is to connect that creativity with opportunities that matter.",
      status: "draft",
    },
  },
  {
    id: "samrat-patel",
    agency: "campus-edge",
    name: "Samrat Patel",
    title: "Founder, CampusEdge Media",
    image: {
      src: "/images/founders/samrat-patel.png",
      alt: "Samrat Patel",
      width: 650,
      height: 1180,
      focalPosition: "50% 30%",
    },
    message: {
      text: "Every campus has something worth sharing. We help connect institutions with the voices that students listen to.",
      status: "draft",
    },
  },
] satisfies readonly Founder[]);

export const founderByAgency = {
  "creator-edge": founders.find((f) => f.agency === "creator-edge"),
  "campus-edge": founders.find((f) => f.agency === "campus-edge"),
} as const;
