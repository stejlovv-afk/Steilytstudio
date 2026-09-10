import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Clock, 
  Mail, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadToTelegram } from '../utils/telegramNotifications';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface ContactFormProps {
  initialProjectType?: string;
  initialEstimate?: string;
  initialSummary?: string;
  initialFeatures?: string[];
  initialDesignLevel?: string;
  initialIsExpress?: boolean;
  estimate?: string;
  features?: string[];
  designLevel?: string;
  isExpress?: boolean;
  onOpenLegal?: (type: 'privacy' | 'terms') => void;
  onOpenWarranty?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialProjectType,
  initialEstimate,
  initialSummary,
  initialFeatures,
  initialDesignLevel,
  initialIsExpress,
  estimate: propEstimate,
  features: propFeatures,
  designLevel: propDesignLevel,
  isExpress: propIsExpress,
  onOpenLegal,
  onOpenWarranty,
}) => {
  const estimate = propEstimate || initialEstimate;
  const features = propFeatures || initialFeatures;
  const designLevel = propDesignLevel || initialDesignLevel;
  const isExpress = propIsExpress !== undefined ? propIsExpress : initialIsExpress;
  const { language, t } = useLanguage();
  const isRu = language === 'ru';

  const defaultProjectType = isRu ? 'Telegram Mini App (TMA)' : 'Telegram Mini App (TMA)';
  const [projectType, setProjectType] = useState(initialProjectType || defaultProjectType);
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    }
  }, [initialProjectType]);

  // Phone input formatting (supporting +7 and international format)
  const handlePhoneChange = (val: string) => {
    let digits = val.replace(/\D/g, '');
    if (val.startsWith('+')) {
      if (digits.startsWith('7') || digits.startsWith('8')) {
        let clean = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
        let formatted = '+7';
        if (clean.length > 1) formatted += ' (' + clean.substring(1, 4);
        if (clean.length >= 5) formatted += ') ' + clean.substring(4, 7);
        if (clean.length >= 8) formatted += '-' + clean.substring(7, 9);
        if (clean.length >= 10) formatted += '-' + clean.substring(9, 11);
        setPhone(formatted);
      } else {
        setPhone('+' + digits);
      }
    } else {
      if (digits.startsWith('7') || digits.startsWith('8')) {
        let formatted = '+7';
        if (digits.length > 1) formatted += ' (' + digits.substring(1, 4);
        if (digits.length >= 5) formatted += ') ' + digits.substring(4, 7);
        if (digits.length >= 8) formatted += '-' + digits.substring(7, 9);
        if (digits.length >= 10) formatted += '-' + digits.substring(9, 11);
        setPhone(formatted);
      } else if (digits.length > 0) {
        setPhone('+' + digits);
      } else {
        setPhone('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const result = await sendLeadToTelegram({
      name,
      telegram: `@${telegram.replace(/^@/, '')}`,
      phone: phone || undefined,
      projectType,
      comment: comment || undefined,
      estimate: estimate || undefined,
      summary: initialSummary || undefined,
      features: features || undefined,
      designLevel: designLevel || undefined,
      isExpress: isExpress || undefined,
    });

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      setFallbackUrl(null);
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#000000', '#00E5FF', '#38BDF8']
        });
      } catch {
        // fallback
      }
    } else {
      setErrorMessage(
        isRu 
          ? 'Браузер ограничил прямое подключение. Вы можете продублировать заявку в 1 клик прямо в чат Telegram:'
          : 'Network connection was restricted. You can duplicate your inquiry directly into Telegram chat in 1 click:'
      );
      if (result.fallbackTelegramUrl) {
        setFallbackUrl(result.fallbackTelegramUrl);
      }
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-[#0A0F1D] relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.contact.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Agency Info (5 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-8 shadow-xs">
              <h3 className="font-display text-lg sm:text-xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3">
                {t.contact.directTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                {t.contact.directSubtitle}
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                {/* Telegram Card */}
                <a
                  href="https://t.me/Steilyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors shrink-0 shadow-sm">
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">
                        {t.contact.telegramCardLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">@Steilyt</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Card */}
                <a
                  href="mailto:Steilytstudio@gmail.com"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-800 text-white transition-colors shrink-0 shadow-sm">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">
                        {t.contact.emailCardLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">Steilytstudio@gmail.com</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* SLA / Guarantees Pill Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-emerald-200/80 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-6 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t.contact.guarantee1}</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.contact.guarantee2}</span>
              </div>
              <div className="flex items-center justify-between gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{t.contact.guarantee3}</span>
                </div>
                {onOpenWarranty && (
                  <button
                    type="button"
                    onClick={onOpenWarranty}
                    title="Warranty details"
                    aria-label="Warranty details"
                    className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/80 dark:hover:bg-blue-600 dark:text-blue-300 dark:hover:text-white transition-all transform hover:scale-110 shadow-xs cursor-pointer shrink-0"
                  >
                    <span className="text-[10px] font-black leading-none select-none">!</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{t.contact.guarantee4}</span>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Interactive Lead Capture Form (7 cols) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-10 shadow-xs">
              
              {submitted ? (
                <div className="py-8 sm:py-12 text-center">
                  <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-5 sm:mb-6 shadow-lg shadow-emerald-500/25">
                    <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-2">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    {t.contact.successSubtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <a
                      href="https://t.me/Steilyt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all min-h-[44px]"
                    >
                      <Send className="h-4 w-4" />
                      <span>{t.contact.successWriteTelegramBtn}</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setTelegram('');
                        setPhone('');
                        setComment('');
                      }}
                      className="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 min-h-[44px]"
                    >
                      {t.contact.sendAnotherBtn}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Attached Estimate Banner */}
                  {estimate && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2.5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">{t.contact.calcAttachedPill}:</span>
                        </div>
                        <span className="font-display text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-lg shrink-0 shadow-xs">
                          {estimate}
                        </span>
                      </div>

                      {/* Display Selected Features & Modifiers */}
                      {features && features.length > 0 && (
                        <div className="pt-2 border-t border-blue-200/70 dark:border-blue-900/40">
                          <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <span>{isRu ? `Выбранные опции (${features.length}):` : `Selected options (${features.length}):`}</span>
                            {designLevel && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                                • {designLevel}
                              </span>
                            )}
                            {isExpress && (
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                                • {isRu ? 'Экспресс' : 'Express'}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {features.map((f, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center text-[10px] sm:text-[11px] font-medium bg-white/80 dark:bg-slate-900/70 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded-md border border-blue-200/80 dark:border-blue-800/60"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Type Selector */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      {t.contact.selectedFormatLabel}
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    >
                      <option value="Telegram Mini App (TMA)">Telegram Mini App ({isRu ? 'магазин или сервис в Telegram' : 'in-chat shop or service'})</option>
                      <option value="Корпоративный сайт">{isRu ? 'Сайт компании / Портал с каталогом' : 'Company website / catalog portal'}</option>
                      <option value="Конверсионный лендинг">{isRu ? 'Одностраничный продающий сайт (лендинг)' : 'High-converting landing page'}</option>
                      <option value="Комплекс (Сайт + TMA)">{isRu ? 'Комплекс: Сайт + Telegram Mini App' : 'All-in-One: Website + Telegram App'}</option>
                      <option value="Telegram Бот / Автоматизация">{isRu ? 'Telegram-бот с приемом оплат и уведомлениями' : 'Telegram bot with payments & alerts'}</option>
                    </select>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    />
                  </div>

                  {/* 2-col inputs: Telegram + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        {t.contact.telegramLabel}
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-base sm:text-xs text-slate-400 font-mono">@</span>
                        <input
                          type="text"
                          required
                          placeholder="username"
                          value={telegram.replace(/^@/, '')}
                          onChange={(e) => setTelegram(e.target.value)}
                          className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        {t.contact.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Project description textarea */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      {t.contact.commentLabel}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t.contact.commentPlaceholder}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Prepayment reminder banner */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium text-[11px] leading-snug">
                      {t.contact.zeroPrepayBox}
                    </span>
                  </div>

                  {/* Error Alert if any */}
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span className="font-medium">{errorMessage}</span>
                      </div>
                      {fallbackUrl && (
                        <a
                          href={fallbackUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>{isRu ? 'Открыть чат с @Steilyt и отправить заявку' : 'Open chat with @Steilyt and send inquiry'}</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-700 py-3.5 sm:py-4 text-xs font-bold text-white active:scale-[0.98] transition-all shadow-md shadow-blue-600/20 disabled:opacity-50 min-h-[50px]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>{t.contact.submittingBtn}</span>
                      </span>
                    ) : (
                      <>
                        <span>{t.contact.submitBtn}</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                    {t.contact.legalConsentText}{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('privacy')}
                      className="underline hover:text-blue-600 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {t.footer.privacy}
                    </button>{' '}
                    {isRu ? 'и' : 'and'}{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('terms')}
                      className="underline hover:text-blue-600 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {t.footer.terms}
                    </button>.
                  </p>

                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
