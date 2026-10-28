export default function ContactPanel() {
  return (
    <div className="flex flex-col items-center gap-3">
      <img
        src="/9.png"
        alt="Contact"
        draggable={false}
        className="w-full rounded-md border border-chromeline"
      />
      <a
        href="https://linktr.ee/valeryaaap"
        target="_blank"
        rel="noreferrer"
        className="font-mono text-xs px-4 py-2 rounded-full bg-lavender/60 hover:bg-lavender transition-colors"
      >
        linktr.ee/valeryaaap →
      </a>
    </div>
  );
}
