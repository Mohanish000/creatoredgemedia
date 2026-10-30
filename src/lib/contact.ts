import { SITE } from "@/data/site";
import {
  buildMailto,
  buildWhatsApp,
  collaborationTemplate,
  creatorNetworkTemplate,
} from "@/lib/links";

export interface ContactActions {
  conversation?: string;
  creatorNetwork?: string;
  whatsapp?: string;
}

export function getContactActions(
  contact: { email?: string; whatsapp?: string } = SITE.contact,
): ContactActions {
  return {
    conversation: contact.email ? buildMailto(contact.email, collaborationTemplate) : undefined,
    creatorNetwork: contact.email ? buildMailto(contact.email, creatorNetworkTemplate) : undefined,
    whatsapp: buildWhatsApp(contact.whatsapp, collaborationTemplate.subject),
  };
}

export function hasAnyContactAction(actions: ContactActions): boolean {
  return Boolean(actions.conversation || actions.creatorNetwork || actions.whatsapp);
}
