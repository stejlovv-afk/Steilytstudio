import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'ru' | 'en';

export interface Translations {
  // Navigation
  nav: {
    services: string;
    advantages: string;
    portfolio: string;
    calculator: string;
    workflow: string;
    contact: string;
    calculateCost: string;
    writeTelegram: string;
    availableBadge: string;
    subLogo: string;
    themeToggleLight: string;
    themeToggleDark: string;
    langSwitchTitle: string;
  };
  // Hero
  hero: {
    pillStudio: string;
    pillNoPrepayment: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    subtitleHighlight: string;
    subtitleAfter: string;
    calcButton: string;
    viewCases: string;
    benefitNoPrepay: string;
    benefitSpeed: string;
    benefitGuarantee: string;
  };
  // Services
  services: {
    badge: string;
    title: string;
    subtitle: string;
    techLabel: string;
    timelineLabel: string;
    orderTmaBtn: string;
    orderWebBtn: string;
  };
  // Advantages
  advantages: {
    badge: string;
    title: string;
    subtitle: string;
    telegramBannerBadge: string;
    telegramBannerTitle: string;
    telegramBannerDesc: string;
    bannerStat1Number: string;
    bannerStat1Text: string;
    bannerStat2Number: string;
    bannerStat2Text: string;
    bannerStat3Number: string;
    bannerStat3Text: string;
    calcBtn: string;
  };
  // Portfolio
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterTma: string;
    filterWeb: string;
    testDriveBtn: string;
    detailsBtn: string;
    clientGoalLabel: string;
    ourSolutionLabel: string;
    implementedLabel: string;
    orderSimilarBtn: string;
  };
  // Workflow
  workflow: {
    badge: string;
    title: string;
    subtitle: string;
    stepPrefix: string;
    prevBtn: string;
    nextBtn: string;
    clientRoleLabel: string;
    agencyRoleLabel: string;
    resultsLabel: string;
    readyToStart: string;
    getEstimateBtn: string;
  };
  // Calculator
  calculator: {
    badge: string;
    title: string;
    subtitle: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
    expressTitle: string;
    expressDesc: string;
    sidebarTitle: string;
    sidebarBadge: string;
    estimatedCostLabel: string;
    fixedPriceNote: string;
    prepayPill: string;
    timelineLabel: string;
    daysUnit: string;
    optionsCountLabel: string;
    warrantyLabel: string;
    warrantyValue: string;
    lockEstimateBtn: string;
    consultNote: string;
    typeTmaTitle: string;
    typeTmaSub: string;
    typeTmaBadge: string;
    typeWebTitle: string;
    typeWebSub: string;
    typeWebBadge: string;
    typeLandingTitle: string;
    typeLandingSub: string;
    typeLandingBadge: string;
    typeEcoTitle: string;
    typeEcoSub: string;
    typeEcoBadge: string;
    designCleanLabel: string;
    designCleanSub: string;
    designCustomLabel: string;
    designCustomSub: string;
    designExclLabel: string;
    designExclSub: string;
  };
  // Contact
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directTitle: string;
    directSubtitle: string;
    telegramCardLabel: string;
    telegramCardSub: string;
    emailCardLabel: string;
    guarantee1: string;
    guarantee2: string;
    guarantee3: string;
    guarantee4: string;
    formTitle: string;
    formSubtitle: string;
    calcAttachedPill: string;
    selectedFormatLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    telegramLabel: string;
    phoneLabel: string;
    commentLabel: string;
    commentPlaceholder: string;
    zeroPrepayBox: string;
    submitBtn: string;
    submittingBtn: string;
    legalConsentText: string;
    successTitle: string;
    successSubtitle: string;
    successWriteTelegramBtn: string;
    sendAnotherBtn: string;
  };
  // Footer
  footer: {
    bio: string;
    statusOpen: string;
    sectionsTitle: string;
    contactsTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    warranty: string;
    copyright: string;
    toTop: string;
  };
}

