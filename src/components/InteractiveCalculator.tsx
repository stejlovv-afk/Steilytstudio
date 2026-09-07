import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Smartphone, Globe, Shield, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';

interface CalculatorProps {
  onApplyEstimate: (data: { projectType: string; summary: string; estimatedPrice: string }) => void;
}

export const InteractiveCalculator: React.FC<CalculatorProps> = ({ onApplyEstimate }) => {
  const [projectType, setProjectType] = useState<'tma' | 'web' | 'landing' | 'ecosystem'>('tma');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'catalog_payments',
    'telegram_auth'
  ]);
  const [designLevel, setDesignLevel] = useState<'clean' | 'custom3d' | 'exclusive'>('custom3d');
  const [isExpress, setIsExpress] = useState(false);

  // Scaled prices
  const featureOptions = [
    { id: 'catalog_payments', label: 'Каталог товаров и онлайн-оплата (СБП, Карты)', cost: 3500, forTma: true, forWeb: true },
    { id: 'telegram_auth', label: 'Бесшовная авторизация в 1 клик через Telegram', cost: 1500, forTma: true, forWeb: false },
    { id: 'loyalty_bonuses', label: 'Программа лояльности, бонусы и рефералы', cost: 2500, forTma: true, forWeb: true },
    { id: 'crm_1c_sync', label: 'Синхронизация с 1C / МойСклад / amoCRM / Bitrix24', cost: 4000, forTma: true, forWeb: true },
    { id: 'fast_checkout', label: 'Быстрый чекаут и автозаполнение адреса/телефона', cost: 2500, forTma: true, forWeb: false },
    { id: 'ai_bot_assistant', label: 'AI-ассистент / Консультант в чате на базе LLM', cost: 4500, forTma: true, forWeb: true },
    { id: 'push_haptics', label: 'Push-уведомления и Haptic Feedback (виброотклик)', cost: 2000, forTma: true, forWeb: false },
    { id: 'seo_analytics', label: 'Глубокая SEO-оптимизация и сквозная аналитика', cost: 2500, forTma: false, forWeb: true },
  ];

  // Base prices
  const basePrices: Record<string, number> = {
    tma: 9000,
    web: 12000,
    landing: 6000,
    ecosystem: 19000,
  };

  const baseTimelines: Record<string, number> = {
    tma: 14,
    web: 18,
    landing: 10,
    ecosystem: 25,
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate pricing
  const baseCost = basePrices[projectType];
  const featuresCost = selectedFeatures.reduce((sum, id) => {
    const feat = featureOptions.find((f) => f.id === id);
    return sum + (feat ? feat.cost : 0);
  }, 0);

  const designMultiplier = designLevel === 'clean' ? 1.0 : designLevel === 'custom3d' ? 1.25 : 1.5;
  const rawTotal = Math.round((baseCost + featuresCost) * designMultiplier);
  const finalPrice = isExpress ? Math.round(rawTotal * 1.2) : rawTotal;

  const baseDays = baseTimelines[projectType] + Math.round(selectedFeatures.length * 1.5);
  const finalDays = isExpress ? Math.max(10, Math.round(baseDays * 0.65)) : baseDays;

  const handleFixEstimate = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981']
      });
    } catch {
      // fallback
    }

    const typeNames: Record<string, string> = {
      tma: 'Telegram Mini App (TMA)',
      web: 'Корпоративный сайт',
      landing: 'Конверсионный лендинг',
      ecosystem: 'Комплекс (Сайт + TMA)'
    };

    onApplyEstimate({
      projectType: typeNames[projectType],
      summary: `Выбранный тип: ${typeNames[projectType]}, Доп. функций: ${selectedFeatures.length} шт, Срок: ~${finalDays} дн.`,
      estimatedPrice: `${finalPrice.toLocaleString('ru-RU')} ₽`
    });

    // Scroll to contact
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-white dark:bg-[#0A0F1D] relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>Онлайн-калькулятор</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Калькулятор стоимости и сроков
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Выберите то, что нужно вашему бизнесу, и узнайте ориентировочную стоимость и срок за 1 минуту.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Matrix (8 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-8">
            <div className="space-y-6 sm:space-y-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-10 shadow-xs">
              
              {/* Step 1: Type selection */}
              <div>
                <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-2.5 sm:mb-3">
                  1. Что требуется разработать:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { id: 'tma', label: 'Telegram Mini App', icon: Smartphone, badge: 'Популярно' },
                    { id: 'web', label: 'Сайт компании / Каталог', icon: Globe, badge: 'Для SEO' },
                    { id: 'landing', label: 'Продающий лендинг', icon: Zap, badge: 'Быстро' },
                    { id: 'ecosystem', label: 'Сайт + Telegram-сервис', icon: Sparkles, badge: 'Комплекс' },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isSelected = projectType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setProjectType(t.id as any)}
                        className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all active:scale-[0.98] min-h-[90px] sm:min-h-[105px] ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 rounded bg-slate-200 dark:bg-slate-700/80 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-slate-900 dark:text-white">
                          {t.badge}
                        </span>
                        <Icon className={`h-5 w-5 sm:h-6 sm:w-6 mb-1.5 sm:mb-2 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                        <span className="text-[11px] sm:text-xs font-bold leading-tight">{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Features checklist */}
              <div>
                <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-2.5 sm:mb-3">
                  2. Нужные функции и возможности:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {featureOptions.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat.id);
                    return (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all active:scale-[0.99] min-h-[48px] ${
                          isChecked
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-xs'
                            : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 pr-2">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                              isChecked
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                            {feat.label}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0">
                          +{feat.cost.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Design fidelity */}
              <div>
                <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-2.5 sm:mb-3">
                  3. Дизайн и оформление:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { id: 'clean', label: 'Чистый и удобный', sub: 'Классический минимализм, быстрый запуск', mult: 'x1.0' },
                    { id: 'custom3d', label: 'Индивидуальный стиль', sub: 'Фирменные цвета, анимации и проработка', mult: 'x1.25' },
                    { id: 'exclusive', label: 'Эксклюзив под ключ', sub: 'Авторский арт-дизайн, сложные визуальные элементы', mult: 'x1.5' },
                  ].map((d) => {
                    const isSelected = designLevel === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setDesignLevel(d.id as any)}
                        className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left transition-all active:scale-[0.99] ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-white shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold">{d.label}</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isSelected ? 'bg-blue-600 text-white font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                            {d.mult}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-tight">{d.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Express option */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="text-xs font-bold text-slate-950 dark:text-white">Срочная разработка (+35% к скорости сдачи)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Выделенная команда начинает разработку в день обращения вне очереди.
                  </p>
                </div>
                <button
                  onClick={() => setIsExpress(!isExpress)}
                  aria-label="Включить экспресс-запуск"
                  className={`h-7 w-12 shrink-0 rounded-full p-1 transition-colors ${
                    isExpress ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-white transition-transform ${
                      isExpress ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          </ScrollReveal>

          {/* Pricing Summary Card (4 cols) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-2xl sm:rounded-3xl border border-blue-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  Предварительный расчет
                </span>
                <h3 className="font-display text-xl font-black text-white mb-6">
                  Итоговая смета
                </h3>

                {/* Big Price Display */}
                <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-300 block mb-1">Ориентировочная стоимость:</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                    <span>{finalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <span className="text-[11px] text-blue-400 font-medium block mt-1">
                    * точная сумма фиксируется в договоре
                  </span>
                </div>

                {/* Prepayment Guarantee Pill */}
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] text-emerald-300 font-bold leading-tight">
                    0% предоплаты • Оплата только после того, как вы увидите и утвердите готовый сайт
                  </span>
                </div>

                {/* Timeline display */}
                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs">
                  <span className="text-slate-300">Срок выполнения:</span>
                  <span className="font-bold text-white">~ {finalDays} рабочих дней</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs">
                  <span className="text-slate-300">Кол-во выбранных опций:</span>
                  <span className="font-bold text-white">{selectedFeatures.length}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs mb-6">
                  <span className="text-slate-300">Гарантия и поддержка:</span>
                  <span className="font-bold text-emerald-400">12 месяцев бесплатно</span>
                </div>

                {/* Action CTA Button */}
                <button
                  id="apply-estimate-button"
                  onClick={handleFixEstimate}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-4 text-xs font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-600/30 mb-3"
                >
                  <span>Закрепить расчет в заявке</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </button>

                <p className="text-[10px] text-slate-400 text-center leading-tight">
                  Перенесет данные в форму заявки внизу страницы.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
