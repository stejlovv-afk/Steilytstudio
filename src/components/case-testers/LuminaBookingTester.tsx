import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Check, Sparkles, Star, ChevronRight, 
  MapPin, ShieldCheck, Heart, Phone, MessageSquare, AlertCircle,
  QrCode, Share2, Award, ArrowLeft, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Specialist {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  experience: string;
  photo: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
  photo: string;
  badge?: string;
}

const SPECIALISTS: Specialist[] = [
  { 
    id: 'spec_1', 
    name: 'Алена Соколова', 
    role: 'Топ-стилист & Арт-директор', 
    rating: 5.0, 
    reviewsCount: 142, 
    experience: '7 лет опыта', 
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'spec_2', 
    name: 'Екатерина Миронова', 
    role: 'Ведущий колорист & Трихолог', 
    rating: 4.92, 
    reviewsCount: 98, 
    experience: '5 лет опыта', 
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' 
  },
  { 
    id: 'spec_3', 
    name: 'Дарья Романова', 
    role: 'Мастер премиум-маникюра', 
    rating: 4.96, 
    reviewsCount: 184, 
    experience: '6 лет опыта', 
    photo: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=400&q=80' 
  },
];

const SERVICES: Service[] = [
  { 
    id: 'serv_1', 
    name: 'Окрашивание AirTouch / Balayage', 
    category: 'Волосы', 
    price: 8500, 
    duration: '180 мин', 
    description: 'Мягкий естественный градиент, защита структуры Olaplex и тонирование премиум-красителем.',
    photo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80',
    badge: 'Топ выбор'
  },
  { 
    id: 'serv_2', 
    name: 'Авторская стрижка & Укладка Dyson', 
    category: 'Волосы', 
    price: 3200, 
    duration: '60 мин', 
    description: 'Индивидуальный подбор формы под овал лица, спа-уход для кожи головы и финишная укладка.',
    photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'serv_3', 
    name: 'Smart-маникюр с покрытием Luxio', 
    category: 'Ногти', 
    price: 2600, 
    duration: '75 мин', 
    description: 'Аппаратная бережная обработка кутикулы, выравнивание ногтевой пластины, стойкое покрытие.',
    photo: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=400&q=80'
  },
  { 
    id: 'serv_4', 
    name: 'Глубокий СПА-уход "Абсолютное счастье"', 
    category: 'СПА-уход', 
    price: 4900, 
    duration: '90 мин', 
    description: 'Многоступенчатое восстановление Lebel, молекулярное питание и ультразвуковой утюжок.',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
    badge: 'Новинка'
  },
];

