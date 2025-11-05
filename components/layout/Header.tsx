'use client';

/**
 * Header Component
 * Top app bar with title
 */

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function Header({ title, subtitle, showBack = false }: HeaderProps) {
  return (
    <header className="bg-brand-dark/95 border-b border-brand-light/20 sticky top-0 z-40 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => window.history.back()}
              className="text-brand-light/70 hover:text-brand-light"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <div>
            <h1 className="text-xl font-bold text-brand-light">{title}</h1>
            {subtitle && (
              <p className="text-sm text-brand-light/70">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
