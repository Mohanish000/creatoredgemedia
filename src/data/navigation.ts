import type { NavItem } from "@/types/content";

/** Order of every section on the page, including ones that may be hidden. */
const SECTION_IDS = {
  founders: "founders",
  creatorEdge: "creator-edge",
  campusEdge: "campus-edge",
  brands: "brands",
  services: "services",
  messages: "messages",
  about: "about",
  contact: "contact",
} as const;

export function getNavItems(options: { hasBrands: boolean }): NavItem[] {
  const items: NavItem[] = [
    { id: "creators", label: "Creators", href: `#${SECTION_IDS.creatorEdge}` },
    { id: "brands", label: "Brands", href: `#${SECTION_IDS.brands}` },
    { id: "services", label: "Services", href: `#${SECTION_IDS.services}` },
    { id: "about", label: "About", href: `#${SECTION_IDS.about}` },
    { id: "contact", label: "Contact", href: `#${SECTION_IDS.contact}` },
  ];
  return options.hasBrands ? items : items.filter((item) => item.id !== "brands");
}
