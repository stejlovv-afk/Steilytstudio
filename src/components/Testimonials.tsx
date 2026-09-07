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
    <section id="testimonials" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#151515] px-4 py-1 text-xs font-mono text-[#00E5FF] mb-4">
            <span>[ ОТЗЫВЫ КЛИЕНТОВ ]</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Что говорят партнеры о сотрудничестве
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Опыт внедрения Telegram Mini Apps и цифровых решений в бизнес.
          </p>
        </div>

        {/* Testimonials Slider Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl border border-white/5 bg-[#151515] p-5 sm:p-12 shadow-2xl">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 text-[#00E5FF]/10 pointer-events-none">
              <Quote className="h-10 w-10 sm:h-16 sm:w-16" />
            </div>

            {/* Rating Stars & Verified badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3 sm:px-3.5 py-1 text-[11px] sm:text-xs font-bold text-[#00E5FF]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Проект сдан и работает в проде</span>
              </div>
            </div>

            {/* Quote Text */}
            <blockquote className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-relaxed mb-6 sm:mb-8">
              "{current.quote}"
            </blockquote>

            {/* Metric Highlight Pill */}
            <div className="inline-block rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3.5 py-1.5 text-xs font-bold text-[#00E5FF] mb-6 sm:mb-8 font-mono">
              Результат: {current.highlightMetric}
            </div>

            {/* Author Info & Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 pt-5 sm:pt-6 border-t border-white/5">
              
              {/* Client Profile */}
              <div className="flex items-center gap-3.5 sm:gap-4">
                <img
                  src={current.avatarUrl}
                  alt={current.clientName}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover border border-white/10 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white">
                    {current.clientName}
                  </h4>
                  <p className="text-xs text-gray-300">
                    {current.clientRole} • <span className="text-[#00E5FF] font-semibold">{current.company}</span>
                  </p>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Услуга: {current.projectType}
                  </span>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                <button
                  onClick={prevSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF] active:scale-95 transition-all touch-manipulation"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-mono text-xs text-gray-400">
                  0{currentIndex + 1} / 0{testimonialsData.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF] active:scale-95 transition-all touch-manipulation"
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
                  ? 'border-[#00E5FF]/60 bg-[#151515]'
                  : 'border-white/5 bg-[#151515] hover:border-white/20'
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
                  <h5 className="text-xs font-bold text-white">{t.clientName}</h5>
                  <p className="text-[10px] text-gray-400">{t.company}</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 line-clamp-2">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
