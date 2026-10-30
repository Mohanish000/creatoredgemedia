import { founderByAgency } from "@/data/founders";
import { getNavItems } from "@/data/navigation";
import { showBrandsSection } from "@/data/brands";
import { SkipLink } from "@/components/layout/skip-link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FoundersSplit } from "@/components/sections/founders-split";
import { NameOrigin } from "@/components/sections/name-origin";
import { CreatorsSplit } from "@/components/sections/creators-split";
import { BrandsSection } from "@/components/sections/brands";
import { ServicesSection } from "@/components/sections/services";
import { FounderMessagesSection } from "@/components/sections/founder-messages";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  const creatorFounder = founderByAgency["creator-edge"];
  const campusFounder = founderByAgency["campus-edge"];
  const navItems = getNavItems({ hasBrands: showBrandsSection });

  return (
    <>
      <SkipLink />
      <Navbar items={navItems} />
      <main id="main" className="pt-[var(--nav-h)]">
        {creatorFounder && campusFounder ? (
          <FoundersSplit creatorFounder={creatorFounder} campusFounder={campusFounder} />
        ) : null}
        <NameOrigin />
        <CreatorsSplit />
        <BrandsSection />
        <ServicesSection />
        <FounderMessagesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
