import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import { createWorker } from 'tesseract.js';

// Configure pdfjs worker using Vite's bundled worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Extracts raw text from a PDF file using PDF.js.
 * If the PDF has very little extractable text (e.g. scanned image pages),
 * it renders the pages onto a canvas and performs Tesseract OCR.
 */
export async function extractTextFromPdf(file, onProgress = () => {}) {
  try {
    onProgress({ stage: 'pdf', message: 'Reading PDF document structure...', progress: 15 });
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    let fullText = '';
    const pageTexts = [];

    // Step 1: Attempt standard text extraction from all pages
    for (let i = 1; i <= numPages; i++) {
      onProgress({
        stage: 'pdf',
        message: `Extracting text from page ${i} of ${numPages}...`,
        progress: 15 + Math.round((i / numPages) * 35),
      });

      const page = await pdfDoc.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(' ');
      pageTexts.push(pageText);
      fullText += `\n--- Page ${i} ---\n` + pageText;
    }

    // Step 2: Check if extracted text is meaningful or if it's a scanned PDF
    const cleanSample = fullText.replace(/--- Page \d+ ---/g, '').trim();
    const hasMeaningfulText = cleanSample.length > 50 && /[a-zA-Z]{3,}/.test(cleanSample);

    if (hasMeaningfulText) {
      onProgress({ stage: 'parsing', message: 'Analyzing extracted medical text...', progress: 90 });
      return { text: fullText, method: 'pdf_text', pages: numPages };
    }

    // Step 3: Scanned PDF fallback - render pages and run OCR
    onProgress({
      stage: 'ocr',
      message: 'Scanned document detected. Initializing OCR engine...',
      progress: 50,
    });

    let ocrFullText = '';
    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          onProgress({
            stage: 'ocr',
            message: `Performing OCR scan on document (${Math.round(m.progress * 100)}%)...`,
            progress: 50 + Math.round(m.progress * 40),
          });
        }
      },
    });

    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const {
        data: { text },
      } = await worker.recognize(canvas);
      ocrFullText += `\n--- Page ${i} (OCR) ---\n` + text;
    }

    await worker.terminate();
    return { text: ocrFullText, method: 'pdf_ocr', pages: numPages };
  } catch (error) {
    console.error('[reportExtractor] PDF extraction error:', error);
    throw new Error('Failed to process PDF document: ' + (error.message || 'Unknown error'));
  }
}

/**
 * Extracts text from an image file (PNG/JPG/JPEG) using Tesseract.js OCR.
 */
export async function extractTextFromImage(file, onProgress = () => {}) {
  try {
    onProgress({ stage: 'ocr', message: 'Initializing Tesseract OCR for image...', progress: 20 });

    const worker = await createWorker('eng', 1, {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          onProgress({
            stage: 'ocr',
            message: `Scanning image biomarkers (${Math.round(m.progress * 100)}%)...`,
            progress: 20 + Math.round(m.progress * 70),
          });
        }
      },
    });

    const {
      data: { text },
    } = await worker.recognize(file);
    await worker.terminate();

    onProgress({ stage: 'parsing', message: 'Analyzing OCR results...', progress: 95 });
    return { text, method: 'image_ocr', pages: 1 };
  } catch (error) {
    console.error('[reportExtractor] Image OCR error:', error);
    throw new Error('Failed to perform OCR on image: ' + (error.message || 'Unknown error'));
  }
}

/**
 * Parses raw extracted text to identify Patient Name, Test Date, Laboratory Name,
 * and standard nutritional biomarkers (Hemoglobin, Vitamin D, Vitamin B12, Iron, Calcium).
 */
