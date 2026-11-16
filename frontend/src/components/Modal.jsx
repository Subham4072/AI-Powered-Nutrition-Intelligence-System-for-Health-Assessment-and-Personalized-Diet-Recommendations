import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#112419]/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={`w-full ${maxWidth} rounded-3xl bg-white/95 border border-[#176B38]/15 shadow-2xl overflow-hidden backdrop-blur-md transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#176B38]/10 bg-[#FAF8F0]/70 px-6 py-4">
          <div>
            <h3 id="modal-title" className="text-lg font-extrabold text-[#202B25] font-display flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#176B38]" />
              {title}
            </h3>
            {subtitle && <p className="mt-0.5 text-xs text-[#617268]">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-[#617268] hover:bg-[#DDF5D9]/70 hover:text-[#176B38] transition-colors"
            aria-label="Close modal"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
