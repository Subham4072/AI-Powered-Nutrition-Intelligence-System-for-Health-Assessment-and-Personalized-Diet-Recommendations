export const USER_PROFILE = {
  name: 'Subham',
  age: 20,
  gender: 'Male',
  heightCm: 170,
  weightKg: 68,
  goal: 'Maintain muscle and improve nutritional balance',
  shortGoal: 'Maintain Muscle',
  dietaryPreference: 'Non-Vegetarian',
  activityLevel: 'Moderately Active',
  waterIntakeLiters: 2.4,
  waterTargetLiters: 3.0,
  balanceStatus: 'Optimal Track',
};

export const NUTRITION_TARGETS = {
  calories: 2200,
  protein: 120,
  carbs: 250,
  fat: 70,
};

export const NUTRITION_OVERVIEW = [
  {
    id: 'calories',
    label: 'Calories',
    current: 1850,
    target: 2200,
    unit: 'kcal',
    percentage: 84,
    accent: 'emerald',
    subtitle: '350 kcal remaining today',
  },
  {
    id: 'protein',
    label: 'Protein',
    current: 85,
    target: 120,
    unit: 'g',
    percentage: 71,
    accent: 'forest',
    subtitle: '35 g remaining to target',
  },
  {
    id: 'carbs',
    label: 'Carbohydrates',
    current: 210,
    target: 250,
    unit: 'g',
    percentage: 84,
    accent: 'teal',
    subtitle: '40 g remaining today',
  },
  {
    id: 'fat',
    label: 'Fat',
    current: 55,
    target: 70,
    unit: 'g',
    percentage: 79,
    accent: 'amber',
    subtitle: '15 g remaining today',
  },
];

export const NUTRIENT_INTAKE_BAR_DATA = [
  { name: 'Protein', consumed: 85, target: 120, unit: 'g' },
  { name: 'Carbohydrates', consumed: 210, target: 250, unit: 'g' },
  { name: 'Fat', consumed: 55, target: 70, unit: 'g' },
];

export const MACRO_DISTRIBUTION_DATA = [
  { name: 'Protein', value: 25, color: '#166534' },
  { name: 'Carbohydrates', value: 50, color: '#10B981' },
  { name: 'Fat', value: 25, color: '#6EE7B7' },
];

export const INITIAL_FOOD_DIARY = [
  {
    id: 'meal-breakfast',
    meal: 'Breakfast',
    time: '08:15 AM',
    items: [
      { id: 'f1', name: 'Oats', serving: '1 bowl (60 g)', calories: 230, protein: 8, carbs: 38, fat: 4 },
      { id: 'f2', name: 'Milk', serving: '1 glass (250 ml)', calories: 150, protein: 8, carbs: 12, fat: 7 },
      { id: 'f3', name: 'Banana', serving: '1 medium', calories: 105, protein: 1, carbs: 27, fat: 0 },
    ],
  },
  {
    id: 'meal-lunch',
    meal: 'Lunch',
    time: '01:20 PM',
    items: [
      { id: 'f4', name: 'Rice', serving: '1 cup cooked', calories: 210, protein: 4, carbs: 45, fat: 1 },
      { id: 'f5', name: 'Dal', serving: '1 bowl (200 g)', calories: 180, protein: 10, carbs: 27, fat: 3 },
      { id: 'f6', name: 'Chicken', serving: '140 g grilled', calories: 235, protein: 32, carbs: 0, fat: 10 },
    ],
  },
  {
    id: 'meal-snack',
    meal: 'Evening Snack',
    time: '05:00 PM',
    items: [
      { id: 'f7', name: 'Almonds', serving: '18 g (approx. 15)', calories: 110, protein: 4, carbs: 3, fat: 9 },
      { id: 'f8', name: 'Apple', serving: '1 medium', calories: 95, protein: 0, carbs: 24, fat: 0 },
    ],
  },
  {
    id: 'meal-dinner',
    meal: 'Dinner',
    time: '08:30 PM',
    items: [
      { id: 'f9', name: 'Chapati', serving: '2 medium', calories: 170, protein: 5, carbs: 25, fat: 3 },
      { id: 'f10', name: 'Paneer', serving: '85 g lightly cooked', calories: 255, protein: 11, carbs: 3, fat: 16 },
      { id: 'f11', name: 'Vegetables', serving: '1 bowl mixed', calories: 110, protein: 2, carbs: 6, fat: 2 },
    ],
  },
];

