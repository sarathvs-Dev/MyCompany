/**
 * Every real-world detail the site shows, in one place.
 * Edit here and the contact section, footer, and form delivery all update.
 */
export const site = {
  name: 'TBF',
  fullName: 'Together Build Future',
  tagline: 'IT solutions that build your future',

  email: 'tbfworld@gmail.com',
  // Not shown as a contact row (visitors are already here) — used for the
  // canonical URL and link previews.
  url: 'https://www.tbfworld.com',

  location: 'Kochi, India',

  // Primary first — it's the one shown in the footer and used for the tel: CTA.
  phones: ['+91 94465 21711', '+91 97460 90254', '+91 73063 80614'],

  hours: 'Mon - Fri: 9:00 AM - 6:00 PM',

  // Leave a value empty and that icon is hidden rather than linking nowhere.
  socials: {
    linkedin: '',
    instagram: '',
  },
};

/** Strips spaces and punctuation so tel: links dial correctly. */
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;
export const mailHref = `mailto:${site.email}`;
