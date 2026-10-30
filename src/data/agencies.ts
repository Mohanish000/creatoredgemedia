import type { Agency, AgencyId } from "@/types/content";

export const AGENCIES = {
  "creator-edge": {
    id: "creator-edge",
    name: "CreatorRise Media",
    shortName: "CreatorRise",
    anchorId: "creator-edge",
    accentVar: "var(--creator)",
    tagline: "Education creators, their content, and the collaborations around them.",
    description:
      "CreatorRise Media works with education creators, their content, and creator collaborations.",
  },
  "campus-edge": {
    id: "campus-edge",
    name: "CampusEdge Media",
    shortName: "CampusEdge",
    anchorId: "campus-edge",
    accentVar: "var(--campus)",
    tagline: "Campus visibility, college promotion, and institutions meeting the right audiences.",
    description:
      "CampusEdge Media works on campus visibility, college promotion, and connecting institutions with relevant education audiences.",
  },
} as const satisfies Record<AgencyId, Agency>;

export const AGENCY_LIST: readonly Agency[] = [AGENCIES["creator-edge"], AGENCIES["campus-edge"]];
