// components/layouts/ThreeRowGridLayout.tsx
interface GameLayoutProps {
  topLeft: React.ReactNode;
  topRight: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
  rowHeights?: [string, string, string]; // Tailwind-compatible height classes or raw CSS
}

export default function GameLayout({
  topLeft,
  topRight,
  middle,
  bottom,
  rowHeights = ["auto", "1fr", "auto"],
}: GameLayoutProps) {
  return (
    <div
      className="grid h-screen"
      style={{
        gridTemplateRows: rowHeights.join(" "),
      }}
    >
      {/* Top Row: split into two columns */}
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 dark:border-gray-800">
        <div>{topLeft}</div>
        <div>{topRight}</div>
      </div>

      {/* Middle Row: full-width */}
      <div className="p-4 overflow-auto border-b border-gray-200 dark:border-gray-800">
        {middle}
      </div>

      {/* Bottom Row: full-width */}
      <div className="p-4">{bottom}</div>
    </div>
  );
}
