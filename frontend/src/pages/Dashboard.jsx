import React from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  GlassWater,
  Scale,
  ArrowRight,
  Sunrise,
  Sun,
  Coffee,
  Moon,
  CheckCircle2,
  Target,
  Sparkles,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import { NutrientIntakeChart, MacroDistributionChart } from '../components/NutritionChart';
import {
  USER_PROFILE,
  NUTRITION_OVERVIEW,
  NUTRIENT_INTAKE_BAR_DATA,
  MACRO_DISTRIBUTION_DATA,
  INITIAL_FOOD_DIARY,
} from '../data/mockData';

const STAT_ICONS = {
  calories: Flame,
  protein: Beef,
  carbs: Wheat,
  fat: Droplets,
};

const MEAL_ICONS = {
  Breakfast: Sunrise,
  Lunch: Sun,
  'Evening Snack': Coffee,
  Dinner: Moon,
};

export default function Dashboard() {
  return (
    <div className="space-y-7">
      {/* Welcome Banner & User Summary */}
      <section className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10 relative overflow-hidden">
        {/* Subtle decorative leaf accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none text-[#176B38]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 30, 90 40, 100 70 C90 90, 70 100, 50 100 C30 100, 10 90, 0 70 C10 40, 30 30, 50 0 Z" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF5D9] px-3.5 py-1 text-xs font-bold text-[#176B38] border border-[#176B38]/15 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Goal: {USER_PROFILE.goal}</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#202B25] font-display">
              Good Morning, {USER_PROFILE.name}! 🌱
            </h2>
            <p className="mt-1.5 text-sm text-[#4D5E54] max-w-xl leading-relaxed">
              Here&apos;s your personalized nutritional overview for today. Your micronutrient and macro balance are currently well aligned.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="rounded-2xl bg-[#FAF8F0]/90 border border-[#176B38]/10 px-4 py-3 shadow-2xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#617268]">Age</p>
              <p className="text-base font-extrabold text-[#202B25] font-display mt-0.5">{USER_PROFILE.age} yrs</p>
            </div>
            <div className="rounded-2xl bg-[#FAF8F0]/90 border border-[#176B38]/10 px-4 py-3 shadow-2xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#617268]">Height</p>
              <p className="text-base font-extrabold text-[#202B25] font-display mt-0.5">{USER_PROFILE.heightCm} cm</p>
            </div>
            <div className="rounded-2xl bg-[#FAF8F0]/90 border border-[#176B38]/10 px-4 py-3 shadow-2xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#617268]">Weight</p>
              <p className="text-base font-extrabold text-[#202B25] font-display mt-0.5">{USER_PROFILE.weightKg} kg</p>
            </div>
            <div className="rounded-2xl bg-[#DDF5D9]/70 border border-[#176B38]/15 px-4 py-3 shadow-2xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#176B38]">Preference</p>
              <p className="text-base font-extrabold text-[#176B38] font-display mt-0.5">
                {USER_PROFILE.dietaryPreference}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A. Nutrition Overview Cards */}
      <section aria-label="Nutrition Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {NUTRITION_OVERVIEW.map((item) => (
            <StatCard
              key={item.id}
              icon={STAT_ICONS[item.id]}
              label={item.label}
              current={item.current}
              target={item.target}
              unit={item.unit}
              percentage={item.percentage}
              subtitle={item.subtitle}
              accent={item.accent}
            />
          ))}
        </div>
      </section>

      {/* B & C. Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <NutrientIntakeChart data={NUTRIENT_INTAKE_BAR_DATA} />
        </div>
        <div className="lg:col-span-5">
          <MacroDistributionChart data={MACRO_DISTRIBUTION_DATA} />
        </div>
      </section>

      {/* D & E. Today's Food Diary + Daily Health Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* D. Today's Food Diary */}
        <div className="lg:col-span-7 card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-extrabold text-[#202B25] font-display flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#176B38]" />
                Today&apos;s Food Diary
              </h3>
              <p className="text-xs text-[#617268] mt-0.5">
                Logged meals and natural food items for today
              </p>
            </div>
            <Link
              to="/food-diary"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-[#FAF8F0] border border-[#176B38]/15 px-3.5 py-1.5 text-xs font-bold text-[#176B38] hover:bg-[#DDF5D9]/70 transition-colors shadow-2xs"
            >
              <span>Full Diary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INITIAL_FOOD_DIARY.map((mealGroup) => {
              const MealIcon = MEAL_ICONS[mealGroup.meal] || Sun;
              const mealCalories = mealGroup.items.reduce((sum, f) => sum + f.calories, 0);

              return (
                <div
                  key={mealGroup.id}
                  className="rounded-2xl bg-[#FAF8F0]/85 border border-[#176B38]/10 p-4 hover:border-[#176B38]/30 transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#176B38]/10">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/15">
                        <MealIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#202B25] font-display">{mealGroup.meal}</h4>
                        <span className="text-[11px] text-[#617268] font-medium">{mealGroup.time}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#176B38] bg-[#DDF5D9]/60 px-2 py-0.5 rounded-full border border-[#176B38]/10">
                      {mealCalories} kcal
                    </span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {mealGroup.items.map((food) => (
                      <li
                        key={food.id}
                        className="flex items-center justify-between text-xs text-[#4D5E54]"
                      >
                        <span className="flex items-center gap-2 font-medium text-[#202B25]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          {food.name}
                        </span>
                        <span className="text-[#617268] font-medium">{food.calories} kcal</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* E. Daily Health Summary */}
        <div className="lg:col-span-5 card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="text-base font-extrabold text-[#202B25] font-display flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  Daily Health Summary
                </h3>
                <p className="text-xs text-[#617268] mt-0.5">
                  Key wellness indicators for today
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#DDF5D9] border border-[#176B38]/15 px-3 py-1 text-xs font-bold text-[#176B38]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {USER_PROFILE.balanceStatus}
              </span>
            </div>

            <div className="space-y-4">
              {/* Calorie Consumption */}
              <div className="rounded-2xl bg-[#FAF8F0]/85 p-4 border border-[#176B38]/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-bold text-[#202B25]">
                    <Flame className="h-4 w-4 text-[#176B38]" />
                    Daily Calorie Consumption
                  </span>
                  <span className="font-extrabold text-[#176B38]">1,850 / 2,200 kcal</span>
                </div>
                <ProgressBar value={1850} max={2200} color="forest" height="h-2" />
              </div>

              {/* Protein Progress */}
              <div className="rounded-2xl bg-[#FAF8F0]/85 p-4 border border-[#176B38]/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-bold text-[#202B25]">
                    <Beef className="h-4 w-4 text-[#176B38]" />
                    Protein Progress
                  </span>
                  <span className="font-extrabold text-[#176B38]">85 / 120 g (71%)</span>
                </div>
                <ProgressBar value={85} max={120} color="emerald" height="h-2" />
              </div>

              {/* Water Intake */}
              <div className="rounded-2xl bg-[#FAF8F0]/85 p-4 border border-[#176B38]/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-bold text-[#202B25]">
                    <GlassWater className="h-4 w-4 text-[#0D9488]" />
                    Hydration Level
                  </span>
                  <span className="font-extrabold text-[#202B25]">
                    {USER_PROFILE.waterIntakeLiters} / {USER_PROFILE.waterTargetLiters} L
                  </span>
                </div>
                <ProgressBar
                  value={USER_PROFILE.waterIntakeLiters}
                  max={USER_PROFILE.waterTargetLiters}
                  color="teal"
                  height="h-2"
                />
              </div>

              {/* Nutritional Balance Indicator */}
              <div className="rounded-2xl bg-[#DDF5D9]/60 p-4 border border-[#176B38]/20">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-[#176B38] shadow-xs border border-[#176B38]/15">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-[#176B38] font-display">
                      Nutritional Balance Indicator: Balanced
                    </p>
                    <p className="mt-1 text-xs text-[#4D5E54] leading-relaxed">
                      Macronutrients maintain a balanced 25% Protein / 50% Carbs / 25% Healthy Fats split supporting muscular and digestive health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#176B38]/10 flex items-center justify-between text-xs">
            <span className="text-[#617268] font-medium">Whole foods wellness preview</span>
            <Link
              to="/recommendations"
              className="font-bold text-[#176B38] hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
            >
              View Meal Plan
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
