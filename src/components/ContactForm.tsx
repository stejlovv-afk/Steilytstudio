import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Mail, Phone, ArrowRight, CheckCircle2, Sparkles, Shield, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';

interface ContactFormProps {
  initialProjectType?: string;
  initialEstimate?: string;
  initialSummary?: string;
  onOpenLegal?: (tab?: 'privacy' | 'terms' | 'consent') => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  initialProjectType,
  initialEstimate,
  initialSummary,
  onOpenLegal,
}) => {
  const [name, setName] = useState('');
  const [telegram, setTelegram] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType || 'Telegram Mini App (TMA)');
  const [comment, setComment] = useState('');
  const [estimate, setEstimate] = useState<string | undefined>(initialEstimate);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialProjectType) setProjectType(initialProjectType);
    if (initialEstimate) setEstimate(initialEstimate);
  }, [initialProjectType, initialEstimate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
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
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white dark:bg-[#080C14] relative overflow-hidden tech-grid border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-cyan-100/30 dark:bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-4 py-1 text-xs font-mono font-bold text-slate-800 dark:text-cyan-400 mb-4 shadow-xs">
            <span>[ ОБСУДИТЬ ПРОЕКТ ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Начните разработку сегодня
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Приступаем к работе без предоплаты. Разрабатываем и присылаем вам итоговый вариант, после чего вы производите оплату.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Agency Info (5 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-5 space-y-6">
            
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-8 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <h3 className="font-display text-lg sm:text-xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3">
                Прямая связь с Team Lead
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 sm:mb-6">
                Предпочитаете быстрый диалог? Напишите нам в Telegram — ответим в течение 10 минут в рабочее время.
              </p>

              <div className="space-y-2.5 sm:space-y-3">
                {/* Telegram Card */}
                <a
                  href="https://t.me/Steilyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-black dark:hover:border-[#00E5FF] hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-black dark:bg-slate-700 text-white dark:text-[#00E5FF] group-hover:bg-[#00B4D8] dark:group-hover:bg-[#00E5FF] group-hover:text-black transition-colors shrink-0">
                      <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">Telegram direct:</span>
                      <span className="text-xs font-black text-slate-950 dark:text-white font-mono">@Steilyt</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-400 group-hover:text-black dark:group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </a>

                {/* WhatsApp Card */}
                <a
                  href="https://wa.me/79990000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-black dark:hover:border-[#00E5FF] hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-black dark:bg-slate-700 text-white dark:text-[#00E5FF] group-hover:bg-[#00B4D8] dark:group-hover:bg-[#00E5FF] group-hover:text-black transition-colors shrink-0">
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">WhatsApp business:</span>
                      <span className="text-xs font-black text-slate-950 dark:text-white font-mono">+7 (999) 000-00-00</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-400 group-hover:text-black dark:group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email Card */}
                <a
                  href="mailto:contact@steilyt.studio"
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-black dark:hover:border-[#00E5FF] hover:bg-white dark:hover:bg-slate-800 active:scale-[0.99] transition-all group min-h-[50px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-black dark:bg-slate-700 text-white dark:text-[#00E5FF] group-hover:bg-[#00B4D8] dark:group-hover:bg-[#00E5FF] group-hover:text-black transition-colors shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 block font-medium">Электронная почта:</span>
                      <span className="text-xs font-black text-slate-950 dark:text-white font-mono">contact@steilyt.studio</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-400 group-hover:text-black dark:group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* SLA / Guarantees Pill Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-emerald-200/80 dark:border-emerald-800/40 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 sm:p-6 space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-emerald-900 dark:text-emerald-300 font-bold">
                <Shield className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>0% предоплаты — оплата строго после сдачи итогового варианта</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Clock className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                <span>Ответ на заявку в течение 10–30 минут</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Shield className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                <span>Официальный договор, закрывающие акты и NDA</span>
              </div>
              <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
                <Sparkles className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                <span>Бесплатная архитектурная схема и смета</span>
              </div>
            </div>

          </ScrollReveal>

          {/* Right Column: Interactive Lead Capture Form (7 cols) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-10 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              
              {submitted ? (
                <div className="py-8 sm:py-12 text-center">
                  <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-black dark:bg-[#00E5FF] text-[#00E5FF] dark:text-black mb-5 sm:mb-6">
                    <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-2">
                    Заявка успешно отправлена!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-6">
                    Наш технический специалист уже получил уведомление и свяжется с вами в Telegram или по телефону в течение 15 минут.
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
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF] shrink-0" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Прикреплен расчет из калькулятора:</span>
                      </div>
                      <span className="font-display text-xs font-black bg-black dark:bg-[#00E5FF] text-white dark:text-black px-2.5 py-1 rounded-lg shrink-0">
                        {estimate}
                      </span>
                    </div>
                  )}

                  {/* Project Type Selector */}
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      Тип проекта:
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-bold text-slate-900 dark:text-white focus:border-black dark:focus:border-[#00E5FF] focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    >
                      <option value="Telegram Mini App (TMA)">Telegram Mini App (TMA)</option>
                      <option value="Корпоративный сайт">Корпоративный сайт / Портал</option>
                      <option value="Конверсионный лендинг">Конверсионный лендинг</option>
                      <option value="Комплекс (Сайт + TMA)">Комплекс: Сайт + Telegram Mini App</option>
                      <option value="Telegram Бот / Автоматизация">Telegram Бот / Интеграция</option>
                    </select>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      Ваше имя или название компании: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Например, Алексей или ООО «Альфа»"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-black dark:focus:border-[#00E5FF] focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                    />
                  </div>

                  {/* 2-col inputs: Telegram + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        Telegram логин: *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-base sm:text-xs text-slate-400 font-mono">@</span>
                        <input
                          type="text"
                          required
                          placeholder="username"
                          value={telegram.replace(/^@/, '')}
                          onChange={(e) => setTelegram(e.target.value)}
                          className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-4 py-3 text-base sm:text-xs font-mono font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-black dark:focus:border-[#00E5FF] focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                        Телефон (для звонка или WhatsApp):
                      </label>
                      <input
                        type="tel"
                        placeholder="+7 (999) 000-00-00"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-mono font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-black dark:focus:border-[#00E5FF] focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Project description textarea */}
                  <div>
                    <label className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 block mb-1.5 sm:mb-2">
                      Краткое описание задачи или пожелания:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Опишите ваш бизнес, цели проекта или дайте ссылку на существующий сайт / референс..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-3 text-base sm:text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-black dark:focus:border-[#00E5FF] focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Prepayment reminder banner */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                    <span className="font-medium text-[11px] leading-snug">
                      <strong className="text-slate-900 dark:text-white">Работаем без аванса:</strong> приступаем к заказу, присылаем итоговый вариант на согласование, после чего берем оплату.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-black dark:bg-[#00E5FF] py-3.5 sm:py-4 text-xs font-black text-white dark:text-black hover:bg-slate-800 dark:hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_25px_rgba(0,229,255,0.25)] disabled:opacity-50 min-h-[50px]"
                  >
                    {loading ? (
                      <span>Отправка данных...</span>
                    ) : (
                      <>
                        <span>Получить смету и консультацию</span>
                        <ArrowRight className="h-4 w-4 stroke-[2.5] text-[#00E5FF] dark:text-black" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                    Нажимая кнопку «Получить смету и консультацию», вы даете согласие на обработку персональных данных в соответствии с{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('privacy')}
                      className="underline hover:text-black dark:hover:text-white transition-colors text-slate-700 dark:text-slate-300 font-medium"
                    >
                      Политикой конфиденциальности (152-ФЗ)
                    </button>{' '}
                    и принимаете условия{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal && onOpenLegal('terms')}
                      className="underline hover:text-black dark:hover:text-white transition-colors text-slate-700 dark:text-slate-300 font-medium"
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
