/**
 * Items marked [Confirm] in the brief are built but stay hidden until Eesaa confirms them (brief, Section 1).
 * Flip a flag to true once confirmed.
 */
export const FLAGS = {
  /** Institutions Ch.1, "In progress": Company incorporation [Confirm] */
  showCompanyIncorporation: false,
  /** Founder headshot. Set to /essaSimat.png */
  founderPhoto: "/essaSimat.png",
  /** Founder LinkedIn profile URL. The icon link renders only once this is set. */
  founderLinkedIn: null as string | null,
};
