/**
 * Meal classification by time
 * Classifies meals based on the time they were captured
 */

import { MealType } from './types';

/**
 * Classify meal type based on the time it was captured
 *
 * @param date - The date/time when the meal was captured
 * @returns MealType - breakfast, lunch, snack, dinner, or late_night
 */
export function classifyMealByTime(date: Date): MealType {
  const hour = date.getHours();

  // 5am-11am → Breakfast
  if (hour >= 5 && hour < 11) {
    return MealType.BREAKFAST;
  }

  // 11am-3pm → Lunch
  if (hour >= 11 && hour < 15) {
    return MealType.LUNCH;
  }

  // 3pm-6pm → Snack
  if (hour >= 15 && hour < 18) {
    return MealType.SNACK;
  }

  // 6pm-midnight → Dinner
  if (hour >= 18 && hour < 24) {
    return MealType.DINNER;
  }

  // Midnight-5am → Late Night
  return MealType.LATE_NIGHT;
}

/**
 * Get display name for meal type
 */
export function getMealTypeDisplayName(type: MealType): string {
  const displayNames: Record<MealType, string> = {
    [MealType.BREAKFAST]: 'Breakfast',
    [MealType.LUNCH]: 'Lunch',
    [MealType.SNACK]: 'Snack',
    [MealType.DINNER]: 'Dinner',
    [MealType.LATE_NIGHT]: 'Late Night',
  };

  return displayNames[type];
}

/**
 * Get color for meal type badge
 */
export function getMealTypeColor(type: MealType): string {
  const colors: Record<MealType, string> = {
    [MealType.BREAKFAST]: 'bg-orange-500',
    [MealType.LUNCH]: 'bg-blue-500',
    [MealType.SNACK]: 'bg-purple-500',
    [MealType.DINNER]: 'bg-green-500',
    [MealType.LATE_NIGHT]: 'bg-indigo-500',
  };

  return colors[type];
}
