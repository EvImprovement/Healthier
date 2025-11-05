'use client';

/**
 * Meal Type Filter Component
 * Filter meals by type (breakfast, lunch, etc.)
 */

import { MealType } from '@/lib/types';
import { getMealTypeDisplayName } from '@/lib/meal-classifier';

interface MealTypeFilterProps {
  selected: MealType | 'all';
  onChange: (type: MealType | 'all') => void;
  counts?: Record<MealType | 'all', number>;
}

export default function MealTypeFilter({ selected, onChange, counts }: MealTypeFilterProps) {
  const filterOptions: Array<{ value: MealType | 'all'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: MealType.BREAKFAST, label: getMealTypeDisplayName(MealType.BREAKFAST) },
    { value: MealType.LUNCH, label: getMealTypeDisplayName(MealType.LUNCH) },
    { value: MealType.SNACK, label: getMealTypeDisplayName(MealType.SNACK) },
    { value: MealType.DINNER, label: getMealTypeDisplayName(MealType.DINNER) },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filterOptions.map((option) => {
        const isSelected = selected === option.value;
        const count = counts?.[option.value] ?? 0;

        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
              ${isSelected
                ? 'bg-brand-lime text-brand-dark'
                : 'bg-white border border-brand-dark/20 text-brand-dark/70 hover:bg-brand-light/50'
              }
            `}
          >
            {option.label}
            {counts && count > 0 && (
              <span className={`ml-1.5 ${isSelected ? 'text-brand-dark/60' : 'text-brand-dark/50'}`}>
                ({count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
