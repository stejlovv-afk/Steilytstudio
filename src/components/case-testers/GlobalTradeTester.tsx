import React, { useState } from 'react';
import { 
  Building2, Calculator, CheckCircle2, Shield, ArrowRight, 
  Smartphone, Monitor, Zap, Star, Phone, Send, Clock, Layers,
  FileCheck, Award, TrendingUp, Sparkles, MapPin, ChevronRight, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CompletedProject {
  id: string;
  title: string;
  category: string;
  area: string;
  timeline: string;
  budget: string;
  image: string;
  client: string;
}

const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'p1',
    title: 'Штаб-квартира IT-холдинга',
    category: 'Офис / Коворкинг',
    area: '480 м²',
    timeline: '45 дней',
    budget: '5.4 млн ₽',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    client: 'ООО "Диджитал Спейс"'
  },
  {
    id: 'p2',
    title: 'Флагманский ресторан и бар',
    category: 'Коммерческая недвижимость',
    area: '290 м²',
    timeline: '35 дней',
    budget: '4.1 млн ₽',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    client: 'Gastro Group Moscow'
  },
  {
    id: 'p3',
    title: 'Логистический комплекс класса А',
    category: 'Склад и производство',
    area: '1 250 м²',
    timeline: '60 дней',
    budget: '11.8 млн ₽',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    client: 'ТрансЛогистик'
  },
];

