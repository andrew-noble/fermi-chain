interface GameLayoutProps {
  top: React.ReactNode;
  middle: React.ReactNode;
  bottom: React.ReactNode;
}

export default function GameLayout({ top, middle, bottom }: GameLayoutProps) {
  return (
    <div className="flex flex-col min-h-0">
      {/* Top Row */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        {top}
      </div>

      {/* Middle Row */}
      <div className="flex-1 p-4 overflow-auto border-b border-gray-200 dark:border-gray-800">
        {middle}
      </div>

      {/* Bottom Row */}
      <div className="p-4">{bottom}</div>
    </div>
  );
}
