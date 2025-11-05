'use client';

/**
 * Stats Card Component
 * Reusable card for displaying statistics
 */

interface StatsCardProps {
  title: string;
  value: number;
  unit: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export default function StatsCard({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
}: StatsCardProps) {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-brand-lime';
    if (trend === 'down') return 'text-red-600';
    return 'text-brand-dark/60';
  };

  const getTrendIcon = () => {
    if (trend === 'up') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (trend === 'down') {
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg border border-brand-dark/20 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-brand-dark/70">{title}</h3>
        {icon && <div className="text-brand-dark/40">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-brand-dark">
          {Math.round(value)}
        </div>
        <div className="text-sm text-brand-dark/60">{unit}</div>
      </div>

      {trend && trendValue && (
        <div className={`flex items-center gap-1 mt-2 text-sm ${getTrendColor()}`}>
          {getTrendIcon()}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
