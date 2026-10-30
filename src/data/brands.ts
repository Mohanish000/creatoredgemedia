import type { Brand } from "@/types/content";
import { getVisibleBrands, validateBrands } from "@/lib/content-guards";
import { SHOW_DEV_PLACEHOLDERS } from "@/data/site";

// Logos are the institutions' own marks, taken from their public websites. Confirm you have permission to show them.
// To add a brand: add a record with approved: true and an SVG/PNG/WebP in /public/images/brands/.
// Use tile: "dark" for white/light logo artwork.
export const brands = validateBrands([
  {
    id: "scaler",
    name: "Scaler School of Technology",
    logo: "/images/brands/scaler.svg",
    alt: "Scaler School of Technology logo",
    websiteUrl: "https://www.scaler.com/school-of-technology",
    tile: "dark",
    approved: true,
  },
  {
    id: "newton",
    name: "Newton School of Technology",
    logo: "/images/brands/newton.svg",
    alt: "Newton School of Technology logo",
    websiteUrl: "https://www.newtonschool.co",
    approved: true,
  },
  {
    id: "vedam",
    name: "Vedam School of Technology",
    logo: "/images/brands/vedam.png",
    alt: "Vedam School of Technology logo",
    websiteUrl: "https://www.vedam.org",
    approved: true,
  },
  {
    id: "alta",
    name: "Alta School of Technology",
    logo: "/images/brands/alta.webp",
    alt: "Alta School of Technology logo",
    websiteUrl: "https://altaschool.tech",
    approved: true,
  },
  {
    id: "sunstone",
    name: "Sunstone",
    logo: "/images/brands/sunstone.png",
    alt: "Sunstone logo",
    websiteUrl: "https://www.sunstone.in",
    approved: true,
  },
  {
    id: "lpu",
    name: "Lovely Professional University (LPU)",
    logo: "/images/brands/lpu.png",
    alt: "Lovely Professional University (LPU) logo",
    websiteUrl: "https://www.lpu.in",
    approved: true,
  },
  {
    id: "galgotias",
    name: "Galgotias College",
    logo: "/images/brands/galgotias.png",
    alt: "Galgotias College logo",
    websiteUrl: "https://galgotiacollege.edu",
    approved: true,
  },
  {
    id: "upgrad",
    name: "upGrad",
    logo: "/images/brands/upgrad.svg",
    alt: "upGrad logo",
    websiteUrl: "https://www.upgrad.com",
    approved: true,
  },
  {
    id: "niat",
    name: "NxtWave Institute of Advanced Technologies (NIAT)",
    logo: "/images/brands/niat.svg",
    alt: "NxtWave Institute of Advanced Technologies (NIAT) logo",
    websiteUrl: "https://www.niatindia.com",
    approved: true,
  },
  {
    id: "masai",
    name: "Masai School of Technology",
    logo: "/images/brands/masai.png",
    alt: "Masai School of Technology logo",
    websiteUrl: "https://www.masaischool.com",
    tile: "dark",
    approved: true,
  },
  {
    id: "zenith",
    name: "Zenith School of AI",
    logo: "/images/brands/zenith.webp",
    alt: "Zenith School of AI logo",
    websiteUrl: "https://zenithschool.ai",
    tile: "dark",
    approved: true,
  },
  {
    id: "pw-ioi",
    name: "PW Institute of Innovation (PW IOI)",
    logo: "/images/brands/pwioi.webp",
    alt: "PW Institute of Innovation (PW IOI) logo",
    websiteUrl: "https://www.pwioi.com",
    tile: "dark",
    approved: true,
  },
  {
    id: "quantum",
    name: "Quantum University",
    logo: "/images/brands/quantum.svg",
    alt: "Quantum University logo",
    websiteUrl: "https://quantumuniversity.edu.in",
    approved: true,
  },
  {
    id: "rishihood",
    name: "Rishihood University",
    logo: "/images/brands/rishihood.png",
    alt: "Rishihood University logo",
    websiteUrl: "https://rishihood.edu.in",
    tile: "dark",
    approved: true,
  },
  {
    id: "woxsen",
    name: "Woxsen University",
    logo: "/images/brands/woxsen.webp",
    alt: "Woxsen University logo",
    websiteUrl: "https://woxsen.edu.in",
    approved: true,
  },
  {
    id: "cgc",
    name: "CGC University, Mohali",
    logo: "/images/brands/cgc.webp",
    alt: "CGC University, Mohali logo",
    websiteUrl: "https://www.cgcuniversity.in",
    tile: "dark",
    approved: true,
  },
  {
    id: "masters-union",
    name: "Masters' Union",
    logo: "/images/brands/masters-union.png",
    alt: "Masters' Union logo",
    websiteUrl: "https://mastersunion.org",
    tile: "dark",
    approved: true,
  },
] satisfies readonly Brand[]);

export const visibleBrands = getVisibleBrands(brands, {
  includePlaceholders: SHOW_DEV_PLACEHOLDERS,
});

/** In production the section (and its nav link) disappears until at least one approved logo exists. */
export const showBrandsSection = visibleBrands.length > 0 || SHOW_DEV_PLACEHOLDERS;
