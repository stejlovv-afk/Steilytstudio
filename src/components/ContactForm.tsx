import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Mail, ArrowRight, CheckCircle2, Sparkles, Shield, Clock, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';
import { sendLeadToTelegram } from '../utils/telegramNotifications';

interface ContactFormProps {
  initialProjectType?: string;
  initialEstimate?: string;
  initialSummary?: string;
  initialFeatures?: string[];
  initialDesignLevel?: string;
  initialIsExpress?: boolean;
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'consent') => void;
  onOpenWarranty?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialProjectType,
  initialEstimate,
  initialSummary,
  initialFeatures,
  initialDesignLevel,
  initialIsExpress,
  onOpenLegal,
  onOpenWarranty,
}) => {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || 'Telegram Mini App (TMA)');
  const [comment, setComment] = useState('');
  const [estimate, setEstimate] = useState<string | undefined>(initialEstimate);
  const [summary, setSummary] = useState<string | undefined>(initialSummary);
  const [features, setFeatures] = useState<string[] | undefined>(initialFeatures);
  const [designLevel, setDesignLevel] = useState<string | undefined>(initialDesignLevel);
  const [isExpress, setIsExpress] = useState<boolean | undefined>(initialIsExpress);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  // Phone input sanitizer & formatter (strict digits, spaces, parentheses, plus, hyphens)
  const handlePhoneChange = (rawValue: string) => {
    // Extract only digits and leading plus
    let clean = rawValue.replace(/[^\d+]/g, '');
    
    // Ensure plus is only at the beginning if present
    if (clean.indexOf('+') > 0) {
      clean = clean.replace(/\+/g, '');
      clean = '+' + clean;
    }

    // Format if starts with 7 or 8 or +7
    const digits = clean.replace(/\D/g, '');
    if (digits.length === 0) {
      setPhone('');
      return;
    }

    // Friendly phone mask if Russian/CIS format
    if (digits.startsWith('7') || digits.startsWith('8')) {
      const national = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1, 11) : digits.slice(0, 10);
      let formatted = '+7 ';
      if (national.length > 0) {
        formatted += `(${national.slice(0, 3)}`;
      }
      if (national.length >= 3) {
        formatted += `) ${national.slice(3, 6)}`;
      }
      if (national.length >= 6) {
        formatted += `-${national.slice(6, 8)}`;
      }
      if (national.length >= 8) {
        formatted += `-${national.slice(8, 10)}`;
      }
      setPhone(formatted);
    } else {
      // International or other country codes: keep clean plus and digits only, limit to 16 chars
      const formatted = clean.startsWith('+') ? '+' + digits.slice(0, 15) : '+' + digits.slice(0, 15);
      setPhone(formatted);
    }
  };

  useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
    if (initialEstimate) setEstimate(initialEstimate);
    if (initialSummary) setSummary(initialSummary);
    if (initialFeatures) setFeatures(initialFeatures);
    if (initialDesignLevel) setDesignLevel(initialDesignLevel);
    if (initialIsExpress !== undefined) setIsExpress(initialIsExpress);
  }, [initialProjectType, initialEstimate, initialSummary, initialFeatures, initialDesignLevel, initialIsExpress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const result = await sendLeadToTelegram({
      name,
      telegram,
      phone,
      projectType,
      estimate,
      summary,
      features,
      designLevel,
      isExpress,
      comment,
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
        'Браузер ограничил прямое подключение к Telegram API. Вы можете продублировать заявку в 1 клик прямо в чат Telegram:'
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
            <span>Обсудить проект</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Начните проект уже сегодня
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Мы работаем без предоплаты: создаем и демонстрируем вам итоговый результат, и только после вашего одобрения вы производите оплату.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Agency Info (5 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-8 shadow-xs">
              <h3 className="font-display text-lg sm:text-xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3">
                Быстрая связь напрямую
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                Напишите нам в Telegram — ответим в течение 10–15 минут, подскажем лучшее решение и рассчитаем точную стоимость.
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
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">Telegram (основной канал):</span>
                      <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">@Steilyt</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Card */}
                <a
                  href="mailto:steilytstudio@gmail.com"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-blue-500 hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-800 text-white transition-colors shrink-0 shadow-sm">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">Электронная почта:</span>
                      <span className="text-xs font-bold text-slate-950 dark:text-white font-mono">steilytstudio@gmail.com</span>
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
                <span>0% предоплаты — оплата только после сдачи работы</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Быстрый ответ в течение 10–15 минут</span>
              </div>
              <div className="flex items-center justify-between gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Официальный договор, акты и гарантия 12 месяцев</span>
                </div>
                {onOpenWarranty && (
                  <button
                    type="button"
                    onClick={onOpenWarranty}
                    title="Нажмите, чтобы узнать, что входит в гарантию"
                    aria-label="Что входит в гарантию"
                    className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/80 dark:hover:bg-blue-600 dark:text-blue-300 dark:hover:text-white transition-all transform hover:scale-110 shadow-xs cursor-pointer shrink-0"
                  >
                    <span className="text-[10px] font-black leading-none select-none">!</span>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Бесплатная консультация и расчет стоимости</span>
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
                    Заявка успешно отправлена!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    Мы уже получили вашу заявку и напишем вам в Telegram или позвоним в течение 15 минут.
                  </p>
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
                    Отправить еще одну заявку
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  {/* Attached Estimate Banner (if applied from calculator) */}
                  {estimate && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-2.5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Прикреплен расчет из калькулятора:</span>
                        </div>
                        <span className="font-display text-xs font-bold bg-blue-600 text-white px-2.5 py-1 rounded-lg shrink-0 shadow-xs">
                          {estimate}
                        </span>
                      </div>

                      {/* Display Selected Features & Modifiers */}
                      {features && features.length > 0 && (
                        <div className="pt-2 border-t border-blue-200/70 dark:border-blue-900/40">
                          <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <span>Выбранные функции ({features.length}):</span>
                            {designLevel && (
                              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                                • {designLevel}
                              </span>
                            )}
                            {isExpress && (
                              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                                • Экспресс
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
                      Что вы хотите разработать:
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    >
                      <option value="Telegram Mini App (TMA)">Telegram Mini App (магазин, каталог или сервис в Telegram)</option>
                      <option value="Корпоративный сайт">Сайт компании / Портал с каталогом</option>
                      <option value="Конверсионный лендинг">Одностраничный продающий сайт (лендинг)</option>
                      <option value="Комплекс (Сайт + TMA)">Комплекс: Сайт + Telegram Mini App</option>
                      <option value="Telegram Бот / Автоматизация">Telegram-бот с приемом оплат и уведомлениями</option>
                    </select>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      Как вас зовут или название компании: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например, Алексей или Магазин цветов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    />
                  </div>

                  {/* 2-col inputs: Telegram + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        Ваш Telegram: *
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
                        Телефон (для связи):
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        onKeyDown={(e) => {
                          // Allow navigation keys, backspace, delete, tab, enter, and numbers
                          const allowedKeys = [
                            'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Home', 'End'
                          ];
                          if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
                            return;
                          }
                          // Only digits and leading + are allowed
                          if (!/[\d+]/.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Project description textarea */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      Кратко о задаче или пожелания:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Чем занимается ваш бизнес, какие разделы нужны или ссылка на пример, который нравится..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Prepayment reminder banner */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium text-[11px] leading-snug">
                      <strong className="text-slate-900 dark:text-white">Работаем без аванса:</strong> приступаем к заказу, присылаем итоговый вариант на согласование, после чего берем оплату.
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
                          <span>Открыть чат с @Steilyt и отправить заявку</span>
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
                        <span>Отправка в Telegram...</span>
                      </span>
                    ) : (
                      <>
                        <span>Получить смету и консультацию</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                    Нажимая кнопку «Получить смету и консультацию», вы даете согласие на обработку персональных данных в соответствии с{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('privacy')}
                      className="underline hover:text-blue-600 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Политикой конфиденциальности (152-ФЗ)
                    </button>{' '}
                    и принимаете условия{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('terms')}
                      className="underline hover:text-blue-600 transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Пользовательского соглашения
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
