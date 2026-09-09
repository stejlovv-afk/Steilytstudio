import React from 'react';
import { Send, MessageCircle, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms?: () => void;
  onOpenWarranty?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onOpenWarranty }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 dark:bg-[#05080E] border-t border-slate-800 text-gray-400 text-xs relative overflow-hidden transition-colors duration-300">
      
      {/* Top Subtle Line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Col 1: Logo & Agency Bio (4 cols) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer" onClick={scrollToTop}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-black text-lg shadow-md shadow-blue-600/25">
                S
              </div>
              <div className="flex flex-col">
                <span className="font-display text-base font-black text-white tracking-tight flex items-center gap-1.5">
                  STEILYT STUDIO
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
                  Сайты и Telegram-приложения
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed mb-6 max-w-sm">
              Создаем сайты, лендинги и Telegram Mini Apps для бизнеса. Работаем без предоплаты: сначала делаем и согласуем результат, потом оплата.
            </p>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-bold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Принимаем новые проекты
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Разделы сайта
            </h4>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">Что мы делаем</a></li>
              <li><a href="#advantages" className="hover:text-white transition-colors">Преимущества</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Примеры работ</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Калькулятор цены</a></li>
              <li><a href="#workflow" className="hover:text-white transition-colors">Этапы работы</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Оставить заявку</a></li>
            </ul>
          </div>

          {/* Col 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Услуги
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Telegram Mini Apps под ключ</li>
              <li className="text-gray-300">Сайты компаний и каталоги</li>
              <li className="text-gray-300">Продающие одностраничники (лендинги)</li>
              <li className="text-gray-300">Подключение оплаты (СБП, карты)</li>
              <li className="text-gray-300">Интеграция с CRM и 1С</li>
              <li className="text-gray-300 flex items-center gap-1.5">
                <span>Гарантия 12 месяцев и поддержка</span>
                {onOpenWarranty && (
                  <button
                    type="button"
                    onClick={onOpenWarranty}
                    title="Нажмите, чтобы узнать, что входит в гарантию"
                    aria-label="Что входит в гарантию"
                    className="inline-flex items-center justify-center h-3.5 w-3.5 rounded-full bg-blue-500/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-400/30 transition-all transform hover:scale-110 shadow-xs cursor-pointer shrink-0"
                  >
                    <span className="text-[9px] font-black leading-none select-none">!</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

          {/* Col 4: Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Контакты
            </h4>
            
            <div className="space-y-2.5 sm:space-y-3">
              {/* Telegram Link */}
              <a
                href="https://t.me/Steilyt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 min-h-[44px] text-white hover:border-blue-500 hover:bg-white/10 transition-all group"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 shrink-0">
                  <Send className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Telegram:</span>
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    @Steilyt
                  </span>
                </div>
              </a>

              {/* Email Link */}
              <a
                href="mailto:steilytstudio@gmail.com"
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 min-h-[44px] text-white hover:border-blue-500 hover:bg-white/10 transition-all group"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700 text-slate-300 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block font-medium">Email:</span>
                  <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                    steilytstudio@gmail.com
                  </span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-8 border-t border-slate-900 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Steilyt Studio. Все права защищены.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3.5 sm:gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline underline-offset-4 py-1"
            >
              Политика конфиденциальности (152-ФЗ)
            </button>

            <button
              onClick={onOpenTerms || onOpenPrivacy}
              className="hover:text-white transition-colors underline underline-offset-4 py-1"
            >
              Пользовательское соглашение
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 px-3 py-2 text-white transition-all group min-h-[36px]"
            >
              <span>Наверх</span>
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
