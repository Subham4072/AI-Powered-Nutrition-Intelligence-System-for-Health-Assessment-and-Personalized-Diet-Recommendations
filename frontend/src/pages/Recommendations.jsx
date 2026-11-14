import React, { useState } from 'react';
import { Sparkles, Lightbulb, Check, Info } from 'lucide-react';
import FoodCard from '../components/FoodCard';
import {
  RECOMMENDED_FOODS,
  SAMPLE_MEAL_PLAN,
  NUTRITION_TIPS,
  USER_PROFILE,
} from '../data/mockData';
import { useToast } from '../components/Toast';

export default function Recommendations() {
  const [savedFoodIds, setSavedFoodIds] = useState([]);
  const { showToast } = useToast();

  const toggleSaveFood = (food) => {
    const isAlreadySaved = savedFoodIds.includes(food.id);
    setSavedFoodIds((prev) =>
      isAlreadySaved ? prev.filter((id) => id !== food.id) : [...prev, food.id]
    );
    showToast({
      title: isAlreadySaved ? 'Removed from Focus List' : 'Added to Focus List',
      message: isAlreadySaved
        ? `${food.name} removed from your sample focus foods.`
        : `${food.name} highlighted in your sample daily food list.`,
      type: isAlreadySaved ? 'info' : 'success',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Personalized Dietary Recommendations
                </h2>
                <span className="inline-flex items-center rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                  Sample Guide
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-2xl">
                Curated food options and a sample daily meal plan tailored around{' '}
                <strong className="text-[#1E293B]">{USER_PROFILE.shortGoal}</strong> and{' '}
                <strong className="text-[#1E293B]">{USER_PROFILE.dietaryPreference}</strong>{' '}
                preferences.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-[#F8FAF7] border border-slate-200/70 px-3.5 py-2 text-xs text-slate-500 shrink-0">
            <Info className="h-4 w-4 text-[#10B981]" />
            <span>Static prototype examples</span>
          </div>
        </div>
      </section>

      {/* A. Recommended Foods */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">Recommended Foods</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Nutrient-dense staple foods to support protein and micronutrient balance
            </p>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {RECOMMENDED_FOODS.length} Foods
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECOMMENDED_FOODS.map((food) => {
            const isSaved = savedFoodIds.includes(food.id);
            return (
              <div
                key={food.id}
                className="group rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F8FAF7] border border-slate-200/60 text-2xl">
                      {food.emoji}
                    </div>
                    <span className="rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                      {food.category}
                    </span>
                  </div>

                  <h4 className="mt-3 text-base font-bold text-[#1E293B]">{food.name}</h4>
                  <p className="mt-0.5 text-xs font-semibold text-[#10B981]">{food.highlight}</p>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{food.benefit}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSaveFood(food)}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                    isSaved
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#F8FAF7] text-slate-600 hover:bg-[#DCFCE7]/60 hover:text-[#166534]'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Added to Focus
                    </>
                  ) : (
                    <span>Highlight Food</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* B. Daily Meal Plan */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">Sample Daily Meal Plan</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Balanced meal structure across Breakfast, Lunch, Evening Snacks, and Dinner
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SAMPLE_MEAL_PLAN.map((meal) => (
            <FoodCard
              key={meal.id}
              mealType={meal.mealType}
              foodName={meal.foodName}
              description={meal.description}
              calories={meal.calories}
              protein={meal.protein}
              prepTime={meal.prepTime}
              illustrationType={meal.illustrationType}
            />
          ))}
        </div>
      </section>

      {/* C. Nutrition Tips */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
            <Lightbulb className="h-4.5 w-4.5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">Simple Nutrition Tips</h3>
            <p className="text-xs text-slate-500">
              Practical everyday habits for steady energy and muscle maintenance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NUTRITION_TIPS.map((tip, index) => (
            <div
              key={tip.id}
              className="rounded-xl bg-[#F8FAF7] border border-slate-200/60 p-4 flex items-start gap-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#166534] text-white text-xs font-bold">
                {index + 1}
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">{tip.title}</h4>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

