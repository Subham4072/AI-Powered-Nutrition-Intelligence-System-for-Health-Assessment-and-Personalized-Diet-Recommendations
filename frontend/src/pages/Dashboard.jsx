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
    <div className="space-y-6">
      {/* Welcome Banner & User Summary */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-semibold text-[#166534]">
              <Target className="h-3.5 w-3.5" />
              <span>Goal: {USER_PROFILE.goal}</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#1E293B]">
              Good Morning, {USER_PROFILE.name}!
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s your nutritional health overview for today.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/60 px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-slate-400">Age</p>
              <p className="text-sm font-bold text-[#1E293B] mt-0.5">{USER_PROFILE.age} years</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/60 px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-slate-400">Height</p>
              <p className="text-sm font-bold text-[#1E293B] mt-0.5">{USER_PROFILE.heightCm} cm</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/60 px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-slate-400">Weight</p>
              <p className="text-sm font-bold text-[#1E293B] mt-0.5">{USER_PROFILE.weightKg} kg</p>
            </div>
            <div className="rounded-xl bg-[#DCFCE7]/60 border border-emerald-200/60 px-3.5 py-2.5">
              <p className="text-[11px] font-medium text-[#166534]/80">Preference</p>
              <p className="text-sm font-bold text-[#166534] mt-0.5">
                {USER_PROFILE.dietaryPreference}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A. Nutrition Overview Cards */}
      <section aria-label="Nutrition Overview">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
        <div className="lg:col-span-7 rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Today&apos;s Food Diary</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Logged meals and food items for today
              </p>
            </div>
            <Link
              to="/food-diary"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#F8FAF7] border border-slate-200/80 px-3 py-1.5 text-xs font-semibold text-[#166534] hover:bg-[#DCFCE7] transition-colors"
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
                  className="rounded-xl bg-[#F8FAF7] border border-slate-200/60 p-4 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#166534]">
                        <MealIcon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#1E293B]">{mealGroup.meal}</h4>
                        <span className="text-[11px] text-slate-400">{mealGroup.time}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#166534]">{mealCalories} kcal</span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {mealGroup.items.map((food) => (
                      <li
                        key={food.id}
                        className="flex items-center justify-between text-xs text-slate-600"
                      >
                        <span className="flex items-center gap-2 font-medium text-[#1E293B]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                          {food.name}
                        </span>
                        <span className="text-slate-400">{food.calories} kcal</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* E. Daily Health Summary */}
        <div className="lg:col-span-5 rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="text-base font-bold text-[#1E293B]">Daily Health Summary</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Key wellness indicators for today
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#166534]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {USER_PROFILE.balanceStatus}
              </span>
            </div>

            <div className="space-y-4">
              {/* Calorie Consumption */}
              <div className="rounded-xl bg-[#F8FAF7] p-4 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-semibold text-[#1E293B]">
                    <Flame className="h-4 w-4 text-[#166534]" />
                    Daily Calorie Consumption
                  </span>
                  <span className="font-bold text-[#166534]">1,850 / 2,200 kcal</span>
                </div>
                <ProgressBar value={1850} max={2200} color="emerald" height="h-2" />
              </div>

              {/* Protein Progress */}
              <div className="rounded-xl bg-[#F8FAF7] p-4 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-semibold text-[#1E293B]">
                    <Beef className="h-4 w-4 text-[#166534]" />
                    Protein Progress
                  </span>
                  <span className="font-bold text-[#166534]">85 / 120 g (71%)</span>
                </div>
                <ProgressBar value={85} max={120} color="forest" height="h-2" />
              </div>

              {/* Water Intake */}
              <div className="rounded-xl bg-[#F8FAF7] p-4 border border-slate-200/60">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center gap-2 font-semibold text-[#1E293B]">
                    <GlassWater className="h-4 w-4 text-[#10B981]" />
                    Water Intake
                  </span>
                  <span className="font-bold text-[#1E293B]">
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
              <div className="rounded-xl bg-[#DCFCE7]/50 p-4 border border-emerald-200/70">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#166534] shadow-2xs">
                    <Scale className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#166534]">
                      Nutritional Balance Indicator: Balanced
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      Macros follow a steady 25% Protein / 50% Carbs / 25% Fat split aligned with
                      your muscle maintenance goal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400">Sample daily overview</span>
            <Link
              to="/recommendations"
              className="font-semibold text-[#166534] hover:text-[#10B981] inline-flex items-center gap-1 transition-colors"
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

