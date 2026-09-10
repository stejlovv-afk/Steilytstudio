import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Send, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onOpenCalculator: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

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
    { name: t.nav.services, href: '#services' },
    { name: t.nav.advantages, href: '#advantages' },
    { name: t.nav.portfolio, href: '#portfolio' },
    { name: t.nav.calculator, href: '#calculator' },
    { name: t.nav.workflow, href: '#workflow' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#0A0F1D]/95 backdrop-blur-xl border-b border-slate-200/90 dark:border-slate-800/90 py-3 shadow-xs dark:shadow-[0_4px_25px_rgba(0,0,0,0.4)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300 font-black text-sm">
            ST
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-tight text-slate-950 dark:text-white uppercase flex items-center gap-1.5">
              STEILYT<span className="text-blue-600 dark:text-blue-400">STUDIO</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" title={t.nav.availableBadge} />
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase -mt-0.5">
              {t.nav.subLogo}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 bg-slate-100/90 dark:bg-slate-900/90 px-6 py-2 rounded-full border border-slate-200/90 dark:border-slate-800/90 backdrop-blur-md shadow-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons, Language & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2">
          
          {/* Language Switcher Button (Desktop) */}
          <button
            id="language-toggle-button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95 transition-all shadow-xs text-xs font-bold"
            title={t.nav.langSwitchTitle}
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">{language === 'ru' ? 'RU' : 'EN'}</span>
            <span className="text-[10px] text-slate-400 font-normal">/ {language === 'ru' ? 'EN' : 'RU'}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:border-blue-500 hover:scale-105 active:scale-95 transition-all shadow-xs"
            title={theme === 'dark' ? t.nav.themeToggleLight : t.nav.themeToggleDark}
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
            className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-xs"
          >
            <Send className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>@Steilyt</span>
          </a>

          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
          >
            <span>{t.nav.calculateCost}</span>
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile menu, language and theme toggle */}
        <div className="flex items-center gap-1.5 sm:hidden">
          {/* Mobile Language button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 h-[42px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-extrabold shadow-xs active:scale-95 transition-transform"
            aria-label="Toggle language"
            title={t.nav.langSwitchTitle}
          >
            <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>{language.toUpperCase()}</span>
          </button>

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

              {/* Mobile Language & Theme Row */}
              <div className="pt-3 pb-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Язык / Language:</span>
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 active:scale-95"
                  >
                    <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{language === 'ru' ? '🇷🇺 Русский (RU)' : '🇬🇧 English (EN)'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{language === 'ru' ? 'Тема оформления:' : 'Theme appearance:'}</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 active:scale-95"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-3.5 w-3.5 text-amber-400" />
                        <span>{language === 'ru' ? 'Темная' : 'Dark'}</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5 text-slate-700" />
                        <span>{language === 'ru' ? 'Светлая' : 'Light'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <a
                  href="https://t.me/Steilyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 min-h-[46px] text-xs font-bold text-slate-800 dark:text-slate-200 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span>{t.nav.writeTelegram} (@Steilyt)</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCalculator();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 min-h-[46px] text-xs font-bold text-white shadow-md shadow-blue-600/20 active:scale-[0.98]"
                >
                  <span>{t.nav.calculateCost}</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
