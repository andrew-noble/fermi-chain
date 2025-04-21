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
    <div className="flex flex-col">
      {topbar && (
        <header className="w-full bg-gray-100 dark:bg-gray-900 p-2">
          {topbar}
        </header>
      )}

      {hero && (
        <section className="w-full bg-white dark:bg-gray-950 p-4 text-center">
          {hero}
        </section>
      )}

      <main className="p-2 bg-gray-100 dark:bg-black w-full max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
        {children}
      </main>

      {footer && (
        <footer className="bg-gray-100 dark:bg-gray-900 text-xs text-gray-500 text-center p-2">
          {footer}
        </footer>
      )}
    </div>
  );
}
