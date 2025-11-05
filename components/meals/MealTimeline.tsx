'use client';

/**
 * Meal Timeline Component
 * Display meals grouped by date
 */

import { Meal, MealType } from '@/lib/types';
import { format, isToday, isYesterday } from 'date-fns';
import MealCard from './MealCard';

interface MealTimelineProps {
  meals: Meal[];
  onDeleteMeal?: (mealId: string) => void;
  filter?: MealType | 'all';
}

export default function MealTimeline({ meals, onDeleteMeal, filter = 'all' }: MealTimelineProps) {
  // Filter meals
  const filteredMeals = filter === 'all'
    ? meals
    : meals.filter(meal => meal.mealType === filter);

  // Group meals by date
  const groupedMeals = filteredMeals.reduce((groups, meal) => {
    const dateKey = format(new Date(meal.capturedAt), 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(meal);
    return groups;
  }, {} as Record<string, Meal[]>);

  // Sort dates (newest first)
  const sortedDates = Object.keys(groupedMeals).sort((a, b) =>
    new Date(b).getTime() - new Date(a).getTime()
  );

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-brand-dark/40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-brand-dark">No meals logged</h3>
        <p className="mt-1 text-sm text-brand-dark/60">
          {filter !== 'all' ? 'No meals found for this filter.' : 'Start by taking a photo of your meal!'}
        </p>
      </div>
    );
  }

  const getDateHeader = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'EEEE, MMM d');
  };

  const calculateDayTotals = (dayMeals: Meal[]) => {
    return dayMeals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.nutrition.calories,
        protein: totals.protein + meal.nutrition.protein,
        carbs: totals.carbs + meal.nutrition.carbohydrates,
        fat: totals.fat + meal.nutrition.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  return (
    <div className="space-y-8">
      {sortedDates.map((dateKey) => {
        const dayMeals = groupedMeals[dateKey];
        const dayTotals = calculateDayTotals(dayMeals);

        return (
          <div key={dateKey} className="space-y-4">
            {/* Date Header with Totals */}
            <div className="sticky top-0 bg-white border-b border-brand-dark/20 pb-3 z-10">
              <h3 className="text-lg font-semibold text-brand-dark">
                {getDateHeader(dateKey)}
              </h3>
              <div className="flex gap-4 text-sm text-brand-dark/70 mt-1">
                <span className="font-medium">{Math.round(dayTotals.calories)} kcal</span>
                <span>P: {Math.round(dayTotals.protein)}g</span>
                <span>C: {Math.round(dayTotals.carbs)}g</span>
                <span>F: {Math.round(dayTotals.fat)}g</span>
              </div>
            </div>

            {/* Meals for this day */}
            <div className="space-y-3">
              {dayMeals
                .sort((a, b) =>
                  new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime()
                )
                .map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onDelete={onDeleteMeal}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
