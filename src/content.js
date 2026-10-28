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

// ARTICLES — just list the URLs: image, title and first sentences are fetched
// automatically. Any field you add (title, description, image, outlet, date)
// overrides the fetched one. Entries with url "#" are placeholders.
export const articles = [
  { url: "https://young.it/2026/04/17/iran-e-algoritmi-social-la-geopolitica-trasformata-in-fuffa/" },
  { url: "https://young.it/2026/04/30/il-porta-a-porta-del-desiderio-come-il-marketing-ha-recintato-il-mondo-femminile-da-avon-ai-fuffaguru-di-tiktok/" },
  { url: "https://young.it/2026/05/12/il-nuovo-salone-dei-libri-scritti-con-lia/" },
  { url: "https://www.progressista.io/eurovision-2026-israele-secondo-posto-molto-bene-sal-da-vinci/" },
  { url: "https://www.progressista.io/sasha-ragazzo-trans-salute-burocrazia-italia/" },
  { url: "https://young.it/2026/06/13/dante-e-shakespeare-ridotti-a-influencer-da-quattro-soldi-e-ce-pure-la-truffa-spirituale/" },
  { url: "https://www.progressista.io/la-destra-ha-capito-i-social-meglio-della-sinistra/" },
  { url: "https://www.progressista.io/caro-bollette-riaccendere-atomo/" },
  { url: "https://young.it/2026/09/26/i-fratelli-tate-sono-usciti-dal-matrix/" }
];

// SOCIALS
//  • TikTok:    paste the URL of your newest video in `latestUrl`.
//  • Instagram: either paste your newest post URL in `latestUrl` (best-effort),
//               or (recommended) create a free Behold JSON feed and put its URL
//               in `feedUrl` — then the latest post updates by itself.
export const socials = [
  {
    platform: "Instagram",
    handle: "@yourname",
    profileUrl: "https://instagram.com/yourname",
    feedUrl: "", // e.g. "https://feeds.behold.so/XXXXXXXX"
    latestUrl: "", // e.g. "https://www.instagram.com/p/XXXXXXXXXXX/"
  },
  {
    platform: "TikTok",
    handle: "@yourname",
    profileUrl: "https://tiktok.com/@yourname",
    latestUrl: "", // e.g. "https://www.tiktok.com/@yourname/video/1234567890"
  },
];

// CLIENTS — one journal page each. Put images in /public/clients/
export const clients = [
  { name: "Client One", role: "Brand identity", year: "2025", image: null, text: "Two or three lines about the project and what you did for them.", url: "" },
  { name: "Client Two", role: "Web design", year: "2024", image: null, text: "Two or three lines about the project and what you did for them.", url: "" },
  { name: "Client Three", role: "Art direction", year: "2024", image: null, text: "Two or three lines about the project and what you did for them.", url: "" },
];
