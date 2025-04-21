interface PhantomFactorDisplayProps {
  onClick: () => void;
  isInit: boolean;
}

export default function PhantomFactorDisplay({
  onClick,
  isInit,
}: PhantomFactorDisplayProps) {
  const ctaText = isInit ? "Click to add your first factor" : "Add factor";

  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 justify-center min-w-[200px] h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm cursor-pointer mx-auto"
    >
      <span className="text-gray-500 dark:text-gray-400">{ctaText}</span>
    </div>
  );
}
