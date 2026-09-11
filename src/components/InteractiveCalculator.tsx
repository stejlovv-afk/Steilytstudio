import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles, Smartphone, Globe, Shield, Clock, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { fireConfetti } from '../utils/confetti';
import { ScrollReveal } from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

interface CalculatorProps {
  onApplyEstimate: (data: {
    projectType: string;
    summary: string;
    estimatedPrice: string;
    features?: string[];
    designLevel?: string;
    isExpress?: boolean;
  }) => void;
  onOpenWarranty?: () => void;
}

export const InteractiveCalculator: React.FC<CalculatorProps> = ({ onApplyEstimate, onOpenWarranty }) => {
  const [projectType, setProjectType] = useState<'tma' | 'web' | 'landing' | 'ecosystem'>('tma');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'catalog_payments',
    'telegram_auth'
  ]);
  const [designLevel, setDesignLevel] = useState<'clean' | 'custom3d' | 'exclusive'>('custom3d');
  const [isExpress, setIsExpress] = useState(false);
  const { language, t } = useLanguage();

  const isRu = language === 'ru';
  const currencySymbol = isRu ? '₽' : '$';
  const priceDivider = isRu ? 1 : 90; // Currency conversion for EN display if desired, or keep RUB formatted

  const formatPrice = (valInRub: number) => {
    if (isRu) {
      return `${valInRub.toLocaleString('ru-RU')} ₽`;
    }
    const inUsd = Math.round(valInRub / 85);
    return `$${inUsd.toLocaleString('en-US')}`;
  };

  // Scaled feature definitions with localized texts
  const featureDefinitions = [
    {
      id: 'catalog_payments',
      cost: 1750,
      labels: {
        tma: {
          title: isRu ? 'Каталог товаров и онлайн-оплата в чате' : 'Product catalog & in-chat payments',
          desc: isRu ? 'Витрина с разделами, корзина и моментальная оплата через СБП и карты прямо в Telegram' : 'Categorized shop, shopping cart, and 1-tap checkout directly inside Telegram'
        },
        web: {
          title: isRu ? 'Каталог товаров, корзина и онлайн-оплата' : 'E-commerce catalog, cart & checkout',
          desc: isRu ? 'Полноценная витрина с категориями, фильтрами и безопасным приемом оплат картами' : 'Full-fledged store with categories, filters, and secure online credit card processing'
        },
        landing: {
          title: isRu ? 'Блок тарифов и прием онлайн-оплаты' : 'Pricing table & instant deposit checkout',
          desc: isRu ? 'Прием предоплаты или полной стоимости услуги / бронирования прямо на странице' : 'Collect booking deposits or full service fees directly on the landing page'
        },
        ecosystem: {
          title: isRu ? 'Синхронный каталог товаров и прием оплат' : 'Synchronized cross-platform catalog',
          desc: isRu ? 'Единая база остатков, цен и статусов платежей на сайте и внутри Telegram-бота' : 'Single inventory and pricing database synced across the website and Telegram bot'
        }
      }
    },
    {
      id: 'telegram_auth',
      cost: 750,
      labels: {
        tma: {
          title: isRu ? 'Авторизация по Telegram ID (в 1 клик)' : '1-Click Telegram ID authentication',
          desc: isRu ? 'Клиенту не нужно регистрироваться — профиль и контакты подтягиваются автоматически' : 'Zero manual sign-up — user profile and phone are pulled automatically'
        },
        web: {
          title: isRu ? 'Вход на сайт через Telegram (в 1 клик)' : 'Telegram Login widget for website',
          desc: isRu ? 'Без паролей и смс: клиент входит через официальный виджет Telegram в одно касание' : 'No passwords or SMS: visitor signs in with official Telegram widget in 1 tap'
        },
        landing: {
          title: isRu ? 'Быстрая заявка через Telegram (в 1 клик)' : '1-Click Telegram inquiry submission',
          desc: isRu ? 'Контакты клиента передаются мгновенно без необходимости заполнять длинные формы' : 'Client contacts are passed instantly without filling tedious form inputs'
        },
        ecosystem: {
          title: isRu ? 'Единая авторизация через Telegram (Сайт + Бот)' : 'Single Telegram SSO (Web + Bot)',
          desc: isRu ? 'Один сквозной профиль покупателя, общая корзина и история покупок на сайте и в Telegram' : 'Unified customer profile, persistent cart, and order history across Web and Telegram'
        }
      }
    },
    {
      id: 'loyalty_bonuses',
      cost: 1250,
      labels: {
        tma: {
          title: isRu ? 'Программа лояльности и рефералы' : 'Loyalty program & referral rewards',
          desc: isRu ? 'Бонусы за покупки, кешбэк и персональные промокоды за приглашение друзей' : 'Cashback on purchases, bonus points, and personalized promo codes for inviting friends'
        },
        web: {
          title: isRu ? 'Система бонусов, скидок и промокодов' : 'Promo codes & customer bonus points',
          desc: isRu ? 'Накопительные баллы покупателя, промокоды для акций и персональные скидки' : 'Points wallet, promo code engine for marketing campaigns, and tiered discounts'
        },
        landing: {
          title: isRu ? 'Генератор промокодов и спецпредложений' : 'Dynamic discount & promo generator',
          desc: isRu ? 'Умные таймеры скидок, промокоды для рекламы и бонусы за быструю заявку' : 'Smart urgency timers, marketing discount codes, and incentives for fast checkout'
        },
        ecosystem: {
          title: isRu ? 'Сквозная программа лояльности (Сайт + Бот)' : 'Cross-platform loyalty wallet',
          desc: isRu ? 'Баланс бонусов единый: клиент копит баллы на сайте, а тратит в Telegram или наоборот' : 'Unified bonus balance: accumulate points on the site, spend them in Telegram'
        }
      }
    },
    {
      id: 'crm_1c_sync',
      cost: 2000,
      labels: {
        tma: {
          title: isRu ? 'Синхронизация с 1С / МойСклад / CRM' : 'CRM & Inventory sync (1C, HubSpot, etc.)',
          desc: isRu ? 'Заказы из Telegram сразу попадают в вашу систему, а остатки и цены обновляются сами' : 'Orders flow directly into your CRM, keeping inventory counts and prices updated'
        },
        web: {
          title: isRu ? 'Интеграция с CRM и складским учетом' : 'CRM & ERP integration pipeline',
          desc: isRu ? 'Автоматическая выгрузка заказов, синхронизация цен, остатков и клиентской базы' : 'Automated export of deals, live product synchronization, and customer database updates'
        },
        landing: {
          title: isRu ? 'Автовыгрузка лидов в CRM' : 'Direct lead routing into CRM pipeline',
          desc: isRu ? 'Каждая заявка мгновенно попадает в вашу CRM-систему с фиксацией источника рекламы' : 'Every incoming lead lands in your CRM with full UTM and marketing attribution tags'
        },
        ecosystem: {
          title: isRu ? 'Полная интеграция учета (CRM + Склад)' : 'Omnichannel ERP & CRM synchronization',
          desc: isRu ? 'Единый центр управления заказами и остатками для сайта и всех Telegram-ботов' : 'Central command hub managing inventory and customer history across all channels'
        }
      }
    },
    {
      id: 'fast_checkout',
      cost: 1250,
      labels: {
        tma: {
          title: isRu ? 'Заказ в 2 касания (автозаполнение из Telegram)' : '2-Tap instant checkout (autofill)',
          desc: isRu ? 'Имя, телефон и адрес подставляются сами — покупатель оформляет заказ за 15 секунд' : 'Name, phone, and delivery address autofill seamlessly — checkout takes 15 seconds'
        },
        web: {
          title: isRu ? 'Быстрый чекаут в 1 шаг без лишних полей' : '1-Step frictionless checkout',
          desc: isRu ? 'Автоподсказки городов и улиц, удобный выбор доставки (курьер, самовывоз)' : 'Street address autocomplete and seamless local delivery tier picker'
        },
        landing: {
          title: isRu ? 'Умная экспресс-форма с автоподстановкой' : 'Smart express form with live validation',
          desc: isRu ? 'Минимум трения: маска телефона, автопроверка данных и максимальная конверсия' : 'Zero friction: phone number input masking, instant validation, highest conversion'
        },
        ecosystem: {
          title: isRu ? 'Сквозной быстрый заказ на всех устройствах' : 'Persistent cross-device instant order',
          desc: isRu ? 'Сохраненные адреса и телефоны клиента доступны и на сайте, и в Telegram' : 'Saved customer shipping details accessible across both desktop and Telegram bot'
        }
      }
    },
    {
      id: 'ai_consultant',
      cost: 2250,
      labels: {
        tma: {
          title: isRu ? 'Умный AI-ассистент в чате 24/7' : '24/7 AI Sales Assistant in chat',
          desc: isRu ? 'Мгновенно отвечает на вопросы о товарах, помогает с выбором и доводит до оплаты' : 'Answers customer queries instantly, recommends products, and guides buyers to payment'
        },
        web: {
          title: isRu ? 'AI-консультант и умный чат на сайте' : 'AI chatbot & virtual sales rep for site',
          desc: isRu ? 'Консультирует посетителей сайта в любое время суток, снимает возражения и берет контакты' : 'Guides visitors around the clock, answers technical questions, and captures phone leads'
        },
        landing: {
          title: isRu ? 'Интерактивный AI-помощник для сайта' : 'Interactive conversion AI assistant',
          desc: isRu ? 'Вовлекает сомневающегося посетителя в диалог и переводит интерес в реальную заявку' : 'Engages hesitating visitors in proactive dialogue and turns visits into booked calls'
        },
        ecosystem: {
          title: isRu ? 'Единый AI-ассистент для сайта и Telegram' : 'Unified AI Sales Agent (Web + Bot)',
          desc: isRu ? 'Общая база знаний: знает все ваши услуги, регламенты и отвечает клиентам на всех площадках' : 'Single enterprise knowledge base answering customer questions across all touchpoints'
        }
      }
    },
    {
      id: 'push_haptics',
      cost: 1000,
      labels: {
        tma: {
          title: isRu ? 'Push-рассылки акций и приятный виброотклик' : 'Promo push notifications & haptic feedback',
          desc: isRu ? 'Бесплатные рассылки спецпредложений клиентам и тактильная вибрация кнопок приложения' : 'Free broadcast updates to subscribers plus native tactile smartphone vibration on clicks'
        },
        web: {
          title: isRu ? 'Мгновенные уведомления о заказах в Telegram' : 'Real-time Telegram order alerts',
          desc: isRu ? 'Звуковое оповещение вам о новом клиенте за 1 сек, а покупателю — статус заказа' : 'Audible push alerts delivered to your team within 1 second of new order creation'
        },
        landing: {
          title: isRu ? 'Звуковые оповещения о заявках в ваш Telegram' : 'Instant lead sound alerts in Telegram',
          desc: isRu ? 'Менеджер получает заявку с телефоном клиента мгновенно прямо в личный чат' : 'Your sales representative receives customer name & phone in chat instantly'
        },
        ecosystem: {
          title: isRu ? 'Push-рассылки клиентам + бот уведомлений' : 'Customer broadcast & internal team alerts',
          desc: isRu ? 'Вы сразу видите заказы в служебном чате, а клиенты получают рассылки в Telegram' : 'Team sees orders in dispatch channel while shoppers receive shipping updates'
        }
      }
    },
    {
      id: 'seo_analytics',
      cost: 1250,
      labels: {
        tma: {
          title: isRu ? 'Сквозная аналитика рекламы и каналов в Telegram' : 'Telegram channel & ad campaign analytics',
          desc: isRu ? 'Показывает, с какого рекламного поста, блогера или канала пришли платящие клиенты' : 'Detailed tracking identifying which influencer, post, or channel generated paid orders'
        },
        web: {
          title: isRu ? 'SEO-оптимизация под Google/Яндекс + Аналитика' : 'SEO setup + Google Analytics / Pixels',
          desc: isRu ? 'Базовая подготовка для выхода в топ поисковиков и настройка целей конверсий' : 'Full search engine optimization readiness and conversion event tracking setup'
        },
        landing: {
          title: isRu ? 'Готовность к рекламе (Google/Яндекс) и пиксели' : 'Ad traffic readiness (Google Ads / Meta)',
          desc: isRu ? 'Настройка целей, пикселей и счетчиков, чтобы реклама окупалась с первых кликов' : 'Pixel tags and goal conversion triggers configured so ad spend pays off from day one'
        },
        ecosystem: {
          title: isRu ? 'Комплексная сквозная аналитика (Сайт + Telegram)' : 'Omnichannel end-to-end analytics',
          desc: isRu ? 'Полный отчет: сколько посетителей пришло с поиска, сколько из Telegram и их окупаемость' : 'Unified reporting: visitor counts from search vs Telegram and customer lifetime ROI'
        }
      }
    },
  ];

  // Base prices
  const basePrices: Record<string, number> = {
    tma: 4500,
    web: 5500,
    landing: 3500,
    ecosystem: 8500,
  };

  const designMultipliers: Record<string, number> = {
    clean: 1.0,
    custom3d: 1.25,
    exclusive: 1.5,
  };

  const baseTimelines: Record<string, number> = {
    tma: 7,
    web: 8,
    landing: 4,
    ecosystem: 14,
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Math calculations
  const basePrice = basePrices[projectType];
  const featuresTotal = selectedFeatures.reduce((acc, featId) => {
    const feat = featureDefinitions.find(f => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);

  const priceBeforeDesign = basePrice + featuresTotal;
  const designMultiplier = designMultipliers[designLevel];
  const finalPrice = Math.round(priceBeforeDesign * designMultiplier * (isExpress ? 1.2 : 1.0));

  const baseDays = baseTimelines[projectType] + Math.round(selectedFeatures.length * 1.5);
  const finalDays = isExpress ? Math.max(7, Math.round(baseDays * 0.65)) : baseDays;

  const handleFixEstimate = () => {
    fireConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#2563EB', '#3B82F6', '#60A5FA', '#10B981']
    });

    const typeNames: Record<string, string> = {
      tma: isRu ? 'Telegram Mini App (TMA)' : 'Telegram Mini App (TMA)',
      web: isRu ? 'Сайт компании / Каталог' : 'Corporate Website / Catalog',
      landing: isRu ? 'Продающий лендинг' : 'High-Converting Landing Page',
      ecosystem: isRu ? 'Комплекс (Сайт + Telegram-сервис)' : 'All-in-One (Website + Telegram App)'
    };

    const designNames: Record<string, string> = {
      clean: isRu ? 'Базовый аккуратный (чистый минимализм)' : 'Clean & Streamlined (Minimalist)',
      custom3d: isRu ? 'Премиум 3D / Анимации (современный интерактив)' : 'Bespoke Brand Style (Custom UI & Animations)',
      exclusive: isRu ? 'Эксклюзивный Brand-Art (авторский арт-дирекшн)' : 'Exclusive Brand Art (Custom Art Direction)'
    };

    const readableFeatures = selectedFeatures.map((id) => {
      const feat = featureDefinitions.find((f) => f.id === id);
      if (!feat) return id;
      const meta = feat.labels[projectType as keyof typeof feat.labels] || feat.labels.tma;
      return `${meta.title} (+${formatPrice(feat.cost)})`;
    });

    onApplyEstimate({
      projectType: typeNames[projectType],
      summary: isRu 
        ? `Выбранный тип: ${typeNames[projectType]}, Доп. функций: ${selectedFeatures.length} шт, Срок: ~${finalDays} дн.`
        : `Selected type: ${typeNames[projectType]}, Extra options: ${selectedFeatures.length}, Timeline: ~${finalDays} days`,
      estimatedPrice: formatPrice(finalPrice),
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
            <span>{t.calculator.badge}</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
            {t.calculator.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.calculator.subtitle}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Matrix (8 cols) */}
          <ScrollReveal direction="left" delay={0.1} className="lg:col-span-8">
            <div className="space-y-6 sm:space-y-8 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 p-4 sm:p-10 shadow-xs">
              
              {/* Step 1: Type selection */}
              <div>
                <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-2.5 sm:mb-3">
                  {t.calculator.step1Title}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { id: 'tma', label: t.calculator.typeTmaTitle, sub: t.calculator.typeTmaSub, icon: Smartphone, badge: t.calculator.typeTmaBadge },
                    { id: 'web', label: t.calculator.typeWebTitle, sub: t.calculator.typeWebSub, icon: Globe, badge: t.calculator.typeWebBadge },
                    { id: 'landing', label: t.calculator.typeLandingTitle, sub: t.calculator.typeLandingSub, icon: Zap, badge: t.calculator.typeLandingBadge },
                    { id: 'ecosystem', label: t.calculator.typeEcoTitle, sub: t.calculator.typeEcoSub, icon: Sparkles, badge: t.calculator.typeEcoBadge },
                  ].map((tItem) => {
                    const Icon = tItem.icon;
                    const isSelected = projectType === tItem.id;
                    return (
                      <button
                        key={tItem.id}
                        onClick={() => setProjectType(tItem.id as any)}
                        className={`relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-center transition-all active:scale-[0.98] min-h-[105px] sm:min-h-[120px] ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 shadow-sm ring-1 ring-blue-600'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600'
                        }`}
                      >
                        <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 rounded bg-slate-200 dark:bg-slate-700/80 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-semibold text-slate-900 dark:text-white">
                          {tItem.badge}
                        </span>
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white dark:bg-slate-800 shadow-xs mb-1.5 text-blue-600 dark:text-blue-400">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block leading-tight mb-0.5">{tItem.label}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight">{tItem.sub}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Features checkboxes */}
              <div>
                <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                  <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block">
                    {t.calculator.step2Title}
                  </label>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    {selectedFeatures.length} / {featureDefinitions.length}
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
                        className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border flex items-start justify-between cursor-pointer transition-all select-none ${
                          isChecked
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-600/50'
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
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
                          +{formatPrice(feat.cost)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Design fidelity */}
              <div>
                <label className="text-xs font-bold text-slate-950 dark:text-white uppercase tracking-wider block mb-2.5 sm:mb-3">
                  {t.calculator.step3Title}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {[
                    { id: 'clean', label: t.calculator.designCleanLabel, sub: t.calculator.designCleanSub, mult: 'x1.0' },
                    { id: 'custom3d', label: t.calculator.designCustomLabel, sub: t.calculator.designCustomSub, mult: 'x1.25' },
                    { id: 'exclusive', label: t.calculator.designExclLabel, sub: t.calculator.designExclSub, mult: 'x1.5' },
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
                    <span className="text-xs font-bold text-slate-950 dark:text-white">{t.calculator.expressTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.calculator.expressDesc}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpress(!isExpress)}
                  aria-label="Express Toggle"
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

          {/* Sticky Estimate Sidebar (4 cols) */}
          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl sm:rounded-3xl border border-blue-900/40 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 p-5 sm:p-8 text-white shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-2 border border-blue-400/30">
                  {t.calculator.sidebarBadge}
                </span>
                <h3 className="font-display text-xl font-black text-white mb-6">
                  {t.calculator.sidebarTitle}
                </h3>

                {/* Big Price Display */}
                <div className="mb-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] text-slate-300 block mb-1">{t.calculator.estimatedCostLabel}</span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-white flex items-baseline gap-2">
                    <span>{formatPrice(finalPrice)}</span>
                  </div>
                  <span className="text-[11px] text-blue-400 font-medium block mt-1">
                    {t.calculator.fixedPriceNote}
                  </span>
                </div>

                {/* Prepayment Guarantee Pill */}
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-[11px] text-emerald-300 font-bold leading-tight">
                    {t.calculator.prepayPill}
                  </span>
                </div>

                {/* Timeline display */}
                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs">
                  <span className="text-slate-300">{t.calculator.timelineLabel}</span>
                  <span className="font-bold text-white">~ {finalDays} {t.calculator.daysUnit}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs">
                  <span className="text-slate-300">{t.calculator.optionsCountLabel}</span>
                  <span className="font-bold text-white">{selectedFeatures.length}</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10 text-xs mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-300">{t.calculator.warrantyLabel}</span>
                    {onOpenWarranty && (
                      <button
                        type="button"
                        onClick={onOpenWarranty}
                        title="Warranty details"
                        aria-label="Warranty details"
                        className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-500/30 hover:bg-blue-500 text-blue-300 hover:text-white border border-blue-400/40 transition-all transform hover:scale-110 shadow-xs cursor-pointer"
                      >
                        <span className="text-[10px] font-black leading-none select-none">!</span>
                      </button>
                    )}
                  </div>
                  <span className="font-bold text-emerald-400">{t.calculator.warrantyValue}</span>
                </div>

                {/* Action CTA Button */}
                <button
                  id="apply-estimate-button"
                  onClick={handleFixEstimate}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-4 text-xs font-bold text-white active:scale-95 transition-all shadow-lg shadow-blue-600/30 mb-3"
                >
                  <span>{t.calculator.lockEstimateBtn}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <p className="text-[10px] text-center text-slate-400">
                  {t.calculator.consultNote}
                </p>
              </div>

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