export const SYMPTOM_QUESTIONS = [
  {
    id: 'fatigue',
    title: 'Fatigue & Low Energy',
    question: 'How often have you experienced unusual tiredness or daytime fatigue over the past 2 weeks?',
    options: ['Never', 'Occasionally', 'Frequently', 'Daily'],
    tags: ['Iron', 'Vitamin B12', 'Calories'],
  },
  {
    id: 'hair-loss',
    title: 'Hair Loss or Thinning',
    question: 'Have you noticed increased hair shedding or brittle hair strands recently?',
    options: ['None', 'Mild', 'Moderate', 'Noticeable'],
    tags: ['Protein', 'Iron', 'Biotin'],
  },
  {
    id: 'skin-problems',
    title: 'Skin Problems',
    question: 'Do you experience dry, flaky skin, slow healing, or frequent skin irritation?',
    options: ['None', 'Mild', 'Moderate', 'Frequent'],
    tags: ['Vitamin E', 'Healthy Fats', 'Hydration'],
  },
  {
    id: 'muscle-weakness',
    title: 'Muscle Weakness or Soreness',
    question: 'Have you felt unusual muscle weakness, cramps, or slower workout recovery?',
    options: ['Never', 'Rarely', 'Sometimes', 'Often'],
    tags: ['Protein', 'Calcium', 'Vitamin D'],
  },
  {
    id: 'mood-changes',
    title: 'Mood Changes',
    question: 'Have you noticed irritability, low mood, or difficulty focusing during daily tasks?',
    options: ['Never', 'Occasionally', 'Frequently', 'Persistent'],
    tags: ['Vitamin B12', 'Omega-3', 'Vitamin D'],
  },
  {
    id: 'sleep-problems',
    title: 'Sleep Problems',
    question: 'How would you describe any difficulty falling asleep or staying asleep at night?',
    options: ['No issues', 'Mild restlessness', 'Frequent waking', 'Poor sleep'],
    tags: ['Magnesium', 'Routine', 'Hydration'],
  },
];

export const BLOOD_REPORT_VALUES = [
  {
    id: 'hemoglobin',
    marker: 'Hemoglobin',
    value: '14.2',
    unit: 'g/dL',
    referenceRange: '13.5 – 17.5 g/dL',
    status: 'Normal',
    category: 'Hematology',
    note: 'Supports oxygen transport & daily energy levels.',
  },
  {
    id: 'vitamin-d',
    marker: 'Vitamin D',
    value: '32',
    unit: 'ng/mL',
    referenceRange: '30 – 100 ng/mL',
    status: 'Normal',
    category: 'Vitamins',
    note: 'Adequate level supporting bone & immune wellness.',
  },
  {
    id: 'vitamin-b12',
    marker: 'Vitamin B12',
    value: '450',
    unit: 'pg/mL',
    referenceRange: '200 – 900 pg/mL',
    status: 'Optimal',
    category: 'Vitamins',
    note: 'Healthy range for nerve function & metabolism.',
  },
  {
    id: 'iron',
    marker: 'Iron',
    value: '85',
    unit: 'µg/dL',
    referenceRange: '60 – 170 µg/dL',
    status: 'Normal',
    category: 'Minerals',
    note: 'Balanced serum iron supporting stamina.',
  },
  {
    id: 'calcium',
    marker: 'Calcium',
    value: '9.2',
    unit: 'mg/dL',
    referenceRange: '8.6 – 10.2 mg/dL',
    status: 'Normal',
    category: 'Minerals',
    note: 'Within standard range for bone & muscle contraction.',
  },
];