export function parseBiomarkers(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return createEmptyBiomarkerSet();
  }

  // Normalize spaces and line breaks for easier pattern matching
  const normalized = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ');

  // 1. Patient Name extraction
  let patientName = '';
  const patientMatch = normalized.match(
    /(?:Patient(?:\s*Name)?|Name|Client)\s*[:\-]?\s*([A-Z][a-zA-Z\s]{2,30})(?:\s{2,}|\n|$|\d)/i
  );
  if (patientMatch && patientMatch[1]) {
    patientName = patientMatch[1].trim().replace(/\s+(?:Age|Gender|Sex|Ref|Dr|Date).*$/i, '');
  }

  // 2. Report Date extraction (supports YYYY-MM-DD, DD/MM/YYYY, DD-MM-YYYY, Month DD YYYY)
  let reportDate = '';
  const dateMatch = normalized.match(
    /(?:Report\s*Date|Date\s*of\s*Report|Collection\s*Date|Sample\s*Date|Date)\s*[:\-]?\s*(\d{1,2}[-/\.]\d{1,2}[-/\.]\d{2,4}|\d{4}[-/\.]\d{1,2}[-/\.]\d{1,2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})/i
  );
  if (dateMatch && dateMatch[1]) {
    reportDate = normalizeDateString(dateMatch[1]);
  } else {
    // Fallback: look for any standalone date
    const genericDateMatch = normalized.match(/(\d{4}[-/\.]\d{1,2}[-/\.]\d{1,2}|\d{1,2}[-/\.]\d{1,2}[-/\.]\d{4})/);
    if (genericDateMatch) {
      reportDate = normalizeDateString(genericDateMatch[1]);
    }
  }

  // 3. Laboratory Name extraction
  let labName = '';
  const labMatch = normalized.match(
    /(?:Laboratory|Lab\s*Name|Diagnostic\s*Center|Pathology|Hospital)\s*[:\-]?\s*([A-Za-z0-9\s,\.&]{3,50})(?:\n|$)/i
  );
  if (labMatch && labMatch[1]) {
    labName = labMatch[1].trim();
  } else {
    // Check known commercial labs
    const knownLabs = [
      'Quest Diagnostics',
      'Labcorp',
      'Dr. Lal PathLabs',
      'Apollo Diagnostics',
      'Metropolis Healthcare',
      'SRL Diagnostics',
      'Max Lab',
    ];
    for (const lab of knownLabs) {
      if (new RegExp(lab, 'i').test(normalized)) {
        labName = lab;
        break;
      }
    }
  }

  // 4. Biomarkers regex extraction
  const biomarkers = {
    hemoglobin: extractBiomarkerValue(normalized, [
      /(?:hemoglobin|hgb|\bhb\b)[^\d\n\r]{0,35}?(\d{1,2}(?:\.\d{1,2})?)\s*(?:g\/dl|gm\/dl|g\/l)?/i,
      /(\d{1,2}(?:\.\d{1,2})?)\s*(?:g\/dl|gm\/dl)\s*(?:hemoglobin|\bhb\b)/i,
    ], '13.5 – 17.5 g/dL', 'g/dL'),

    vitamin_d: extractBiomarkerValue(normalized, [
      /(?:25[- ](?:oh|hydroxy)\s*vitamin[- ]d|vitamin[- ]d3?|vit[- ]d3?)[^\d\n\r]{0,35}?(\d{1,3}(?:\.\d{1,2})?)\s*(?:ng\/ml|nmol\/l)?/i,
      /(?:vitamin[- ]d|vit[- ]d)\s*[:=\-]?\s*(\d{1,3}(?:\.\d{1,2})?)\s*(?:ng\/ml)?/i,
    ], '30 – 100 ng/mL', 'ng/mL'),

    vitamin_b12: extractBiomarkerValue(normalized, [
      /(?:vitamin[- ]b[- ]?12|vit[- ]b12|cobalamin|\bb12\b)[^\d\n\r]{0,35}?(\d{2,4}(?:\.\d{1,2})?)\s*(?:pg\/ml|pmol\/l)?/i,
      /(?:vitamin[- ]b12|vit[- ]b12)\s*[:=\-]?\s*(\d{2,4}(?:\.\d{1,2})?)/i,
    ], '200 – 900 pg/mL', 'pg/mL'),

    serum_iron: extractBiomarkerValue(normalized, [
      /(?:serum\s*iron|iron,\s*serum|total\s*iron|\biron\b)[^\d\n\r]{0,35}?(\d{1,3}(?:\.\d{1,2})?)\s*(?:µg\/dl|ug\/dl|mcg\/dl)?/i,
      /(?:serum\s*iron)\s*[:=\-]?\s*(\d{1,3}(?:\.\d{1,2})?)/i,
    ], '60 – 170 µg/dL', 'µg/dL'),

    calcium: extractBiomarkerValue(normalized, [
      /(?:serum\s*calcium|calcium,\s*serum|total\s*calcium|\bcalcium\b)[^\d\n\r]{0,35}?(\d{1,2}(?:\.\d{1,2})?)\s*(?:mg\/dl)?/i,
      /(?:serum\s*calcium)\s*[:=\-]?\s*(\d{1,2}(?:\.\d{1,2})?)/i,
    ], '8.6 – 10.2 mg/dL', 'mg/dL'),
  };

  return {
    patient_name: patientName,
    report_date: reportDate || new Date().toISOString().split('T')[0],
    laboratory_name: labName,
    biomarkers,
    raw_text: rawText,
  };
}

/**
 * Searches text using regex patterns and checks reference ranges.
 */
function extractBiomarkerValue(text, regexPatterns, defaultRefRange, unit) {
  for (const regex of regexPatterns) {
    const match = text.match(regex);
    if (match && match[1]) {
      const val = parseFloat(match[1]);
      if (!isNaN(val) && val > 0) {
        // Also search for customized reference range near the matched token
        const matchedIndex = match.index;
        const surroundingText = text.slice(
          Math.max(0, matchedIndex - 20),
          Math.min(text.length, matchedIndex + 80)
        );
        const refMatch = surroundingText.match(/(\d+(?:\.\d+)?\s*[-–]\s*\d+(?:\.\d+)?)/);
        const detectedRef = refMatch ? `${refMatch[1]} ${unit}` : defaultRefRange;

        return {
          value: String(val),
          unit,
          referenceRange: detectedRef,
          status: 'Successfully extracted',
        };
      }
    }
  }

  return {
    value: '',
    unit,
    referenceRange: defaultRefRange,
    status: 'Not found',
  };
}

function normalizeDateString(dateStr) {
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  } catch {
    // Ignore error and return string
  }
  return dateStr;
}

function createEmptyBiomarkerSet() {
  return {
    patient_name: '',
    report_date: new Date().toISOString().split('T')[0],
    laboratory_name: '',
    biomarkers: {
      hemoglobin: { value: '', unit: 'g/dL', referenceRange: '13.5 – 17.5 g/dL', status: 'Not found' },
      vitamin_d: { value: '', unit: 'ng/mL', referenceRange: '30 – 100 ng/mL', status: 'Not found' },
      vitamin_b12: { value: '', unit: 'pg/mL', referenceRange: '200 – 900 pg/mL', status: 'Not found' },
      serum_iron: { value: '', unit: 'µg/dL', referenceRange: '60 – 170 µg/dL', status: 'Not found' },
      calcium: { value: '', unit: 'mg/dL', referenceRange: '8.6 – 10.2 mg/dL', status: 'Not found' },
    },
    raw_text: '',
  };
}

