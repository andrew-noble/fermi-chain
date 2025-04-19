interface PhantomFactorDisplayProps {
  onClick: () => void;
}

export default function PhantomFactorDisplay({
  onClick,
}: PhantomFactorDisplayProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-3 justify-center min-w-[200px] h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-sm cursor-pointer"
    >
      <span className="text-gray-500 dark:text-gray-400">
        Click to start a new factor
      </span>
    </div>
  );
}