export const translations: Record<Language, Translations> = {
  ru: {
    nav: {
      services: 'Услуги',
      advantages: 'Преимущества',
      portfolio: 'Примеры работ',
      calculator: 'Калькулятор',
      workflow: 'Этапы',
      contact: 'Контакты',
      calculateCost: 'Рассчитать стоимость',
      writeTelegram: 'Написать в Telegram',
      availableBadge: 'Принимаем заказы',
      subLogo: 'Сайты & Telegram-боты',
      themeToggleLight: 'Включить светлую тему',
      themeToggleDark: 'Включить темную тему',
      langSwitchTitle: 'Сменить язык / Switch language',
    },
    hero: {
      pillStudio: 'Студия веб-разработки & Telegram',
      pillNoPrepayment: '0% предоплаты',
      titleStart: 'Создаем ',
      titleHighlight: 'сайты и Telegram-боты',
      titleEnd: ', которые приносят клиентов',
      subtitle: 'Понятные сайты для бизнеса, удобные магазины и запись на услуги прямо в Telegram. Приступаем к работе ',
      subtitleHighlight: 'без предоплаты',
      subtitleAfter: ': вы платите только тогда, когда сайт готов и протестирован на вашем телефоне.',
      calcButton: 'Рассчитать смету проекта',
      viewCases: 'Посмотреть примеры работ',
      benefitNoPrepay: 'Оплата по факту готовности',
      benefitSpeed: 'Запуск от 3 до 7 рабочих дней',
      benefitGuarantee: '12 месяцев технической гарантии',
    },
    services: {
      badge: 'Направления разработки',
      title: 'Что мы создаем для вас',
      subtitle: 'Два ключевых инструмента, которые окупаются быстрее всего: удобные приложения в Telegram и продающие сайты.',
      techLabel: 'На чем делаем:',
      timelineLabel: 'Сроки:',
      orderTmaBtn: 'Заказать Telegram-сервис',
      orderWebBtn: 'Заказать сайт',
    },
    advantages: {
      badge: 'Наши преимущества',
      title: 'Почему заказчики выбирают нас',
      subtitle: 'Делаем проекты, которые приносят реальные заказы и прибыль вашему бизнесу, без головной боли и задержек.',
      telegramBannerBadge: 'ПРЕИМУЩЕСТВА TELEGRAM ДЛЯ БИЗНЕСА',
      telegramBannerTitle: 'Почему Telegram Mini Apps приносят больше продаж, чем обычные сайты?',
      telegramBannerDesc: 'Клиенту не нужно выходить из Telegram, скачивать сторонние приложения или регистрироваться заново. Он открывает ваш магазин прямо в чате в 1 клик, оплачивает через СБП или банковскую карту за секунды, а вы получаете мгновенный канал связи с клиентом без затрат на SMS.',
      bannerStat1Number: '1 клик',
      bannerStat1Text: 'Вход без паролей и регистраций',
      bannerStat2Number: '0% комиссии',
      bannerStat2Text: 'Без поборов App Store и Google',
      bannerStat3Number: '98% прочтений',
      bannerStat3Text: 'Бесплатные уведомления клиенту',
      calcBtn: 'Рассчитать стоимость для бизнеса',
    },
    portfolio: {
      badge: 'Портфолио и примеры',
      title: 'Примеры наших работ',
      subtitle: 'Нажмите «Тест-драйв» у любого проекта, чтобы сразу открыть интерактивное приложение и проверить, как всё работает.',
      filterAll: 'Все примеры (4)',
      filterTma: 'Telegram Mini Apps',
      filterWeb: 'Сайты и Порталы',
      testDriveBtn: 'Тест-драйв',
      detailsBtn: 'Подробнее',
      clientGoalLabel: 'Задача клиента:',
      ourSolutionLabel: 'Наше решение:',
      implementedLabel: 'Что реализовано:',
      orderSimilarBtn: 'Хочу такой же проект',
    },
    workflow: {
      badge: 'Понятный процесс',
      title: 'Как строится разработка от идеи до запуска',
      subtitle: 'Пошаговый процесс: вы всегда видите прогресс и точно знаете, что происходит на каждом этапе.',
      stepPrefix: 'Шаг',
      prevBtn: 'Назад',
      nextBtn: 'Следующий шаг',
      clientRoleLabel: 'От вас требуется:',
      agencyRoleLabel: 'Мы делаем:',
      resultsLabel: 'Результат шага:',
      readyToStart: 'Готовы начать разработку без рисков?',
      getEstimateBtn: 'Рассчитать проект',
    },
    calculator: {
      badge: 'Онлайн-калькулятор',
      title: 'Калькулятор стоимости и сроков',
      subtitle: 'Выберите формат и нужные опции — формулировки и смета автоматически подстраиваются под ваш бизнес.',
      step1Title: '1. Что требуется разработать:',
      step2Title: '2. Выберите нужные функции:',
      step3Title: '3. Дизайн и оформление:',
      step4Title: '4. Скорость выполнения:',
      expressTitle: 'Срочная разработка (+35% к скорости сдачи)',
      expressDesc: 'Выделенная команда начинает разработку в день обращения вне очереди.',
      sidebarTitle: 'Итоговая смета',
      sidebarBadge: 'Предварительный расчет',
      estimatedCostLabel: 'Ориентировочная стоимость:',
      fixedPriceNote: '* точная сумма фиксируется в договоре',
      prepayPill: '0% предоплаты • Оплата только после того, как вы увидите и утвердите готовый сайт',
      timelineLabel: 'Срок выполнения:',
      daysUnit: 'рабочих дней',
      optionsCountLabel: 'Кол-во выбранных опций:',
      warrantyLabel: 'Гарантия и поддержка:',
      warrantyValue: '12 месяцев бесплатно',
      lockEstimateBtn: 'Закрепить расчет в заявке',
      consultNote: 'Бесплатно проконсультируем и покажем прототип',
      typeTmaTitle: 'Telegram Mini App',
      typeTmaSub: 'Магазин или сервис в Telegram',
      typeTmaBadge: 'Топ продаж',
      typeWebTitle: 'Сайт компании / Каталог',
      typeWebSub: 'Для доверия и SEO-поиска',
      typeWebBadge: 'Каталог',
      typeLandingTitle: 'Продающий лендинг',
      typeLandingSub: 'Быстрый запуск под рекламу',
      typeLandingBadge: 'Лидген',
      typeEcoTitle: 'Сайт + Telegram-сервис',
      typeEcoSub: 'Двойной охват аудитории',
      typeEcoBadge: 'Комплекс',
      designCleanLabel: 'Чистый и удобный',
      designCleanSub: 'Классический минимализм, быстрый запуск',
      designCustomLabel: 'Индивидуальный стиль',
      designCustomSub: 'Фирменные цвета, анимации и проработка',
      designExclLabel: 'Эксклюзив под ключ',
      designExclSub: 'Авторский арт-дизайн, сложные визуальные элементы',
    },
    contact: {
      badge: 'Обсудить проект',
      title: 'Начните проект уже сегодня',
      subtitle: 'Мы работаем без предоплаты: создаем и демонстрируем вам итоговый результат, и только после вашего одобрения вы производите оплату.',
      directTitle: 'Быстрая связь напрямую',
      directSubtitle: 'Напишите нам в Telegram — ответим в течение 10–15 минут, подскажем лучшее решение и рассчитаем точную стоимость.',
      telegramCardLabel: 'Написать нам в Telegram:',
      telegramCardSub: 'Ответим за 10–15 минут',
      emailCardLabel: 'Электронная почта:',
      guarantee1: '0% предоплаты — оплата только после сдачи работы',
      guarantee2: 'Быстрый ответ в течение 10–15 минут',
      guarantee3: 'Официальный договор, акты и гарантия 12 месяцев',
      guarantee4: 'Бесплатная консультация и расчет стоимости',
      formTitle: 'Оставить заявку на разработку',
      formSubtitle: 'Заполните простую форму — свяжемся с вами и ответим на любые вопросы.',
      calcAttachedPill: 'Прикреплен расчет из калькулятора',
      selectedFormatLabel: 'Выбранный формат:',
      nameLabel: 'Ваше имя: *',
      namePlaceholder: 'Как к вам обращаться?',
      telegramLabel: 'Ваш Telegram: *',
      phoneLabel: 'Телефон (для связи):',
      commentLabel: 'Кратко о задаче или пожелания:',
      commentPlaceholder: 'Чем занимается ваш бизнес, какие разделы нужны или ссылка на пример, который нравится...',
      zeroPrepayBox: 'Работаем без аванса: приступаем к заказу, присылаем итоговый вариант на согласование, после чего берем оплату.',
      submitBtn: 'Отправить заявку (без предоплаты)',
      submittingBtn: 'Отправляем заявку...',
      legalConsentText: 'Нажимая кнопку, вы соглашаетесь с условиями конфиденциальности и обработки данных.',
      successTitle: 'Заявка успешно отправлена!',
      successSubtitle: 'Мы получили ваши данные и свяжемся с вами в Telegram в течение 10–15 минут.',
      successWriteTelegramBtn: 'Написать нам напрямую в Telegram',
      sendAnotherBtn: 'Отправить еще одну заявку',
    },
    footer: {
      bio: 'Создаем сайты, лендинги и Telegram Mini Apps для бизнеса. Работаем без предоплаты: сначала делаем и согласуем результат, потом оплата.',
      statusOpen: 'Принимаем новые проекты',
      sectionsTitle: 'Разделы сайта',
      contactsTitle: 'Связь и соцсети',
      legalTitle: 'Юридическая информация',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия обслуживания',
      warranty: 'Гарантийные обязательства',
      copyright: 'Все права защищены. Разработано Steilyt Studio.',
      toTop: 'Наверх',
    },
  },
  en: {
    nav: {
      services: 'Services',
      advantages: 'Why Us',
      portfolio: 'Portfolio',
      calculator: 'Cost Calculator',
      workflow: 'Workflow',
      contact: 'Contact',
      calculateCost: 'Calculate Price',
      writeTelegram: 'Chat in Telegram',
      availableBadge: 'Available for projects',
      subLogo: 'Websites & Telegram Apps',
      themeToggleLight: 'Switch to light theme',
      themeToggleDark: 'Switch to dark theme',
      langSwitchTitle: 'Switch language / Сменить язык',
    },
    hero: {
      pillStudio: 'Web & Telegram App Studio',
      pillNoPrepayment: '0% Prepayment',
      titleStart: 'We build ',
      titleHighlight: 'high-converting websites & Telegram apps',
      titleEnd: ' that drive sales',
      subtitle: 'High-performing business websites, seamless Telegram stores, and booking apps. We start ',
      subtitleHighlight: 'with zero prepayment',
      subtitleAfter: ': you only pay when your project is fully ready and tested on your phone.',
      calcButton: 'Estimate Project Cost',
      viewCases: 'Explore Portfolio',
      benefitNoPrepay: 'Pay only upon project completion',
      benefitSpeed: 'Launch ready in 3 to 7 business days',
      benefitGuarantee: '12 months warranty & ongoing support',
    },
    services: {
      badge: 'Development Directions',
      title: 'What We Build for You',
      subtitle: 'Two essential tools with the fastest return on investment: seamless Telegram apps and high-converting web portals.',
      techLabel: 'Technologies used:',
      timelineLabel: 'Turnaround:',
      orderTmaBtn: 'Order Telegram App',
      orderWebBtn: 'Order Website',
    },
    advantages: {
      badge: 'Our Advantages',
      title: 'Why Clients Choose Us',
      subtitle: 'We engineer solutions that generate actual leads and profit for your company, without delays or unexpected costs.',
      telegramBannerBadge: 'TELEGRAM ADVANTAGES FOR BUSINESS',
      telegramBannerTitle: 'Why do Telegram Mini Apps generate more sales than traditional sites?',
      telegramBannerDesc: 'Customers never leave Telegram, never download bulky native apps, and never have to create new passwords. They open your catalog directly in chat in 1 click, check out in seconds, and you gain a free direct marketing channel with 98% open rates.',
      bannerStat1Number: '1 click',
      bannerStat1Text: 'Instant login with zero friction',
      bannerStat2Number: '0% fee',
      bannerStat2Text: 'No App Store / Google cuts',
      bannerStat3Number: '98% open',
      bannerStat3Text: 'Free direct messaging to buyers',
      calcBtn: 'Estimate Cost for Your Business',
    },
    portfolio: {
      badge: 'Portfolio & Showcases',
      title: 'Examples of Our Work',
      subtitle: 'Click "Test Drive" on any project to launch an interactive demo and experience the user flow firsthand.',
      filterAll: 'All Showcases (4)',
      filterTma: 'Telegram Mini Apps',
      filterWeb: 'Websites & Portals',
      testDriveBtn: 'Test Drive',
      detailsBtn: 'Overview',
      clientGoalLabel: 'Client Challenge:',
      ourSolutionLabel: 'Our Solution:',
      implementedLabel: 'Delivered Capabilities:',
      orderSimilarBtn: 'Request Similar Project',
    },
    workflow: {
      badge: 'Transparent Process',
      title: 'How Development Unfolds: From Idea to Release',
      subtitle: 'A structured, transparent roadmap: you track live progress and always know what is being delivered at every milestone.',
      stepPrefix: 'Step',
      prevBtn: 'Back',
      nextBtn: 'Next Step',
      clientRoleLabel: 'Your input:',
      agencyRoleLabel: 'Our delivery:',
      resultsLabel: 'Step milestone:',
      readyToStart: 'Ready to kick off development with zero risk?',
      getEstimateBtn: 'Estimate Project',
    },
    calculator: {
      badge: 'Interactive Calculator',
      title: 'Instant Cost & Timeline Estimator',
      subtitle: 'Choose your format and required features — wording and breakdown automatically adapt to your business needs.',
      step1Title: '1. What needs to be built:',
      step2Title: '2. Select required features:',
      step3Title: '3. Visual styling & fidelity:',
      step4Title: '4. Delivery speed:',
      expressTitle: 'Express Delivery (+35% faster release)',
      expressDesc: 'A dedicated engineering team prioritizes your project on day one.',
      sidebarTitle: 'Project Estimate',
      sidebarBadge: 'Preliminary Quote',
      estimatedCostLabel: 'Estimated Project Cost:',
      fixedPriceNote: '* exact price is frozen in the contract',
      prepayPill: '0% prepayment • Payment is due only after you inspect and approve the completed build',
      timelineLabel: 'Estimated timeline:',
      daysUnit: 'business days',
      optionsCountLabel: 'Selected options count:',
      warrantyLabel: 'Warranty & support:',
      warrantyValue: '12 months complimentary',
      lockEstimateBtn: 'Attach Estimate to Request',
      consultNote: 'Free technical consult and early concept preview',
      typeTmaTitle: 'Telegram Mini App',
      typeTmaSub: 'Shop or service inside Telegram',
      typeTmaBadge: 'Best Seller',
      typeWebTitle: 'Corporate Site / Catalog',
      typeWebSub: 'For authority & search rankings',
      typeWebBadge: 'Catalog',
      typeLandingTitle: 'High-Converting Landing',
      typeLandingSub: 'Rapid launch for ad traffic',
      typeLandingBadge: 'Lead Gen',
      typeEcoTitle: 'Website + Telegram Bot',
      typeEcoSub: 'Double audience capture',
      typeEcoBadge: 'All-in-One',
      designCleanLabel: 'Clean & Streamlined',
      designCleanSub: 'Classic minimalism, fast turnaround',
      designCustomLabel: 'Bespoke Brand Style',
      designCustomSub: 'Custom color scheme, smooth micro-interactions',
      designExclLabel: 'Exclusive Brand Art',
      designExclSub: 'Full custom art direction & custom interactive 3D',
    },
    contact: {
      badge: 'Discuss Project',
      title: 'Start Your Project Today',
      subtitle: 'We work without prepayment: we build and demonstrate the final working result, and you pay only after complete approval.',
      directTitle: 'Direct Contact Channels',
      directSubtitle: 'Send us a note on Telegram — we will respond in 10–15 minutes, recommend the optimal tech stack, and calculate exact costs.',
      telegramCardLabel: 'Message us on Telegram:',
      telegramCardSub: 'Replies in 10–15 minutes',
      emailCardLabel: 'Direct email:',
      guarantee1: '0% prepayment — pay strictly after work is delivered',
      guarantee2: 'Fast reply within 10–15 minutes',
      guarantee3: 'Official contract, service acts & 12 months warranty',
      guarantee4: 'Complimentary consultation and preliminary estimate',
      formTitle: 'Submit Project Request',
      formSubtitle: 'Fill out this brief form — we will reach out and guide you through the process.',
      calcAttachedPill: 'Calculator estimate attached',
      selectedFormatLabel: 'Selected format:',
      nameLabel: 'Your name: *',
      namePlaceholder: 'How should we address you?',
      telegramLabel: 'Your Telegram: *',
      phoneLabel: 'Phone number (optional):',
      commentLabel: 'Briefly describe your requirements or links:',
      commentPlaceholder: 'What does your company do, what sections do you need, or reference links you love...',
      zeroPrepayBox: 'We work with zero deposit: we begin the project, deliver the working build for approval, and invoice afterwards.',
      submitBtn: 'Submit Request (Zero Prepayment)',
      submittingBtn: 'Sending inquiry...',
      legalConsentText: 'By clicking the button you agree to our privacy terms and data processing policy.',
      successTitle: 'Inquiry Successfully Sent!',
      successSubtitle: 'We have received your details and will connect with you via Telegram within 10–15 minutes.',
      successWriteTelegramBtn: 'Open Direct Telegram Chat',
      sendAnotherBtn: 'Send another request',
    },
    footer: {
      bio: 'Crafting high-conversion websites, sales funnels, and Telegram Mini Apps for businesses worldwide. Zero prepayment: we build first, you pay after approval.',
      statusOpen: 'Available for new client inquiries',
      sectionsTitle: 'Navigation',
      contactsTitle: 'Direct Channels',
      legalTitle: 'Legal & Guarantees',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      warranty: 'Warranty & SLA',
      copyright: 'All rights reserved. Designed & built by Steilyt Studio.',
      toTop: 'Back to top',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('steilyt_language') as Language | null;
      if (savedLang === 'ru' || savedLang === 'en') {
        return savedLang;
      }
      if (navigator.language && navigator.language.startsWith('en')) {
        return 'en';
      }
    } catch {
      // Ignore storage errors in sandboxed iframe
    }
    return 'ru';
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('steilyt_language', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
