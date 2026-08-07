# Your Name — Digital CV

A minimal personal site with a floating-windows interaction, inspired by
poolsuite.net but restrained: cream background, one accent color, Space
Grotesk + IBM Plex type, draggable "windows" that behave like desktop
files (`about.txt`, `works.fig`, `contact.sh`).

## Edit your content

Everything you need to change is in **`src/content.js`**:

- `profile` — your name, role, tagline, location
- `about` — your bio paragraph(s)
- `links` — email, socials, résumé link
- `works` — your projects (title, year, tags, description, image, url)

You don't need to touch any other file to update the site's content.

To add a project image, drop the file in `public/works/` and set
`image: "/works/yourfile.jpg"` in `content.js`, then reference it in
`WorksPanel.jsx` if you want thumbnails rendered (currently text-only —
see "Next steps" below).

## Run locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy (free) — Vercel

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. "Add New Project" → import your repo.
4. Framework preset: Vite (auto-detected). No config needed.
5. Deploy. You'll get a free `your-project.vercel.app` URL.
6. Every push to `main` auto-redeploys.

### Alternative: Netlify

1. Push to GitHub.
2. [netlify.com](https://netlify.com) → "Add new site" → import repo.
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy.

### Custom domain later

Both Vercel and Netlify let you attach a custom domain for free (you only
pay the domain registrar, e.g. Namecheap/Google Domains) — just add it in
the project settings and update your DNS records as instructed.

## Project structure

```
src/
  content.js              ← edit this for your content
  App.jsx                 ← assembles the desktop + window list
  useWindowManager.js     ← handles window stacking/open/close state
  components/
    Window.jsx             ← the draggable window shell
    MenuBar.jsx             ← top bar with window shortcuts
    panels/
      HeroPanel.jsx          ← intro.txt content
      AboutPanel.jsx         ← about.txt content
      WorksPanel.jsx         ← works.fig content
      LinksPanel.jsx         ← contact.sh content
```

## Next steps you might want

- Add real project thumbnails: extend `WorksPanel.jsx` to render
  `work.image` as an `<img>` when present.
- Add a "case study" window that opens when a work item is clicked
  (currently `work.url` just links out — could open another `Window`
  instead, using the same `useWindowManager`).
- Swap the accent color (`accent` in `tailwind.config.js`) if
  ink-blue isn't your color — one line to change site-wide.
- Add analytics (Vercel Analytics is a one-line add if deployed there).



TODO
- sfondo tipo polaroid, fiori e scarpette di danza, videocassette
- azzurrino, ottanio, rosa, meno biancoso
- togli la banda sopra, lascia come poolsuite.net

- menu icone pixelate centrale in basso tipo macOS
- on startup, scheda di benvenuto di presentazione, UI pagina di diario
- menu:
1. articoli scritti in giro
2. newsletter sua
3. socials: ig tk
4. chi sono
5. con chi lavoro/lavori fatti ad oggi
6. contatti
(7. giradischi x musica)
