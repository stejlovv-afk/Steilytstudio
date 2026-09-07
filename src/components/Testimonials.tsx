import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2, Shield } from 'lucide-react';
import { testimonialsData } from '../data/agencyData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-slate-50/60 dark:bg-[#0A0F1D] relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>Отзывы клиентов</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Что говорят клиенты о нашей работе
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Реальные впечатления предпринимателей и компаний, которые доверили нам разработку.
          </p>
        </div>

        {/* Testimonials Slider Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-12 shadow-xs">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-blue-500/10 pointer-events-none">
              <Quote className="h-10 w-10 sm:h-16 sm:w-16" />
            </div>

            {/* Rating Stars & Verified badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Проект сдан и успешно работает</span>
              </div>
            </div>

            {/* Quote Text */}
            <blockquote className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white leading-relaxed mb-6 sm:mb-8">
              "{current.quote}"
            </blockquote>

            {/* Metric Highlight Pill */}
            <div className="inline-block rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 px-3.5 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 mb-6 sm:mb-8">
              Результат: {current.highlightMetric}
            </div>

            {/* Author Info & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800">
              
              {/* Client Profile */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <img
                  src={current.avatarUrl}
                  alt={current.clientName}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-xs shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-slate-950 dark:text-white">
                    {current.clientName}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {current.clientRole} • <span className="text-blue-600 dark:text-blue-400 font-semibold">{current.company}</span>
                  </p>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                    Услуга: {current.projectType}
                  </span>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <button
                  onClick={prevSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {currentIndex + 1} из {testimonialsData.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* All Reviews Quick Grid (Cards beneath slider) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonialsData.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                currentIndex === idx
                  ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-xs'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={t.avatarUrl}
                  alt={t.clientName}
                  className="h-10 w-10 rounded-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">{t.clientName}</h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{t.company}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
