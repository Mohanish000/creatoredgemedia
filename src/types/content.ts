export type AgencyId = "creator-edge" | "campus-edge";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPosition?: string;
  blurDataURL?: string;
}

export interface Agency {
  id: AgencyId;
  name: string;
  shortName: string;
  anchorId: string;
  accentVar: string;
  tagline: string;
  description: string;
}

export interface Creator {
  id: string;
  name: string;
  agency: AgencyId;
  category?: string;
  image: ImageAsset;
  youtubeUrl?: string;
  instagramUrl?: string;
  shortBio?: string;
  /** YouTube subscriber snapshot (2026-10-31); used only to order creators. */
  youtubeSubscribers?: number;
  featured?: boolean;
  /** Photo is a generated placeholder; renders a Photo pending tag. */
  photoPending?: boolean;
  isPlaceholder?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  alt: string;
  websiteUrl?: string;
  agency?: AgencyId;
  category?: string;
  /** "dark" renders the logo on a dark tile (for white/light logo artwork). Default is a light tile. */
  tile?: "light" | "dark";
  approved: boolean;
  isPlaceholder?: boolean;
}

type MessageStatus = "draft" | "approved";

export interface Founder {
  id: string;
  agency: AgencyId;
  name: string;
  title: string;
  image: ImageAsset;
  caption?: string;
  message: { text: string; status: MessageStatus };
  youtubeUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  isPlaceholder?: boolean;
}

export interface Service {
  id: string;
  agency: AgencyId;
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
