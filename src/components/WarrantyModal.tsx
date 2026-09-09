import React, { useEffect } from 'react';
import { ShieldCheck, Check, X, AlertCircle, Sparkles, X as CloseIcon, Clock, Headphones } from 'lucide-react';

interface WarrantyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WarrantyModal: React.FC<WarrantyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-5 sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="warranty-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть модальное окно"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 sm:mb-6 pr-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shrink-0 shadow-lg shadow-emerald-500/20">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Официальная гарантия Steilyt Studio</span>
            </div>
            <h2 id="warranty-modal-title" className="font-display text-lg sm:text-2xl font-black text-slate-950 dark:text-white">
              Что входит в 12 месяцев гарантии?
            </h2>
          </div>
        </div>

        {/* Intro */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Мы полностью отвечаем за качество нашей разработки. После сдачи проекта вы не остаетесь один на один с кодом — на протяжении 12 месяцев мы обеспечиваем непрерывную работоспособность вашего сайта или Telegram-сервиса.
        </p>

        {/* Two Columns: What's Included vs What's Not Included */}
        <div className="space-y-4 mb-6">
          {/* Column 1: Included */}
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-2 mb-3">
              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
              <span>Бесплатно входит в гарантию (12 месяцев):</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Бесперебойная работа:</strong> контроль доступности сайта 24/7, работа всех кнопок, форм, корзин и каталогов.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Доставка заявок:</strong> гарантия мгновенной отправки лидов в ваш Telegram без сбоев.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Исправление скрытых дефектов:</strong> бесплатное устранение любых версточных или технических багов на любых смартфонах и ПК.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>SSL и безопасность:</strong> продление безопасного протокола HTTPS (зеленый замочек) и защита от взлома.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                <span><strong>Личный чат поддержки:</strong> прямые ответы на вопросы по управлению сайтом в Telegram в течение дня.</span>
              </li>
            </ul>
          </div>

          {/* Column 2: What's Not Included (Separate order) */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Оплачивается отдельно (дополнительные задачи):</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                <span>Создание новых страниц, дополнительных разделов или новых сложных калькуляторов.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                <span>Полный редизайн или глобальная смена фирменного стиля компании.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                <span>Восстановление сайта после вмешательства сторонних разработчиков или изменения кода третьими лицами.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Contacts Footer in Modal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Время реакции поддержки: от 15 минут</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20"
          >
            Понятно, спасибо
          </button>
        </div>
      </div>
    </div>
  );
};
