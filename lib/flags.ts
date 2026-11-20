/**
 * Items marked [Confirm] in the brief are built but stay hidden until Eesaa confirms them (brief, Section 1).
 * Flip a flag to true once confirmed.
 */
export const FLAGS = {
  /** Institutions Ch.1, "In progress": Company incorporation [Confirm] */
  showCompanyIncorporation: false,
  /** Founder headshot [Confirm: photo needed]. Set to a path in /public once approved, e.g. "/founder.jpg". */
  founderPhoto: null as string | null,
  /** Founder LinkedIn profile URL. The icon link renders only once this is set. */
  founderLinkedIn: null as string | null,
};
