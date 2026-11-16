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
  Sparkles,
  Heart,
  Droplets,
  Calendar,
  Info,
  CheckCircle2,
  TrendingUp,
  Award,
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

/* -------------------------------------------------------------------------- */
/*                        CUSTOM 3D-STYLED HEALTH ICONS                       */
/* -------------------------------------------------------------------------- */

function AvatarIllustration({ name = 'Subham' }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Soft glowing aura */}
      <div
        className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#DDF5D9] via-[#EAF2DF] to-[#FAF8F0] blur-md opacity-80 -z-10"
        aria-hidden="true"
      />

      {/* Floating health badge 1: Heart pulse (Top Right) */}
      <div
        className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-rose-500 shadow-sm border border-rose-100 motion-safe:animate-bounce"
        style={{ animationDuration: '3s' }}
        title="Active Cardiovascular Health"
      >
        <Heart className="h-3.5 w-3.5 fill-rose-500" />
      </div>

      {/* Floating health badge 2: Hydration (Bottom Left) */}
      <div
        className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0D9488] shadow-sm border border-teal-100 motion-safe:animate-pulse"
        style={{ animationDuration: '2.5s' }}
        title="Hydration Balance"
      >
        <Droplets className="h-3.5 w-3.5 fill-[#0D9488]" />
      </div>

      {/* 3D Modern Avatar SVG */}
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 sm:h-18 sm:w-18 select-none transition-transform duration-300 group-hover:scale-105"
        aria-label={`Avatar for ${name}`}
      >
        <defs>
          <linearGradient id="avatar-bg" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#DDF5D9" />
            <stop offset="60%" stopColor="#C8ECD2" />
            <stop offset="100%" stopColor="#A7D7B5" />
          </linearGradient>
          <linearGradient id="avatar-skin" x1="40" y1="20" x2="40" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFDFC4" />
            <stop offset="100%" stopColor="#F5B895" />
          </linearGradient>
          <linearGradient id="avatar-hair" x1="26" y1="12" x2="54" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E201B" />
            <stop offset="100%" stopColor="#1B120E" />
          </linearGradient>
          <linearGradient id="avatar-shirt" x1="20" y1="56" x2="60" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#176B38" />
            <stop offset="100%" stopColor="#0E4423" />
          </linearGradient>
        </defs>

        {/* Circular Background Container */}
        <circle cx="40" cy="40" r="39" fill="url(#avatar-bg)" stroke="#176B38" strokeWidth="1.5" strokeOpacity="0.25" />

        {/* Athletic Wellness Shirt / Shoulders */}
        <path
          d="M18 78 C20 62 28 56 40 56 C52 56 60 62 62 78 Z"
          fill="url(#avatar-shirt)"
          filter="drop-shadow(0 2px 4px rgba(23, 107, 56, 0.25))"
        />
        {/* Collar Accent */}
        <path d="M34 56 C36 61 44 61 46 56" stroke="#DDF5D9" strokeWidth="2.5" strokeLinecap="round" />

        {/* Neck */}
        <rect x="36" y="44" width="8" height="13" rx="4" fill="#E8A985" />

        {/* Head / Face */}
        <ellipse cx="40" cy="35" rx="13" ry="15" fill="url(#avatar-skin)" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.08))" />

        {/* Friendly Face Detailing */}
        {/* Cheeks */}
        <circle cx="31" cy="38" r="2.5" fill="#F472B6" opacity="0.35" />
        <circle cx="49" cy="38" r="2.5" fill="#F472B6" opacity="0.35" />

        {/* Eyes (warm smiling eyes) */}
        <path d="M31 33 Q 34 31 37 33" stroke="#2E201B" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M43 33 Q 46 31 49 33" stroke="#2E201B" strokeWidth="1.8" strokeLinecap="round" />

        {/* Friendly Confident Smile */}
        <path d="M35 41 Q 40 45 45 41" stroke="#2E201B" strokeWidth="1.6" strokeLinecap="round" />

        {/* Modern Stylized Hair */}
        <path
          d="M27 32 C26 22 30 16 40 16 C50 16 54 22 53 32 C50 24 45 22 40 22 C34 22 29 25 27 32 Z"
          fill="url(#avatar-hair)"
        />
        {/* Hair Swept Curl */}
        <path d="M33 16 C38 12 47 13 50 18" stroke="#3E2B25" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function NameIllustration() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="6" y="8" width="28" height="24" rx="6" fill="#DDF5D9" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="4.5" fill="#176B38" />
      <path d="M12 28 C12 24.5 15.5 23 20 23 C24.5 23 28 24.5 28 28" stroke="#176B38" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="29" cy="11" r="3" fill="#10B981" />
      <path d="M28 11 L29 12 L31 10" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AgeIllustration() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="7" y="9" width="26" height="23" rx="5" fill="#FAF8F0" stroke="#176B38" strokeWidth="1.5" />
      <path d="M7 16 H33" stroke="#176B38" strokeWidth="1.5" />
      <path d="M13 6 V10" stroke="#176B38" strokeWidth="2" strokeLinecap="round" />
      <path d="M27 6 V10" stroke="#176B38" strokeWidth="2" strokeLinecap="round" />
      <circle cx="15" cy="22" r="1.5" fill="#176B38" />
      <circle cx="20" cy="22" r="1.5" fill="#176B38" />
      <circle cx="25" cy="22" r="1.5" fill="#176B38" />
      <circle cx="15" cy="26" r="1.5" fill="#176B38" />
      <circle cx="20" cy="26" r="2" fill="#10B981" />
    </svg>
  );
}

