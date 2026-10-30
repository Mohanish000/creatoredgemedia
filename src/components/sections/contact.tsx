import { SITE, SHOW_DEV_PLACEHOLDERS } from "@/data/site";
import { getContactActions, hasAnyContactAction } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { AnimatedDivider } from "@/components/ui/animated-divider";
import { SocialLinks } from "@/components/layout/social-links";

export function ContactSection() {
  const actions = getContactActions();
  const hasActions = hasAnyContactAction(actions);
  const hasSocials = Object.values(SITE.socials).some(Boolean);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-y relative overflow-hidden"
    >
      <div className="container-edge">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_auto_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="label text-ink-2">Contact</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="contact-title"
                className="mt-5 font-display text-h2 font-semibold text-balance"
              >
                Let&apos;s Build the Next Edge.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-lg text-body text-ink-2">
                Whether you create education content, represent a campus, or want to partner with
                either side, tell us what you have in mind.
              </p>
            </Reveal>
          </div>

          <div className="hidden lg:block">
            <AnimatedDivider orientation="vertical" trigger="scroll" gradient />
          </div>
          <div className="lg:hidden">
            <AnimatedDivider orientation="horizontal" gradient />
          </div>

          <div className="flex flex-col justify-center">
            {hasActions ? (
              <Reveal>
                <div className="flex flex-col items-start gap-4">
                  {actions.conversation ? (
                    <Magnetic>
                      <Button href={actions.conversation} accent="creator" size="lg">
                        Start a Conversation
                      </Button>
                    </Magnetic>
                  ) : null}
                  {actions.creatorNetwork ? (
                    <Magnetic>
                      <Button
                        href={actions.creatorNetwork}
                        variant="outline"
                        accent="campus"
                        size="lg"
                      >
                        Join the Creator Network
                      </Button>
                    </Magnetic>
                  ) : null}
                  {actions.whatsapp ? (
                    <Button href={actions.whatsapp} variant="ghost" external>
                      Message on WhatsApp
                    </Button>
                  ) : null}
                  {actions.conversation || actions.creatorNetwork ? (
                    <p className="text-caption text-ink-2">This opens your email app.</p>
                  ) : null}
                </div>
              </Reveal>
            ) : SHOW_DEV_PLACEHOLDERS ? (
              <Reveal>
                <div className="border border-dashed border-edge p-6 text-ink-2">
                  <p className="label text-ink">Contact not configured</p>
                  <p className="mt-3">
                    Set <code>NEXT_PUBLIC_CONTACT_EMAIL</code> and/or{" "}
                    <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code> in <code>.env.local</code> to show real
                    contact actions here. This box is hidden in production.
                  </p>
                </div>
              </Reveal>
            ) : hasSocials ? (
              <Reveal>
                <p className="mb-4 text-ink-2">Find us on social media.</p>
                <SocialLinks />
              </Reveal>
            ) : (
              <Reveal>
                <p className="text-ink-2">Contact details are coming soon.</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
