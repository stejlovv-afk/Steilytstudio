import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Check, Sparkles, Star, ChevronRight, 
  MapPin, ShieldCheck, Heart, Phone, MessageSquare, AlertCircle,
  QrCode, Share2, Award, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fireConfetti } from '../../utils/confetti';
import { useLanguage } from '../../context/LanguageContext';

interface Specialist {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  roleEn: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  experienceEn: string;
  photo: string;
}

interface Service {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  price: number;
  duration: string;
  durationEn: string;
  description: string;
  descriptionEn: string;
  photo: string;
  badge?: string;
  badgeEn?: string;
}

const SPECIALISTS: Specialist[] = [
  { 
    id: 'spec_1', 
    name: 'Алена Соколова', 
    nameEn: 'Elena Sokolova',
    role: 'Топ-стилист & Арт-директор', 
    roleEn: 'Top Stylist & Creative Director',
    rating: 5.0, 
    reviewsCount: 142, 
    experience: '7 лет опыта', 
    experienceEn: '7 years exp.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'spec_2', 
    name: 'Екатерина Миронова', 
    nameEn: 'Catherine Mironova',
    role: 'Ведущий колорист & Трихолог', 
    roleEn: 'Master Colorist & Trichologist',
    rating: 4.92, 
    reviewsCount: 98, 
    experience: '5 лет опыта', 
    experienceEn: '5 years exp.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'spec_3', 
    name: 'Дарья Романова', 
    nameEn: 'Daria Romanova',
    role: 'Мастер премиум-маникюра', 
    roleEn: 'Senior Nail Artist & Care',
    rating: 4.96, 
    reviewsCount: 184, 
    experience: '6 лет опыта', 
    experienceEn: '6 years exp.',
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80' 
  },
];

const SERVICES: Service[] = [
  { 
    id: 'serv_1', 
    name: 'Окрашивание AirTouch / Balayage', 
    nameEn: 'AirTouch / Balayage Coloring',
    category: 'Волосы', 
    categoryEn: 'Hair',
    price: 8500, 
    duration: '180 мин', 
    durationEn: '180 min',
    description: 'Мягкий естественный градиент, защита структуры Olaplex и тонирование премиум-красителем.',
    descriptionEn: 'Seamless natural gradient, Olaplex bond reinforcement, and luxury gloss toning.',
    photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    badge: 'Топ выбор',
    badgeEn: 'Top Pick'
  },
  { 
    id: 'serv_2', 
    name: 'Авторская стрижка & Укладка Dyson', 
    nameEn: 'Signature Haircut & Dyson Blowout',
    category: 'Волосы', 
    categoryEn: 'Hair',
    price: 3200, 
    duration: '60 мин', 
    durationEn: '60 min',
    description: 'Индивидуальный подбор формы под овал лица, спа-уход для кожи головы и финишная укладка.',
    descriptionEn: 'Bespoke precision cutting, relaxing scalp spa treatment, and polished Dyson styling.',
    photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'serv_3', 
    name: 'Smart-маникюр с покрытием Luxio', 
    nameEn: 'Smart Manicure & Luxio Gel',
    category: 'Ногти', 
    categoryEn: 'Nails',
    price: 2600, 
    duration: '75 мин', 
    durationEn: '75 min',
    description: 'Аппаратная бережная обработка кутикулы, выравнивание ногтевой пластины, стойкое покрытие.',
    descriptionEn: 'Gentle precision e-file care, nail plate alignment, and flawless long-wear gel.',
    photo: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'serv_4', 
    name: 'Глубокий СПА-уход "Абсолютное счастье"', 
    nameEn: 'Deep Hair Spa "Absolute Happiness"',
    category: 'СПА-уход', 
    categoryEn: 'Spa Care',
    price: 4900, 
    duration: '90 мин', 
    durationEn: '90 min',
    description: 'Многоступенчатое восстановление Lebel, молекулярное питание и ультразвуковой утюжок.',
    descriptionEn: 'Multi-step Japanese Lebel hair therapy, deep molecular hydration and ultrasonic sealing.',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    badge: 'Новинка',
    badgeEn: 'New'
  },
];

