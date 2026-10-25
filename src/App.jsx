import { useRef } from "react";
import Window from "./components/Window";
import MenuBar from "./components/MenuBar";
import Dock from "./components/Dock";
import WelcomePanel from "./components/panels/WelcomePanel";
import ArticlesPanel from "./components/panels/ArticlesPanel";
import NewsletterPanel from "./components/panels/NewsletterPanel";
import SocialsPanel from "./components/panels/SocialsPanel";
import ClientsPanel from "./components/panels/ClientsPanel";
import ContactPanel from "./components/panels/ContactPanel";
import { useWindowManager } from "./useWindowManager";
import { profile } from "./content";
import {
  IconArticles,
  IconNewsletter,
  IconSocials,
  IconClients,
  IconContact,
} from "./icons";

// The 6 dock items, in the exact order requested.
const WINDOWS = [
  {
    id: "articles",
    title: "articles.txt",
    label: "Articles",
    icon: <img src="3.png" alt="Articles" />,
    initial: { x: 60, y: 320 },
    rotate: 0.8,
    width: 340,
    render: () => <ArticlesPanel />,
  },
  {
    id: "newsletter",
    title: "newsletter.sh",
    label: "Newsletter",
    icon: <img src="4.png" alt="Newsletter" />,
    initial: { x: 420, y: 300 },
    rotate: -0.6, 
    width: 280,
    render: () => <NewsletterPanel />,
  },
  {
    id: "socials",
    title: "socials.sh",
    label: "Socials",
    icon: <img src="5.png" alt="Socials" />,
    initial: { x: 40, y: 550 },
    rotate: -1,
    width: 240,
    render: () => <SocialsPanel />,
  },
  {
    id: "clients",
    title: "clients.txt",
    label: "I work with",
    icon: <img src="7.png" alt="Clients" />,
    initial: { x: 340, y: 560 },
    rotate: 0.6,
    width: 280,
    render: () => <ClientsPanel />,
  },
  {
    id: "contact",
    title: "contact.sh",
    label: "Contacts",
    icon: <IconContact />,
    initial: { x: 60, y: 90 },
    rotate: -1,
    width: 240,
    render: () => <ContactPanel />,
  },
];

// Welcome/diary window shown once on load, closable, always above other windows.
const WELCOME_WINDOW = {
  id: "welcome",
  title: "diario.txt",
  initial: { x: 200, y: 150 },
  rotate: -0.9,
  width: 500,
  render: () => <WelcomePanel />,
};

const MENU_ITEMS = WINDOWS.map((w) => ({ id: w.id, label: w.label, icon: w.icon }));

function App() {
  const desktopRef = useRef(null);
  const wm = useWindowManager(["welcome"]); // only welcome is open on load

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-mint flex items-center justify-center bg-[url('/2.png')] bg-cover bg-center">
      </div>

      <MenuBar />

      <main
        ref={desktopRef}
        className="relative w-full flex flex-col sm:block sm:min-h-[820px] pt-20 pb-28 px-4 sm:px-2 max-w-lg sm:max-w-none mx-auto sm:mx-0"
      >
        {/* Welcome / diary window — always rendered above the rest */}
        {wm.isOpen(WELCOME_WINDOW.id) && (
          <Window
            id={WELCOME_WINDOW.id}
            title={WELCOME_WINDOW.title}
            initial={WELCOME_WINDOW.initial}
            rotate={WELCOME_WINDOW.rotate}
            width={WELCOME_WINDOW.width}
            zIndex={100}
            onFocus={wm.focus}
            onClose={wm.closeWindow}
            dragConstraintsRef={desktopRef}
          >
            {WELCOME_WINDOW.render()}
          </Window>
        )}

        {WINDOWS.map((w) =>
          wm.isOpen(w.id) ? (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              initial={w.initial}
              rotate={w.rotate}
              width={w.width}
              zIndex={wm.zIndexOf(w.id)}
              onFocus={wm.focus}
              onClose={wm.closeWindow}
              dragConstraintsRef={desktopRef}
            >
              {w.render()}
            </Window>
          ) : null
        )}
      </main>

      <span className="fixed top-3 right-4 sm:right-6 z-40 font-mono text-[15px] text-white">
        © {new Date().getFullYear()} {profile.name}
      </span>

      <Dock items={MENU_ITEMS} onItemClick={wm.openWindow} />
    </div>
  );
}

export default App;