import React, { useState } from 'react';
import {
  User,
  Ruler,
  Weight,
  Utensils,
  Target,
  Activity,
  Save,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';
import { useToast } from '../components/Toast';

const DEFAULT_FORM = {
  name: USER_PROFILE.name,
  age: USER_PROFILE.age,
  gender: USER_PROFILE.gender,
  heightCm: USER_PROFILE.heightCm,
  weightKg: USER_PROFILE.weightKg,
  dietaryPreference: USER_PROFILE.dietaryPreference,
  healthGoal: USER_PROFILE.shortGoal,
  activityLevel: USER_PROFILE.activityLevel,
};

export default function HealthProfile() {
  const [profile, setProfile] = useState(DEFAULT_FORM);
  const { showToast } = useToast();

  const heightMeters = Number(profile.heightCm) > 0 ? Number(profile.heightCm) / 100 : 1.7;
  const bmi = (Number(profile.weightKg) / (heightMeters * heightMeters)).toFixed(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast({
      title: 'Profile Updated (Preview)',
      message: `Saved health profile settings for ${profile.name}.`,
      type: 'success',
    });
  };

  const handleReset = () => {
    setProfile(DEFAULT_FORM);
    showToast({
      title: 'Profile Reset',
      message: 'Restored predefined default values for Subham.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Profile Overview Banner */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#166534] text-2xl font-bold border border-emerald-200">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#1E293B]">{profile.name}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-xs font-semibold text-[#166534]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Active Profile
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {profile.age} yrs &bull; {profile.gender} &bull; {profile.dietaryPreference}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/70 px-4 py-2.5 text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Body Mass Index
              </p>
              <p className="text-lg font-bold text-[#166534] mt-0.5">{bmi} kg/m²</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/70 px-4 py-2.5 text-center">
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                Activity
              </p>
              <p className="text-sm font-bold text-[#1E293B] mt-1">{profile.activityLevel}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Information Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <User className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Personal Information</h3>
              <p className="text-xs text-slate-500">Basic demographic &amp; physical metrics</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <div className="rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-400">Name</span>
              <p className="mt-1 text-sm font-bold text-[#1E293B]">{profile.name}</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-400">Age</span>
              <p className="mt-1 text-sm font-bold text-[#1E293B]">{profile.age} years</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-400">Gender</span>
              <p className="mt-1 text-sm font-bold text-[#1E293B]">{profile.gender}</p>
            </div>
            <div className="rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-medium text-slate-400">Height</span>
                <p className="mt-1 text-sm font-bold text-[#1E293B]">{profile.heightCm} cm</p>
              </div>
              <Ruler className="h-4 w-4 text-[#10B981] mt-0.5" />
            </div>
            <div className="rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60 flex items-start justify-between col-span-1 sm:col-span-2">
              <div>
                <span className="text-[11px] font-medium text-slate-400">Weight</span>
                <p className="mt-1 text-sm font-bold text-[#1E293B]">{profile.weightKg} kg</p>
              </div>
              <Weight className="h-4 w-4 text-[#10B981] mt-0.5" />
            </div>
          </div>
        </div>

        {/* Health Information Card */}
        <div className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <Activity className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="text-base font-bold text-[#1E293B]">Health Information</h3>
              <p className="text-xs text-slate-500">Dietary style, fitness goals &amp; activity</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <div className="flex items-center gap-3">
                <Utensils className="h-4 w-4 text-[#166534]" />
                <span className="text-xs font-medium text-slate-500">Dietary Preference</span>
              </div>
              <span className="text-sm font-bold text-[#1E293B]">{profile.dietaryPreference}</span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <div className="flex items-center gap-3">
                <Target className="h-4 w-4 text-[#166534]" />
                <span className="text-xs font-medium text-slate-500">Health Goal</span>
              </div>
              <span className="inline-flex rounded-full bg-[#DCFCE7] px-3 py-0.5 text-xs font-bold text-[#166534]">
                {profile.healthGoal}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#F8FAF7] p-3.5 border border-slate-200/60">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs font-medium text-slate-500">Activity Level</span>
              </div>
              <span className="text-sm font-bold text-[#1E293B]">{profile.activityLevel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Editable Profile Form */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">Update Profile Details</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize your personal and nutrition profile values (frontend prototype preview)
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Age (years)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="10"
                max="100"
                value={profile.age}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="heightCm" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Height (cm)
              </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                min="100"
                max="240"
                value={profile.heightCm}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              />
            </div>

            <div>
              <label htmlFor="weightKg" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Weight (kg)
              </label>
              <input
                id="weightKg"
                name="weightKg"
                type="number"
                min="30"
                max="220"
                value={profile.weightKg}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="dietaryPreference"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Dietary Preference
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                value={profile.dietaryPreference}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              >
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            <div>
              <label htmlFor="healthGoal" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Health Goal
              </label>
              <select
                id="healthGoal"
                name="healthGoal"
                value={profile.healthGoal}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              >
                <option value="Maintain Muscle">Maintain Muscle</option>
                <option value="Lean Muscle Gain">Lean Muscle Gain</option>
                <option value="Improve Nutritional Balance">Improve Nutritional Balance</option>
                <option value="Weight Management">Weight Management</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label
                htmlFor="activityLevel"
                className="block text-xs font-semibold text-slate-600 mb-1.5"
              >
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={profile.activityLevel}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7] transition-all"
              >
                <option value="Sedentary">Sedentary (Little or no exercise)</option>
                <option value="Lightly Active">Lightly Active (1–3 days/week)</option>
                <option value="Moderately Active">Moderately Active (3–5 days/week)</option>
                <option value="Very Active">Very Active (6–7 days/week)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] transition-colors"
            >
              <Save className="h-4 w-4" />
              Save Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

