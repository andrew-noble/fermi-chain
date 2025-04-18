interface PhantomFactorDisplayProps {
  onClick: () => void;
}

export default function PhantomFactorDisplay({
  onClick,
}: PhantomFactorDisplayProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center min-w-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-primary transition-colors relative"
    >
      <div className="flex items-center gap-2 w-full opacity-20">
        <span className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="flex flex-wrap gap-2">
          <span className="h-4 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
          <span className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>

      <div className="w-full border-t border-gray-200 dark:border-gray-800 my-2 opacity-20" />

      <div className="flex items-center gap-2 w-full opacity-20">
        <span className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
        <div className="flex flex-wrap gap-2">
          <span className="h-4 w-12 bg-gray-100 dark:bg-gray-800 rounded" />
          <span className="h-4 w-8 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Click to start a new factor
      </div>
    </div>
  );
}
