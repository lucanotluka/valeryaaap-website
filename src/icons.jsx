// Minimal 16x16 pixel-grid icons, monochrome, retro-Mac style.
// currentColor so they inherit text color for easy theming/hover states.

function Grid({ children }) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" shapeRendering="crispEdges" className="block">
      {children}
    </svg>
  );
}

export function IconArticles() {
  // stacked pages / newspaper
  return (
    <Grid>
      <rect x={3} y={2} width={10} height={12} fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={5} y={5} width={6} height={1} fill="currentColor" />
      <rect x={5} y={7} width={6} height={1} fill="currentColor" />
      <rect x={5} y={9} width={4} height={1} fill="currentColor" />
    </Grid>
  );
}

export function IconNewsletter() {
  // envelope
  return (
    <Grid>
      <rect x={2} y={4} width={12} height={9} fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M2 4 L8 10 L14 4" fill="none" stroke="currentColor" strokeWidth="1" />
    </Grid>
  );
}

export function IconSocials() {
  // 4-point sparkle
  return (
    <Grid>
      <rect x={7} y={1} width={2} height={4} fill="currentColor" />
      <rect x={7} y={11} width={2} height={4} fill="currentColor" />
      <rect x={1} y={7} width={4} height={2} fill="currentColor" />
      <rect x={11} y={7} width={4} height={2} fill="currentColor" />
      <rect x={7} y={7} width={2} height={2} fill="currentColor" />
    </Grid>
  );
}

export function IconClients() {
  // briefcase
  return (
    <Grid>
      <rect x={2} y={6} width={12} height={8} fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={6} y={3} width={4} height={3} fill="none" stroke="currentColor" strokeWidth="1" />
      <rect x={2} y={9} width={12} height={1} fill="currentColor" />
    </Grid>
  );
}

export function IconContact() {
  // old telephone handset
  return (
    <Grid>
      <path
        d="M3 3 L6 3 L7 6 L5 7 C6 9 7 10 9 11 L10 9 L13 10 L13 13 C9 13 3 9 3 3 Z"
        fill="currentColor"
      />
    </Grid>
  );
}

export function IconDiary() {
  // open book, used for the welcome/diary window
  return (
    <Grid>
      <path d="M2 3 L8 4 L8 13 L2 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M14 3 L8 4 L8 13 L14 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
    </Grid>
  );
}