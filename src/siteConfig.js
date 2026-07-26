/**
 * Every real-world detail the site shows, in one place.
 *
 * These are the placeholders the template shipped with — edit this file and the
 * contact section, footer, and form delivery all update together. Nothing else
 * should hardcode an address or phone number.
 */
export const site = {
  email: 'hello@tbf.com',
  phone: '+1 (555) 123-4567',

  address: ['123 Innovation Drive,', 'Tech District, SF 94105'],
  hours: 'Mon - Fri: 9:00 AM - 6:00 PM',

  // Leave a value empty and that icon is hidden rather than linking nowhere.
  socials: {
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
  },
};

/** Strips spaces and punctuation so tel: links dial correctly. */
export const telHref = `tel:${site.phone.replace(/[^\d+]/g, '')}`;
export const mailHref = `mailto:${site.email}`;
