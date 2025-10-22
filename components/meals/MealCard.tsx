'use client';

/**
 * Meal Card Component
 * Display individual meal with nutrition info
 */

import { useState } from 'react';
import { Meal } from '@/lib/types';
import { getMealTypeDisplayName, getMealTypeColor } from '@/lib/meal-classifier';
import { format } from 'date-fns';
import NutritionCard from '@/components/nutrition/NutritionCard';

interface MealCardProps {
  meal: Meal;
  onDelete?: (mealId: string) => void;
}

export default function MealCard({ meal, onDelete }: MealCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(meal.id);
    }
    setShowDeleteConfirm(false);
  };

  const mealTypeColor = getMealTypeColor(meal.mealType);
  const mealTypeName = getMealTypeDisplayName(meal.mealType);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header with Image */}
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {meal.imageUrl && (
          <div className="relative h-48 bg-gray-100">
            <img
              src={meal.imageUrl}
              alt="Meal"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Meal Type Badge */}
            <div className={`absolute top-2 left-2 ${mealTypeColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
              {mealTypeName}
            </div>
            {/* AI Confidence Badge */}
            {meal.nutrition.confidence < 0.9 && (
              <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                Low confidence
              </div>
            )}
          </div>
        )}

        {/* Quick Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">
              {format(new Date(meal.capturedAt), 'h:mm a')}
            </div>
            <div className="text-lg font-bold text-gray-900">
              {Math.round(meal.nutrition.calories)} kcal
            </div>
          </div>

          <div className="flex gap-3 text-sm text-gray-600">
            <span>P: {Math.round(meal.nutrition.protein)}g</span>
            <span>C: {Math.round(meal.nutrition.carbohydrates)}g</span>
            <span>F: {Math.round(meal.nutrition.fat)}g</span>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <NutritionCard nutrition={meal.nutrition} />

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!showDeleteConfirm ? (
              <>
                <button
                  onClick={() => setExpanded(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Confirm Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
