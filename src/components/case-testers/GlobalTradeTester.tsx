import React, { useState } from 'react';
import { 
  Building2, Calculator, CheckCircle2, Shield, ArrowRight, 
  Smartphone, Monitor, Zap, Star, Phone, Send, Clock, Layers,
  FileCheck, Award, TrendingUp, Sparkles, MapPin, ChevronRight, User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fireConfetti } from '../../utils/confetti';
import { useLanguage } from '../../context/LanguageContext';

interface CompletedProject {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  area: string;
  timeline: string;
  timelineEn: string;
  budget: string;
  image: string;
  client: string;
  clientEn: string;
}

const COMPLETED_PROJECTS: CompletedProject[] = [
  {
    id: 'p1',
    title: 'Штаб-квартира IT-холдинга',
    titleEn: 'IT Holding HQ & Open Space',
    category: 'Офис / Коворкинг',
    categoryEn: 'Office / Coworking',
    area: '480 м²',
    timeline: '45 дней',
    timelineEn: '45 days',
    budget: '5.4 млн ₽',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    client: 'ООО "Диджитал Спейс"',
    clientEn: 'Digital Space LLC'
  },
  {
    id: 'p2',
    title: 'Флагманский ресторан и бар',
    titleEn: 'Flagship Restaurant & Bar',
    category: 'Коммерческая недвижимость',
    categoryEn: 'Commercial Hospitality',
    area: '290 м²',
    timeline: '35 дней',
    timelineEn: '35 days',
    budget: '4.1 млн ₽',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    client: 'Gastro Group Moscow',
    clientEn: 'Gastro Group'
  },
  {
    id: 'p3',
    title: 'Логистический комплекс класса А',
    titleEn: 'Class-A Logistics Terminal',
    category: 'Склад и производство',
    categoryEn: 'Warehouse & Industrial',
    area: '1 250 м²',
    timeline: '60 дней',
    timelineEn: '60 days',
    budget: '11.8 млн ₽',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
    client: 'ТрансЛогистик',
    clientEn: 'TransLogistic Corp'
  },
];