const TIME_SLOTS = [
  { time: '11:00', available: true },
  { time: '12:30', available: false },
  { time: '14:00', available: true },
  { time: '16:30', available: true },
  { time: '18:00', available: false },
  { time: '19:30', available: true },
];

export const LuminaBookingTester: React.FC = () => {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  const dates = [
    { day: isRu ? 'Пн' : 'Mon', num: '18', full: isRu ? '18 авг' : 'Aug 18' },
    { day: isRu ? 'Вт' : 'Tue', num: '19', full: isRu ? '19 авг' : 'Aug 19' },
    { day: isRu ? 'Ср' : 'Wed', num: '20', full: isRu ? '20 авг' : 'Aug 20' },
    { day: isRu ? 'Чт' : 'Thu', num: '21', full: isRu ? '21 авг' : 'Aug 21' },
    { day: isRu ? 'Пт' : 'Fri', num: '22', full: isRu ? '22 авг' : 'Aug 22' },
  ];

  const [step, setStep] = useState<'service' | 'specialist' | 'datetime' | 'confirmation' | 'success'>('service');
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(SPECIALISTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>(isRu ? '18 авг' : 'Aug 18');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [paymentType, setPaymentType] = useState<'deposit' | 'salon'>('deposit');
  const [userName, setUserName] = useState<string>(isRu ? 'Виктория Орлова' : 'Victoria Orlova');
  const [userPhone, setUserPhone] = useState<string>('+7 (999) 450-12-88');
  const [tgNotificationEnabled, setTgNotificationEnabled] = useState<boolean>(true);
  const [bookingCode, setBookingCode] = useState<number>(58204);

  const handleFinishBooking = () => {
    fireConfetti({
      particleCount: 65,
      spread: 65,
      origin: { y: 0.65 },
      colors: ['#F43F5E', '#FB7185', '#FBBF24', '#F472B6']
    });
    setBookingCode(Math.floor(50000 + Math.random() * 40000));
    setStep('success');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 items-center lg:items-start justify-center p-1 sm:p-4">
      
      {/* Smartphone TMA Frame Simulator with Haute Beauté Styling */}
      <div className="w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[365px] rounded-[36px] sm:rounded-[44px] border-[5px] sm:border-[7px] border-[#1C121A] bg-[#120B11] p-2 sm:p-3.5 shadow-2xl ring-1 ring-rose-500/20 relative overflow-hidden">
        
        {/* Dynamic Island */}
        <div className="mx-auto flex items-center justify-between w-24 sm:w-28 h-3.5 sm:h-4 rounded-full bg-[#1A0F17] px-2.5 mb-2 border border-rose-500/10">
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-[#2A1725]" />
          <div className="h-1 sm:h-1.5 w-8 sm:w-10 rounded-full bg-[#2A1725]" />
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-rose-500/70" />
        </div>

        {/* Telegram Header Bar */}
        <div className="pt-2 pb-2.5 px-2.5 border-b border-rose-500/20 bg-[#1D111C] rounded-t-[24px] sm:rounded-t-[30px] flex items-center justify-between">
          <button
            onClick={() => {
              if (step === 'specialist') setStep('service');
              else if (step === 'datetime') setStep('specialist');
              else if (step === 'confirmation') setStep('datetime');
              else if (step === 'success') setStep('service');
            }}
            className="text-[11px] text-rose-400 font-semibold hover:underline"
          >
            {step === 'service' ? (isRu ? 'Закрыть' : 'Close') : (isRu ? '‹ Назад' : '‹ Back')}
          </button>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center gap-1">
              <span>Lumina Beauté & SPA</span>
              <Sparkles className="h-2.5 w-2.5 text-rose-400" />
            </div>
            <p className="text-[8px] sm:text-[9px] text-rose-300/60 font-mono">VIP Telegram Concierge</p>
          </div>
          <div className="text-[9px] font-mono text-rose-300 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded-full border border-rose-500/30">
            {step === 'service' && '1/4'}
            {step === 'specialist' && '2/4'}
            {step === 'datetime' && '3/4'}
            {step === 'confirmation' && '4/4'}
            {step === 'success' && 'VIP'}
          </div>
        </div>

        {/* Mini App Body */}
        <div className="h-[400px] sm:h-[445px] overflow-y-auto rounded-b-[24px] sm:rounded-b-[30px] bg-[#140C13] p-2.5 sm:p-3 text-rose-100 relative scrollbar-none text-xs">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 'service' && (
            <div className="space-y-2.5 pb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/70 via-pink-950/50 to-purple-950/40 border border-rose-500/30 shadow-inner">
                <div className="flex items-center gap-1.5 text-rose-300 font-bold text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                  <span>{isRu ? 'Премиум-запись в салон 24/7' : '24/7 VIP Salon Concierge'}</span>
                </div>
                <p className="text-[10px] text-rose-200/70 mt-0.5">
                  {isRu 
                    ? 'Топ-стилисты, японский SPA-уход и авторские протоколы красоты' 
                    : 'Master stylists, Japanese hair spa treatments, and bespoke beauty care'}
                </p>
              </div>

              <div className="space-y-2">
                {SERVICES.map((serv) => {
                  const servName = isRu ? serv.name : serv.nameEn;
                  const servCategory = isRu ? serv.category : serv.categoryEn;
                  const servDuration = isRu ? serv.duration : serv.durationEn;
                  const servDesc = isRu ? serv.description : serv.descriptionEn;
                  const servBadge = isRu ? serv.badge : (serv.badgeEn || serv.badge);

                  return (
                    <div
                      key={serv.id}
                      onClick={() => {
                        setSelectedService(serv);
                        setStep('specialist');
                      }}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer group flex gap-2.5 ${
                        selectedService.id === serv.id
                          ? 'border-rose-500 bg-[#261421] shadow-lg shadow-rose-950/40'
                          : 'border-rose-500/15 bg-[#1B1019] hover:border-rose-500/40 hover:bg-[#20131E]'
                      }`}
                    >
                      <img
                        src={serv.photo}
                        alt={servName}
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 rounded-xl object-cover bg-rose-950 shrink-0 border border-rose-500/20"
                      />

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[9px] font-bold text-rose-400 uppercase tracking-wider">
                              {servCategory} • {servDuration}
                            </span>
                            {servBadge && (
                              <span className="text-[8px] font-bold bg-gradient-to-r from-rose-500 to-pink-500 text-white px-1.5 py-0.2 rounded-full shadow-sm">
                                {servBadge}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-white text-xs mt-0.5 line-clamp-1 group-hover:text-rose-300 transition-colors">
                            {servName}
                          </h4>
                          <p className="text-[9px] text-rose-200/60 line-clamp-1 mt-0.5">
                            {servDesc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-rose-500/10">
                          <span className="font-black text-xs text-rose-300 font-mono">
                            {serv.price.toLocaleString('ru-RU')} ₽
                          </span>
                          <span className="text-[10px] font-bold text-rose-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                            {isRu ? 'Выбрать' : 'Select'} <ChevronRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SPECIALIST SELECTION */}
          {step === 'specialist' && (
            <div className="space-y-2.5 pb-6">
              <div className="flex items-center justify-between pb-1 border-b border-rose-500/20">
                <span className="text-[11px] font-bold text-white">
                  {isRu ? 'Выберите топ-мастера:' : 'Choose top specialist:'}
                </span>
                <span className="text-[9px] text-rose-300 truncate max-w-[140px] font-semibold">
                  {isRu ? selectedService.name : selectedService.nameEn}
                </span>
              </div>

              <div className="space-y-2">
                {SPECIALISTS.map((spec) => {
                  const specName = isRu ? spec.name : spec.nameEn;
                  const specRole = isRu ? spec.role : spec.roleEn;
                  const specExp = isRu ? spec.experience : spec.experienceEn;

                  return (
                    <div
                      key={spec.id}
                      onClick={() => {
                        setSelectedSpecialist(spec);
                        setStep('datetime');
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between gap-3 ${
                        selectedSpecialist.id === spec.id
                          ? 'border-rose-500 bg-[#261421] shadow-md shadow-rose-950/40'
                          : 'border-rose-500/15 bg-[#1B1019] hover:border-rose-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={spec.photo}
                          alt={specName}
                          referrerPolicy="no-referrer"
                          className="h-12 w-12 rounded-full object-cover border-2 border-rose-500/50 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-white text-xs truncate">{specName}</h4>
                          <p className="text-[10px] text-rose-300/70 truncate">{specRole}</p>
                          <div className="flex items-center gap-2 mt-1 text-[10px]">
                            <span className="flex items-center text-amber-300 font-bold">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                              {spec.rating}
                            </span>
                            <span className="text-rose-500/50">•</span>
                            <span className="text-rose-200/70">{spec.reviewsCount} {isRu ? 'отзывов' : 'reviews'}</span>
                            <span className="text-rose-500/50">•</span>
                            <span className="text-rose-200/70">{specExp}</span>
                          </div>
                        </div>
                      </div>

                      <ChevronRight className="h-4 w-4 text-rose-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SELECTION */}
          {step === 'datetime' && (
            <div className="space-y-3 pb-6">
              <div>
                <span className="text-[11px] font-bold text-white block mb-1.5">
                  {isRu ? '1. Выберите дату визита:' : '1. Select appointment date:'}
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {dates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedDate === d.full
                          ? 'border-rose-400 bg-gradient-to-b from-rose-500 to-rose-600 text-white font-bold shadow-md shadow-rose-600/30'
                          : 'border-rose-500/15 bg-[#1B1019] text-rose-200/60 hover:text-white'
                      }`}
                    >
                      <div className="text-[9px] uppercase font-semibold">{d.day}</div>
                      <div className="text-xs font-black mt-0.5">{d.num}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-white">
                    {isRu ? '2. Свободные окна мастера:' : '2. Stylist open slots:'}
                  </span>
                  <span className="text-[9px] text-rose-300 font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                    {isRu ? 'Есть 4 свободных окна' : '4 slots available'}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-1.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all text-center ${
                        !slot.available
                          ? 'border-rose-950/40 bg-[#150A12] text-rose-900/60 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'border-rose-400 bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-600/30'
                          : 'border-rose-500/20 bg-[#1B1019] text-rose-100 hover:border-rose-500/50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#1B1019] border border-rose-500/20 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-rose-400" />
                  <span className="text-rose-200/80">{isRu ? 'Длительность процедуры:' : 'Treatment duration:'}</span>
                </div>
                <span className="font-bold text-white">
                  {isRu ? selectedService.duration : selectedService.durationEn}
                </span>
              </div>

              <button
                onClick={() => setStep('confirmation')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>{isRu ? 'Перейти к подтверждению' : 'Proceed to Confirmation'}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & PREPAYMENT */}
          {step === 'confirmation' && (
            <div className="space-y-2.5 pb-6">
              <div className="rounded-2xl border border-rose-500/20 bg-[#1B1019] p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-rose-500/10">
                  <span className="text-rose-300/60 text-[10px]">{isRu ? 'Услуга:' : 'Service:'}</span>
                  <span className="font-bold text-white text-[11px] text-right truncate max-w-[170px]">
                    {isRu ? selectedService.name : selectedService.nameEn}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-rose-500/10">
                  <span className="text-rose-300/60 text-[10px]">{isRu ? 'Мастер:' : 'Stylist:'}</span>
                  <span className="font-bold text-white text-[11px]">
                    {isRu ? selectedSpecialist.name : selectedSpecialist.nameEn}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-rose-500/10">
                  <span className="text-rose-300/60 text-[10px]">{isRu ? 'Дата и время:' : 'Date & Time:'}</span>
                  <span className="font-bold text-rose-400 font-mono">{selectedDate}, {selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-rose-200 font-bold">{isRu ? 'Стоимость:' : 'Total Cost:'}</span>
                  <span className="text-sm font-black text-white font-mono">
                    {selectedService.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <span className="text-[10px] font-bold text-rose-300/70 block mb-1">
                  {isRu ? 'Способ подтверждения:' : 'Booking Confirmation Method:'}
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setPaymentType('deposit')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'deposit'
                        ? 'border-rose-400 bg-rose-500/25 text-white font-bold'
                        : 'border-rose-500/15 bg-[#1B1019] text-rose-300/60'
                    }`}
                  >
                    <span className="text-[10px] block">{isRu ? 'Предоплата 500 ₽' : '500 ₽ Deposit'}</span>
                    <span className="text-[8px] text-rose-300/60">{isRu ? 'Гарантия брони окна' : 'Guaranteed slot reservation'}</span>
                  </button>

                  <button
                    onClick={() => setPaymentType('salon')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'salon'
                        ? 'border-rose-400 bg-rose-500/25 text-white font-bold'
                        : 'border-rose-500/15 bg-[#1B1019] text-rose-300/60'
                    }`}
                  >
                    <span className="text-[10px] block">{isRu ? 'Оплата в салоне' : 'Pay at Salon'}</span>
                    <span className="text-[8px] text-rose-300/60">{isRu ? 'Картой или наличными' : 'Credit card or cash'}</span>
                  </button>
                </div>
              </div>

              {/* Auto Reminder Toggle */}
              <div 
                onClick={() => setTgNotificationEnabled(!tgNotificationEnabled)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1B1019] border border-rose-500/20 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-rose-400" />
                  <span className="text-[10px] text-rose-100">
                    {isRu ? 'Напоминание в Telegram за 3 часа' : 'Telegram reminder 3 hours prior'}
                  </span>
                </div>
                <div className={`h-4 w-7 rounded-full p-0.5 transition-colors ${tgNotificationEnabled ? 'bg-rose-500' : 'bg-rose-950'}`}>
                  <div className={`h-3 w-3 rounded-full bg-white transition-transform ${tgNotificationEnabled ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </div>

              <button
                onClick={handleFinishBooking}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 text-white font-bold text-xs shadow-lg shadow-rose-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="h-4 w-4 stroke-[3]" />
                <span>{isRu ? 'Завершить запись' : 'Confirm Appointment'}</span>
              </button>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE & DIGITAL PASS */}
          {step === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4 px-1 text-center flex flex-col items-center justify-center space-y-3"
            >
              <div className="h-12 w-12 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-400 shadow-md shadow-rose-500/30">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-sm font-black text-white">{isRu ? 'Вы успешно записаны!' : 'Appointment Confirmed!'}</h3>
                <p className="text-rose-200/80 text-[10px] mt-0.5">
                  {isRu 
                    ? `Электронный VIP-талон #${bookingCode} отправлен вам в Telegram` 
                    : `Digital VIP pass #${bookingCode} sent to your Telegram`}
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="rounded-2xl bg-[#1D111C] border border-rose-500/30 p-3 w-full text-left space-y-2 text-[10px] shadow-lg">
                <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
                  <div>
                    <span className="text-rose-300/60 text-[8px] block">{isRu ? 'Мастер:' : 'Stylist:'}</span>
                    <span className="font-bold text-white text-xs">
                      {isRu ? selectedSpecialist.name : selectedSpecialist.nameEn}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-rose-300/60 text-[8px] block">{isRu ? 'Время визита:' : 'Appointment:'}</span>
                    <span className="font-bold text-rose-400 text-xs font-mono">{selectedDate}, {selectedTime}</span>
                  </div>
                </div>

                <div className="text-rose-200/80 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-rose-400 shrink-0" />
                  <span>
                    {isRu ? 'Москва, ул. Тверская, 14 (Студия Lumina)' : 'Moscow, 14 Tverskaya St. (Lumina Studio)'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 text-rose-300/80 text-[9px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="h-3 w-3" />
                    {isRu ? 'Бронь подтверждена' : 'Booking verified'}
                  </span>
                  <span className="font-mono text-rose-300 font-bold">
                    {isRu ? `Талон #${bookingCode}` : `Pass #${bookingCode}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setStep('service')}
                className="text-xs font-bold text-rose-400 hover:underline"
              >
                {isRu ? '← Записаться на другую услугу' : '← Book Another Service'}
              </button>
            </motion.div>
          )}

        </div>

        {/* Bottom bar indicator */}
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-rose-500/30" />
      </div>

      {/* Side Feature & Technical Highlights Sidebar */}
      <div className="w-full max-w-md space-y-3.5 text-slate-700 dark:text-slate-300 text-xs">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-rose-200 dark:border-rose-500/20 bg-white dark:bg-[#160E15] shadow-xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-rose-500" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
              {isRu ? 'Что получает салон красоты или клиника:' : 'What beauty salons & clinics gain:'}
            </h4>
          </div>

          <ul className="space-y-2.5 text-slate-600 dark:text-rose-100/90">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? '0% пропущенных записей:' : '0% Missed Appointments:'}</strong>{' '}
                {isRu 
                  ? 'Telegram-бот автоматически отправляет напоминания за 24 ч и за 3 ч с кнопками «Подтверждаю» или «Перенести».' 
                  : 'Automated Telegram reminders sent at 24h and 3h with 1-click Confirm or Reschedule buttons.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Снижение неявок на 70%:' : '70% No-show Reduction:'}</strong>{' '}
                {isRu 
                  ? 'Возможность брать символическую предоплату (300–500 ₽) дисциплинирует гостей и исключает пустые окна.' 
                  : 'Optional nominal reservation fee (300-500 ₽) eliminates ghost clients and secures prime calendar slots.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Экономия до 3 часов в день:' : '3+ Hours Saved Daily:'}</strong>{' '}
                {isRu 
                  ? 'Администратор освобожден от рутинных переписок «А на сколько часов свободно у Алены?». ' 
                  : 'Receptionists are relieved of constant manual back-and-forth messaging about master schedules.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Синхронизация с YClients, 1C или Google Calendar:' : 'Live YClients / CRM / Calendar Sync:'}</strong>{' '}
                {isRu 
                  ? 'Свободные окна подгружаются в реальном времени без накладок.' 
                  : 'Available slots sync live across databases with zero double-booking conflicts.'}
              </span>
            </li>
          </ul>

          {/* Quick Scenario Buttons */}
          <div className="pt-3 border-t border-rose-100 dark:border-rose-500/20 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
              {isRu ? 'Попробуйте сценарии:' : 'Try interactive test scenarios:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setSelectedService(SERVICES[0]);
                  setStep('datetime');
                }}
                className="p-2 rounded-xl bg-rose-50 dark:bg-[#20131E] text-left border border-rose-200 dark:border-rose-500/30 hover:border-rose-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '1. Выбрать дату' : '1. Select Date'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-rose-300/70">
                  {isRu ? 'Слоты времени' : 'Time slots'}
                </div>
              </button>

              <button
                onClick={() => {
                  setStep('confirmation');
                }}
                className="p-2 rounded-xl bg-rose-50 dark:bg-[#20131E] text-left border border-rose-200 dark:border-rose-500/30 hover:border-rose-400 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '2. Подтверждение' : '2. Confirmation'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-rose-300/70">
                  {isRu ? 'Предоплата и талон' : 'Deposit & VIP Pass'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
