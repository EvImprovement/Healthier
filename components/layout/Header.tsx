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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
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
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
