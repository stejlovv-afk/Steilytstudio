import React, { useState } from 'react';
import { Smartphone, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { servicesData } from '../data/agencyData';
import { ScrollReveal } from './ScrollReveal';

interface ServicesProps {
  onSelectService: (serviceType: 'tma' | 'web') => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [, setHoveredCard] = useState<string | null>(null);

  const tmaService = servicesData.find(s => s.id === 'tma')!;
  const webService = servicesData.find(s => s.id === 'web')!;

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50/70 dark:bg-[#0B101B]/80 relative overflow-hidden border-t border-slate-200/70 dark:border-slate-800/80 transition-colors duration-300">
      
      {/* Background Accent Lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
      <div className="absolute -left-40 top-1/3 w-96 h-96 bg-cyan-100/30 dark:bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 px-4 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-4 shadow-xs">
            <span>Направления разработки</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            Что мы создаем для вас
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Два ключевых инструмента, которые окупаются быстрее всего: удобные приложения в Telegram и продающие сайты.
          </p>
        </ScrollReveal>

        {/* 2-Card Tech Grid with Motion Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1: Telegram Mini Apps (TMA) */}
          <ScrollReveal direction="left" delay={0.1} className="h-full">
            <div 
              id="service-card-tma"
              onMouseEnter={() => setHoveredCard('tma')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-10 shadow-xs transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                    {tmaService.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-3xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3">
                  {tmaService.title}
                </h3>

                {/* Requested Text */}
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed mb-3 sm:mb-4 font-semibold">
                  {tmaService.shortDesc}
                </p>

                {/* Extended Details */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 sm:mb-6">
                  {tmaService.fullDesc}
                </p>

                {/* Feature Points */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {tmaService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800 mb-6 sm:mb-8">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2.5">На чем делаем:</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {tmaService.technologies.map((tech) => (
                      <span key={tech} className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Сроки:</span>
                  <span className="text-xs font-bold text-slate-950 dark:text-white">{tmaService.timeline}</span>
                </div>
                <button
                  onClick={() => onSelectService('tma')}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all min-h-[44px]"
                >
                  <span>Заказать Telegram-сервис</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </ScrollReveal>

          {/* Card 2: Сайты и Лендинги */}
          <ScrollReveal direction="right" delay={0.2} className="h-full">
            <div 
              id="service-card-web"
              onMouseEnter={() => setHoveredCard('web')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-5 sm:p-10 shadow-xs transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shrink-0">
                    <Globe className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/60 px-3.5 py-1 text-xs font-bold text-blue-700 dark:text-blue-300">
                    {webService.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl sm:text-3xl font-black text-slate-950 dark:text-white mb-2 sm:mb-3">
                  {webService.title}
                </h3>

                {/* Requested Text */}
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed mb-3 sm:mb-4 font-semibold">
                  {webService.shortDesc}
                </p>

                {/* Extended Details */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 sm:mb-6">
                  {webService.fullDesc}
                </p>

                {/* Feature Points */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {webService.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-5 sm:pt-6 border-t border-slate-100 dark:border-slate-800 mb-6 sm:mb-8">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2.5">На чем делаем:</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {webService.technologies.map((tech) => (
                      <span key={tech} className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Сроки:</span>
                  <span className="text-xs font-bold text-slate-950 dark:text-white">{webService.timeline}</span>
                </div>
                <button
                  onClick={() => onSelectService('web')}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-5 sm:px-6 py-2.5 sm:py-3 text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-95 transition-all min-h-[44px]"
                >
                  <span>Заказать сайт</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
