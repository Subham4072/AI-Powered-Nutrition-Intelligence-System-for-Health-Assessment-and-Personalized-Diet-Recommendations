import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  FileUp,
  AlertCircle,
  CheckCircle2,
  FlaskConical,
  FileText,
  UploadCloud,
  Loader2,
  Trash2,
  Eye,
  ExternalLink,
  RefreshCw,
  X,
  FileCheck,
  Sparkles,
  Calendar,
  Building2,
  User,
  Activity,
} from 'lucide-react';
import Modal from '../components/Modal';
import { BLOOD_REPORT_VALUES, USER_PROFILE } from '../data/mockData';
import { useToast } from '../components/Toast';
import supabase from '../lib/supabaseClient';
import {
  extractTextFromPdf,
  extractTextFromImage,
  parseBiomarkers,
} from '../utils/reportExtractor';

const DEMO_USER_ID = 'subham_demo_001';
const STORAGE_BUCKET = 'blood-reports';
const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export default function BloodReports() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  // Processing & Extraction state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState('');
  const [processProgress, setProcessProgress] = useState(0);
  const [extractedReview, setExtractedReview] = useState(null);
  const [showRawText, setShowRawText] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Supabase report history state
  const [savedReports, setSavedReports] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState(null);
  const [selectedHistoryReport, setSelectedHistoryReport] = useState(null);
  const [deletingReportId, setDeletingReportId] = useState(null);

  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  // Load previously saved blood reports from Supabase
  const loadReports = useCallback(async () => {
    setIsLoadingHistory(true);
    setHistoryError(null);
    try {
      const { data, error } = await supabase
        .from('blood_reports')
        .select('*')
        .eq('demo_user_id', DEMO_USER_ID)
        .order('created_at', { ascending: false });

      if (error) {
        setHistoryError(error);
      } else {
        setSavedReports(data || []);
      }
    } catch (err) {
      setHistoryError(err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  // Clean up object URLs when modal closes or file changes
  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelection(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelection(file);
  };

  const handleFileSelection = (file) => {
    // Validate file type
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g)$/i.test(file.name);

    if (!isPdf && !isImage) {
      showToast({
        title: 'Unsupported File Format',
        message: 'Please upload a PDF document or a clear JPG/PNG image.',
        type: 'warning',
      });
      return;
    }

    // Validate size (max 10MB)
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_SIZE_MB) {
      showToast({
        title: 'File Too Large',
        message: `File size is ${sizeMb.toFixed(1)} MB. Maximum allowed size is ${MAX_FILE_SIZE_MB} MB.`,
        type: 'warning',
      });
      return;
    }

    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    const previewUrl = isImage ? URL.createObjectURL(file) : null;

    setSelectedFile(file);
    setFilePreviewUrl(previewUrl);
    setExtractedReview(null);
  };

  const handleRemoveFile = () => {
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setSelectedFile(null);
    setFilePreviewUrl(null);
    setExtractedReview(null);
    setIsProcessing(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Process Document (PDF text extraction / OCR)
  const handleProcessDocument = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setProcessProgress(10);
    setProcessStage('Starting extraction pipeline...');

    try {
      const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');
      let extractionResult;

      if (isPdf) {
        extractionResult = await extractTextFromPdf(selectedFile, ({ message, progress }) => {
          setProcessStage(message);
          setProcessProgress(progress);
        });
      } else {
        extractionResult = await extractTextFromImage(selectedFile, ({ message, progress }) => {
          setProcessStage(message);
          setProcessProgress(progress);
        });
      }

      setProcessStage('Identifying biomarker values and reference ranges...');
      setProcessProgress(90);

      const parsed = parseBiomarkers(extractionResult.text);

      // Pre-populate patient name with Subham if not detected
      if (!parsed.patient_name) {
        parsed.patient_name = USER_PROFILE.name;
      }

      setExtractedReview(parsed);
      setIsProcessing(false);
      setProcessProgress(100);

      const countFound = Object.values(parsed.biomarkers).filter((b) => b.value).length;
      showToast({
        title: 'Extraction Completed',
        message: `Extracted ${countFound} of 5 target biomarkers using ${
          extractionResult.method === 'pdf_text' ? 'PDF Text' : 'Tesseract OCR'
        }. Please review below.`,
        type: 'success',
      });
    } catch (err) {
      setIsProcessing(false);
      showToast({
        title: 'Document Processing Failed',
        message: err.message || 'Could not extract text from document.',
        type: 'error',
      });
    }
  };

  // Modify biomarker value or field in the review form
  const handleBiomarkerValueChange = (key, field, newValue) => {
    setExtractedReview((prev) => {
      if (!prev) return prev;
      const current = prev.biomarkers[key];
      const updatedStatus = newValue ? (current.status === 'Not found' ? 'Needs review' : current.status) : 'Not found';

      return {
        ...prev,
        biomarkers: {
          ...prev.biomarkers,
          [key]: {
            ...current,
            [field]: newValue,
            status: updatedStatus,
          },
        },
      };
    });
  };

  // Save reviewed report to Supabase (Storage + Database)
  const handleSaveReport = async () => {
    if (!selectedFile || !extractedReview) return;

    setIsSaving(true);
    let uploadedFilePath = null;

    try {
      // 1. Upload original file to Supabase Storage bucket 'blood-reports'
      const fileExt = selectedFile.name.split('.').pop();
      const sanitizedName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const uniqueFileName = `${DEMO_USER_ID}/${Date.now()}_${sanitizedName}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(uniqueFileName, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (storageError) {
        console.error('[BloodReports] Storage upload error:', storageError);
        throw new Error(
          `Storage upload failed: ${storageError.message}. Make sure the bucket '${STORAGE_BUCKET}' exists in your Supabase Dashboard.`
        );
      }

      uploadedFilePath = uniqueFileName;

      // 2. Prepare payload for database table 'blood_reports'
      const b = extractedReview.biomarkers;
      const dbPayload = {
        demo_user_id: DEMO_USER_ID,
        user_name: USER_PROFILE.name,
        patient_name: extractedReview.patient_name || USER_PROFILE.name,
        report_date: extractedReview.report_date || new Date().toISOString().split('T')[0],
        laboratory_name: extractedReview.laboratory_name || 'Medical Laboratory',
        hemoglobin: b.hemoglobin?.value ? parseFloat(b.hemoglobin.value) : null,
        vitamin_d: b.vitamin_d?.value ? parseFloat(b.vitamin_d.value) : null,
        vitamin_b12: b.vitamin_b12?.value ? parseFloat(b.vitamin_b12.value) : null,
        serum_iron: b.serum_iron?.value ? parseFloat(b.serum_iron.value) : null,
        calcium: b.calcium?.value ? parseFloat(b.calcium.value) : null,
        reference_ranges: {
          hemoglobin: b.hemoglobin?.referenceRange || '13.5 – 17.5 g/dL',
          vitamin_d: b.vitamin_d?.referenceRange || '30 – 100 ng/mL',
          vitamin_b12: b.vitamin_b12?.referenceRange || '200 – 900 pg/mL',
          serum_iron: b.serum_iron?.referenceRange || '60 – 170 µg/dL',
          calcium: b.calcium?.referenceRange || '8.6 – 10.2 mg/dL',
        },
        original_file_path: uploadedFilePath,
        extraction_status: 'Reviewed & Saved',
        created_at: new Date().toISOString(),
      };

      const { data: insertData, error: insertError } = await supabase
        .from('blood_reports')
        .insert([dbPayload])
        .select();

      if (insertError) {
        // Rollback uploaded file if DB insertion failed
        await supabase.storage.from(STORAGE_BUCKET).remove([uploadedFilePath]);
        console.error('[BloodReports] Database insert error:', insertError);
        throw new Error(`Database insert failed: ${insertError.message}`);
      }

      showToast({
        title: 'Report Saved to Supabase',
        message: 'Original document stored in Supabase Storage and biomarkers recorded in database.',
        type: 'success',
      });

      // Reset modal state
      handleRemoveFile();
      setUploadModalOpen(false);

      // Refresh reports list
      await loadReports();
    } catch (err) {
      showToast({
        title: 'Save Failed',
        message: err.message || 'Could not save report to Supabase.',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a saved report from Supabase (Database + Storage file)
  const handleDeleteReport = async (report) => {
    setDeletingReportId(report.id);
    try {
      // 1. Delete from Supabase Database
      const { data, error } = await supabase
        .from('blood_reports')
        .delete()
        .eq('id', report.id)
        .eq('demo_user_id', DEMO_USER_ID)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      // 2. Remove file from Supabase Storage if path exists
      if (report.original_file_path) {
        await supabase.storage.from(STORAGE_BUCKET).remove([report.original_file_path]);
      }

      // Remove from local state
      setSavedReports((prev) => prev.filter((r) => r.id !== report.id));

      if (selectedHistoryReport?.id === report.id) {
        setSelectedHistoryReport(null);
      }

      showToast({
        title: 'Report Deleted',
        message: 'Blood report was removed from your dashboard and Supabase storage.',
        type: 'success',
      });
    } catch (err) {
      showToast({
        title: 'Delete Failed',
        message: err.message || 'Could not delete report from Supabase.',
        type: 'error',
      });
    } finally {
      setDeletingReportId(null);
    }
  };

  // Get viewable public URL for uploaded original report
  const handleViewOriginalFile = (filePath) => {
    if (!filePath) {
      showToast({
        title: 'File Not Available',
        message: 'No storage path associated with this report.',
        type: 'info',
      });
      return;
    }
    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    if (data?.publicUrl) {
      window.open(data.publicUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Latest report values (or fallback to static demonstration data if no reports saved)
  const latestReport = savedReports.length > 0 ? savedReports[0] : null;

  // Active biomarker values for the top overview cards & table
  const activeBiomarkers = latestReport
    ? [
        {
          id: 'hemoglobin',
          marker: 'Hemoglobin',
          value: latestReport.hemoglobin !== null ? String(latestReport.hemoglobin) : '—',
          unit: 'g/dL',
          referenceRange: latestReport.reference_ranges?.hemoglobin || '13.5 – 17.5 g/dL',
          status: getBiomarkerStatus(latestReport.hemoglobin, 13.5, 17.5),
          category: 'Hematology',
          note: 'Oxygen transport & stamina biomarker.',
        },
        {
          id: 'vitamin-d',
          marker: 'Vitamin D',
          value: latestReport.vitamin_d !== null ? String(latestReport.vitamin_d) : '—',
          unit: 'ng/mL',
          referenceRange: latestReport.reference_ranges?.vitamin_d || '30 – 100 ng/mL',
          status: getBiomarkerStatus(latestReport.vitamin_d, 30, 100),
          category: 'Vitamins',
          note: 'Bone health, immune function, and recovery.',
        },
        {
          id: 'vitamin-b12',
          marker: 'Vitamin B12',
          value: latestReport.vitamin_b12 !== null ? String(latestReport.vitamin_b12) : '—',
          unit: 'pg/mL',
          referenceRange: latestReport.reference_ranges?.vitamin_b12 || '200 – 900 pg/mL',
          status: getBiomarkerStatus(latestReport.vitamin_b12, 200, 900),
          category: 'Vitamins',
          note: 'Nerve function, RBC formation, and energy metabolism.',
        },
        {
          id: 'iron',
          marker: 'Serum Iron',
          value: latestReport.serum_iron !== null ? String(latestReport.serum_iron) : '—',
          unit: 'µg/dL',
          referenceRange: latestReport.reference_ranges?.serum_iron || '60 – 170 µg/dL',
          status: getBiomarkerStatus(latestReport.serum_iron, 60, 170),
          category: 'Minerals',
          note: 'Serum iron supporting stamina and vitality.',
        },
        {
          id: 'calcium',
          marker: 'Calcium',
          value: latestReport.calcium !== null ? String(latestReport.calcium) : '—',
          unit: 'mg/dL',
          referenceRange: latestReport.reference_ranges?.calcium || '8.6 – 10.2 mg/dL',
          status: getBiomarkerStatus(latestReport.calcium, 8.6, 10.2),
          category: 'Minerals',
          note: 'Bone strength and muscle contraction.',
        },
      ]
    : BLOOD_REPORT_VALUES;

  return (
    <div className="space-y-6">
      {/* Top Banner & Upload Action */}
      <section className="rounded-2xl bg-white p-6 border border-slate-200/70 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <FlaskConical className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-[#1E293B]">Blood Report Overview</h2>
                {latestReport ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#DCFCE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#166534]">
                    <CheckCircle2 className="h-3 w-3" />
                    Latest Saved Report ({latestReport.report_date || 'Recent'})
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700">
                    Demonstration Data Only
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed max-w-2xl">
                {latestReport
                  ? `Displaying laboratory biomarker values from ${latestReport.laboratory_name || 'your latest report'} for ${latestReport.patient_name || USER_PROFILE.name}.`
                  : 'Review sample nutritional biomarker values below. Upload your blood test report in PDF, JPG, or PNG format to automatically extract and record your laboratory values.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              handleRemoveFile();
              setUploadModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#166534] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] transition-colors shrink-0"
          >
            <FileUp className="h-4 w-4" />
            Upload Report
          </button>
        </div>

        {/* Demo Disclaimer / Notice */}
        {!latestReport && (
          <div className="mt-5 rounded-xl bg-[#F8FAF7] border border-emerald-200/80 px-4 py-3 flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-[#166534] shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong className="font-semibold text-[#1E293B]">Notice:</strong> No reports have been
              saved to Supabase yet. Predefined demonstration data is displayed for Subham. Click{' '}
              <strong className="text-[#166534]">&ldquo;Upload Report&rdquo;</strong> to extract and
              save your actual lab report.
            </p>
          </div>
        )}
      </section>

      {/* Biomarker Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {activeBiomarkers.map((item) => {
          const isOptimal = item.status === 'Optimal' || item.status === 'Normal';
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      isOptimal
                        ? 'bg-[#DCFCE7] text-[#166534]'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-3 text-sm font-bold text-[#1E293B]">{item.marker}</h3>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[#166534]">{item.value}</span>
                  <span className="text-xs font-medium text-slate-500">{item.unit}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-400">
                  Ref: <span className="font-medium text-slate-600">{item.referenceRange}</span>
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Detailed Laboratory Values Table */}
      <section className="rounded-2xl bg-white border border-slate-200/70 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-[#1E293B]">
              Laboratory Biomarker Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {latestReport
                ? `Biomarkers from report dated ${latestReport.report_date} (${latestReport.laboratory_name})`
                : 'Sample demonstration panel &bull; Reference ranges shown for layout preview'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F8FAF7] border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500">
            <FileText className="h-3.5 w-3.5 text-[#166534]" />
            {latestReport ? `Report #${latestReport.id.slice(0, 8)}` : 'Demo Panel #NP-001'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF7] border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-6">Test Name</th>
                <th className="py-3.5 px-4">Value</th>
                <th className="py-3.5 px-4">Reference Range</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6">Nutritional Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {activeBiomarkers.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAF7]/70 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-[#1E293B]">{row.marker}</p>
                    <p className="text-[11px] text-slate-400">{row.category}</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-[#166534]">
                    {row.value} <span className="text-xs font-normal text-slate-500">{row.unit}</span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-600">{row.referenceRange}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#166534]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500 max-w-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Blood Report History Section */}
      <section className="space-y-4" aria-label="Blood Report History">
        <div className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7] text-[#166534]">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1E293B]">Blood Report History</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#F8FAF7] border border-slate-200/80 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                  Supabase Storage
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved laboratory reports and documents for demo user{' '}
                <strong className="text-[#1E293B]">subham_demo_001</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={loadReports}
            disabled={isLoadingHistory}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-[#F8FAF7] hover:text-[#166534] disabled:opacity-50 transition-colors shrink-0"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoadingHistory ? 'animate-spin text-[#166534]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoadingHistory && (
          <div className="rounded-2xl bg-white p-8 border border-slate-200/70 shadow-sm text-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#166534] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#1E293B]">Loading blood reports from Supabase...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoadingHistory && historyError && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-amber-900 shadow-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-900">Unable to load report history</h4>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  {historyError.message ||
                    'Please make sure the table "blood_reports" has been created in your Supabase SQL Editor.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoadingHistory && !historyError && savedReports.length === 0 && (
          <div className="rounded-2xl bg-white p-8 border border-slate-200/70 shadow-sm text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-[#F8FAF7] border border-slate-200 text-slate-400 mb-3">
              <FileUp className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-[#1E293B]">No Blood Reports Saved Yet</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              Upload your first lab report (PDF, PNG, or JPG) using the button above. The system will
              automatically extract your biomarker values and store them in Supabase.
            </p>
          </div>
        )}

        {/* Report Cards List */}
        {!isLoadingHistory && !historyError && savedReports.length > 0 && (
          <div className="space-y-3.5">
            {savedReports.map((report, idx) => {
              const isDeleting = deletingReportId === report.id;
              return (
                <div
                  key={report.id || idx}
                  className="rounded-2xl bg-white p-5 border border-slate-200/70 shadow-sm hover:shadow-md hover:border-emerald-200/80 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#DCFCE7] px-2.5 py-1 text-xs font-semibold text-[#166534]">
                        <Calendar className="h-3.5 w-3.5" />
                        {report.report_date || 'Date not specified'}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        ID: {report.id ? String(report.id).slice(0, 8) + '...' : `#${idx + 1}`}
                      </span>
                      <span className="rounded-full bg-[#F8FAF7] border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600">
                        Lab: {report.laboratory_name || 'General Lab'}
                      </span>
                      <span className="rounded-full bg-[#F8FAF7] border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600">
                        Patient: {report.patient_name || USER_PROFILE.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setSelectedHistoryReport(report)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#F8FAF7] border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#166534] hover:bg-[#DCFCE7] transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>View Report</span>
                      </button>

                      {report.original_file_path && (
                        <button
                          type="button"
                          onClick={() => handleViewOriginalFile(report.original_file_path)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-[#F8FAF7] hover:text-[#166534] transition-colors"
                          title="Open original document in new tab"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span>Original File</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteReport(report)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 disabled:opacity-50 transition-colors"
                      >
                        {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Biomarkers Quick Summary Pills */}
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {report.hemoglobin && (
                      <span className="rounded-lg bg-[#F8FAF7] border border-slate-200/70 px-2.5 py-1 text-xs">
                        <strong className="text-slate-600">Hb:</strong>{' '}
                        <span className="font-bold text-[#166534]">{report.hemoglobin} g/dL</span>
                      </span>
                    )}
                    {report.vitamin_d && (
                      <span className="rounded-lg bg-[#F8FAF7] border border-slate-200/70 px-2.5 py-1 text-xs">
                        <strong className="text-slate-600">Vit D:</strong>{' '}
                        <span className="font-bold text-[#166534]">{report.vitamin_d} ng/mL</span>
                      </span>
                    )}
                    {report.vitamin_b12 && (
                      <span className="rounded-lg bg-[#F8FAF7] border border-slate-200/70 px-2.5 py-1 text-xs">
                        <strong className="text-slate-600">Vit B12:</strong>{' '}
                        <span className="font-bold text-[#166534]">{report.vitamin_b12} pg/mL</span>
                      </span>
                    )}
                    {report.serum_iron && (
                      <span className="rounded-lg bg-[#F8FAF7] border border-slate-200/70 px-2.5 py-1 text-xs">
                        <strong className="text-slate-600">Iron:</strong>{' '}
                        <span className="font-bold text-[#166534]">{report.serum_iron} µg/dL</span>
                      </span>
                    )}
                    {report.calcium && (
                      <span className="rounded-lg bg-[#F8FAF7] border border-slate-200/70 px-2.5 py-1 text-xs">
                        <strong className="text-slate-600">Calcium:</strong>{' '}
                        <span className="font-bold text-[#166534]">{report.calcium} mg/dL</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Upload & Extraction Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          if (!isSaving && !isProcessing) {
            handleRemoveFile();
            setUploadModalOpen(false);
          }
        }}
        title="Upload & Extract Blood Test Report"
        subtitle="Automatic browser-side PDF text extraction and OCR (PDF, PNG, JPG)"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          {/* File Picker & Drag-and-Drop Area */}
          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? 'border-[#166534] bg-[#DCFCE7]/40'
                  : 'border-slate-300 bg-[#F8FAF7] hover:border-emerald-300 hover:bg-[#DCFCE7]/20'
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCFCE7] text-[#166534] mb-3">
                <UploadCloud className="h-7 w-7" />
              </div>
              <p className="text-sm font-bold text-[#1E293B]">
                Drag and drop your report here, or <span className="text-[#166534] underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Supports PDF (text or scanned), PNG, JPG, JPEG &bull; Max {MAX_FILE_SIZE_MB}MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            /* Selected File Card */
            <div className="rounded-xl bg-[#F8FAF7] border border-slate-200 p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {filePreviewUrl ? (
                  <img
                    src={filePreviewUrl}
                    alt="Report preview thumbnail"
                    className="h-12 w-12 rounded-lg object-cover border border-slate-200 shrink-0"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-50 text-rose-600 border border-rose-100 shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#1E293B] truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {(selectedFile.size / 1024).toFixed(1)} KB &bull;{' '}
                    {selectedFile.type || 'Document'}
                  </p>
                </div>
              </div>

              {!isProcessing && !isSaving && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                    title="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Processing / OCR Progress Bar */}
          {isProcessing && (
            <div className="rounded-xl bg-[#DCFCE7]/40 border border-emerald-200 p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#166534] flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {processStage || 'Processing document...'}
                </span>
                <span className="font-bold text-[#166534]">{processProgress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-emerald-200">
                <div
                  className="bg-[#166534] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${processProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                All extraction runs locally in your browser. No files are sent to external OCR APIs.
              </p>
            </div>
          )}

          {/* Start Extraction Button (if file selected but not yet extracted) */}
          {selectedFile && !isProcessing && !extractedReview && (
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleRemoveFile}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleProcessDocument}
                className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D]"
              >
                <Sparkles className="h-4 w-4" />
                Process &amp; Extract Biomarkers
              </button>
            </div>
          )}

          {/* Extraction Review Form (Editable) */}
          {extractedReview && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#1E293B]">Biomarker Extraction Review</h4>
                  <p className="text-xs text-slate-500">
                    Verify and edit extracted values before saving to Supabase
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRawText((prev) => !prev)}
                  className="text-xs font-semibold text-[#166534] hover:underline"
                >
                  {showRawText ? 'Hide Raw Text' : 'View Extracted Text'}
                </button>
              </div>

              {/* Raw Extracted Text Drawer (for transparency) */}
              {showRawText && (
                <div className="rounded-xl bg-[#F8FAF7] border border-slate-200 p-3 max-h-36 overflow-y-auto text-[11px] font-mono text-slate-600 whitespace-pre-wrap">
                  {extractedReview.raw_text || 'No text extracted.'}
                </div>
              )}

              {/* General Metadata Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label htmlFor="patient_name" className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Patient Name
                  </label>
                  <input
                    id="patient_name"
                    type="text"
                    value={extractedReview.patient_name}
                    onChange={(e) =>
                      setExtractedReview((prev) => ({ ...prev, patient_name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-xs text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="report_date" className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Report Date
                  </label>
                  <input
                    id="report_date"
                    type="date"
                    value={extractedReview.report_date}
                    onChange={(e) =>
                      setExtractedReview((prev) => ({ ...prev, report_date: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-xs text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="laboratory_name" className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Laboratory Name
                  </label>
                  <input
                    id="laboratory_name"
                    type="text"
                    placeholder="e.g. Quest Diagnostics"
                    value={extractedReview.laboratory_name}
                    onChange={(e) =>
                      setExtractedReview((prev) => ({ ...prev, laboratory_name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAF7] px-3 py-2 text-xs text-[#1E293B] focus:border-[#166534] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Editable Biomarkers List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {Object.entries(extractedReview.biomarkers).map(([key, item]) => {
                  const label =
                    key === 'hemoglobin'
                      ? 'Hemoglobin (Hb)'
                      : key === 'vitamin_d'
                      ? 'Vitamin D (25-OH)'
                      : key === 'vitamin_b12'
                      ? 'Vitamin B12'
                      : key === 'serum_iron'
                      ? 'Serum Iron'
                      : 'Calcium';

                  const isFound = item.status === 'Successfully extracted';

                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-slate-200 p-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#1E293B]">{label}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              isFound
                                ? 'bg-[#DCFCE7] text-[#166534]'
                                : item.value
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Ref Range: {item.referenceRange}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="number"
                          step="any"
                          placeholder="e.g. 14.2"
                          value={item.value}
                          onChange={(e) =>
                            handleBiomarkerValueChange(key, 'value', e.target.value)
                          }
                          className="w-28 rounded-lg border border-slate-200 bg-[#F8FAF7] px-3 py-1.5 text-xs font-bold text-[#166534] focus:border-[#166534] focus:bg-white focus:outline-none"
                        />
                        <span className="text-xs font-semibold text-slate-500 w-12 text-left">
                          {item.unit}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Upload Another File
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setUploadModalOpen(false)}
                    disabled={isSaving}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveReport}
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#166534] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#14532D] disabled:opacity-60 transition-colors"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Saving to Supabase...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Save Report</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* View Saved Report Details Modal */}
      {selectedHistoryReport && (
        <Modal
          isOpen={Boolean(selectedHistoryReport)}
          onClose={() => setSelectedHistoryReport(null)}
          title="Blood Report Details"
          subtitle={`Report Date: ${selectedHistoryReport.report_date || 'N/A'} • Lab: ${selectedHistoryReport.laboratory_name || 'N/A'}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-[#F8FAF7] p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Patient</span>
                <p className="font-bold text-[#1E293B]">{selectedHistoryReport.patient_name || USER_PROFILE.name}</p>
              </div>
              <div>
                <span className="text-slate-400">Report Date</span>
                <p className="font-bold text-[#1E293B]">{selectedHistoryReport.report_date}</p>
              </div>
              <div>
                <span className="text-slate-400">Laboratory</span>
                <p className="font-bold text-[#1E293B]">{selectedHistoryReport.laboratory_name}</p>
              </div>
              <div>
                <span className="text-slate-400">Demo User</span>
                <p className="font-mono text-[11px] font-bold text-[#166534] truncate">
                  {selectedHistoryReport.demo_user_id}
                </p>
              </div>
            </div>

            {/* Biomarker Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAF7] border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-4">Biomarker</th>
                    <th className="py-2.5 px-4">Value</th>
                    <th className="py-2.5 px-4">Ref Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#1E293B]">Hemoglobin</td>
                    <td className="py-2.5 px-4 font-bold text-[#166534]">
                      {selectedHistoryReport.hemoglobin ? `${selectedHistoryReport.hemoglobin} g/dL` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {selectedHistoryReport.reference_ranges?.hemoglobin || '13.5 – 17.5 g/dL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#1E293B]">Vitamin D</td>
                    <td className="py-2.5 px-4 font-bold text-[#166534]">
                      {selectedHistoryReport.vitamin_d ? `${selectedHistoryReport.vitamin_d} ng/mL` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {selectedHistoryReport.reference_ranges?.vitamin_d || '30 – 100 ng/mL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#1E293B]">Vitamin B12</td>
                    <td className="py-2.5 px-4 font-bold text-[#166534]">
                      {selectedHistoryReport.vitamin_b12 ? `${selectedHistoryReport.vitamin_b12} pg/mL` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {selectedHistoryReport.reference_ranges?.vitamin_b12 || '200 – 900 pg/mL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#1E293B]">Serum Iron</td>
                    <td className="py-2.5 px-4 font-bold text-[#166534]">
                      {selectedHistoryReport.serum_iron ? `${selectedHistoryReport.serum_iron} µg/dL` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {selectedHistoryReport.reference_ranges?.serum_iron || '60 – 170 µg/dL'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-[#1E293B]">Calcium</td>
                    <td className="py-2.5 px-4 font-bold text-[#166534]">
                      {selectedHistoryReport.calcium ? `${selectedHistoryReport.calcium} mg/dL` : '—'}
                    </td>
                    <td className="py-2.5 px-4 text-slate-500">
                      {selectedHistoryReport.reference_ranges?.calcium || '8.6 – 10.2 mg/dL'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {selectedHistoryReport.original_file_path ? (
                <button
                  type="button"
                  onClick={() => handleViewOriginalFile(selectedHistoryReport.original_file_path)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#166534] hover:bg-[#DCFCE7]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Open Uploaded Document</span>
                </button>
              ) : (
                <span className="text-xs text-slate-400">No document attached</span>
              )}

              <button
                type="button"
                onClick={() => setSelectedHistoryReport(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function getBiomarkerStatus(val, min, max) {
  if (val === null || val === undefined || isNaN(val)) return 'Pending';
  const num = Number(val);
  if (num < min) return 'Low';
  if (num > max) return 'High';
  return 'Normal';
}
