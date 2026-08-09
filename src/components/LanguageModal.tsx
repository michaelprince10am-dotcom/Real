import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { X, Globe, Check } from 'lucide-react';

interface LanguageModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen: propsIsOpen, onClose: propsOnClose }) => {
  const { language, setLanguageCode, languages } = useLanguage();
  const { isLanguageModalOpen, setIsLanguageModalOpen } = useApp();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : isLanguageModalOpen;
  const handleClose = propsOnClose || (() => setIsLanguageModalOpen(false));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Select Global Language
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                All platform content, menus, and interfaces update instantly.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid of Languages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 max-h-[60vh] overflow-y-auto pr-1">
          {languages.map((lang) => {
            const isSelected = lang.code === language.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguageCode(lang.code);
                  handleClose();
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 text-neutral-900 dark:text-neutral-100 font-semibold'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl leading-none">{lang.flag}</span>
                  <div>
                    <div className="text-sm font-medium">{lang.nativeName}</div>
                    <div className="text-[11px] text-neutral-400">{lang.name}</div>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-500" />}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="text-xs text-center text-neutral-400 border-t border-neutral-200 dark:border-neutral-800 pt-4">
          Preference is saved in your browser. Additional localized resources are added weekly.
        </div>
      </div>
    </div>
  );
};
