// components/layouts/MainLayout.tsx
export default function MainLayout({
  topbar,
  hero,
  children,
  footer,
}: {
  topbar?: React.ReactNode;
  hero?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {topbar && (
        <header className="w-full bg-gray-100 dark:bg-gray-900 p-4">
          {topbar}
        </header>
      )}

      {hero && (
        <section className="w-full bg-white dark:bg-gray-950 p-6 text-center border-b border-gray-200 dark:border-gray-800">
          {hero}
        </section>
      )}

      <main className="flex-1 p-6 bg-gray-50 dark:bg-black">{children}</main>

      {footer && (
        <footer className="bg-gray-100 dark:bg-gray-900 text-xs text-gray-500 text-center p-4">
          {footer}
        </footer>
      )}
    </div>
  );
}