const DATES = [
  { day: 'Пн', num: '18', full: '18 авг', active: true },
  { day: 'Вт', num: '19', full: '19 авг', active: true },
  { day: 'Ср', num: '20', full: '20 авг', active: true },
  { day: 'Чт', num: '21', full: '21 авг', active: true },
  { day: 'Пт', num: '22', full: '22 авг', active: true },
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
  const [step, setStep] = useState<'service' | 'specialist' | 'datetime' | 'confirmation' | 'success'>('service');
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(SPECIALISTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('18 авг');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full' | 'salon'>('deposit');
  const [userName, setUserName] = useState<string>('Виктория Орлова');
  const [userPhone, setUserPhone] = useState<string>('+7 (999) 450-12-88');
  const [tgNotificationEnabled, setTgNotificationEnabled] = useState<boolean>(true);
  const [bookingCode, setBookingCode] = useState<number>(58204);

  const handleFinishBooking = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#2563EB', '#EC4899', '#8B5CF6']
      });
    } catch {}
    setBookingCode(Math.floor(50000 + Math.random() * 40000));
    setStep('success');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 items-center lg:items-start justify-center p-1 sm:p-4">
      
      {/* Smartphone TMA Frame Simulator */}
      <div className="w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[365px] rounded-[36px] sm:rounded-[44px] border-[5px] sm:border-[7px] border-slate-900 bg-slate-950 p-2 sm:p-3.5 shadow-2xl ring-1 ring-slate-800 relative overflow-hidden">
        
        {/* Dynamic Island */}
        <div className="mx-auto flex items-center justify-between w-24 sm:w-28 h-3.5 sm:h-4 rounded-full bg-slate-900 px-2.5 mb-2 border border-white/5">
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-slate-800" />
          <div className="h-1 sm:h-1.5 w-8 sm:w-10 rounded-full bg-slate-800" />
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-pink-500/50" />
        </div>

        {/* Telegram Header Bar */}
        <div className="pt-2 pb-2.5 px-2.5 border-b border-white/10 bg-[#1A1926] rounded-t-[24px] sm:rounded-t-[30px] flex items-center justify-between">
          <button
            onClick={() => {
              if (step === 'specialist') setStep('service');
              else if (step === 'datetime') setStep('specialist');
              else if (step === 'confirmation') setStep('datetime');
              else if (step === 'success') setStep('service');
            }}
            className="text-[11px] text-blue-400 font-semibold hover:underline"
          >
            {step === 'service' ? 'Закрыть' : '‹ Назад'}
          </button>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center gap-1">
              <span>Lumina Beauty & Spa</span>
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            </div>
            <p className="text-[8px] sm:text-[9px] text-slate-400">Telegram Mini App</p>
          </div>
          <div className="text-[9px] font-mono text-slate-400">
            {step === 'service' && '1/4'}
            {step === 'specialist' && '2/4'}
            {step === 'datetime' && '3/4'}
            {step === 'confirmation' && '4/4'}
            {step === 'success' && '✓'}
          </div>
        </div>

        {/* Mini App Body */}
        <div className="h-[400px] sm:h-[445px] overflow-y-auto rounded-b-[24px] sm:rounded-b-[30px] bg-[#101018] p-2.5 sm:p-3 text-slate-100 relative scrollbar-none text-xs">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 'service' && (
            <div className="space-y-2.5 pb-6">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-pink-600/30 via-purple-600/20 to-blue-600/10 border border-pink-500/30">
                <div className="flex items-center gap-1.5 text-pink-300 font-bold text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                  <span>Онлайн-запись 24/7 в студию</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Выберите услугу, мастера и удобное время в 3 клика
                </p>
              </div>

              <div className="space-y-2">
                {SERVICES.map((serv) => (
                  <div
                    key={serv.id}
                    onClick={() => {
                      setSelectedService(serv);
                      setStep('specialist');
                    }}
                    className={`p-2.5 rounded-2xl border transition-all cursor-pointer group flex gap-2.5 ${
                      selectedService.id === serv.id
                        ? 'border-pink-500 bg-pink-950/30'
                        : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={serv.photo}
                      alt={serv.name}
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 rounded-xl object-cover bg-slate-950 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider">
                            {serv.category} • {serv.duration}
                          </span>
                          {serv.badge && (
                            <span className="text-[8px] font-bold bg-pink-500/20 text-pink-300 px-1.5 py-0.2 rounded">
                              {serv.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-xs mt-0.5 line-clamp-1 group-hover:text-pink-300 transition-colors">
                          {serv.name}
                        </h4>
                        <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                          {serv.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/5">
                        <span className="font-black text-xs text-white">
                          {serv.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-[10px] font-bold text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          Выбрать <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SPECIALIST SELECTION */}
          {step === 'specialist' && (
            <div className="space-y-2.5 pb-6">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-[11px] font-bold text-white">Выберите топ-мастера:</span>
                <span className="text-[9px] text-slate-400 truncate max-w-[140px]">{selectedService.name}</span>
              </div>

              <div className="space-y-2">
                {SPECIALISTS.map((spec) => (
                  <div
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpecialist(spec);
                      setStep('datetime');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between gap-3 ${
                      selectedSpecialist.id === spec.id
                        ? 'border-blue-500 bg-blue-950/30'
                        : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={spec.photo}
                        alt={spec.name}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full object-cover border-2 border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-bold text-white text-xs truncate">{spec.name}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{spec.role}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px]">
                          <span className="flex items-center text-amber-400 font-bold">
                            <Star className="h-3 w-3 fill-amber-400 mr-0.5" />
                            {spec.rating}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400">{spec.reviewsCount} отзывов</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400">{spec.experience}</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SELECTION */}
          {step === 'datetime' && (
            <div className="space-y-3 pb-6">
              <div>
                <span className="text-[11px] font-bold text-white block mb-1.5">
                  1. Выберите дату визита:
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {DATES.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedDate === d.full
                          ? 'border-blue-500 bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                          : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
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
                  <span className="text-[11px] font-bold text-white">2. Свободные окна мастера:</span>
                  <span className="text-[9px] text-emerald-400 font-semibold">● Есть свободные слоты</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1.5">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all text-center ${
                        !slot.available
                          ? 'border-slate-900 bg-slate-950 text-slate-600 cursor-not-allowed line-through'
                          : selectedTime === slot.time
                          ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-slate-300">Длительность процедуры:</span>
                </div>
                <span className="font-bold text-white">{selectedService.duration}</span>
              </div>

              <button
                onClick={() => setStep('confirmation')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
              >
                <span>Перейти к подтверждению</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* STEP 4: CONFIRMATION & PREPAYMENT */}
          {step === 'confirmation' && (
            <div className="space-y-2.5 pb-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-3 space-y-2">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400 text-[10px]">Услуга:</span>
                  <span className="font-bold text-white text-[11px] text-right truncate max-w-[170px]">
                    {selectedService.name}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400 text-[10px]">Мастер:</span>
                  <span className="font-bold text-white text-[11px]">{selectedSpecialist.name}</span>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-800">
                  <span className="text-slate-400 text-[10px]">Дата и время:</span>
                  <span className="font-bold text-blue-400 font-mono">{selectedDate}, {selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-300 font-bold">Стоимость:</span>
                  <span className="text-sm font-black text-white">
                    {selectedService.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">Способ подтверждения:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setPaymentType('deposit')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'deposit'
                        ? 'border-blue-500 bg-blue-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] block">Предоплата 500 ₽</span>
                    <span className="text-[8px] text-slate-400">Гарантия брони окна</span>
                  </button>

                  <button
                    onClick={() => setPaymentType('salon')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'salon'
                        ? 'border-blue-500 bg-blue-600/20 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] block">Оплата в салоне</span>
                    <span className="text-[8px] text-slate-400">Картой или наличными</span>
                  </button>
                </div>
              </div>

              {/* Auto Reminder Toggle */}
              <div 
                onClick={() => setTgNotificationEnabled(!tgNotificationEnabled)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[10px] text-slate-200">Напоминание в Telegram за 3 часа</span>
                </div>
                <div className={`h-4 w-7 rounded-full p-0.5 transition-colors ${tgNotificationEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}>
                  <div className={`h-3 w-3 rounded-full bg-white transition-transform ${tgNotificationEnabled ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </div>

              <button
                onClick={handleFinishBooking}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Завершить запись</span>
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
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                <Check className="h-7 w-7 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-sm font-black text-white">Вы успешно записаны!</h3>
                <p className="text-slate-300 text-[10px] mt-0.5">
                  Электронный талон #{bookingCode} отправлен вам в Telegram
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 w-full text-left space-y-2 text-[10px]">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div>
                    <span className="text-slate-400 text-[8px] block">Мастер:</span>
                    <span className="font-bold text-white text-xs">{selectedSpecialist.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[8px] block">Время визита:</span>
                    <span className="font-bold text-blue-400 text-xs">{selectedDate}, {selectedTime}</span>
                  </div>
                </div>

                <div className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-pink-400 shrink-0" />
                  <span>Москва, ул. Тверская, 14 (Студия Lumina)</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-slate-400 text-[9px]">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="h-3 w-3" />
                    Бронь подтверждена
                  </span>
                  <span className="font-mono">Талон #{bookingCode}</span>
                </div>
              </div>

              <button
                onClick={() => setStep('service')}
                className="text-xs font-bold text-blue-400 hover:underline"
              >
                ← Записаться на другую услугу
              </button>
            </motion.div>
          )}

        </div>

        {/* Bottom bar indicator */}
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-slate-700" />
      </div>

      {/* Side Feature & Technical Highlights Sidebar */}
      <div className="w-full max-w-md space-y-3.5 text-slate-700 dark:text-slate-300 text-xs">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
              Что получает салон красоты или клиника:
            </h4>
          </div>

          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>0% пропущенных записей:</strong> Telegram-бот автоматически отправляет напоминания за 24 ч и за 3 ч с кнопками «Подтверждаю» или «Перенести».
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Снижение неявок на 70%:</strong> Возможность брать символическую предоплату (300–500 ₽) дисциплинирует гостей и исключает пустые окна.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Экономия до 3 часов в день:</strong> Администратор освобожден от рутинных переписок «А на сколько часов свободно у Алены?».
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Синхронизация с YClients, 1C или Google Calendar:</strong> Свободные окна подгружаются в реальном времени без накладок.
              </span>
            </li>
          </ul>

          {/* Quick Scenario Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
              Попробуйте сценарии:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setSelectedService(SERVICES[0]);
                  setStep('datetime');
                }}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">1. Выбрать дату</div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">Слоты времени</div>
              </button>

              <button
                onClick={() => {
                  setStep('confirmation');
                }}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-left border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">2. Подтверждение</div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">Предоплата и талон</div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
