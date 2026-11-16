import React, { useState } from 'react';
import {
  History,
  Calendar,
  Clock,
  Eye,
  RefreshCw,
  FileText,
  AlertCircle,
  Database,
  User,
  HeartPulse,
  Trash2,
  Loader2,
} from 'lucide-react';
import Modal from './Modal';

function formatDateTime(isoString) {
  if (!isoString) return 'Unknown date';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return isoString;
  }
}

export default function AssessmentHistory({
  assessments = [],
  isLoading = false,
  error = null,
  onRefresh,
  onDelete,
}) {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id, e) => {
    if (e) e.stopPropagation();
    if (!onDelete) return;

    setDeletingId(id);
    try {
      await onDelete(id);
      if (selectedAssessment?.id === id) {
        setSelectedAssessment(null);
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="space-y-4" aria-label="Assessment History">
      {/* Header Bar */}
      <div className="card-floating rounded-3xl p-5 border border-[#176B38]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DDF5D9] text-[#176B38] border border-[#176B38]/15">
            <History className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-[#202B25] font-display">Assessment History</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF2DF] border border-[#176B38]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#176B38]">
                <Database className="h-3 w-3 text-[#176B38]" />
                Supabase
              </span>
            </div>
            <p className="text-xs text-[#617268] mt-0.5">
              Previously submitted records for demo user{' '}
              <strong className="text-[#202B25]">subham_demo_001</strong>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#176B38]/20 bg-white/80 px-4 py-2 text-xs font-bold text-[#176B38] hover:bg-[#DDF5D9]/60 disabled:opacity-50 transition-all shrink-0 shadow-xs"
          aria-label="Refresh assessment history"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-[#176B38]' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="card-floating rounded-3xl p-8 text-center border border-[#176B38]/10">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#DDF5D9] text-[#176B38] mb-3">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
          <p className="text-sm font-bold text-[#202B25] font-display">
            Loading previous assessments from Supabase...
          </p>
          <p className="text-xs text-[#617268] mt-1">
            Querying table &ldquo;symptom_assessments&rdquo; where demo_user_id = subham_demo_001
          </p>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="rounded-3xl bg-rose-50/80 border border-rose-200/80 p-5 text-rose-900 shadow-sm backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-rose-900">
                Supabase Error: Failed to fetch assessment history
              </h4>
              <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                {error.message ||
                  'An error occurred while fetching records from Supabase. Check browser console or network tab for details.'}
              </p>
              {error.code && (
                <p className="text-[11px] font-mono text-rose-600 mt-1">
                  Code: {error.code} {error.details ? `— ${error.details}` : ''}
                </p>
              )}
              <button
                type="button"
                onClick={onRefresh}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-white border border-rose-300 px-3 py-1.5 text-xs font-semibold text-rose-800 hover:bg-rose-100 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Retry Fetch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && assessments.length === 0 && (
        <div className="card-floating rounded-3xl p-8 text-center border border-[#176B38]/10">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-3xl bg-[#FAF8F0] border border-[#176B38]/15 text-[#617268] mb-3">
            <FileText className="h-7 w-7 text-[#176B38]" />
          </div>
          <h4 className="text-base font-extrabold text-[#202B25] font-display">No Previous Assessments Found</h4>
          <p className="text-xs text-[#617268] mt-1 max-w-md mx-auto leading-relaxed">
            There are currently no saved assessments in Supabase for{' '}
            <strong className="text-[#202B25]">subham_demo_001</strong>. Fill out the questionnaire
            above and click &ldquo;Submit Assessment&rdquo; to store your first record.
          </p>
        </div>
      )}

      {/* Assessment List */}
      {!isLoading && !error && assessments.length > 0 && (
        <div className="space-y-3.5">
          {assessments.map((assessment, index) => {
            const symptomsList = Array.isArray(assessment.symptoms) ? assessment.symptoms : [];
            const notes = assessment.additional_notes || '';
            const isDeleting = deletingId === assessment.id;

            return (
              <div
                key={assessment.id || index}
                className="card-floating rounded-3xl p-5 border border-[#176B38]/10 group transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#176B38]/10">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DDF5D9]/90 border border-[#176B38]/15 px-3 py-1 text-xs font-bold text-[#176B38]">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDateTime(assessment.created_at)}
                    </span>
                    <span className="text-xs font-medium text-[#617268]">
                      ID: {assessment.id ? String(assessment.id).slice(0, 8) + '...' : `#${index + 1}`}
                    </span>
                    <span className="rounded-full bg-[#FAF8F0] border border-[#176B38]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#4D5E54]">
                      User: {assessment.user_name || 'Subham'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedAssessment(assessment)}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-[#FAF8F0] border border-[#176B38]/15 px-3.5 py-1.5 text-xs font-bold text-[#176B38] hover:bg-[#DDF5D9]/70 transition-all shadow-2xs"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDelete(assessment.id, e)}
                      disabled={isDeleting}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-white border border-rose-200 px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-300 disabled:opacity-50 transition-colors"
                      title="Delete assessment from dashboard and Supabase"
                      aria-label="Delete assessment record"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

                {/* Symptoms Summary Pills */}
                <div className="mt-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#617268] mb-2">
                    Recorded Symptoms &amp; Severity:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {symptomsList.map((item) => (
                      <div
                        key={item.id || item.title}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#FAF8F0] border border-[#176B38]/10 px-3 py-1 text-xs"
                      >
                        <span className="font-bold text-[#202B25]">{item.title}:</span>
                        <span
                          className={`font-bold ${
                            item.response === 'None' ||
                            item.response === 'Never' ||
                            item.response === 'No issues'
                              ? 'text-[#617268]'
                              : 'text-[#176B38]'
                          }`}
                        >
                          {item.response}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Notes preview */}
                {notes && (
                  <div className="mt-3 pt-2.5 border-t border-[#176B38]/10">
                    <p className="text-xs text-[#617268] line-clamp-2">
                      <strong className="text-[#202B25]">Notes:</strong> {notes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedAssessment && (
        <Modal
          isOpen={Boolean(selectedAssessment)}
          onClose={() => setSelectedAssessment(null)}
          title="Symptom Assessment Details"
          subtitle={`Submitted on ${formatDateTime(selectedAssessment.created_at)}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            {/* User Profile Snapshot Card */}
            <div className="rounded-2xl bg-[#FAF8F0]/80 p-4 border border-[#176B38]/15">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-[#176B38]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#176B38]">
                  Associated Profile Snapshot
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mt-2">
                <div>
                  <span className="text-[#617268]">Name</span>
                  <p className="font-bold text-[#202B25]">{selectedAssessment.user_name || 'Subham'}</p>
                </div>
                <div>
                  <span className="text-[#617268]">Age / Gender</span>
                  <p className="font-bold text-[#202B25]">
                    {selectedAssessment.user_age || 20} yrs / {selectedAssessment.user_gender || 'Male'}
                  </p>
                </div>
                <div>
                  <span className="text-[#617268]">Height / Weight</span>
                  <p className="font-bold text-[#202B25]">
                    {selectedAssessment.user_height || 170} cm / {selectedAssessment.user_weight || 68} kg
                  </p>
                </div>
                <div>
                  <span className="text-[#617268]">Demo User ID</span>
                  <p className="font-mono text-[11px] font-bold text-[#176B38] truncate">
                    {selectedAssessment.demo_user_id}
                  </p>
                </div>
              </div>

              {selectedAssessment.user_profile?.goal && (
                <div className="mt-2.5 pt-2 border-t border-[#176B38]/10 text-xs">
                  <span className="text-[#617268]">Health Goal: </span>
                  <span className="font-semibold text-[#202B25]">
                    {selectedAssessment.user_profile.goal}
                  </span>
                </div>
              )}
            </div>

            {/* Complete Symptoms Breakdown */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse className="h-4 w-4 text-[#176B38]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#202B25]">
                  Symptom Responses ({Array.isArray(selectedAssessment.symptoms) ? selectedAssessment.symptoms.length : 0})
                </h4>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {Array.isArray(selectedAssessment.symptoms) &&
                  selectedAssessment.symptoms.map((symptom, idx) => (
                    <div
                      key={symptom.id || idx}
                      className="rounded-2xl bg-white border border-[#176B38]/10 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#202B25]">{symptom.title}</span>
                          {Array.isArray(symptom.tags) &&
                            symptom.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-[#DDF5D9]/70 px-2 py-0.5 text-[10px] font-bold text-[#176B38]"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        {symptom.question && (
                          <p className="text-[11px] text-[#617268] mt-0.5 line-clamp-1">
                            {symptom.question}
                          </p>
                        )}
                      </div>

                      <span className="inline-flex items-center justify-center rounded-xl bg-[#DDF5D9] px-3 py-1 text-xs font-bold text-[#176B38] shrink-0 self-start sm:self-auto border border-[#176B38]/15">
                        {symptom.response}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#202B25] mb-1.5">
                Additional User Notes
              </h4>
              <div className="rounded-2xl bg-[#FAF8F0] border border-[#176B38]/15 p-3 text-xs text-[#4D5E54] leading-relaxed min-h-[50px]">
                {selectedAssessment.additional_notes || (
                  <span className="text-[#617268] italic">No additional notes provided.</span>
                )}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#176B38]/10">
              <span className="text-[11px] text-[#617268]">
                ID: {selectedAssessment.id}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(selectedAssessment.id)}
                disabled={deletingId === selectedAssessment.id}
                className="inline-flex items-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50/80 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 disabled:opacity-50 transition-colors"
              >
                {deletingId === selectedAssessment.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                <span>Delete Assessment</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
