import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import HealthProfile from './pages/HealthProfile';
import FoodDiary from './pages/FoodDiary';
import SymptomAssessment from './pages/SymptomAssessment';
import BloodReports from './pages/BloodReports';
import Recommendations from './pages/Recommendations';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/health-profile" element={<HealthProfile />} />
            <Route path="/food-diary" element={<FoodDiary />} />
            <Route path="/symptom-assessment" element={<SymptomAssessment />} />
            <Route path="/blood-reports" element={<BloodReports />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

