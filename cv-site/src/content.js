// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to update your site's content.
// No need to touch any component code below.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Valeryaaap",
  role: "Valeria Della Monica",
  tagline: "I design things that feel like they shouldn't work, but do.",
  location: "Bergamo, Italia",
  avatarInitials: "VDM",
};
 
// Welcome / diary card shown once on load
export const welcome = {
  title: "Ciao, welcome.",
  entry: `Questo è il mio piccolo angolo di internet — un diario digitale
dove raccolgo quello che scrivo, faccio, e le persone con cui lavoro.
 
Girati pure tra le finestre. Buona visita.`,
  date: "01.08.2026",
};
 
export const about = `I'm a designer based in Lecco, working across brand, product, and
interactive experiences. I care about the small details most people
never consciously notice, but always feel.
 
Previously I worked on [things]. These days I split my time between
freelance projects and things I build for myself, like this site.`;
 
// 1. Articles written around the internet
export const articles = [
  {
    id: "article-1",
    title: "Article title one",
    outlet: "Publication Name",
    date: "2025",
    description: "A short line on what this piece is about.",
    image: null, // e.g. "/articles/one.jpg"
    url: "#",
  },
  {
    id: "article-2",
    title: "Article title two",
    outlet: "Another Outlet",
    date: "2024",
    description: "A short line on what this piece is about.",
    image: null,
    url: "#",
  },
];
 
// 2. Substack newsletter
export const newsletter = {
  name: "Your Newsletter Name",
  description: "A short line about what the newsletter covers and how often it lands.",
  url: "https://yourname.substack.com",
};
 
// 3. Socials
export const socials = [
  { label: "Instagram", value: "@yourname", href: "https://instagram.com/yourname" },
  { label: "TikTok", value: "@yourname", href: "https://tiktok.com/@yourname" },
];
 
// 5. Clients / who I work with
export const clients = [
  { name: "Client One", note: "Brand identity, 2025" },
  { name: "Client Two", note: "Web design, 2024" },
  { name: "Client Three", note: "Art direction, 2024" },
];
 
// 6. Contact
export const contact = [
  { label: "Email", value: "hello@yourname.com", href: "mailto:hello@yourname.com" },
  { label: "Résumé", value: "download.pdf", href: "#" },
];