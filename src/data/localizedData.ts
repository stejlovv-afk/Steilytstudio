import { ServiceItem, AdvantageItem, ProjectCase, WorkflowStage, Testimonial } from '../types';

export const localizedData = {
  ru: {
    services: [
      {
        id: 'tma',
        category: 'tma' as const,
        title: 'Telegram Mini Apps и боты',
        badge: 'Магазин или сервис прямо в Telegram',
        shortDesc: 'Полноценный магазин, меню или сервис записи внутри Telegram. Клиентам не нужно ничего скачивать — открыл мессенджер, выбрал и оплатил в 2 клика.',
        fullDesc: 'Создаем интерактивные приложения, работающие прямо внутри Telegram. Вашим покупателям не нужно переходить на сторонние сайты или искать приложение в App Store. Прием оплаты картой или через СБП, а все заявки и заказы мгновенно приходят вам на телефон.',
        features: [
          'Открывается в 1 клик прямо в чате Telegram без скачиваний',
          'Прием оплаты через СБП и банковские карты любого банка',
          'Оповещения о новых заказах мгновенно приходят вам в личный Telegram',
          'Удобный каталог товаров, корзина, выбор параметров и расчет доставки',
          'Возможность отправлять сообщения с акциями и скидками вашим клиентам'
        ],
        technologies: ['Работа в Telegram', 'Быстрая оплата СБП', 'Уведомления на телефон', 'Удобно со смартфона'],
        timeline: 'от 5 до 14 дней',
        roiStat: 'Клиенты оформляют заказы в 2-3 раза чаще, чем на сложных сайтах'
      },
      {
        id: 'web',
        category: 'web' as const,
        title: 'Сайты и Лендинги под ключ',
        badge: 'Для привлечения клиентов и продаж',
        shortDesc: 'Современные, аккуратные и понятные сайты: от продающего одностраничника до каталога услуг компании. Идеально смотрятся на смартфонах и приносят заявки.',
        fullDesc: 'Разрабатываем сайты, ориентированные на простоту для ваших клиентов. Мы пишем понятный текст, продумываем удобное расположение кнопок, настраиваем формы для звонков и заявок, а также делаем сайт быстрым, чтобы клиенты не уходили из-за долгой загрузки.',
        features: [
          'Красивый и аккуратный вид на всех смартфонах, планшетах и компьютерах',
          'Все заявки с сайта приходят вам прямо в Telegram или на почту за 1 секунду',
          'Быстрое открытие сайта без зависаний даже при слабом интернете',
          'Подключение онлайн-оплаты, карт с вашим адресом, отзывов и контактов',
          'Простое управление: покажем, как самостоятельно менять цены, текст и фото'
        ],
        technologies: ['100% под смартфоны', 'Быстрая загрузка', 'Готовность к рекламе', 'Защита от сбоев'],
        timeline: 'от 4 до 12 дней',
        roiStat: 'Привлекает звонки и заявки от клиентов с первого дня запуска'
      }
    ],
    advantages: [
      {
        id: 1,
        title: 'Работа без предоплаты',
        subtitle: 'Вы ничем не рискуете',
        description: 'Мы приступаем к работе сразу без аванса. Вы лично смотрите готовый сайт на телефоне, проверяете все функции, и только когда результат вам полностью нравится — производите оплату.',
        iconName: 'ShieldCheck',
        statNumber: '0 ₽',
        statLabel: 'аванс: платите строго за готовый результат'
      },
      {
        id: 2,
        title: 'Сайт, понятный вашим клиентам',
        subtitle: 'Просто и без лишних сложностей',
        description: 'Человек с первых секунд понимает, что вы предлагаете, сколько это стоит и куда нажать, чтобы сделать заказ или задать вопрос. Никаких лишних полей и запутанных страниц.',
        iconName: 'TrendingUp',
        statNumber: '2 клика',
        statLabel: 'нужно клиенту, чтобы оставить заявку'
      },
      {
        id: 3,
        title: 'Прием оплат картами и СБП',
        subtitle: 'Деньги поступают прямо на ваш счет',
        description: 'Подключаем официальную онлайн-оплату: покупатели платят через СБП или банковской картой в один клик. Все чеки и поступления прозрачны и безопасны.',
        iconName: 'CreditCard',
        statNumber: '100%',
        statLabel: 'надежность и работа с любыми банками'
      },
      {
        id: 4,
        title: 'Быстрый запуск от 5 дней',
        subtitle: 'Без затягивания сроков',
        description: 'Ценим ваше время. Не кормим обещаниями на месяцы: рабочий сайт или Telegram-приложение будет готово и протестировано уже через 5–10 дней.',
        iconName: 'Zap',
        statNumber: '5-10 дней',
        statLabel: 'средний срок сдачи готового проекта'
      },
      {
        id: 5,
        title: 'Заявки сразу вам в Telegram',
        subtitle: 'Ни одного пропущенного звонка',
        description: 'Как только клиент заполнил форму на сайте или оформил заказ, вам на телефон мгновенно приходит уведомление с его именем, номером и списком услуг.',
        iconName: 'Users',
        statNumber: '1 сек',
        statLabel: 'скорость получения новой заявки вам на телефон'
      },
      {
        id: 6,
        title: 'Гарантия 12 месяцев и поддержка',
        subtitle: 'Не бросаем после завершения',
        description: 'Официальная гарантия 12 месяцев на стабильную работу сайта и Telegram-сервиса. Отвечаем на любые вопросы в Telegram, бесплатно устраняем неполадки и обучаем управлению сайтом.',
        iconName: 'ShieldCheck',
        statNumber: '12 мес',
        statLabel: 'гарантия и личная поддержка'
      }
    ],
    portfolio: [
      {
        id: 'urban-lunch',
        type: 'tma' as const,
        name: 'Доставка еды и Ресторан',
        title: 'Telegram-приложение для заказа блюд и доставки',
        subtitle: 'Заказ еды в мессенджере за 30 секунд: меню, корзина и оплата через СБП',
        category: 'Telegram Mini App / Доставка еды',
        metric: '+35%',
        metricLabel: 'рост повторных заказов от гостей',
        tags: ['Удобное меню с фото', 'Оплата через СБП и картой', 'Скидки постоянным клиентам', 'Уведомления на кухню'],
        description: 'Клиенты открывают меню прямо в чате Telegram, собирают любимые блюда в корзину, выбирают адрес и оплачивают в один клик. Администратору сразу приходит чек.',
        challenge: 'Клиенты неохотно скачивали отдельное мобильное приложение, а звонки отнимали много времени у персонала.',
        solution: 'Создали простое приложение в Telegram: быстрый выбор еды, автоподстановка телефона и моментальная оплата СБП.',
        results: [
          { label: 'Рост повторных заказов', value: '+35%' },
          { label: 'Время оформления заказа', value: '35 секунд' },
          { label: 'Экономия времени персонала', value: 'до 3 часов/день' },
          { label: 'Довольные клиенты', value: '4 500+ постоянных' }
        ],
        techStack: ['Telegram-приложение', 'Оплата СБП', 'Уведомления в чат', 'Удобная корзина'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Красивое и аппетитное меню с фотографиями, составом и ценами',
          'Быстрое добавление блюд и напитков в корзину в 1 клик',
          'Моментальная оплата картой или через СБП без ввода лишних данных',
          'Уведомления клиенту: «Заказ принят», «Готовится», «Курьер выехал»'
        ]
      },
      {
        id: 'global-trade',
        type: 'web' as const,
        name: 'Сайт компании и услуг',
        title: 'Презентационный сайт для бизнеса и услуг',
        subtitle: 'Понятный сайт с калькулятором стоимости, описанием услуг и быстрой формой заявки',
        category: 'Веб-сайт компании / Услуги',
        metric: '99/100',
        metricLabel: 'скорость открытия на смартфонах и в поисковиках',
        tags: ['Идеально на смартфонах', 'Калькулятор стоимости', 'Быстрая форма заявки', 'Высокое доверие'],
        description: 'Стильный корпоративный сайт, который понятно рассказывает клиентам о деятельности компании, показывает цены, преимущества и сразу помогает заказать услугу.',
        challenge: 'Старый сайт компании долго грузился, плохо открывался на телефонах, и клиенты уходили к конкурентам.',
        solution: 'Сделали современный чистый сайт с мгновенной загрузкой, понятным описанием тарифов и кнопкой быстрой консультации.',
        results: [
          { label: 'Рост заявок от клиентов', value: '+45%' },
          { label: 'Время загрузки сайта', value: 'меньше 1 секунды' },
          { label: 'Оценка удобства на смартфонах', value: '100 из 100' },
          { label: 'Позиции в поиске (Яндекс/Google)', value: 'топ-выдача' }
        ],
        techStack: ['Современный сайт', 'Быстрая скорость', 'Адаптивность', 'Форма заявок'],
        deviceType: 'desktop' as const,
        featuresList: [
          'Понятное и доверительное описание всех услуг компании',
          'Простой интерактивный расчет стоимости для посетителя',
          'Форма быстрой заявки в 1 клик с моментальным уведомлением',
          'Раздел отзывов, сертификатов и ответов на частые вопросы'
        ]
      },
      {
        id: 'fittrack',
        type: 'tma' as const,
        name: 'Интернет-магазин в Telegram',
        title: 'Онлайн-магазин товаров прямо внутри Telegram',
        subtitle: 'Каталог товаров с фотографиями, поиском, корзиной и быстрой оплатой',
        category: 'Telegram Mini App / Магазин товаров',
        metric: 'х3 продажи',
        metricLabel: 'увеличение повторных покупок среди покупателей',
        tags: ['Каталог с фото и ценами', 'Удобная корзина', 'Скидки и акции', 'Оплата в 1 клик'],
        description: 'Магазин одежды, товаров для дома или питания прямо в Telegram. Покупатель листает каталог, добавляет вещи в корзину и сразу покупает.',
        challenge: 'Высокая стоимость рекламы на сайте и сложность удержания покупателей после первой покупки.',
        solution: 'Запустили магазин в Telegram: покупатели всегда могут вернуться в чат и сделать повторный заказ за пару секунд.',
        results: [
          { label: 'Повторные заказы', value: 'в 3 раза чаще' },
          { label: 'Время от выбора до оплаты', value: '1 минута' },
          { label: 'Экономия на рекламе', value: 'до 40%' },
          { label: 'Постоянные покупатели', value: '8 000+ человек' }
        ],
        techStack: ['Каталог в Telegram', 'Быстрая корзина', 'Платежи СБП', 'Уведомления о статусе'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Удобный каталог с категориями, поиском и понятными карточками товаров',
          'Корзина с подсчетом суммы и скидок по промокодам',
          'Уведомления об отправке посылки и трек-номере прямо в чат',
          'Простая оплата банковской картой или СБП'
        ]
      },
      {
        id: 'lumina-booking',
        type: 'tma' as const,
        name: 'Онлайн-запись на услуги',
        title: 'Сервис бронирования и записи клиентов в Telegram',
        subtitle: 'Выбор специалиста, свободного времени и подтверждение записи в 1 клик',
        category: 'Telegram Mini App / Запись на услуги',
        metric: '-70% неявок',
        metricLabel: 'благодаря автоматическим напоминаниям клиентам',
        tags: ['Выбор мастера и времени', 'Календарь свободных окон', 'Напоминания клиенту', 'Предоплата визита'],
        description: 'Отличное решение для салонов красоты, барбершопов, автосервисов, репетиторов и клиник. Клиенты сами выбирают удобный день и время.',
        challenge: 'Администраторы тратили часы на переписки в чатах, а клиенты иногда забывали о визите.',
        solution: 'Сделали удобный календарь записи прямо в Telegram с напоминаниями за сутки и за 2 часа до визита.',
        results: [
          { label: 'Снижение неявок клиентов', value: 'на 70%' },
          { label: 'Экономия времени сотрудников', value: 'до 3 часов в день' },
          { label: 'Записей через Telegram', value: '80% всех клиентов' },
          { label: 'Удобство для гостей', value: 'запись за 20 секунд' }
        ],
        techStack: ['Календарь записи', 'Авто-напоминания', 'Выбор мастера', 'Предоплата'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Наглядный календарь со свободными окнами и датами',
          'Карточки мастеров с фото их работ, отзывами и ценами услуг',
          'Автоматическое напоминание клиенту накануне визита в Telegram',
          'Возможность взять небольшую предоплату для гарантии визита'
        ]
      }
    ],
    workflow: [
      {
        step: 1,
        phase: 'Идея и бриф',
        badge: 'Старт проекта',
        title: 'Обсуждаем вашу задачу',
        duration: 'День 1',
        description: 'Вы рассказываете о вашем бизнесе, товарах или услугах. Мы вместе выбираем подходящий формат сайта или бота и фиксируем точную стоимость без сюрпризов.',
        deliverables: ['Понятный план будущего сайта', 'Точная фиксированная цена', 'Подбор референсов и структуры'],
        clientRole: 'Рассказываете о целях и отправляете материалы',
        agencyRole: 'Анализируем нишу, готовим план и договор',
        icon: 'FileText'
      },
      {
        step: 2,
        phase: 'Прототип & Дизайн',
        badge: 'Визуализация',
        title: 'Показываем макет и дизайн',
        duration: 'Дни 2–3',
        description: 'Создаем аккуратный, понятный дизайн. Вы заранее видите, как сайт будет выглядеть на экране смартфона и компьютера, согласовываем текст и расположение кнопок.',
        deliverables: ['Наглядный дизайн сайта', 'Простой продающий текст', 'Интерактивный кликабельный макет'],
        clientRole: 'Оцениваете макет на экране смартфона',
        agencyRole: 'Создаем UI/UX под конверсию и пишем текст',
        icon: 'Palette'
      },
      {
        step: 3,
        phase: 'Разработка & Код',
        badge: 'Инженерия',
        title: 'Собираем и настраиваем',
        duration: 'Дни 3–7',
        description: 'Делаем верстку, подключаем форму отправки заявок, онлайн-оплату и настраиваем так, чтобы новые заказы мгновенно приходили вам на телефон в Telegram.',
        deliverables: ['Готовый работающий сайт', 'Подключенная оплата СБП/картами', 'Мгновенные уведомления в Telegram'],
        clientRole: 'Наблюдаете за ходом сборки по тестовой ссылке',
        agencyRole: 'Программируем фронтенд, подключаем ботов и платежи',
        icon: 'Code2'
      },
      {
        step: 4,
        phase: 'Приемка & Тестирование',
        badge: '0 ₽ аванса',
        title: 'Вы проверяете — затем оплата',
        duration: 'День 8',
        description: 'Вы лично тестируете сайт со своего смартфона: нажимаете кнопки, делаете тестовую заявку. Только когда вам всё нравится на 100% — вы оплачиваете работу.',
        deliverables: ['0% риска: оплата только за результат', 'Финальный аудит скорости и адаптивности', 'Полное отсутствие скрытых доплат'],
        clientRole: 'Тестируете функции и утверждаете результат',
        agencyRole: 'Проводим финальную полировку и передаем доступы',
        icon: 'CheckCircle2'
      },
      {
        step: 5,
        phase: 'Запуск & Масштабирование',
        badge: 'Релиз 🚀',
        title: 'Гарантия 12 месяцев и поддержка',
        duration: 'Старт продаж',
        description: 'Показываем, как менять цены, фото и текст. Включаем официальную гарантию 12 месяцев: мы всегда на связи в Telegram, устраняем сбои и помогаем развитию.',
        deliverables: ['Официальная гарантия 12 месяцев на работу сайта', 'Видеоинструкция по управлению сайтом', 'Привязка домена и SSL-сертификата', 'Постоянная поддержка в личном чате'],
        clientRole: 'Получаете заявки и клиентов с первого дня',
        agencyRole: 'Обеспечиваем стабильную работу и консультируем',
        icon: 'Rocket'
      }
    ]
  },
  en: {
    services: [
      {
        id: 'tma',
        category: 'tma' as const,
        title: 'Telegram Mini Apps & Bots',
        badge: 'Shop or service inside Telegram',
        shortDesc: 'A complete online shop, restaurant menu, or booking service built right inside Telegram. No app downloads required — opens instantly in 2 clicks.',
        fullDesc: 'We develop custom, ultra-fast web apps that live directly inside Telegram chats. Customers never leave their messenger, enjoy 1-click checkout, and all incoming leads land straight on your smartphone in real-time.',
        features: [
          'Launches in 1 click inside Telegram chats with zero install barriers',
          'Instant checkout with credit cards and local payment methods',
          'Real-time sound and push alerts for new leads in your private chat',
          'Intuitive product catalog, cart, option selectors, and delivery math',
          'Direct broadcast tools to send offers and promos to your customer base'
        ],
        technologies: ['Telegram Ecosystem', 'Instant Checkout', 'Push & Chat Alerts', 'Smartphone Optimized'],
        timeline: 'from 5 to 14 days',
        roiStat: 'Customers convert 2-3x higher than on complex traditional websites'
      },
      {
        id: 'web',
        category: 'web' as const,
        title: 'Turnkey Websites & Landing Pages',
        badge: 'For client acquisition & sales',
        shortDesc: 'Modern, pristine, and high-converting websites: from focused landing pages to multi-page corporate catalogs. Looks flawless on any smartphone.',
        fullDesc: 'We craft business websites tailored for conversion and ease of use. Clean copywriting, intuitive button hierarchy, instant contact forms, and lightning-fast loading speeds ensure your visitors never bounce.',
        features: [
          'Impeccable responsiveness across all iPhones, Androids, and desktops',
          'Every form submission alerts your Telegram and email within 1 second',
          'Sub-second page load times even on spotty cellular connections',
          'Integrated online payments, interactive maps, testimonials, and FAQ',
          'Effortless CMS: we provide video tutorials to update text and photos'
        ],
        technologies: ['Mobile-First UI', 'Sub-second Load', 'Ad-Ready SEO', 'Zero-Downtime'],
        timeline: 'from 4 to 12 days',
        roiStat: 'Generates inquiries and qualified inbound leads from day one'
      }
    ],
    advantages: [
      {
        id: 1,
        title: 'Zero Prepayment Policy',
        subtitle: '100% risk-free for you',
        description: 'We begin development without any advance payment. You review the completed website on your phone, test every feature, and pay only after you are 100% satisfied.',
        iconName: 'ShieldCheck',
        statNumber: '$0',
        statLabel: 'deposit: pay strictly for final approved results'
      },
      {
        id: 2,
        title: 'Clarity for Your Clients',
        subtitle: 'Simple, direct, and intuitive',
        description: 'Visitors immediately grasp your value proposition, pricing, and how to place an order or call. Zero confusing fluff or endless form fields.',
        iconName: 'TrendingUp',
        statNumber: '2 clicks',
        statLabel: 'for a customer to place an order or submit a lead'
      },
      {
        id: 3,
        title: 'Card & Instant Payments',
        subtitle: 'Funds go straight to your account',
        description: 'We integrate certified payment gateways: credit/debit cards and QR code payments in one click. Completely secure, automated, and compliant.',
        iconName: 'CreditCard',
        statNumber: '100%',
        statLabel: 'secure transactions with top banks and gateways'
      },
      {
        id: 4,
        title: 'Rapid Delivery from 5 Days',
        subtitle: 'No endless delays or stalling',
        description: 'We respect your business timeline. No false multi-month promises: your functional website or Telegram app is live and tested within 5–10 days.',
        iconName: 'Zap',
        statNumber: '5-10 days',
        statLabel: 'average time to production release'
      },
      {
        id: 5,
        title: 'Instant Telegram Notifications',
        subtitle: 'Never miss an inquiry or call',
        description: 'The moment a visitor submits a contact form or completes a checkout, your phone receives an immediate notification with all order details.',
        iconName: 'Users',
        statNumber: '1 sec',
        statLabel: 'speed of new lead delivery directly to your chat'
      },
      {
        id: 6,
        title: '12-Month Warranty & Support',
        subtitle: 'We stay with you post-launch',
        description: 'Official 12-month guarantee covering uptime and smooth operation. We fix bugs for free, provide direct Telegram support, and guide your team.',
        iconName: 'ShieldCheck',
        statNumber: '12 mo',
        statLabel: 'included technical warranty and care'
      }
    ],
    portfolio: [
      {
        id: 'urban-lunch',
        type: 'tma' as const,
        name: 'Food Delivery & Restaurant',
        title: 'Telegram App for Food Orders & Delivery',
        subtitle: 'Food ordering in Telegram within 30 seconds: live menu, cart, and 1-click checkout',
        category: 'Telegram Mini App / Food Delivery',
        metric: '+35%',
        metricLabel: 'increase in repeat orders from regulars',
        tags: ['Appetizing Photo Menu', 'Instant Online Checkout', 'Loyalty Discounts', 'Kitchen Dispatch'],
        description: 'Guests open the restaurant menu directly in Telegram, pick dishes, choose delivery details, and pay in one tap. The kitchen instantly gets the ticket.',
        challenge: 'Customers hated downloading bulky native apps, and phone orders wasted valuable staff hours during peak dinner rushes.',
        solution: 'Built a lightweight Telegram Mini App with automated phone autofill, quick dish customization, and frictionless checkout.',
        results: [
          { label: 'Repeat Orders Growth', value: '+35%' },
          { label: 'Average Checkout Time', value: '35 seconds' },
          { label: 'Operator Hours Saved', value: 'up to 3 hrs/day' },
          { label: 'Satisfied Regulars', value: '4,500+ guests' }
        ],
        techStack: ['Telegram Mini App', 'Online Checkout', 'Kitchen Bot', 'Smart Cart'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Visual photo menu with portion sizes, allergens, and live prices',
          '1-tap item additions and customized modifications',
          'Instant card payments with zero repetitive billing data input',
          'Automated customer status updates: Accepted, Cooking, In Transit'
        ]
      },
      {
        id: 'global-trade',
        type: 'web' as const,
        name: 'Corporate Services Website',
        title: 'High-Converting Business Services Website',
        subtitle: 'Clean corporate website featuring an instant price calculator, service breakdown, and quick lead forms',
        category: 'Corporate Website / Business Services',
        metric: '99/100',
        metricLabel: 'Google PageSpeed score on mobile devices',
        tags: ['Flawless on Mobile', 'Interactive Calculator', '1-Click Lead Form', 'High Trust Factor'],
        description: 'A stylish corporate hub that explains company offerings, displays transparent pricing, and turns casual traffic into qualified appointments.',
        challenge: 'The former corporate website was sluggish, cluttered on smartphones, and visitors left without requesting consultations.',
        solution: 'Engineered a modern web portal with sub-second page loads, transparent service packages, and a frictionless inquiry workflow.',
        results: [
          { label: 'Inbound Lead Surge', value: '+45%' },
          { label: 'Page Load Benchmark', value: 'under 1 second' },
          { label: 'Mobile UX Rating', value: '100 out of 100' },
          { label: 'Search Engine Rankings', value: 'Top 3 Organic' }
        ],
        techStack: ['Modern Web App', 'Ultra-fast Speed', 'Fluid Design', 'Lead Automation'],
        deviceType: 'desktop' as const,
        featuresList: [
          'Crystal-clear value propositions for each service tier',
          'Interactive pricing estimator with instant estimate lock',
          '1-click inquiry submission with instant manager alerts',
          'Verified client testimonials, case studies, and compliance docs'
        ]
      },
      {
        id: 'fittrack',
        type: 'tma' as const,
        name: 'E-Commerce Store in Telegram',
        title: 'Full E-Commerce Experience inside Telegram',
        subtitle: 'Product catalog with search, filters, shopping cart, and 1-tap checkout',
        category: 'Telegram Mini App / E-Commerce',
        metric: '3x Sales',
        metricLabel: 'boost in repeat purchase frequency',
        tags: ['Photo Catalog', 'Frictionless Cart', 'Promo Codes', '1-Click Checkout'],
        description: 'Apparel and goods shop operating directly in Telegram chats. Shoppers browse collections, add items to cart, and check out without external redirects.',
        challenge: 'Expensive acquisition costs on standard web shops and high churn rates after first-time purchases.',
        solution: 'Launched a branded Telegram Mini App where customers can re-order favorite products in seconds from their chat list.',
        results: [
          { label: 'Repeat Orders', value: '3x more frequent' },
          { label: 'Browse to Checkout', value: 'under 1 minute' },
          { label: 'Ad Spend Reduction', value: 'up to 40% saved' },
          { label: 'Active Shoppers', value: '8,000+ customers' }
        ],
        techStack: ['Telegram Shop', 'Smart Cart', 'Secure Payments', 'Tracking Bot'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Categorized catalog with instant search and rich product cards',
          'Cart with automatic coupon deductions and bundle pricing',
          'Automated tracking notifications sent directly to customer chats',
          'Streamlined checkout via credit cards or instant payment links'
        ]
      },
      {
        id: 'lumina-booking',
        type: 'tma' as const,
        name: 'Online Booking & Scheduling',
        title: 'Automated Client Booking Service in Telegram',
        subtitle: 'Specialist selection, live schedule slots, and 1-click appointment confirmations',
        category: 'Telegram Mini App / Booking & Salon',
        metric: '-70% No-Shows',
        metricLabel: 'reduction through automated chat reminders',
        tags: ['Staff & Service Picker', 'Live Time Slots', 'Chat Reminders', 'Deposit Options'],
        description: 'Ideal solution for beauty salons, barber studios, auto services, private clinics, and tutors. Clients choose convenient dates without back-and-forth messaging.',
        challenge: 'Staff spent hours negotiating schedules manually via messaging apps, while customers frequently forgot appointments.',
        solution: 'Built an interactive visual booking calendar inside Telegram with automated reminder notifications 24 hours and 2 hours prior to visits.',
        results: [
          { label: 'No-Show Drop', value: '-70% missed visits' },
          { label: 'Staff Hours Saved', value: 'up to 3 hrs/day' },
          { label: 'Bookings via Telegram', value: '80% of total volume' },
          { label: 'Client Convenience', value: 'booked in 20 secs' }
        ],
        techStack: ['Interactive Calendar', 'Auto-Reminders', 'Staff Roster', 'Deposit System'],
        deviceType: 'mobile' as const,
        featuresList: [
          'Visual real-time calendar with available opening slots',
          'Specialist profile cards with portfolios, reviews, and rates',
          'Automated Telegram reminders sent before appointment time',
          'Optional small deposit booking hold to secure calendar spots'
        ]
      }
    ],
    workflow: [
      {
        step: 1,
        phase: 'Concept & Brief',
        badge: 'Kickoff',
        title: 'Discovery & Requirements',
        duration: 'Day 1',
        description: 'We explore your business goals, target audience, and offering. Together we choose the optimal web/bot format and freeze a fixed quote with zero hidden fees.',
        deliverables: ['Clear architecture blueprint', 'Fixed transparent budget', 'Curated aesthetic references'],
        clientRole: 'Share goals and existing brand materials',
        agencyRole: 'Competitor audit, roadmap draft, and contract',
        icon: 'FileText'
      },
      {
        step: 2,
        phase: 'Prototype & UI',
        badge: 'Visuals',
        title: 'Design & Interactive Prototype',
        duration: 'Days 2–3',
        description: 'We create crisp, modern UI layouts. You preview exactly how your project looks on smartphones and desktop screens, approving copy and button flows.',
        deliverables: ['High-fidelity responsive UI', 'Persuasive sales copywriting', 'Clickable interactive prototype'],
        clientRole: 'Review layouts directly on your smartphone',
        agencyRole: 'High-conversion UX design and copy crafting',
        icon: 'Palette'
      },
      {
        step: 3,
        phase: 'Engineering & Code',
        badge: 'Development',
        title: 'Frontend & API Integration',
        duration: 'Days 3–7',
        description: 'We build the code, hook up payment gateways, set up instant lead forwarding, and ensure real-time sound and push alerts arrive on your phone.',
        deliverables: ['Production-ready web application', 'Active payment gateway integration', 'Instant Telegram notification pipeline'],
        clientRole: 'Follow live progress on staging preview link',
        agencyRole: 'Clean frontend coding, bot logic, and webhooks',
        icon: 'Code2'
      },
      {
        step: 4,
        phase: 'Review & Acceptance',
        badge: '$0 Deposit',
        title: 'You Test Everything — Then Pay',
        duration: 'Day 8',
        description: 'You test the full user flow on your smartphone: click buttons, submit test inquiries, and inspect responsiveness. Pay only when you are 100% satisfied.',
        deliverables: ['0% financial risk: pay strictly for results', 'Final cross-device performance audit', 'Zero hidden costs or surcharges'],
        clientRole: 'Test functionality and sign off on completion',
        agencyRole: 'Final polish, optimizations, and credential transfer',
        icon: 'CheckCircle2'
      },
      {
        step: 5,
        phase: 'Launch & Warranty',
        badge: 'Live Release 🚀',
        title: '12-Month Technical Care',
        duration: 'Go Live',
        description: 'We guide you on updating content and prices. Our 12-month warranty takes effect: we stay available in private chat, fix bugs free, and support growth.',
        deliverables: ['12 months official warranty on stability', 'Video tutorials on content management', 'Custom domain & SSL certificate binding', 'Dedicated direct chat support'],
        clientRole: 'Welcome incoming leads and customers',
        agencyRole: 'Ensure 99.9% uptime and ongoing tech guidance',
        icon: 'Rocket'
      }
    ]
  }
};
