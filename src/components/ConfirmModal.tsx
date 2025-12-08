import React, { useEffect } from 'react';
import { AlertTriangle, Info, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type ModalType = 'danger' | 'warning' | 'info' | 'success';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ModalType;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger',
  isLoading = false
}) => {
  const { darkMode } = useTheme();

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getThemeConfig = () => {
    switch (type) {
      case 'danger':
        return {
          icon: AlertTriangle,
          iconColor: 'text-red-500',
          iconBg: darkMode ? 'bg-red-500/10' : 'bg-red-50',
          buttonBg: 'bg-red-500 hover:bg-red-600',
          buttonShadow: 'shadow-red-500/20'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          iconColor: 'text-amber-500',
          iconBg: darkMode ? 'bg-amber-500/10' : 'bg-amber-50',
          buttonBg: 'bg-amber-500 hover:bg-amber-600',
          buttonShadow: 'shadow-amber-500/20'
        };
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-emerald-500',
          iconBg: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50',
          buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
          buttonShadow: 'shadow-emerald-500/20'
        };
      case 'info':
      default:
        return {
          icon: Info,
          iconColor: 'text-blue-500',
          iconBg: darkMode ? 'bg-blue-500/10' : 'bg-blue-50',
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
          buttonShadow: 'shadow-blue-500/20'
        };
    }
  };

  const theme = getThemeConfig();
  const Icon = theme.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-md rounded-2xl shadow-2xl transform transition-all scale-100 ${
        darkMode ? 'bg-slate-900 border border-white/10' : 'bg-white'
      }`}>
        
        {/* Header */}
        <div className="p-6 pb-0 flex justify-between items-start">
          <div className={`p-3 rounded-xl ${theme.iconBg}`}>
            <Icon className={`w-6 h-6 ${theme.iconColor}`} />
          </div>
          <button 
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-gray-100 text-gray-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h3>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {message}
          </p>
        </div>

        {/* Footer / Actions */}
        <div className={`p-6 pt-0 flex gap-3 justify-end`}>
          <button
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              darkMode 
                ? 'text-slate-400 hover:bg-white/10 hover:text-white' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 ${theme.buttonBg} ${theme.buttonShadow} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