function GenderIllustration() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-6 w-6" aria-hidden="true">
      <circle cx="20" cy="20" r="14" fill="#DDF5D9" fillOpacity="0.7" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="18" cy="22" r="6" stroke="#176B38" strokeWidth="2" />
      <path d="M23 17 L29 11" stroke="#176B38" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 11 H29 V16" stroke="#176B38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeightIllustration() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="14" y="6" width="12" height="28" rx="3" fill="#FAF8F0" stroke="#176B38" strokeWidth="1.5" />
      <path d="M20 9 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 13 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 17 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 21 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 25 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 29 H24" stroke="#176B38" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 6 L10 34" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M7 9 L10 6 L13 9" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 31 L10 34 L13 31" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WeightIllustration() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-6 w-6" aria-hidden="true">
      <rect x="7" y="10" width="26" height="22" rx="6" fill="#FAF8F0" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="20" cy="18" r="5" fill="#DDF5D9" stroke="#176B38" strokeWidth="1.2" />
      <path d="M20 18 L22 15" stroke="#176B38" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="13" y="25" width="14" height="4" rx="2" fill="#176B38" fillOpacity="0.15" />
      <circle cx="16" cy="27" r="1" fill="#10B981" />
      <circle cx="20" cy="27" r="1" fill="#10B981" />
      <circle cx="24" cy="27" r="1" fill="#10B981" />
    </svg>
  );
}

function DietaryBowlIllustration() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8 shrink-0" aria-hidden="true">
      {/* Bowl */}
      <path d="M9 22 C9 32 15 36 22 36 C29 36 35 32 35 22 Z" fill="#176B38" />
      <ellipse cx="22" cy="22" rx="13" ry="2.5" fill="#2E8B57" />
      {/* Food contents */}
      <circle cx="17" cy="18" r="4.5" fill="#BEF264" />
      <circle cx="17" cy="18" r="2.2" fill="#78350F" />
      <circle cx="24" cy="17" r="3" fill="#EF4444" />
      <ellipse cx="28" cy="19" rx="3" ry="1.8" transform="rotate(-20 28 19)" fill="#F59E0B" />
      {/* Leaf garnish */}
      <path d="M21 13 Q 23 9 26 12 Q 23 15 21 13" fill="#10B981" />
    </svg>
  );
}

function GoalTargetIllustration() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8 shrink-0" aria-hidden="true">
      <circle cx="22" cy="22" r="17" fill="#EAF2DF" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="12" fill="#FFFFFF" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="7" fill="#DDF5D9" stroke="#176B38" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill="#176B38" />
      {/* Target Arrow */}
      <path d="M32 12 L24 20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 11 L31 16 L35 15 Z" fill="#F59E0B" />
    </svg>
  );
}

