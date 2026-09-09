import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Smartphone, Globe, Shield, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { ScrollReveal } from './ScrollReveal';

interface CalculatorProps {
  onApplyEstimate: (data: {
    projectType: string;
    summary: string;
    estimatedPrice: string;
    features?: string[];
    designLevel?: string;
    isExpress?: boolean;
  }) => void;
}

export const InteractiveCalculator: React.FC<CalculatorProps> = ({ onApplyEstimate }) => {
  const [projectType, setProjectType] = useState<'tma' | 'web' | 'landing' | 'ecosystem'>('tma');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'catalog_payments',
    'telegram_auth'
  ]);
  const [designLevel, setDesignLevel] = useState<'clean' | 'custom3d' | 'exclusive'>('custom3d');
  const [isExpress, setIsExpress] = useState(false);

  // Scaled prices (cut in half: 2x lower)
  const featureDefinitions = [
    {
      id: 'catalog_payments',
      cost: 1750,
      labels: {
        tma: {
          title: 'Каталог товаров и онлайн-оплата в чате',
          desc: 'Витрина с разделами, корзина и моментальная оплата через СБП и карты прямо в Telegram'
        },
        web: {
          title: 'Каталог товаров, корзина и онлайн-оплата',
          desc: 'Полноценная витрина с категориями, фильтрами и безопасным приемом оплат СБП / картами'
        },
        landing: {
          title: 'Блок тарифов и прием онлайн-оплаты',
          desc: 'Прием предоплаты или полной стоимости услуги / бронирования прямо на странице'
        },
        ecosystem: {
          title: 'Синхронный каталог товаров и прием оплат',
          desc: 'Единая база остатков, цен и статусов платежей на сайте и внутри Telegram-бота'
        }
      }
    },
    {
      id: 'telegram_auth',
      cost: 750,
      labels: {
        tma: {
          title: 'Авторизация по Telegram ID (в 1 клик)',
          desc: 'Клиенту не нужно регистрироваться — профиль и контакты подтягиваются автоматически'
        },
        web: {
          title: 'Вход на сайт через Telegram (в 1 клик)',
          desc: 'Без паролей и смс: клиент входит через официальный виджет Telegram в одно касание'
        },
        landing: {
          title: 'Быстрая заявка через Telegram (в 1 клик)',
          desc: 'Контакты клиента передаются мгновенно без необходимости заполнять длинные формы'
        },
        ecosystem: {
          title: 'Единая авторизация через Telegram (Сайт + Бот)',
          desc: 'Один сквозной профиль покупателя, общая корзина и история покупок на сайте и в Telegram'
        }
      }
    },
    {
      id: 'loyalty_bonuses',
      cost: 1250,
      labels: {
        tma: {
          title: 'Программа лояльности и рефералы',
          desc: 'Бонусы за покупки, кешбэк и персональные промокоды за приглашение друзей'
        },
        web: {
          title: 'Система бонусов, скидок и промокодов',
          desc: 'Накопительные баллы покупателя, промокоды для акций и персональные скидки'
        },
        landing: {
          title: 'Генератор промокодов и спецпредложений',
          desc: 'Умные таймеры скидок, промокоды для рекламы и бонусы за быструю заявку'
        },
        ecosystem: {
          title: 'Сквозная программа лояльности (Сайт + Бот)',
          desc: 'Баланс бонусов единый: клиент копит баллы на сайте, а тратит в Telegram или наоборот'
        }
      }
    },
    {
      id: 'crm_1c_sync',
      cost: 2000,
      labels: {
        tma: {
          title: 'Синхронизация с 1С / МойСклад / CRM',
          desc: 'Заказы из Telegram сразу попадают в вашу систему, а остатки и цены обновляются сами'
        },
        web: {
          title: 'Интеграция с 1С / МойСклад / amoCRM / Битрикс',
          desc: 'Автоматическая выгрузка заказов, синхронизация цен, остатков и клиентской базы'
        },
        landing: {
          title: 'Автовыгрузка лидов в CRM (amoCRM / Битрикс24)',
          desc: 'Каждая заявка мгновенно попадает в вашу CRM-систему с фиксацией источника рекламы'
        },
        ecosystem: {
          title: 'Полная интеграция учета (1С, МойСклад, CRM)',
          desc: 'Единый центр управления заказами и остатками для сайта и всех Telegram-ботов'
        }
      }
    },
    {
      id: 'fast_checkout',
      cost: 1250,
      labels: {
        tma: {
          title: 'Заказ в 2 касания (автозаполнение из Telegram)',
          desc: 'Имя, телефон и адрес подставляются сами — покупатель оформляет заказ за 15 секунд'
        },
        web: {
          title: 'Быстрый чекаут в 1 шаг без лишних полей',
          desc: 'Автоподсказки городов и улиц, удобный выбор доставки (СДЭК, Почта, Курьер)'
        },
        landing: {
          title: 'Умная экспресс-форма с автоподстановкой',
          desc: 'Минимум трения: маска телефона, автопроверка данных и максимальная конверсия'
        },
        ecosystem: {
          title: 'Сквозной быстрый заказ на всех устройствах',
          desc: 'Сохраненные адреса и телефоны клиента доступны и на сайте, и в Telegram'
        }
      }
    },
    {
      id: 'ai_bot_assistant',
      cost: 2250,
      labels: {
        tma: {
          title: 'Умный AI-консультант прямо в Telegram',
          desc: 'Отвечает на вопросы о товарах и ценах 24/7 человеческим языком и помогает с выбором'
        },
        web: {
          title: 'Умный AI-консультант / Чат-виджет на сайте',
          desc: 'Консультирует посетителей сайта в любое время суток, снимает возражения и берет контакты'
        },
        landing: {
          title: 'Интерактивный AI-помощник для сайта',
          desc: 'Вовлекает сомневающегося посетителя в диалог и переводит интерес в реальную заявку'
        },
        ecosystem: {
          title: 'Единый AI-ассистент для сайта и Telegram',
          desc: 'Общая база знаний: знает все ваши услуги, регламенты и отвечает клиентам на всех площадках'
        }
      }
    },
    {
      id: 'push_haptics',
      cost: 1000,
      labels: {
        tma: {
          title: 'Push-рассылки акций и приятный виброотклик',
          desc: 'Бесплатные рассылки спецпредложений клиентам и тактильная вибрация кнопок приложения'
        },
        web: {
          title: 'Мгновенные уведомления о заказах в Telegram и SMS',
          desc: 'Звуковое оповещение вам о новом клиенте за 1 сек, а покупателю — смс со статусом'
        },
        landing: {
          title: 'Звуковые оповещения о заявках в ваш Telegram',
          desc: 'Менеджер получает заявку с телефоном клиента мгновенно прямо в личный чат'
        },
        ecosystem: {
          title: 'Push-рассылки клиентам + бот уведомлений вам',
          desc: 'Вы сразу видите заказы в служебном чате, а клиенты получают рассылки в Telegram'
        }
      }
    },
    {
      id: 'seo_analytics',
      cost: 1250,
      labels: {
        tma: {
          title: 'Сквозная аналитика рекламы и каналов в Telegram',
          desc: 'Показывает, с какого рекламного поста, блогера или канала пришли платящие клиенты'
        },
        web: {
          title: 'SEO-оптимизация под Яндекс/Google + Метрика',
          desc: 'Базовая подготовка для выхода в топ поисковиков и настройка целей в Яндекс.Метрике'
        },
        landing: {
          title: 'Готовность к рекламе (Яндекс.Директ) и Метрика',
          desc: 'Настройка целей, пикселей и счетчиков, чтобы реклама окупалась с первых кликов'
        },
        ecosystem: {
          title: 'Комплексная сквозная аналитика (Сайт + Telegram)',
          desc: 'Полный отчет: сколько посетителей пришло с поиска, сколько из Telegram и их окупаемость'
        }
      }
    },
  ];

  // Base prices
  const basePrices: Record<string, number> = {
    tma: 4500,
    web: 6000,
    landing: 3000,
    ecosystem: 9500,
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
    const feat = featureDefinitions.find((f) => f.id === id);
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
      web: 'Сайт компании / Каталог',
      landing: 'Продающий лендинг',
      ecosystem: 'Комплекс (Сайт + Telegram-сервис)'
    };

    const designNames: Record<string, string> = {
      clean: 'Базовый аккуратный (чистый минимализм)',
      custom3d: 'Премиум 3D / Анимации (современный интерактив)',
      exclusive: 'Эксклюзивный Brand-Art (авторский арт-дирекшн)'
    };

    const readableFeatures = selectedFeatures.map((id) => {
      const feat = featureDefinitions.find((f) => f.id === id);
      if (!feat) return id;
      const meta = feat.labels[projectType as keyof typeof feat.labels] || feat.labels.tma;
      return `${meta.title} (+${feat.cost.toLocaleString('ru-RU')} ₽)`;
    });

    onApplyEstimate({
      projectType: typeNames[projectType],
      summary: `Выбранный тип: ${typeNames[projectType]}, Доп. функций: ${selectedFeatures.length} шт, Срок: ~${finalDays} дн.`,
      estimatedPrice: `${finalPrice.toLocaleString('ru-RU')} ₽`,
      features: readableFeatures,
      designLevel: designNames[designLevel],
      isExpress: isExpress,
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
            Выберите формат и нужные опции — формулировки и смета автоматически подстраиваются под ваш бизнес.
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
                    { id: 'tma', label: 'Telegram Mini App', sub: 'Магазин или сервис в Telegram', icon: Smartphone, badge: 'Топ продаж' },
                    { id: 'web', label: 'Сайт компании / Каталог', sub: 'Для доверия и SEO-поиска', icon: Globe, badge: 'Каталог' },
                    { id: 'landing', label: 'Продающий лендинг', sub: 'Быстрый запуск под рекламу', icon: Zap, badge: 'Лидген' },
                    { id: 'ecosystem', label: 'Сайт + Telegram-сервис', sub: 'Двойной охват аудитории', icon: Sparkles, badge: 'Комплекс' },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isSelected = projectType === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setProjectType(t.id as any)}
                        className={`relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all active:scale-[0.98] min-h-[105px] sm:min-h-[120px] ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 rounded bg-slate-200 dark:bg-slate-700/80 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-slate-900 dark:text-white">
                          {t.badge}
                        </span>
                        <div className="flex flex-col items-center pt-1">
                          <Icon className={`h-5 w-5 sm:h-6 sm:w-6 mb-1.5 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`} />
                          <span className="text-[11px] sm:text-xs font-bold leading-tight">{t.label}</span>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight line-clamp-2">
                          {t.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Features checklist */}
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block">
                    2. Нужные функции и возможности:
                  </label>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                    Названия адаптированы под {projectType === 'tma' ? 'Telegram' : projectType === 'web' ? 'Сайт' : projectType === 'landing' ? 'Лендинг' : 'Комплекс'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {featureDefinitions.map((feat) => {
                    const isChecked = selectedFeatures.includes(feat.id);
                    const currentMeta = feat.labels[projectType as keyof typeof feat.labels] || feat.labels.tma;

                    return (
                      <div
                        key={feat.id}
                        onClick={() => toggleFeature(feat.id)}
                        className={`flex items-start justify-between p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all active:scale-[0.99] min-h-[64px] ${
                          isChecked
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-xs ring-1 ring-blue-600/30'
                            : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3 pr-2">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all mt-0.5 ${
                              isChecked
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block leading-tight">
                              {currentMeta.title}
                            </span>
                            <span className="text-[10.5px] sm:text-[11px] text-slate-500 dark:text-slate-400 block mt-1 leading-snug">
                              {currentMeta.desc}
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 shrink-0 ml-1.5 mt-0.5">
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
