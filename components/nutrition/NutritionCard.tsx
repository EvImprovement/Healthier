'use client';

/**
 * Nutrition Card Component
 * Compact display of nutritional information
 */

import { NutritionData } from '@/lib/types';

interface NutritionCardProps {
  nutrition: NutritionData;
  compact?: boolean;
}

export default function NutritionCard({ nutrition, compact = false }: NutritionCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="font-bold text-lg text-brand-dark">{Math.round(nutrition.calories)} kcal</div>
        <div className="flex gap-3 text-brand-dark/70">
          <span>P: {Math.round(nutrition.protein)}g</span>
          <span>C: {Math.round(nutrition.carbohydrates)}g</span>
          <span>F: {Math.round(nutrition.fat)}g</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-brand-dark/20 p-4">
      {/* Calories - Large Display */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-brand-dark">
          {Math.round(nutrition.calories)}
        </div>
        <div className="text-sm text-brand-dark/60">Calories</div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-semibold text-brand-lime">
            {Math.round(nutrition.protein)}g
          </div>
          <div className="text-xs text-brand-dark/60">Protein</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-brand-green">
            {Math.round(nutrition.carbohydrates)}g
          </div>
          <div className="text-xs text-brand-dark/60">Carbs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-brand-dark">
            {Math.round(nutrition.fat)}g
          </div>
          <div className="text-xs text-brand-dark/60">Fat</div>
        </div>
      </div>

      {/* Optional: Fiber, Sugar, Sodium */}
      {(nutrition.fiber || nutrition.sugar || nutrition.sodium) && (
        <div className="border-t border-brand-dark/20 pt-3 mt-3">
          <div className="grid grid-cols-3 gap-2 text-xs text-brand-dark/70">
            {nutrition.fiber && (
              <div className="text-center">
                <span className="font-medium">{Math.round(nutrition.fiber)}g</span>
                <span className="block text-brand-dark/40">Fiber</span>
              </div>
            )}
            {nutrition.sugar && (
              <div className="text-center">
                <span className="font-medium">{Math.round(nutrition.sugar)}g</span>
                <span className="block text-brand-dark/40">Sugar</span>
              </div>
            )}
            {nutrition.sodium && (
              <div className="text-center">
                <span className="font-medium">{Math.round(nutrition.sodium)}mg</span>
                <span className="block text-brand-dark/40">Sodium</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Food Items */}
      {nutrition.foodItems && nutrition.foodItems.length > 0 && (
        <div className="mt-4 pt-3 border-t border-brand-dark/20">
          <div className="text-xs text-brand-dark/60 mb-1">Detected foods:</div>
          <div className="flex flex-wrap gap-1">
            {nutrition.foodItems.map((item, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-brand-lime/20 text-brand-dark text-xs rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Confidence */}
      {nutrition.confidence && (
        <div className="mt-3 text-xs text-brand-dark/40 text-center">
          AI Confidence: {Math.round(nutrition.confidence * 100)}%
        </div>
      )}
    </div>
  );
}
