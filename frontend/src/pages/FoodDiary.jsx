import React, { useState, useMemo } from 'react';
import {
  Plus,
  Calendar,
  Flame,
  Beef,
  Wheat,
  Droplets,
  Sunrise,
  Sun,
  Coffee,
  Moon,
  Trash2,
} from 'lucide-react';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import { INITIAL_FOOD_DIARY, NUTRITION_TARGETS } from '../data/mockData';
import { useToast } from '../components/Toast';

const MEAL_ICONS = {
  Breakfast: Sunrise,
  Lunch: Sun,
  'Evening Snack': Coffee,
  Dinner: Moon,
};

const EMPTY_FORM = {
  meal: 'Breakfast',
  name: '',
  serving: '',
  calories: '',
  protein: '',
  carbs: '',
  fat: '',
};

export default function FoodDiary() {
  const todayIso = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [meals, setMeals] = useState(INITIAL_FOOD_DIARY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const { showToast } = useToast();

  const totals = useMemo(() => {
    return meals.reduce(
      (acc, mealGroup) => {
        mealGroup.items.forEach((item) => {
          acc.calories += Number(item.calories) || 0;
          acc.protein += Number(item.protein) || 0;
          acc.carbs += Number(item.carbs) || 0;
          acc.fat += Number(item.fat) || 0;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }, [meals]);

  const handleOpenModal = (defaultMeal = 'Breakfast') => {
    setFormData({ ...EMPTY_FORM, meal: defaultMeal });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      serving: formData.serving.trim() || '1 serving',
      calories: Number(formData.calories) || 0,
      protein: Number(formData.protein) || 0,
      carbs: Number(formData.carbs) || 0,
      fat: Number(formData.fat) || 0,
    };

    setMeals((prev) =>
      prev.map((group) =>
        group.meal === formData.meal
          ? { ...group, items: [...group.items, newItem] }
          : group
      )
    );

    setIsModalOpen(false);
    setFormData(EMPTY_FORM);
    showToast({
      title: 'Food Added to Diary',
      message: `${newItem.name} (${newItem.calories} kcal) added to ${formData.meal}.`,
      type: 'success',
    });
  };

  const handleRemoveFood = (mealId, itemId, itemName) => {
    setMeals((prev) =>
      prev.map((group) =>
        group.id === mealId
          ? { ...group, items: group.items.filter((item) => item.id !== itemId) }
          : group
      )
    );
    showToast({
      title: 'Entry Removed',
      message: `Removed ${itemName} from your diary.`,
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar: Date Selector & Add Food Button */}
      <section className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1E293B]">Daily Meal Log</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Track daily food entries, calories, and macronutrient totals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2">
            <Calendar className="h-4 w-4 text-[#166534]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                showToast({
                  title: 'Date Changed (Preview)',
                  message: `Viewing sample diary entries for ${e.target.value}.`,
                  type: 'info',
                });
              }}
              className="bg-transparent text-xs font-semibold text-[#1E293B] focus:outline-none"
              aria-label="Select food diary date"
            />
          </div>

          <button
            type="button"
            onClick={() => handleOpenModal('Breakfast')}
            className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Food
          </button>
        </div>
      </section>

      {/* Daily Totals Summary Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Total Calories</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#166534]">
              <Flame className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#1E293B]">
            {totals.calories.toLocaleString()}{' '}
            <span className="text-xs font-medium text-slate-400">
              / {NUTRITION_TARGETS.calories.toLocaleString()} kcal
            </span>
          </p>
          <ProgressBar
            value={totals.calories}
            max={NUTRITION_TARGETS.calories}
            color="emerald"
            height="h-1.5"
            className="mt-3"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Protein Total</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DCFCE7] text-[#166534]">
              <Beef className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#1E293B]">
            {totals.protein} g{' '}
            <span className="text-xs font-medium text-slate-400">
              / {NUTRITION_TARGETS.protein} g
            </span>
          </p>
          <ProgressBar
            value={totals.protein}
            max={NUTRITION_TARGETS.protein}
            color="forest"
            height="h-1.5"
            className="mt-3"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Carbohydrates Total</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
              <Wheat className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#1E293B]">
            {totals.carbs} g{' '}
            <span className="text-xs font-medium text-slate-400">
              / {NUTRITION_TARGETS.carbs} g
            </span>
          </p>
          <ProgressBar
            value={totals.carbs}
            max={NUTRITION_TARGETS.carbs}
            color="teal"
            height="h-1.5"
            className="mt-3"
          />
        </div>

        <div className="rounded-2xl bg-white p-4 border border-slate-200/70 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Fat Total</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <Droplets className="h-4 w-4" />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-[#1E293B]">
            {totals.fat} g{' '}
            <span className="text-xs font-medium text-slate-400">/ {NUTRITION_TARGETS.fat} g</span>
          </p>
          <ProgressBar
            value={totals.fat}
            max={NUTRITION_TARGETS.fat}
            color="amber"
            height="h-1.5"
            className="mt-3"
          />
        </div>
      </section>

      {/* Meal Sections */}
      <section className="space-y-4">
        {meals.map((mealGroup) => {
          const MealIcon = MEAL_ICONS[mealGroup.meal] || Sun;
          const mealSubtotal = mealGroup.items.reduce(
            (acc, item) => ({
              calories: acc.calories + item.calories,
              protein: acc.protein + item.protein,
              carbs: acc.carbs + item.carbs,
              fat: acc.fat + item.fat,
            }),
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
          );

          return (
            <div
              key={mealGroup.id}
              className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#F8FAF7]/80 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
                    <MealIcon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-[#1E293B]">{mealGroup.meal}</h3>
                    <p className="text-xs text-slate-400">{mealGroup.time}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="rounded-lg bg-white border border-slate-200/70 px-2.5 py-1 font-semibold text-[#166534]">
                      {mealSubtotal.calories} kcal
                    </span>
                    <span className="hidden sm:inline-block text-slate-500">
                      P: {mealSubtotal.protein}g &bull; C: {mealSubtotal.carbs}g &bull; F:{' '}
                      {mealSubtotal.fat}g
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenModal(mealGroup.meal)}
                    className="inline-flex items-center gap-1 rounded-lg bg-white border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-[#166534] hover:bg-[#DCFCE7] transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add
                  </button>
                </div>
              </div>

              {mealGroup.items.length === 0 ? (
                <div className="px-6 py-6 text-center text-xs text-slate-400">
                  No items logged for {mealGroup.meal} yet. Click &ldquo;Add&rdquo; to add a sample food.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        <th className="py-3 px-6">Food Item</th>
                        <th className="py-3 px-4">Serving</th>
                        <th className="py-3 px-4 text-right">Calories</th>
                        <th className="py-3 px-4 text-right">Protein</th>
                        <th className="py-3 px-4 text-right">Carbs</th>
                        <th className="py-3 px-4 text-right">Fat</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {mealGroup.items.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-[#F8FAF7]/60 transition-colors"
                        >
                          <td className="py-3.5 px-6 font-semibold text-[#1E293B]">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-500">{item.serving}</td>
                          <td className="py-3.5 px-4 text-right font-semibold text-[#166534]">
                            {item.calories} kcal
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs text-slate-600">
                            {item.protein} g
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs text-slate-600">
                            {item.carbs} g
                          </td>
                          <td className="py-3.5 px-4 text-right text-xs text-slate-600">
                            {item.fat} g
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveFood(mealGroup.id, item.id, item.name)
                              }
                              className="inline-flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Add Food Modal (Frontend-only) */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Food Entry"
        subtitle="Frontend prototype form — adds sample item to the current session"
      >
        <form onSubmit={handleAddFood} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="meal" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Meal Section
              </label>
              <select
                id="meal"
                name="meal"
                value={formData.meal}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Evening Snack">Evening Snack</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>

            <div>
              <label htmlFor="food-name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Food Name *
              </label>
              <input
                id="food-name"
                name="name"
                type="text"
                required
                placeholder="e.g., Boiled Eggs"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="serving" className="block text-xs font-semibold text-slate-600 mb-1.5">
              Serving Size
            </label>
            <input
              id="serving"
              name="serving"
              type="text"
              placeholder="e.g., 2 whole eggs"
              value={formData.serving}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="calories" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Calories
              </label>
              <input
                id="calories"
                name="calories"
                type="number"
                min="0"
                placeholder="140"
                value={formData.calories}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="protein" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Protein (g)
              </label>
              <input
                id="protein"
                name="protein"
                type="number"
                min="0"
                placeholder="12"
                value={formData.protein}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="carbs" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Carbs (g)
              </label>
              <input
                id="carbs"
                name="carbs"
                type="number"
                min="0"
                placeholder="1"
                value={formData.carbs}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="fat" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Fat (g)
              </label>
              <input
                id="fat"
                name="fat"
                type="number"
                min="0"
                placeholder="10"
                value={formData.fat}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#166534] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Food Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

