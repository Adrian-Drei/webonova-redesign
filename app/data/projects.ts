export type Project = {
  number: string;
  title: string;
  status: "client" | "concept";
  industry: string;
  category: string;
  year: number;
  description: string;
  services: string[];
  thumbnail: string;
  alt: string;
  url: string;
  cta: string;
};
export const projects: Project[] = [
  {
    number: "01",
    title: "Alex & Jamie Wedding RSVP",
    status: "concept",
    industry: "Events",
    category: "Wedding / RSVP Experience",
    year: 2026,
    description:
      "An elegant wedding RSVP experience created for Alex and Jamie, combining a romantic visual system with a clear and responsive guest flow.",
    services: ["Strategy", "UX & UI", "Development"],
    thumbnail: "/projects/wedding.webp",
    alt: "Alex and Jamie wedding RSVP website welcome screen",
    url: "https://wedding-rsvp-beige-sigma.vercel.app/",
    cta: "View client project",
  },
  {
    number: "02",
    title: "Private Resort Website",
    status: "concept",
    industry: "Hospitality",
    category: "Resort Experience",
    year: 2026,
    description:
      "A cinematic private-resort website concept exploring quiet luxury, immersive storytelling, and effortless discovery.",
    services: ["Strategy", "UX & UI", "Development"],
    thumbnail: "/projects/resort.webp",
    alt: "Private resort website at sunset",
    url: "https://template-resort-teal.vercel.app/",
    cta: "View live sample",
  },
  {
    number: "03",
    title: "Buildstone Construction",
    status: "concept",
    industry: "Construction",
    category: "Product Showcase",
    year: 2026,
    description:
      "A premium finishing-material showcase concept featuring architectural interiors, material collections, and clear inquiry paths.",
    services: ["Strategy", "UX & UI", "Development"],
    thumbnail: "/projects/construction.webp",
    alt: "Motion Construction architectural materials website",
    url: "https://construction-template-ochre.vercel.app/",
    cta: "View live sample",
  },
  {
    number: "04",
    title: "Resort Booking Platform",
    status: "concept",
    industry: "Platforms",
    category: "Hospitality / Booking Experience",
    year: 2026,
    description:
      "A resort-booking platform concept with destination discovery, property selection, date controls, and a streamlined reservation flow.",
    services: ["Strategy", "UX & UI", "Development"],
    thumbnail: "/projects/booking.webp",
    alt: "Resort booking platform search interface",
    url: "https://booking-template-ashy.vercel.app/",
    cta: "View live sample",
  },
];
