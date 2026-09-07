import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Send, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Примеры работ', href: '#portfolio' },
    { name: 'Калькулятор', href: '#calculator' },
    { name: 'Этапы', href: '#workflow' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#080C14]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-black dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-4 h-4 border-2 border-[#00E5FF] rotate-45 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#00E5FF]"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-1.5">
              STEILYT<span className="text-[#00B4D8] dark:text-[#00E5FF]">STUDIO</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00B4D8] dark:bg-[#00E5FF] animate-pulse" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 dark:text-slate-400 uppercase -mt-0.5 font-semibold">
              TMA & Web Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 bg-slate-100/90 dark:bg-slate-900/90 px-6 py-2 rounded-full border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          
          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-black dark:hover:border-[#00E5FF] hover:scale-105 active:scale-95 transition-all shadow-xs"
            title={theme === 'dark' ? 'Включить светлую тему' : 'Включить темную тему'}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4 text-slate-700 fill-slate-700/20" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <a
            href="https://t.me/Steilyt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-black dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-xs"
          >
            <Send className="h-3.5 w-3.5 text-[#00B4D8] dark:text-[#00E5FF]" />
            <span>@Steilyt</span>
          </a>

          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 rounded-full bg-black dark:bg-[#00E5FF] px-5 py-2 text-xs font-bold text-white dark:text-black shadow-[0_4px_15px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(0,229,255,0.3)] hover:bg-slate-800 dark:hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Заказать расчет</span>
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#00E5FF] dark:text-black" />
          </button>
        </div>

        {/* Mobile menu and theme toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center min-w-[42px] min-h-[42px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-xs active:scale-95 transition-transform"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center min-w-[42px] min-h-[42px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs active:scale-95 transition-transform"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop and dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[60px] bg-black/60 backdrop-blur-xs z-40 sm:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative z-50 sm:hidden border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-[#080C14]/98 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto"
            >
              <div className="flex flex-col space-y-1 mb-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 active:bg-slate-200 dark:active:bg-slate-800"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  </a>
                ))}
              </div>

              {/* Mobile Theme Switch Button */}
              <div className="pt-3 pb-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Тема оформления:</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 active:scale-95"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-3.5 w-3.5 text-amber-400" />
                      <span>Темная</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-3.5 w-3.5 text-slate-700" />
                      <span>Светлая</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href="https://t.me/Steilyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 min-h-[46px] text-xs font-bold text-slate-800 dark:text-slate-200 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4 text-[#00B4D8] dark:text-[#00E5FF]" />
                  <span>Написать в Telegram (@Steilyt)</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-black dark:bg-[#00E5FF] min-h-[46px] text-xs font-bold text-white dark:text-black shadow-md active:scale-[0.98]"
                >
                  <span>Заказать расчет</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5] text-[#00E5FF] dark:text-black" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
