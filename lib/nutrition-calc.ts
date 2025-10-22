/**
 * Nutrition calculations
 * Calculate daily statistics from meals
 */

import { Meal, DailyStats, MealType } from './types';
import { format } from 'date-fns';

/**
 * Calculate daily statistics from an array of meals
 *
 * @param meals - Array of meals to calculate stats from
 * @param date - Date string (YYYY-MM-DD) to filter meals
 * @returns DailyStats object with totals and meal counts
 */
export function calculateDailyStats(meals: Meal[], date: string): DailyStats {
  // Filter meals for the specific date
  const dayMeals = meals.filter(meal => {
    const mealDate = format(new Date(meal.capturedAt), 'yyyy-MM-dd');
    return mealDate === date;
  });

  // Initialize counters
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  const mealCounts: Record<MealType, number> = {
    [MealType.BREAKFAST]: 0,
    [MealType.LUNCH]: 0,
    [MealType.SNACK]: 0,
    [MealType.DINNER]: 0,
    [MealType.LATE_NIGHT]: 0,
  };

  // Sum up nutrition data
  dayMeals.forEach(meal => {
    totalCalories += meal.nutrition.calories;
    totalProtein += meal.nutrition.protein;
    totalCarbs += meal.nutrition.carbohydrates;
    totalFat += meal.nutrition.fat;
    mealCounts[meal.mealType]++;
  });

  return {
    date,
    totalCalories: Math.round(totalCalories),
    totalProtein: Math.round(totalProtein),
    totalCarbs: Math.round(totalCarbs),
    totalFat: Math.round(totalFat),
    mealCounts,
    meals: dayMeals,
  };
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateString(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Calculate percentage of goal achieved
 */
export function calculatePercentage(current: number, goal: number): number {
  if (goal === 0) return 0;
  return Math.round((current / goal) * 100);
}

/**
 * Get color based on percentage (for gauge)
 */
export function getColorByPercentage(percentage: number): string {
  if (percentage < 90) return '#10b981'; // green
  if (percentage <= 105) return '#f59e0b'; // yellow
  return '#ef4444'; // red
}
