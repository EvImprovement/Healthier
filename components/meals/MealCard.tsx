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
    <div className="bg-brand-dark/60 rounded-lg border border-brand-light/20 overflow-hidden hover:shadow-md transition-shadow backdrop-blur-sm">
      {/* Header with Image */}
      <div
        className="cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        {meal.imageUrl && (
          <div className="relative h-48 bg-brand-dark/40">
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
            <div className="text-sm text-brand-light/70">
              {format(new Date(meal.capturedAt), 'h:mm a')}
            </div>
            <div className="text-lg font-bold text-brand-lime">
              {Math.round(meal.nutrition.calories)} kcal
            </div>
          </div>

          <div className="flex gap-3 text-sm text-brand-light/80">
            <span>P: {Math.round(meal.nutrition.protein)}g</span>
            <span>C: {Math.round(meal.nutrition.carbohydrates)}g</span>
            <span>F: {Math.round(meal.nutrition.fat)}g</span>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-brand-light/20 p-4 space-y-4">
          <NutritionCard nutrition={meal.nutrition} />

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!showDeleteConfirm ? (
              <>
                <button
                  onClick={() => setExpanded(false)}
                  className="flex-1 px-4 py-2 bg-brand-light/20 text-brand-light rounded-lg hover:bg-brand-light/30 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 bg-brand-light/20 text-brand-light rounded-lg hover:bg-brand-light/30 transition-colors"
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
