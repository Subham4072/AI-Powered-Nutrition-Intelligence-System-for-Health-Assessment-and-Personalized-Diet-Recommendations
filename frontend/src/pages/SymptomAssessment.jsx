import React, { useState, useEffect, useCallback } from 'react';
import {
  ClipboardCheck,
  CheckCircle2,
  Info,
  RotateCcw,
  Loader2,
  Database,
} from 'lucide-react';
import { SYMPTOM_QUESTIONS, USER_PROFILE } from '../data/mockData';
import { useToast } from '../components/Toast';
import supabase from '../lib/supabaseClient';
import AssessmentHistory from '../components/AssessmentHistory';

const DEMO_USER_ID = 'subham_demo_001';

const INITIAL_ANSWERS = {
  fatigue: 'Occasionally',
  'hair-loss': 'None',
  'skin-problems': 'None',
  'muscle-weakness': 'Rarely',
  'mood-changes': 'Never',
  'sleep-problems': 'No issues',
};

export default function SymptomAssessment() {
  const [answers, setAnswers] = useState(INITIAL_ANSWERS);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // Supabase Assessment History state
  const [assessments, setAssessments] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);

  const { showToast } = useToast();

  const answeredCount = Object.values(answers).filter(Boolean).length;

  // Load previously submitted assessments from Supabase
  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setHistoryError(null);
    try {
      const { data, error } = await supabase
        .from('symptom_assessments')
        .select('*')
        .eq('demo_user_id', DEMO_USER_ID)
        .order('created_at', { ascending: false });

      if (error) {
        setHistoryError(error);
      } else {
        setAssessments(data || []);
      }
    } catch (err) {
      setHistoryError(err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleSelectOption = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
    if (submittedData) setSubmittedData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answeredCount === 0) {
      showToast({
        title: 'Validation Error',
        message: 'Please answer at least one symptom question before submitting.',
        type: 'warning',
      });
      return;
    }

    setIsSubmitting(true);

    const assessmentPayload = {
      demo_user_id: DEMO_USER_ID,
      user_name: USER_PROFILE.name,
      user_age: Number(USER_PROFILE.age) || null,
      user_gender: USER_PROFILE.gender,
      user_height: Number(USER_PROFILE.heightCm) || null,
      user_weight: Number(USER_PROFILE.weightKg) || null,
      user_profile: {
        name: USER_PROFILE.name,
        age: USER_PROFILE.age,
        gender: USER_PROFILE.gender,
        heightCm: USER_PROFILE.heightCm,
        weightKg: USER_PROFILE.weightKg,
        goal: USER_PROFILE.goal,
        shortGoal: USER_PROFILE.shortGoal,
        dietaryPreference: USER_PROFILE.dietaryPreference,
        activityLevel: USER_PROFILE.activityLevel,
        waterIntakeLiters: USER_PROFILE.waterIntakeLiters,
        waterTargetLiters: USER_PROFILE.waterTargetLiters,
        balanceStatus: USER_PROFILE.balanceStatus,
      },
      symptoms: SYMPTOM_QUESTIONS.map((q) => ({
        id: q.id,
        title: q.title,
        question: q.question,
        response: answers[q.id] || 'Not specified',
        tags: q.tags || [],
      })),
      additional_notes: (notes || '').trim(),
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from('symptom_assessments')
        .insert([assessmentPayload])
        .select();

      if (error) {
        showToast({
          title: 'Supabase Error',
          message: error.message || 'Failed to insert assessment record into Supabase.',
          type: 'error',
        });
        return;
      }

      const insertedRecord = data && data.length > 0 ? data[0] : assessmentPayload;
      setSubmittedData(insertedRecord);
      showToast({
        title: 'Assessment Saved',
        message: `Successfully saved record to 'symptom_assessments' in Supabase.`,
        type: 'success',
      });

      // Refresh assessment history list
      await loadHistory();
    } catch (err) {
      showToast({
        title: 'Connection Error',
        message: err.message || 'Unexpected error while connecting to Supabase.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAssessment = async (id) => {
    try {
      const { data, error } = await supabase
        .from('symptom_assessments')
        .delete()
        .eq('id', id)
        .eq('demo_user_id', DEMO_USER_ID)
        .select();

      if (error) {
        showToast({
          title: 'Delete Failed',
          message: error.message || 'Could not delete assessment from Supabase.',
          type: 'error',
        });
        return;
      }

      // If RLS policy blocked the deletion (0 rows deleted)
      if (!data || data.length === 0) {
        showToast({
          title: 'Deletion Notice',
          message:
            'Record was not deleted by Supabase. Please run the DELETE policy SQL in your Supabase SQL Editor.',
          type: 'warning',
        });
        return;
      }

      // Remove from dashboard state
      setAssessments((prev) => prev.filter((item) => item.id !== id));

      if (submittedData?.id === id) {
        setSubmittedData(null);
      }

      showToast({
        title: 'Assessment Deleted',
        message: 'The record was deleted from both the dashboard and your Supabase database.',
        type: 'success',
      });
    } catch (err) {
      showToast({
        title: 'Error',
        message: err.message || 'Unexpected error while deleting assessment.',
        type: 'error',
      });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setNotes('');
    setSubmittedData(null);
    showToast({
      title: 'Questionnaire Cleared',
      message: 'All selections have been reset.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <ClipboardCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#1E293B]">
                  Wellness &amp; Symptom Questionnaire
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                  <Database className="h-3 w-3" />
                  Supabase Live
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-2xl">
                Select the option that best reflects your recent experience across six wellness
                areas. Submissions are saved directly to your Supabase PostgreSQL database for demo
                user <strong className="text-[#1E293B]">{USER_PROFILE.name}</strong> (
                <code className="text-[#166534] font-semibold">{DEMO_USER_ID}</code>).
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F8FAF7] border border-slate-200/70 px-4 py-2.5 text-center shrink-0">
            <p className="text-[11px] font-medium text-slate-400">Completed</p>
            <p className="text-base font-bold text-[#166534]">
              {answeredCount} / {SYMPTOM_QUESTIONS.length}
            </p>
          </div>
        </div>
      </section>

      {/* Success Banner (Live Supabase database confirmation) */}
      {submittedData && (
        <div
          className="rounded-2xl bg-[#DCFCE7] border border-emerald-300/80 p-5 flex items-start gap-3.5 shadow-sm"
          role="status"
        >
          <CheckCircle2 className="h-5 w-5 text-[#166534] shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#166534]">
              Assessment Successfully Stored in Supabase
            </h3>
            <p className="mt-1 text-xs text-[#166534]/90 leading-relaxed">
              Your responses ({answeredCount} of {SYMPTOM_QUESTIONS.length} questions answered)
              were saved directly to Supabase table <code className="font-semibold">symptom_assessments</code>
              {submittedData.id ? (
                <> with record ID <span className="font-mono font-semibold">{submittedData.id}</span></>
              ) : null}.
              The profile snapshot for {USER_PROFILE.name} ({USER_PROFILE.age} yrs,{' '}
              {USER_PROFILE.weightKg} kg, {USER_PROFILE.heightCm} cm) has been attached.
            </p>
          </div>
        </div>
      )}

      {/* Questionnaire Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SYMPTOM_QUESTIONS.map((item, idx) => {
            const selected = answers[item.id];
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm hover:border-emerald-200 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-[#F8FAF7] px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      Question {idx + 1}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#DCFCE7]/70 px-2 py-0.5 text-[10px] font-medium text-[#166534]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-[#1E293B]">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{item.question}</p>
                </div>

                {/* Selection Cards / Radio Options */}
                <div
                  className="mt-4 grid grid-cols-2 gap-2.5"
                  role="radiogroup"
                  aria-label={item.title}
                >
                  {item.options.map((option) => {
                    const isSelected = selected === option;
                    return (
                      <label
                        key={option}
                        className={`cursor-pointer flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-[#166534] bg-[#DCFCE7]/60 text-[#166534] font-semibold shadow-2xs'
                            : 'border-slate-200 bg-[#F8FAF7] text-slate-600 hover:border-emerald-300 hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          value={option}
                          checked={isSelected}
                          onChange={() => handleSelectOption(item.id, option)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                            isSelected
                              ? 'border-[#166534] bg-[#166534]'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </span>
                        <span className="truncate">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Notes */}
        <div className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm">
          <label htmlFor="wellness-notes" className="block text-sm font-bold text-[#1E293B]">
            Additional Context (Optional)
          </label>
          <p className="text-xs text-slate-500 mt-0.5 mb-3">
            Add any dietary changes, workout intensity notes, or recent routine updates.
          </p>
          <textarea
            id="wellness-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Example: Started morning workouts 4 days a week..."
            className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3.5 py-2.5 text-sm text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DCFCE7]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <p className="inline-flex items-center gap-1.5 text-xs text-slate-400">
            <Info className="h-3.5 w-3.5 text-[#10B981]" />
            Frontend demonstration only — no clinical diagnosis or ML prediction is performed.
          </p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Clear Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] disabled:opacity-60 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting to Supabase...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Submit Assessment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Assessment History Section */}
      <AssessmentHistory
        assessments={assessments}
        isLoading={isLoadingHistory}
        error={historyError}
        onRefresh={loadHistory}
        onDelete={handleDeleteAssessment}
      />
    </div>
  );
}
