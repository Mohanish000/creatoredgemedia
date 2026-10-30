import type { ProcessStep, Service } from "@/types/content";
import { validateServices } from "@/lib/content-guards";

// Services are proposed offerings ("We can help with…"), not claims of delivered work.
export const services = validateServices([
  {
    id: "ce-partnerships",
    agency: "creator-edge",
    title: "Education creator partnerships",
    description:
      "Matching education creators with brands and institutions whose goals fit their audience.",
  },
  {
    id: "ce-youtube",
    agency: "creator-edge",
    title: "YouTube integrations",
    description: "Planning how a message sits naturally inside long-form education videos.",
  },
  {
    id: "ce-shortform",
    agency: "creator-edge",
    title: "Reels and short-form content",
    description: "Short-form concepts built around how students actually watch.",
  },
  {
    id: "ce-sourcing",
    agency: "creator-edge",
    title: "Creator sourcing and outreach",
    description: "Finding the right voices for a topic, and making the first introduction.",
  },
  {
    id: "ce-sponsored",
    agency: "creator-edge",
    title: "Sponsored education content",
    description: "Briefs and formats that keep sponsored content useful to the viewer.",
  },
  {
    id: "ce-coordination",
    agency: "creator-edge",
    title: "Collaboration coordination",
    description: "One point of contact between creator and partner, from brief to publish.",
  },
  {
    id: "cp-promotions",
    agency: "campus-edge",
    title: "Engineering college promotions",
    description: "Showing what an engineering college offers to the students deciding where to go.",
  },
  {
    id: "cp-visits",
    agency: "campus-edge",
    title: "Campus visit campaigns",
    description: "Creator-led campus visits that let students see the place for themselves.",
  },
  {
    id: "cp-admissions",
    agency: "campus-edge",
    title: "Admissions awareness",
    description: "Clear, timely information reaching students while they are choosing.",
  },
  {
    id: "cp-partnerships",
    agency: "campus-edge",
    title: "College creator partnerships",
    description: "Connecting institutions with creators students already follow.",
  },
  {
    id: "cp-campaigns",
    agency: "campus-edge",
    title: "Student-focused content campaigns",
    description: "Campaign ideas written for students, not for brochures.",
  },
  {
    id: "cp-reporting",
    agency: "campus-edge",
    title: "Campaign coordination and reporting",
    description: "Keeping the moving parts organised and sharing what happened afterwards.",
  },
] satisfies readonly Service[]);

export const processSteps = [
  {
    id: "discover",
    title: "Discover",
    description: "We learn your goals, your audience, and who they already listen to.",
  },
  {
    id: "connect",
    title: "Connect",
    description: "We introduce the right creators and campuses to each other.",
  },
  {
    id: "create",
    title: "Create",
    description: "Together we shape the content, the format, and the plan.",
  },
  {
    id: "amplify",
    title: "Amplify",
    description: "The work goes live where the audience actually is.",
  },
  {
    id: "review",
    title: "Review",
    description: "We look back at what happened and decide what comes next.",
  },
] as const satisfies readonly ProcessStep[];