function ActivityRunnerIllustration() {
  return (
    <svg viewBox="0 0 44 44" fill="none" className="h-8 w-8 shrink-0" aria-hidden="true">
      <circle cx="22" cy="22" r="17" fill="#CCFBF1" fillOpacity="0.7" stroke="#0D9488" strokeWidth="1.5" />
      {/* Dynamic Sneaker / Movement Motif */}
      <path
        d="M13 25 C15 22 20 21 24 21 C26 21 27 23 29 23 C31 23 32 21 32 21 L33 26 C33 28 29 29 24 29 C18 29 13 27 13 25 Z"
        fill="#0D9488"
      />
      <ellipse cx="23" cy="25" rx="3.5" ry="1.2" fill="#FFFFFF" opacity="0.8" />
      {/* Speed lines */}
      <path d="M9 19 H15" stroke="#14B8A6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 23 H13" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="28" cy="14" r="2.5" fill="#0D9488" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                       BMI CALCULATION & RANGE HELPER                       */
/* -------------------------------------------------------------------------- */

function getBmiData(heightCm, weightKg) {
  const hMeters = Number(heightCm) > 0 ? Number(heightCm) / 100 : 1.7;
  const wKg = Number(weightKg) > 0 ? Number(weightKg) : 68;
  const bmiVal = parseFloat((wKg / (hMeters * hMeters)).toFixed(1));

  let category = 'Optimal Weight';
  let badgeColor = 'bg-[#DDF5D9] text-[#176B38] border-[#176B38]/20';
  let zoneColor = '#10B981';
  let zoneIndex = 1; // 0 = Underweight, 1 = Normal, 2 = Overweight, 3 = High
  let description = 'Healthy BMI range (18.5 – 24.9) supporting muscular and metabolic wellness.';

  if (bmiVal < 18.5) {
    category = 'Underweight';
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    zoneColor = '#F59E0B';
    zoneIndex = 0;
    description = 'Below the standard healthy range. Focus on nutrient-rich energy staples.';
  } else if (bmiVal <= 24.9) {
    category = 'Optimal Weight';
    badgeColor = 'bg-[#DDF5D9] text-[#176B38] border-[#176B38]/20';
    zoneColor = '#176B38';
    zoneIndex = 1;
    description = 'Within the optimal WHO range (18.5 – 24.9) for vitality and performance.';
  } else if (bmiVal <= 29.9) {
    category = 'Overweight';
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    zoneColor = '#F97316';
    zoneIndex = 2;
    description = 'Slightly above standard range. Moderate caloric adjustment can optimize energy.';
  } else {
    category = 'High Range';
    badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    zoneColor = '#EF4444';
    zoneIndex = 3;
    description = 'Above standard threshold. Consider structured whole-food guidance.';
  }

  // Pointer position clamped between 5% and 95%
  // Scale mapping: 15 to 35 BMI range
  const clamped = Math.max(15, Math.min(35, bmiVal));
  const pointerPct = Math.round(((clamped - 15) / 20) * 100);

  return { bmiVal, category, badgeColor, zoneColor, zoneIndex, description, pointerPct };
}

/* -------------------------------------------------------------------------- */
/*                            MAIN COMPONENT                                  */
/* -------------------------------------------------------------------------- */

export default function HealthProfile() {
  const [profile, setProfile] = useState(DEFAULT_FORM);
  const { showToast } = useToast();

  const bmiData = getBmiData(profile.heightCm, profile.weightKg);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    showToast({
      title: 'Profile Updated (Preview)',
      message: `Saved personalized health profile settings for ${profile.name}.`,
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
    <div className="space-y-7">
      {/* ==================================================================== */}
      {/* 1. PROFILE HEADER SECTION WITH 3D AVATAR & QUICK HEALTH METRICS      */}
      {/* ==================================================================== */}
      <section className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10 relative overflow-hidden">
        {/* Subtle decorative leaf accent */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none text-[#176B38]" aria-hidden="true">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 30, 90 40, 100 70 C90 90, 70 100, 50 100 C30 100, 10 90, 0 70 C10 40, 30 30, 50 0 Z" />
          </svg>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          {/* Left: 3D Avatar + User Info */}
          <div className="flex items-center gap-4 sm:gap-5 min-w-0">
            <AvatarIllustration name={profile.name} />

            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#202B25] font-display truncate">
                  {profile.name}
                </h2>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF5D9] border border-[#176B38]/20 px-3 py-0.5 text-xs font-bold text-[#176B38] shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  Active Profile
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#617268] font-medium mt-1 flex items-center gap-1.5 flex-wrap">
                <span>{profile.age} yrs</span>
                <span className="text-[#CBD5C8]">&bull;</span>
                <span>{profile.gender}</span>
                <span className="text-[#CBD5C8]">&bull;</span>
                <span className="text-[#176B38] font-semibold">{profile.dietaryPreference}</span>
              </p>
            </div>
          </div>

          {/* Right: Modern BMI Radial Gauge & Activity Indicator */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5">
            {/* Quick BMI Circular Meter Box */}
            <div className="rounded-2xl bg-[#FAF8F0]/90 border border-[#176B38]/15 px-4 py-3 shadow-2xs flex items-center gap-3 min-w-[170px]">
              {/* Circular SVG Meter */}
              <div className="relative h-11 w-11 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EAF2DF"
                    strokeWidth="3.2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={bmiData.zoneColor}
                    strokeWidth="3.2"
                    strokeDasharray={`${bmiData.pointerPct}, 100`}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <span className="absolute text-[10px] font-extrabold text-[#202B25] font-display">
                  {bmiData.bmiVal}
                </span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#617268]">BMI Score</p>
                <p className="text-xs font-extrabold text-[#176B38] font-display mt-0.5">{bmiData.category}</p>
                <p className="text-[10px] text-[#617268]/80">{bmiData.bmiVal} kg/m²</p>
              </div>
            </div>

            {/* Quick Activity Level Box */}
            <div className="rounded-2xl bg-[#FAF8F0]/90 border border-[#176B38]/15 px-4 py-3 shadow-2xs flex items-center gap-3 min-w-[160px]">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#CCFBF1] text-[#0D9488] border border-[#0D9488]/20 shadow-2xs">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#617268]">Activity</p>
                <p className="text-xs font-extrabold text-[#202B25] font-display mt-0.5 truncate max-w-[110px]">
                  {profile.activityLevel}
                </p>
                <p className="text-[10px] text-[#10B981] font-semibold">Active Tracker</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2 & 3. PERSONAL INFORMATION & HEALTH INFORMATION DUAL-CARD GRID       */}
      {/* ==================================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2. Personal Information Card */}
        <div className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/15 shadow-2xs">
                  <NameIllustration />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#202B25] font-display">Personal Information</h3>
                  <p className="text-xs text-[#617268] font-medium">Core biological and physical biometric metrics</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#176B38] bg-[#DDF5D9]/70 px-2.5 py-0.5 rounded-full border border-[#176B38]/15">
                Verified
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {/* Name */}
              <div className="group rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-[#617268]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Name</span>
                  <NameIllustration />
                </div>
                <p className="mt-2 text-sm font-extrabold text-[#202B25] font-display truncate">{profile.name}</p>
                <span className="text-[10px] text-[#176B38] font-medium mt-0.5 block">Full name</span>
              </div>

              {/* Age */}
              <div className="group rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-[#617268]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Age</span>
                  <AgeIllustration />
                </div>
                <p className="mt-2 text-sm font-extrabold text-[#202B25] font-display">{profile.age} yrs</p>
                <span className="text-[10px] text-[#617268] font-medium mt-0.5 block">Chronological</span>
              </div>

              {/* Gender */}
              <div className="group rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-[#617268]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Gender</span>
                  <GenderIllustration />
                </div>
                <p className="mt-2 text-sm font-extrabold text-[#202B25] font-display">{profile.gender}</p>
                <span className="text-[10px] text-[#617268] font-medium mt-0.5 block">Biological</span>
              </div>

              {/* Height */}
              <div className="group rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between text-[#617268]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Height</span>
                  <HeightIllustration />
                </div>
                <p className="mt-2 text-sm font-extrabold text-[#202B25] font-display">{profile.heightCm} cm</p>
                <span className="text-[10px] text-[#176B38] font-medium mt-0.5 block">
                  ~{(Number(profile.heightCm) / 30.48).toFixed(1)} ft
                </span>
              </div>

              {/* Weight */}
              <div className="group rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 col-span-1 sm:col-span-2">
                <div className="flex items-center justify-between text-[#617268]">
                  <span className="text-[11px] font-bold uppercase tracking-wider">Body Weight</span>
                  <WeightIllustration />
                </div>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-sm font-extrabold text-[#202B25] font-display">{profile.weightKg} kg</span>
                  <span className="text-xs text-[#617268] font-medium">
                    ({(Number(profile.weightKg) * 2.20462).toFixed(1)} lbs)
                  </span>
                </div>
                <span className="text-[10px] text-[#10B981] font-semibold mt-0.5 block">
                  Optimal muscle maintenance baseline
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Health Information Card */}
        <div className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/15 shadow-2xs">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#202B25] font-display">Health Information</h3>
                  <p className="text-xs text-[#617268] font-medium">Nutrition styling, fitness priorities &amp; training cadence</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#176B38] bg-[#DDF5D9]/70 px-2.5 py-0.5 rounded-full border border-[#176B38]/15">
                Active Goals
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Dietary Preference Item */}
              <div className="group flex items-center justify-between rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 min-w-0">
                  <DietaryBowlIllustration />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#202B25] font-display">Dietary Preference</p>
                    <p className="text-[11px] text-[#617268] font-medium mt-0.5">Primary nutritional guideline</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#DDF5D9] border border-[#176B38]/15 px-3 py-1 text-xs font-extrabold text-[#176B38] shadow-2xs shrink-0">
                  {profile.dietaryPreference}
                </span>
              </div>

              {/* Health Goal Item */}
              <div className="group flex items-center justify-between rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 min-w-0">
                  <GoalTargetIllustration />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#202B25] font-display">Primary Health Goal</p>
                    <p className="text-[11px] text-[#617268] font-medium mt-0.5">Macro &amp; calorie optimization target</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#DDF5D9] border border-[#176B38]/15 px-3 py-1 text-xs font-extrabold text-[#176B38] shadow-2xs shrink-0 truncate max-w-[150px]">
                  {profile.healthGoal}
                </span>
              </div>

              {/* Activity Level Item */}
              <div className="group flex items-center justify-between rounded-2xl bg-[#FAF8F0]/90 p-3.5 border border-[#176B38]/10 shadow-2xs hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 min-w-0">
                  <ActivityRunnerIllustration />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#202B25] font-display">Activity Level</p>
                    <p className="text-[11px] text-[#617268] font-medium mt-0.5">Weekly physical activity frequency</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#CCFBF1] border border-[#0D9488]/20 px-3 py-1 text-xs font-extrabold text-[#0D9488] shadow-2xs shrink-0">
                  {profile.activityLevel}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. INTERACTIVE BODY MASS INDEX (BMI) COMPREHENSIVE VISUALIZATION     */}
      {/* ==================================================================== */}
      <section className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: BMI Score & Category Information */}
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#DDF5D9] px-3.5 py-1 text-xs font-bold text-[#176B38] border border-[#176B38]/15 shadow-2xs mb-2.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Biometric Metric Visualization</span>
            </div>
            <h3 className="text-lg font-extrabold text-[#202B25] font-display flex items-center gap-2">
              Body Mass Index (BMI) Analysis
            </h3>
            <p className="text-xs text-[#617268] mt-1 leading-relaxed font-medium max-w-xl">
              {bmiData.description}
            </p>

            {/* 4-Zone Range Bar */}
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#617268]">
                <span>Underweight (&lt;18.5)</span>
                <span className="text-[#176B38]">Normal (18.5–24.9)</span>
                <span>Overweight (25–29.9)</span>
                <span>High (&ge;30)</span>
              </div>

              {/* Segmented Color Spectrum Bar */}
              <div className="relative h-3 w-full rounded-full bg-[#EAF2DF] overflow-hidden p-0.5 flex gap-1 shadow-inner">
                <div className="flex-1 bg-amber-400 rounded-l-full opacity-80" title="Underweight (<18.5)" />
                <div className="flex-[1.5] bg-[#10B981] opacity-90" title="Optimal Range (18.5–24.9)" />
                <div className="flex-1 bg-amber-500 opacity-80" title="Overweight (25–29.9)" />
                <div className="flex-1 bg-rose-500 rounded-r-full opacity-80" title="High (≥30)" />
              </div>

              {/* Dynamic Animated Pointer Pin */}
              <div className="relative h-5 w-full">
                <div
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-700 ease-out"
                  style={{ left: `${bmiData.pointerPct}%` }}
                >
                  <div className="w-2 h-2 bg-[#202B25] rotate-45 -mb-1" />
                  <span className="rounded-full bg-[#202B25] text-white px-2 py-0.5 text-[10px] font-extrabold font-display shadow-md">
                    {bmiData.bmiVal}
                  </span>
                </div>
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#617268] font-medium pt-3 border-t border-[#176B38]/10">
              <Info className="h-3.5 w-3.5 text-[#176B38] shrink-0" />
              <span>
                Informational wellness indicator based on standard WHO adult reference ranges; not intended as a medical diagnosis.
              </span>
            </div>
          </div>

          {/* Right: Large Radial Gauge Display */}
          <div className="rounded-3xl bg-[#FAF8F0] border border-[#176B38]/15 p-6 flex flex-col items-center justify-center shrink-0 min-w-[220px] text-center shadow-xs">
            <div className="relative h-28 w-28 flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="h-full w-full rotate-[-90deg]">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#EAF2DF"
                  strokeWidth="3.2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke={bmiData.zoneColor}
                  strokeWidth="3.2"
                  strokeDasharray={`${bmiData.pointerPct}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-extrabold text-[#202B25] font-display">{bmiData.bmiVal}</span>
                <span className="text-[10px] font-bold text-[#617268] uppercase tracking-wider">kg/m²</span>
              </div>
            </div>

            <span className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-extrabold border ${bmiData.badgeColor} shadow-2xs`}>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              {bmiData.category}
            </span>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. UPDATE PROFILE DETAILS FORM WITH MODERN ENHANCED INPUTS           */}
      {/* ==================================================================== */}
      <section className="card-floating rounded-3xl p-6 sm:p-7 border border-[#176B38]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#176B38]/10">
          <div>
            <h3 className="text-base font-extrabold text-[#202B25] font-display flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#176B38]" />
              Update Profile Details
            </h3>
            <p className="text-xs text-[#617268] mt-0.5 font-medium">
              Adjust your biometrics and lifestyle preferences — changes update your metrics in real time
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF5D9] px-3 py-0.5 text-xs font-bold text-[#176B38] border border-[#176B38]/15 self-start sm:self-auto">
            <Award className="h-3.5 w-3.5" />
            Live Preview
          </span>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#176B38]" />
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={profile.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#176B38]" />
                Age (years)
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="10"
                max="100"
                required
                value={profile.age}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#176B38]" />
                Biological Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Height */}
            <div>
              <label htmlFor="heightCm" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-[#176B38]" />
                Height (cm)
              </label>
              <input
                id="heightCm"
                name="heightCm"
                type="number"
                min="100"
                max="240"
                required
                value={profile.heightCm}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Weight */}
            <div>
              <label htmlFor="weightKg" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Weight className="h-3.5 w-3.5 text-[#176B38]" />
                Weight (kg)
              </label>
              <input
                id="weightKg"
                name="weightKg"
                type="number"
                min="30"
                max="220"
                required
                value={profile.weightKg}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              />
            </div>

            {/* Dietary Preference */}
            <div>
              <label htmlFor="dietaryPreference" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Utensils className="h-3.5 w-3.5 text-[#176B38]" />
                Dietary Preference
              </label>
              <select
                id="dietaryPreference"
                name="dietaryPreference"
                value={profile.dietaryPreference}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              >
                <option value="Non-Vegetarian">Non-Vegetarian</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Eggetarian">Eggetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>

            {/* Health Goal */}
            <div>
              <label htmlFor="healthGoal" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[#176B38]" />
                Primary Health Goal
              </label>
              <select
                id="healthGoal"
                name="healthGoal"
                value={profile.healthGoal}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              >
                <option value="Maintain Muscle">Maintain Muscle</option>
                <option value="Lean Muscle Gain">Lean Muscle Gain</option>
                <option value="Improve Nutritional Balance">Improve Nutritional Balance</option>
                <option value="Weight Management">Weight Management</option>
              </select>
            </div>

            {/* Activity Level */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label htmlFor="activityLevel" className="block text-xs font-bold text-[#202B25] mb-1.5 flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#176B38]" />
                Activity Level
              </label>
              <select
                id="activityLevel"
                name="activityLevel"
                value={profile.activityLevel}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#176B38]/20 bg-[#FAF8F0] px-4 py-2.5 text-sm text-[#202B25] font-medium focus:border-[#176B38] focus:bg-white focus:outline-none transition-all shadow-2xs"
              >
                <option value="Sedentary">Sedentary (Little or no exercise)</option>
                <option value="Lightly Active">Lightly Active (1–3 days/week)</option>
                <option value="Moderately Active">Moderately Active (3–5 days/week)</option>
                <option value="Very Active">Very Active (6–7 days/week)</option>
              </select>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-[#176B38]/10">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#176B38]/20 bg-white px-4 py-2.5 text-xs font-bold text-[#617268] hover:bg-[#FAF8F0] transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Defaults
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#176B38] to-[#1F7A43] hover:from-[#135A2E] hover:to-[#176B38] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:shadow-lg transition-all"
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