export const GlobalTradeTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'projects' | 'lead' | 'speed'>('calculator');
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  // Calculator State
  const [buildingType, setBuildingType] = useState<'office' | 'retail' | 'warehouse' | 'residential'>('office');
  const [areaSquareMeters, setAreaSquareMeters] = useState<number>(180);
  const [packageTier, setPackageTier] = useState<'standard' | 'business' | 'premium'>('business');
  const [optVentilation, setOptVentilation] = useState<boolean>(true);
  const [optDesignProject, setOptDesignProject] = useState<boolean>(true);
  const [optTurnkeyApproval, setOptTurnkeyApproval] = useState<boolean>(false);

  // Lead Form State
  const [clientName, setClientName] = useState<string>('Александр Мельников');
  const [clientPhone, setClientPhone] = useState<string>('+7 (926) 340-88-12');
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);
  const [leadNotification, setLeadNotification] = useState<{
    received: boolean;
    name: string;
    phone: string;
    time: string;
    estimate: string;
  } | null>(null);

  // Price calculation formulas
  const baseRatesPerMeter: Record<string, number> = {
    office: 14500,
    retail: 16800,
    warehouse: 9200,
    residential: 18500,
  };

  const tierMultipliers: Record<string, number> = {
    standard: 1.0,
    business: 1.35,
    premium: 1.75,
  };

  const basePrice = areaSquareMeters * baseRatesPerMeter[buildingType] * tierMultipliers[packageTier];
  const extrasCost = (optVentilation ? 180000 : 0) + 
                     (optDesignProject ? 120000 : 0) + 
                     (optTurnkeyApproval ? 95000 : 0);

  const estimatedTotal = Math.round(basePrice + extrasCost);
  const estimatedDays = Math.max(15, Math.round(areaSquareMeters * 0.2 + (packageTier === 'premium' ? 14 : 7)));
  const estimatedSavings = Math.round(estimatedTotal * 0.12); // 12% bulk materials discount

  const handleSendLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    setTimeout(() => {
      setIsSubmittingLead(false);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#2563EB', '#38BDF8', '#10B981']
        });
      } catch {}

      setLeadNotification({
        received: true,
        name: clientName,
        phone: clientPhone,
        time: 'Только что (0.6 сек)',
        estimate: `${estimatedTotal.toLocaleString('ru-RU')} ₽`
      });
    }, 500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 items-center lg:items-start justify-center p-1 sm:p-4 w-full">
      
      {/* Desktop / Responsive Web Browser Simulator Frame */}
      <div 
        className={`w-full rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0E1320] shadow-2xl overflow-hidden transition-all duration-300 ${
          deviceMode === 'mobile' ? 'max-w-[340px] sm:max-w-[370px]' : 'max-w-full sm:max-w-[580px] lg:max-w-[600px]'
        }`}
      >
        
        {/* Browser Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          {/* URL Search bar */}
          <div className="rounded-full bg-white dark:bg-slate-950 px-3 py-1 text-[10px] sm:text-[11px] font-mono text-slate-700 dark:text-slate-300 flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 truncate max-w-[200px] sm:max-w-none flex-1 justify-center">
            <Shield className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="truncate">https://nordic-engineering.pro</span>
          </div>

          {/* Device toggle buttons */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-0.5 rounded-lg shrink-0">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1 rounded ${deviceMode === 'desktop' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-xs' : 'text-slate-500'}`}
              title="Режим компьютера"
            >
              <Monitor className="h-3 w-3" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded ${deviceMode === 'mobile' ? 'bg-white dark:bg-slate-950 text-blue-600 shadow-xs' : 'text-slate-500'}`}
              title="Режим смартфона"
            >
              <Smartphone className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Website Header Bar Inside Simulator */}
        <div className="px-3.5 py-2.5 bg-white dark:bg-[#0E1320] border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
              N
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-white">Nordic Engineering</span>
              <p className="text-[8px] text-slate-500">Проектирование и объекты B2B</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300">
              <Phone className="h-3 w-3 text-blue-600" />
              <span>+7 (495) 890-21-40</span>
            </div>
            <button
              onClick={() => setActiveTab('lead')}
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-xs"
            >
              Консультация
            </button>
          </div>
        </div>

        {/* Website Sub-Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] font-bold">
          {[
            { id: 'calculator', label: 'Калькулятор' },
            { id: 'projects', label: 'Объекты' },
            { id: 'lead', label: 'Заявка' },
            { id: 'speed', label: 'Скорость 99' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-1.5 px-1 rounded-lg text-center transition-all ${
                activeTab === t.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Website Viewport Content */}
        <div className="h-[410px] sm:h-[450px] overflow-y-auto p-3 sm:p-4 text-slate-800 dark:text-slate-200 text-xs scrollbar-none">
          
          {/* TAB 1: INTERACTIVE COST ESTIMATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-3.5">
              
              {/* Mini Hero Callout */}
              <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-2.5">
                <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold text-xs">
                  <Calculator className="h-3.5 w-3.5" />
                  <span>Интерактивный расчет стоимости сметы онлайн:</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
                  Узнайте ориентировочный бюджет и сроки реализации вашего коммерческого объекта за 1 минуту.
                </p>
              </div>

              {/* 1. Building Type */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  1. Тип вашего объекта:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'office', label: '🏢 Офис / Коворкинг' },
                    { id: 'retail', label: '🛍️ Магазин / Ритейл' },
                    { id: 'warehouse', label: '📦 Склад / Производство' },
                    { id: 'residential', label: '🏡 Жилой комплекс' },
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBuildingType(b.id as any)}
                      className={`p-2 rounded-xl border text-left text-[10px] font-semibold transition-all ${
                        buildingType === b.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Area Slider */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center text-[10px] mb-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">2. Площадь помещения:</span>
                  <span className="font-black text-xs text-blue-600 dark:text-blue-400">{areaSquareMeters} м²</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="1200"
                  step="10"
                  value={areaSquareMeters}
                  onChange={(e) => setAreaSquareMeters(Number(e.target.value))}
                  className="w-full accent-blue-600 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                  <span>40 м² (малый офис)</span>
                  <span>500 м²</span>
                  <span>1 200 м² (крупный объект)</span>
                </div>
              </div>

              {/* 3. Package Tier */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  3. Уровень отделки и материалов:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'standard', label: 'Базовый', desc: 'Чистовой ремонт' },
                    { id: 'business', label: 'Бизнес', desc: 'Износостойкий' },
                    { id: 'premium', label: 'Премиум', desc: 'Дизайн-авторский' },
                  ].map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setPackageTier(tier.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        packageTier === tier.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-bold">{tier.label}</div>
                      <div className="text-[8px] opacity-75">{tier.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Extra Options */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">
                  4. Дополнительные инженерные системы:
                </span>
                
                <label className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-900 dark:text-white">Приточно-вытяжная вентиляция</span>
                    <span className="text-[8px] text-slate-400 block">Монтаж воздуховодов и чиллеров</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={optVentilation}
                    onChange={(e) => setOptVentilation(e.target.checked)}
                    className="h-3.5 w-3.5 accent-blue-600 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 cursor-pointer">
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-900 dark:text-white">Полный 3D дизайн-проект</span>
                    <span className="text-[8px] text-slate-400 block">Планы расстановки, ведомость отделки</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={optDesignProject}
                    onChange={(e) => setOptDesignProject(e.target.checked)}
                    className="h-3.5 w-3.5 accent-blue-600 rounded"
                  />
                </label>
              </div>

              {/* Calculation Results Card */}
              <div className="p-3 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Предварительная смета:</span>
                  <span className="font-display text-base font-black text-blue-400">
                    {estimatedTotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[8px]">Срок реализации:</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Clock className="h-3 w-3 text-blue-400" />
                      ~{estimatedDays} рабочих дней
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">Экономия на материалах:</span>
                    <span className="font-bold text-emerald-400">
                      до {estimatedSavings.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('lead')}
                  className="mt-2 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 active:scale-95 transition-all"
                >
                  <span>Зафиксировать смету и получить расчет</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: PORTFOLIO SHOWCASE */}
          {activeTab === 'projects' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  Реализованные объекты (340+):
                </span>
                <span className="text-[10px] text-blue-600 font-semibold">Все с гарантией 5 лет</span>
              </div>

              <div className="space-y-2.5">
                {COMPLETED_PROJECTS.map(proj => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:border-blue-500 transition-all"
                  >
                    <div className="h-28 w-full bg-slate-950 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[9px] text-white font-bold backdrop-blur-xs">
                        {proj.category}
                      </div>
                      <div className="absolute bottom-2 right-2 rounded-md bg-blue-600 px-2 py-0.5 text-[9px] text-white font-bold">
                        {proj.budget}
                      </div>
                    </div>

                    <div className="p-2.5">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{proj.title}</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Заказчик: {proj.client}</p>

                      <div className="flex items-center justify-between text-[9px] text-slate-600 dark:text-slate-300 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span>Площадь: <strong>{proj.area}</strong></span>
                        <span>Срок сдачи: <strong>{proj.timeline}</strong></span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Сдано в срок</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LEAD FORM & INSTANT TELEGRAM NOTIFICATION */}
          {activeTab === 'lead' && (
            <div className="space-y-3">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  Получить детальный расчет и выезд инженера
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">
                  Заполните 2 поля — предварительная смета ({estimatedTotal.toLocaleString('ru-RU')} ₽) прикрепится автоматически.
                </p>

                <form onSubmit={handleSendLead} className="mt-3 space-y-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      Ваше имя или название компании:
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      Номер телефона для связи (Telegram/WhatsApp):
                    </label>
                    <input
                      type="text"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingLead ? (
                      <span>Отправка заявки...</span>
                    ) : (
                      <>
                        <Send className="h-3 w-3" />
                        <span>Отправить заявку директору</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Telegram Lead Notification Simulator */}
              <AnimatePresence>
                {leadNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-blue-900/40 border border-blue-500 text-white space-y-1.5 shadow-lg"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1.5 font-bold text-blue-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        Уведомление в Telegram руководителю:
                      </span>
                      <span className="text-slate-400 text-[9px]">{leadNotification.time}</span>
                    </div>

                    <div className="bg-slate-950/80 p-2 rounded-lg font-mono text-[9px] space-y-0.5 text-slate-200">
                      <div>⚡ <strong>Новый лид с сайта компании!</strong></div>
                      <div>👤 Клиент: {leadNotification.name}</div>
                      <div>📞 Телефон: {leadNotification.phone}</div>
                      <div>📐 Расчет: {areaSquareMeters} м² ({buildingType})</div>
                      <div>💰 Предварительно: {leadNotification.estimate}</div>
                      <div>🚀 Скорость доставки заявки: 0.6 сек</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 4: PAGESPEED & SEO METRICS AUDIT */}
          {activeTab === 'speed' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Аудит Google PageSpeed & Яндекс:
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[9px] font-black">
                    ЭТАЛОН 99/100
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-xl font-black text-emerald-500">99</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Performance</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-xl font-black text-blue-500">100</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">SEO Оптимизация</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="text-xl font-black text-indigo-500">100</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Accessibility</div>
                  </div>
                </div>

                <div className="space-y-1 text-[10px] text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span>First Contentful Paint (FCP):</span>
                    <strong className="text-emerald-500">0.4 сек</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800">
                    <span>Speed Index:</span>
                    <strong className="text-emerald-500">0.7 сек</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Cumulative Layout Shift (CLS):</span>
                    <strong className="text-emerald-500">0.00 (Идеально)</strong>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 text-[10px] text-slate-700 dark:text-slate-300">
                <strong>Почему это важно для бизнеса:</strong> Сайты с мгновенной скоростью получают на 45% больше заявок, так как посетители с рекламы не закрывают страницу из-за ожидания загрузки.
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Side Technical & Business Highlights */}
      <div className="w-full max-w-md space-y-3.5 text-slate-700 dark:text-slate-300 text-xs">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
              Что получает компания от такого сайта:
            </h4>
          </div>

          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Клиенты сразу видят цены и смету:</strong> Интерактивный калькулятор отсекает нецелевые звонки и подогревает клиентов перед разговором с менеджером.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>0 секунд задержки заявок:</strong> Как только посетитель нажал кнопку, уведомление с деталями сметы уже вибрирует у директора или в отделе продаж в Telegram.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Идеально на смартфонах и в рекламе:</strong> 75% заказчиков смотрят сайты с телефонов. Наш адаптивный макет загружается меньше чем за секунду.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Высокое доверие и статус:</strong> Портфолио с реальными объектами, лицензиями и отзывами обосновывает премиальную стоимость ваших услуг.
              </span>
            </li>
          </ul>

          {/* Quick Scenario Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
              Попробуйте сценарии прямо сейчас:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('calculator');
                  setBuildingType('retail');
                  setAreaSquareMeters(350);
                }}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">1. Рассчитать магазин</div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">350 м² ритейла</div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('lead');
                  setIsSubmittingLead(false);
                }}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">2. Отправить заявку</div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">Тест Telegram-уведомления</div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
