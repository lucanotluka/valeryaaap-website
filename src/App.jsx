import { useRef } from "react";
import Window from "./components/Window";
import MenuBar from "./components/MenuBar";
import Dock from "./components/Dock";
import WelcomePanel from "./components/panels/WelcomePanel";
import ArticlesPanel from "./components/panels/ArticlesPanel";
import SocialsPanel from "./components/panels/SocialsPanel";
import ClientsPanel from "./components/panels/ClientsPanel";
import ContactPanel from "./components/panels/ContactPanel";
import { useWindowManager } from "./useWindowManager";
import { profile } from "./content";

// Window sizes scale with the screen: clamp(min, % of viewport width, max)
const W = {
  sm: "clamp(260px, 22vw, 320px)",
  md: "clamp(300px, 28vw, 400px)",
  lg: "clamp(340px, 34vw, 480px)",
};

// pos = { left, top } in % of the viewport
const WINDOWS = [
  {
    id: "articles", title: "articles.txt", label: "Articles",
    icon: <img src="/3.png" alt="Articles" />,
    pos: { left: 4, top: 12 }, width: W.lg,
    render: () => <ArticlesPanel />,
  },
  {
    id: "newsletter", label: "Newsletter",
    icon: <img src="/4.png" alt="Newsletter" />,
    popupUrl: "https://yappingdigitale.com", // opens a browser sub-window, not a panel
  },
  {
    id: "socials", title: "socials.sh", label: "Socials",
    icon: <img src="/5.png" alt="Socials" />,
    pos: { left: 62, top: 10 }, width: W.md,
    render: () => <SocialsPanel />,
  },
  {
    id: "clients", title: "clients.txt", label: "I work with",
    icon: <img src="/7.png" alt="Clients" />,
    pos: { left: 30, top: 20 }, width: W.lg,
    render: () => <ClientsPanel />,
  },
  {
    id: "contact", title: "contact.sh", label: "Contacts",
    icon: <img src="/8.png" alt="Contact" />,
    pos: { left: 70, top: 50 }, width: W.sm,
    render: () => <ContactPanel />,
  },
];

const WELCOME_WINDOW = {
  id: "welcome",
  title: "diario.txt",
  pos: { left: "center", top: 16 },
  width: "clamp(300px, 40vw, 560px)",
  render: () => <WelcomePanel />,
};

const MENU_ITEMS = WINDOWS.map((w) => ({ id: w.id, label: w.label, icon: w.icon }));

// Browser sub-window (popup), centered and sized relative to the current window
function openPopup(url) {
  const w = Math.min(1100, Math.round(window.outerWidth * 0.8));
  const h = Math.min(850, Math.round(window.outerHeight * 0.85));
  const left = Math.round(window.screenX + (window.outerWidth - w) / 2);
  const top = Math.round(window.screenY + (window.outerHeight - h) / 2);
  window.open(url, "_blank", `popup=yes,width=${w},height=${h},left=${left},top=${top},noopener,noreferrer`);
}

function App() {
  const desktopRef = useRef(null);
  const wm = useWindowManager(["welcome"]);

  const handleItemClick = (id) => {
    const w = WINDOWS.find((x) => x.id === id);
    if (w?.popupUrl) openPopup(w.popupUrl);
    else wm.openWindow(id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10 bg-mint flex items-center justify-center bg-[url('/2.png')] bg-cover bg-center" />

      <MenuBar />

      <main
        ref={desktopRef}
        className="relative w-full flex flex-col sm:block sm:h-dvh pt-20 pb-28 px-4 sm:px-0 max-w-lg sm:max-w-none mx-auto sm:mx-0"
      >
        {wm.isOpen(WELCOME_WINDOW.id) && (
          <Window
            id={WELCOME_WINDOW.id}
            title={WELCOME_WINDOW.title}
            pos={WELCOME_WINDOW.pos}
            width={WELCOME_WINDOW.width}
            zIndex={100}
            onFocus={wm.focus}
            onClose={wm.closeWindow}
            dragConstraintsRef={desktopRef}
          >
            {WELCOME_WINDOW.render()}
          </Window>
        )}

        {WINDOWS.filter((w) => !w.popupUrl).map((w) =>
          wm.isOpen(w.id) ? (
            <Window
              key={w.id}
              id={w.id}
              title={w.title}
              pos={w.pos}
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

      <Dock items={MENU_ITEMS} onItemClick={handleItemClick} />
    </div>
  );
}

export default App;