export const GlobalTradeTester: React.FC = () => {
  const { language } = useLanguage();
  const isRu = language === 'ru';

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
  const [clientName, setClientName] = useState<string>(isRu ? 'Александр Мельников' : 'Alexander Miller');
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
      fireConfetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#2563EB', '#38BDF8', '#10B981']
      });

      setLeadNotification({
        received: true,
        name: clientName,
        phone: clientPhone,
        time: isRu ? 'Только что (0.6 сек)' : 'Just now (0.6s)',
        estimate: `${estimatedTotal.toLocaleString('ru-RU')} ₽`
      });
    }, 500);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 items-center lg:items-start justify-center p-1 sm:p-4 w-full">
      
      {/* Desktop / Responsive Web Browser Simulator Frame */}
      <div 
        className={`w-full rounded-2xl sm:rounded-3xl border border-cyan-900/40 dark:border-cyan-900/40 bg-white dark:bg-[#0A0F1D] shadow-2xl overflow-hidden transition-all duration-300 ${
          deviceMode === 'mobile' ? 'max-w-[340px] sm:max-w-[370px]' : 'max-w-full sm:max-w-[580px] lg:max-w-[610px]'
        }`}
      >
        
        {/* Browser Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-[#0E1526] border-b border-slate-200 dark:border-cyan-900/30 gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* URL Search bar */}
          <div className="rounded-full bg-white dark:bg-[#070B14] px-3 py-1 text-[10px] sm:text-[11px] font-mono text-slate-700 dark:text-cyan-300 flex items-center gap-1.5 border border-slate-200 dark:border-cyan-900/40 truncate max-w-[200px] sm:max-w-none flex-1 justify-center shadow-inner">
            <Shield className="h-3 w-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://nordic-engineering.pro</span>
            <span className="text-[8px] text-emerald-400 font-bold ml-1 hidden xs:inline">SSL 256-bit</span>
          </div>

          {/* Device toggle buttons */}
          <div className="flex items-center gap-1 bg-slate-200 dark:bg-[#131C31] p-0.5 rounded-lg shrink-0 border border-slate-300 dark:border-cyan-900/30">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`p-1 rounded transition-colors ${deviceMode === 'desktop' ? 'bg-white dark:bg-[#0A0F1D] text-cyan-400 shadow-xs' : 'text-slate-500 hover:text-slate-300'}`}
              title={isRu ? 'Режим компьютера' : 'Desktop view'}
            >
              <Monitor className="h-3 w-3" />
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`p-1 rounded transition-colors ${deviceMode === 'mobile' ? 'bg-white dark:bg-[#0A0F1D] text-cyan-400 shadow-xs' : 'text-slate-500 hover:text-slate-300'}`}
              title={isRu ? 'Режим смартфона' : 'Mobile view'}
            >
              <Smartphone className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Website Header Bar Inside Simulator */}
        <div className="px-3.5 py-2.5 bg-white dark:bg-[#0B1122] border-b border-slate-100 dark:border-cyan-900/30 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-cyan-500/20">
              N
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white">Nordic Engineering</span>
                <span className="text-[7px] bg-cyan-500/20 text-cyan-400 px-1 rounded font-bold">
                  {isRu ? 'СРО №481' : 'ISO 9001'}
                </span>
              </div>
              <p className="text-[8px] text-slate-500 dark:text-slate-400">
                {isRu ? 'Проектирование и генподряд B2B' : 'Commercial EPC & General Contractor'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-slate-700 dark:text-slate-300">
              <Phone className="h-3 w-3 text-cyan-500" />
              <span>+7 (495) 890-21-40</span>
            </div>
            <button
              onClick={() => setActiveTab('lead')}
              className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold shadow-md shadow-cyan-600/30 transition-all"
            >
              {isRu ? 'Консультация' : 'Consultation'}
            </button>
          </div>
        </div>

        {/* Website Sub-Navigation Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1.5 bg-slate-50 dark:bg-[#0E1528] border-b border-slate-200 dark:border-cyan-900/30 text-[10px] font-bold">
          {[
            { id: 'calculator', label: isRu ? 'Калькулятор' : 'Calculator' },
            { id: 'projects', label: isRu ? 'Объекты' : 'Portfolio' },
            { id: 'lead', label: isRu ? 'Заявка' : 'Quote' },
            { id: 'speed', label: isRu ? 'Скорость 99' : 'Speed 99' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-1.5 px-1 rounded-lg text-center transition-all ${
                activeTab === t.id
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30 font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Website Viewport Content */}
        <div className="h-[410px] sm:h-[455px] overflow-y-auto p-3 sm:p-4 text-slate-800 dark:text-slate-200 text-xs scrollbar-none bg-gradient-to-b from-white dark:from-[#090E1B] to-slate-50 dark:to-[#070B15]">
          
          {/* TAB 1: INTERACTIVE COST ESTIMATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-3.5">
              
              {/* Mini Hero Callout */}
              <div className="rounded-xl bg-cyan-50 dark:bg-[#101A2F] border border-cyan-200 dark:border-cyan-900/50 p-2.5 shadow-xs">
                <div className="flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300 font-bold text-xs">
                  <Calculator className="h-3.5 w-3.5 text-cyan-500" />
                  <span>{isRu ? 'Интерактивный расчет сметы и сроков онлайн:' : 'Interactive Cost & Timeline Estimator:'}</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
                  {isRu 
                    ? 'Узнайте ориентировочный бюджет и сроки реализации вашего коммерческого объекта за 1 минуту.' 
                    : 'Calculate an accurate budget and execution timeline for your commercial facility in 1 minute.'}
                </p>
              </div>

              {/* 1. Building Type */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  {isRu ? '1. Тип вашего объекта:' : '1. Building / Facility Type:'}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'office', label: isRu ? '🏢 Офис / Коворкинг' : '🏢 Office / Coworking' },
                    { id: 'retail', label: isRu ? '🛍️ Магазин / Ритейл' : '🛍️ Retail & Stores' },
                    { id: 'warehouse', label: isRu ? '📦 Склад / Производство' : '📦 Warehouse / Factory' },
                    { id: 'residential', label: isRu ? '🏡 Жилой комплекс' : '🏡 Residential Complex' },
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => setBuildingType(b.id as any)}
                      className={`p-2 rounded-xl border text-left text-[10px] font-semibold transition-all ${
                        buildingType === b.id
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-cyan-900/20 bg-white dark:bg-[#0E1528] text-slate-600 dark:text-slate-400 hover:border-cyan-500/40'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Area Slider */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E1528] border border-slate-200 dark:border-cyan-900/30">
                <div className="flex justify-between items-center text-[10px] mb-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {isRu ? '2. Площадь помещения:' : '2. Total Area Size:'}
                  </span>
                  <span className="font-black text-xs text-cyan-600 dark:text-cyan-400 font-mono">{areaSquareMeters} m²</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="1200"
                  step="10"
                  value={areaSquareMeters}
                  onChange={(e) => setAreaSquareMeters(Number(e.target.value))}
                  className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-slate-400 mt-1">
                  <span>40 m² ({isRu ? 'малый офис' : 'compact office'})</span>
                  <span>500 m²</span>
                  <span>1 200 m² ({isRu ? 'крупный объект' : 'large facility'})</span>
                </div>
              </div>

              {/* 3. Package Tier */}
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  {isRu ? '3. Уровень отделки и материалов:' : '3. Finishing & Specs Tier:'}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { 
                      id: 'standard', 
                      label: isRu ? 'Базовый' : 'Standard', 
                      desc: isRu ? 'Чистовой ремонт' : 'Basic fit-out' 
                    },
                    { 
                      id: 'business', 
                      label: isRu ? 'Бизнес' : 'Business', 
                      desc: isRu ? 'Под ключ (хит)' : 'Turnkey (Popular)' 
                    },
                    { 
                      id: 'premium', 
                      label: isRu ? 'Премиум' : 'Premium', 
                      desc: isRu ? 'BIM 3D авторский' : 'BIM 3D Bespoke' 
                    },
                  ].map(tier => (
                    <button
                      key={tier.id}
                      onClick={() => setPackageTier(tier.id as any)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        packageTier === tier.id
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-900 dark:text-cyan-300 font-bold shadow-xs'
                          : 'border-slate-200 dark:border-cyan-900/20 bg-white dark:bg-[#0E1528] text-slate-600 dark:text-slate-400'
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
                  {isRu ? '4. Дополнительные инженерные системы:' : '4. Engineering & Add-ons:'}
                </span>
                
                <label className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0E1528] border border-slate-200 dark:border-cyan-900/30 cursor-pointer hover:border-cyan-500/40 transition-colors">
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {isRu ? 'Приточно-вытяжная вентиляция' : 'Supply & Exhaust HVAC System'}
                    </span>
                    <span className="text-[8px] text-slate-400 block">
                      {isRu ? 'Монтаж воздуховодов, автоматики и чиллеров' : 'Ductwork, automated dampers and chillers'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={optVentilation}
                    onChange={(e) => setOptVentilation(e.target.checked)}
                    className="h-3.5 w-3.5 accent-cyan-500 rounded"
                  />
                </label>

                <label className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-[#0E1528] border border-slate-200 dark:border-cyan-900/30 cursor-pointer hover:border-cyan-500/40 transition-colors">
                  <div className="text-[10px]">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {isRu ? 'Полный 3D дизайн-проект' : 'Complete 3D Architecture & BIM'}
                    </span>
                    <span className="text-[8px] text-slate-400 block">
                      {isRu ? 'Планы расстановки, ведомость отделки и визуализации' : 'Furniture plans, specification sheets and photoreal renders'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={optDesignProject}
                    onChange={(e) => setOptDesignProject(e.target.checked)}
                    className="h-3.5 w-3.5 accent-cyan-500 rounded"
                  />
                </label>
              </div>

              {/* Calculation Results Card */}
              <div className="p-3 rounded-2xl bg-[#090E1C] text-white border border-cyan-900/50 space-y-2 shadow-lg shadow-cyan-950/50">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{isRu ? 'Предварительная смета:' : 'Estimated Cost:'}</span>
                  <span className="font-display text-base font-black text-cyan-400 font-mono">
                    {estimatedTotal.toLocaleString('ru-RU')} ₽
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[8px]">{isRu ? 'Срок реализации:' : 'Delivery Time:'}</span>
                    <span className="font-bold text-white flex items-center gap-1">
                      <Clock className="h-3 w-3 text-cyan-400" />
                      ~{estimatedDays} {isRu ? 'рабочих дней' : 'working days'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[8px]">{isRu ? 'Оптовая скидка на материалы:' : 'Wholesale materials discount:'}</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {isRu ? 'до' : 'up to'} {estimatedSavings.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('lead')}
                  className="mt-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-600/30 active:scale-95 transition-all"
                >
                  <span>{isRu ? 'Зафиксировать смету и получить расчет' : 'Lock in Estimate & Request Quote'}</span>
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
                  {isRu ? 'Реализованные объекты (340+):' : 'Completed Projects (340+):'}
                </span>
                <span className="text-[10px] text-cyan-500 font-semibold">
                  {isRu ? 'Гарантия 5 лет по договору' : '5-year contractual warranty'}
                </span>
              </div>

              <div className="space-y-2.5">
                {COMPLETED_PROJECTS.map(proj => (
                  <div
                    key={proj.id}
                    className="rounded-xl border border-slate-200 dark:border-cyan-900/30 bg-white dark:bg-[#0E1528] overflow-hidden shadow-xs hover:border-cyan-500 transition-all"
                  >
                    <div className="h-28 w-full bg-slate-950 relative overflow-hidden">
                      <img
                        src={proj.image}
                        alt={isRu ? proj.title : proj.titleEn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-[9px] text-white font-bold backdrop-blur-xs">
                        {isRu ? proj.category : proj.categoryEn}
                      </div>
                      <div className="absolute bottom-2 right-2 rounded-md bg-cyan-600 px-2 py-0.5 text-[9px] text-white font-bold font-mono">
                        {proj.budget}
                      </div>
                    </div>

                    <div className="p-2.5">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                        {isRu ? proj.title : proj.titleEn}
                      </h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">
                        {isRu ? 'Заказчик:' : 'Client:'} {isRu ? proj.client : proj.clientEn}
                      </p>

                      <div className="flex items-center justify-between text-[9px] text-slate-600 dark:text-slate-300 mt-2 pt-2 border-t border-slate-100 dark:border-cyan-900/30">
                        <span>{isRu ? 'Площадь:' : 'Area:'} <strong>{proj.area}</strong></span>
                        <span>{isRu ? 'Срок сдачи:' : 'Timeline:'} <strong>{isRu ? proj.timeline : proj.timelineEn}</strong></span>
                        <span className="text-emerald-500 font-bold">{isRu ? '✓ Сдано в срок' : '✓ On time'}</span>
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
              <div className="rounded-xl bg-slate-50 dark:bg-[#0E1528] p-3 border border-slate-200 dark:border-cyan-900/30">
                <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                  {isRu ? 'Получить детальный расчет и выезд главного инженера' : 'Get Detailed Breakdown & Book Lead Engineer Visit'}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">
                  {isRu 
                    ? `Заполните форму — предварительная смета (${estimatedTotal.toLocaleString('ru-RU')} ₽) прикрепится автоматически.` 
                    : `Fill out the form — your estimate (${estimatedTotal.toLocaleString('ru-RU')} ₽) attaches automatically.`}
                </p>

                <form onSubmit={handleSendLead} className="mt-3 space-y-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      {isRu ? 'Ваше имя или название компании:' : 'Your name or company name:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-cyan-900/40 bg-white dark:bg-[#070B14] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
                      {isRu ? 'Номер телефона для связи (Telegram/WhatsApp):' : 'Phone number (Telegram / WhatsApp):'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-cyan-900/40 bg-white dark:bg-[#070B14] text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    {isSubmittingLead ? (
                      <span>{isRu ? 'Отправка заявки...' : 'Sending request...'}</span>
                    ) : (
                      <>
                        <Send className="h-3 w-3" />
                        <span>{isRu ? 'Отправить заявку директору' : 'Send Quote Request to Director'}</span>
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
                    className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500 text-white space-y-1.5 shadow-xl shadow-cyan-950/60"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1.5 font-bold text-cyan-300">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        {isRu ? 'Уведомление в Telegram руководителю:' : 'Telegram Alert to Executive:'}
                      </span>
                      <span className="text-slate-400 text-[9px]">{leadNotification.time}</span>
                    </div>

                    <div className="bg-[#070B14] p-2 rounded-lg font-mono text-[9px] space-y-0.5 text-slate-200 border border-cyan-900/30">
                      <div>⚡ <strong>{isRu ? 'Новый лид с сайта компании!' : 'New Lead from Corporate Website!'}</strong></div>
                      <div>👤 {isRu ? 'Клиент:' : 'Client:'} {leadNotification.name}</div>
                      <div>📞 {isRu ? 'Телефон:' : 'Phone:'} {leadNotification.phone}</div>
                      <div>📐 {isRu ? 'Расчет:' : 'Scope:'} {areaSquareMeters} m² ({buildingType})</div>
                      <div>💰 {isRu ? 'Предварительно:' : 'Estimate:'} {leadNotification.estimate}</div>
                      <div>🚀 {isRu ? 'Скорость доставки заявки:' : 'Delivery latency:'} 0.6s</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* TAB 4: PAGESPEED & SEO METRICS AUDIT */}
          {activeTab === 'speed' && (
            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E1528] border border-slate-200 dark:border-cyan-900/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {isRu ? 'Аудит Google PageSpeed & Яндекс:' : 'Google PageSpeed & Core Web Vitals:'}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[9px] font-black border border-emerald-500/30">
                    {isRu ? 'ЭТАЛОН 99/100' : 'BENCHMARK 99/100'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-[#070B14] border border-slate-200 dark:border-cyan-900/30">
                    <div className="text-xl font-black text-emerald-400 font-mono">99</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Performance</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-[#070B14] border border-slate-200 dark:border-cyan-900/30">
                    <div className="text-xl font-black text-cyan-400 font-mono">100</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">SEO</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white dark:bg-[#070B14] border border-slate-200 dark:border-cyan-900/30">
                    <div className="text-xl font-black text-indigo-400 font-mono">100</div>
                    <div className="text-[8px] text-slate-400 font-bold uppercase">Accessibility</div>
                  </div>
                </div>

                <div className="space-y-1 text-[10px] text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-cyan-900/30">
                    <span>First Contentful Paint (FCP):</span>
                    <strong className="text-emerald-400 font-mono">{isRu ? '0.4 сек' : '0.4s'}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-cyan-900/30">
                    <span>Speed Index:</span>
                    <strong className="text-emerald-400 font-mono">{isRu ? '0.7 сек' : '0.7s'}</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Cumulative Layout Shift (CLS):</span>
                    <strong className="text-emerald-400 font-mono">0.00 ({isRu ? 'Идеально' : 'Perfect'})</strong>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-[#101A2F] border border-cyan-200 dark:border-cyan-900/50 text-[10px] text-slate-700 dark:text-slate-300">
                <strong>{isRu ? 'Почему это важно для бизнеса:' : 'Why this matters for your business:'}</strong>{' '}
                {isRu 
                  ? 'Сайты с мгновенной скоростью получают на 45% больше заявок, так как посетители с рекламы не закрывают страницу из-за ожидания загрузки.' 
                  : 'Blazing-fast websites generate 45% more conversions because paid traffic bounces drop to near zero with instantaneous loading.'}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Side Technical & Business Highlights */}
      <div className="w-full max-w-md space-y-3.5 text-slate-700 dark:text-slate-300 text-xs">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-cyan-200/80 dark:border-cyan-900/40 bg-white dark:bg-[#0D1322] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-500" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
              {isRu ? 'Что получает компания от такого сайта:' : 'What your enterprise gains from this platform:'}
            </h4>
          </div>

          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Клиенты сразу видят цены и смету:' : 'Instant transparent cost breakdown:'}</strong>{' '}
                {isRu 
                  ? 'Интерактивный калькулятор отсекает нецелевые звонки и подогревает клиентов перед разговором с менеджером.' 
                  : 'Interactive calculator filters unqualified leads and primes decision makers with realistic estimates.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? '0 секунд задержки заявок:' : 'Zero-latency lead routing:'}</strong>{' '}
                {isRu 
                  ? 'Как только посетитель нажал кнопку, уведомление с деталями сметы уже вибрирует у директора или в отделе продаж в Telegram.' 
                  : 'Instant webhook notification hits Telegram or your CRM within 0.6s with full calculator parameters.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Идеально на смартфонах и в рекламе:' : 'Flawless mobile & ad traffic conversion:'}</strong>{' '}
                {isRu 
                  ? '75% заказчиков смотрят сайты с телефонов. Наш адаптивный макет загружается меньше чем за секунду.' 
                  : 'Over 75% of B2B decision makers browse on mobile. Our adaptive architecture renders sub-second.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Высокое доверие и статус:' : 'High authority & brand status:'}</strong>{' '}
                {isRu 
                  ? 'Портфолио с реальными объектами, лицензиями и отзывами обосновывает премиальную стоимость ваших услуг.' 
                  : 'Structured case portfolio with verifiable budgets, timelines, and licenses justifies premium pricing.'}
              </span>
            </li>
          </ul>

          {/* Quick Scenario Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-cyan-900/30 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
              {isRu ? 'Попробуйте сценарии прямо сейчас:' : 'Try instant test scenarios:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('calculator');
                  setBuildingType('retail');
                  setAreaSquareMeters(350);
                }}
                className="p-2 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 text-left border border-cyan-200/60 dark:border-cyan-900/40 hover:border-cyan-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '1. Рассчитать магазин' : '1. Estimate Retail'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">
                  {isRu ? '350 м² ритейла' : '350 m² space'}
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('lead');
                  setIsSubmittingLead(false);
                }}
                className="p-2 rounded-xl bg-cyan-50/50 dark:bg-cyan-950/20 text-left border border-cyan-200/60 dark:border-cyan-900/40 hover:border-cyan-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '2. Отправить заявку' : '2. Send Lead'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">
                  {isRu ? 'Тест Telegram-уведомления' : 'Test Telegram webhook'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