export const RECOMMENDED_FOODS = [
  {
    id: 'eggs',
    name: 'Eggs',
    category: 'High Protein',
    highlight: '6g protein / egg',
    benefit: 'Complete amino acid profile with Vitamin B12 and choline.',
    emoji: '🥚',
  },
  {
    id: 'milk',
    name: 'Milk',
    category: 'Dairy & Calcium',
    highlight: '8g protein / 250 ml',
    benefit: 'Rich source of calcium, Vitamin D, and steady hydration.',
    emoji: '🥛',
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'Leafy Greens',
    highlight: 'Iron & Folate',
    benefit: 'Nutrient-dense greens supporting hemoglobin and fiber intake.',
    emoji: '🥬',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    category: 'Healthy Fats',
    highlight: 'Vitamin E & Mg',
    benefit: 'Heart-healthy monounsaturated fats and plant protein.',
    emoji: '🌰',
  },
  {
    id: 'chicken',
    name: 'Chicken',
    category: 'Lean Meat',
    highlight: '31g protein / 100g',
    benefit: 'Lean protein ideal for maintaining muscle mass.',
    emoji: '🍗',
  },
  {
    id: 'banana',
    name: 'Banana',
    category: 'Clean Energy',
    highlight: 'Potassium & B6',
    benefit: 'Quick natural carbohydrates great before or after workouts.',
    emoji: '🍌',
  },
  {
    id: 'oats',
    name: 'Oats',
    category: 'Whole Grains',
    highlight: 'Beta-glucan Fiber',
    benefit: 'Sustained-release energy for balanced morning blood sugar.',
    emoji: '🥣',
  },
  {
    id: 'paneer',
    name: 'Paneer',
    category: 'Slow Protein',
    highlight: 'Calcium & Casein',
    benefit: 'Slow-digesting protein supporting overnight muscle recovery.',
    emoji: '🧀',
  },
];

export const SAMPLE_MEAL_PLAN = [
  {
    id: 'plan-breakfast',
    mealType: 'Breakfast',
    foodName: 'Oats, Milk & Banana Power Bowl',
    description: 'Rolled oats simmered in warm milk, topped with sliced banana and a sprinkle of seeds.',
    calories: 485,
    protein: 17,
    prepTime: '10 mins',
    colorTheme: 'emerald',
    illustrationType: 'breakfast',
  },
  {
    id: 'plan-lunch',
    mealType: 'Lunch',
    foodName: 'Grilled Chicken, Dal & Steamed Rice',
    description: 'Lean herb-grilled chicken paired with yellow dal and portioned steamed rice for balanced macros.',
    calories: 625,
    protein: 46,
    prepTime: '25 mins',
    colorTheme: 'forest',
    illustrationType: 'lunch',
  },
  {
    id: 'plan-snacks',
    mealType: 'Evening Snacks',
    foodName: 'Soaked Almonds & Crisp Apple',
    description: 'A light afternoon pairing combining healthy fats, crunch, and natural dietary fiber.',
    calories: 205,
    protein: 4,
    prepTime: '2 mins',
    colorTheme: 'teal',
    illustrationType: 'snack',
  },
  {
    id: 'plan-dinner',
    mealType: 'Dinner',
    foodName: 'Whole Wheat Chapati, Paneer & Greens',
    description: 'Lightly sautéed paneer and seasonal vegetables served with soft whole wheat chapatis.',
    calories: 535,
    protein: 18,
    prepTime: '20 mins',
    colorTheme: 'sage',
    illustrationType: 'dinner',
  },
];

export const NUTRITION_TIPS = [
  {
    id: 'tip-1',
    title: 'Distribute Protein Evenly',
    description: 'Aim for 25–35 g of protein per main meal to support muscle maintenance throughout the day.',
  },
  {
    id: 'tip-2',
    title: 'Pair Iron with Vitamin C',
    description: 'Combine leafy greens like spinach or lentils with citrus or tomatoes to aid natural iron absorption.',
  },
  {
    id: 'tip-3',
    title: 'Prioritize Consistent Hydration',
    description: 'Keep a 3 L daily water goal, drinking a glass before meals to support digestion and energy.',
  },
  {
    id: 'tip-4',
    title: 'Include Whole-Food Micronutrients',
    description: 'Rotate colorful vegetables, nuts, and dairy daily to cover essential vitamins and minerals.',
  },
];

export const SAMPLE_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Daily Calorie Progress',
    message: 'You have reached 84% of your 2,200 kcal daily goal.',
    time: '15m ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Protein Target Reminder',
    message: '35 g protein remaining today to meet your 120 g target.',
    time: '1h ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Sample Blood Report Loaded',
    message: 'Demo laboratory markers are ready to review in Blood Reports.',
    time: 'Today',
    unread: false,
  },
];

