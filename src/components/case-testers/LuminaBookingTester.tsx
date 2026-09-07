import React, { useState } from 'react';
import { 
  Calendar, Clock, User, Check, Sparkles, Star, ChevronRight, 
  MapPin, ShieldCheck, Heart, Phone, MessageSquare, AlertCircle
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
  avatar: string;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  description: string;
}

const SPECIALISTS: Specialist[] = [
  { 
    id: 'spec_1', 
    name: 'Алена Соколова', 
    role: 'Топ-стилист / Арт-директор', 
    rating: 5.0, 
    reviewsCount: 142, 
    experience: '7 лет', 
    avatar: '👩🏼‍🦰' 
  },
  { 
    id: 'spec_2', 
    name: 'Екатерина Миронова', 
    role: 'Ведущий колорист & Трихолог', 
    rating: 4.9, 
    reviewsCount: 98, 
    experience: '5 лет', 
    avatar: '👩🏻' 
  },
  { 
    id: 'spec_3', 
    name: 'Дарья Романова', 
    role: 'Мастер ногтевого сервиса', 
    rating: 4.95, 
    reviewsCount: 184, 
    experience: '6 лет', 
    avatar: '💅🏼' 
  },
];

const SERVICES: Service[] = [
  { 
    id: 'serv_1', 
    name: 'Сложное окрашивание AirTouch / Balayage', 
    category: 'Волосы', 
    price: 8500, 
    duration: '180 мин', 
    description: 'Мягкий градиент, защита структуры Olaplex и тонирование премиум-красителем' 
  },
  { 
    id: 'serv_2', 
    name: 'Авторская стрижка & Укладка Dyson', 
    category: 'Волосы', 
    price: 3200, 
    duration: '60 мин', 
    description: 'Индивидуальный подбор формы под овал лица, спа-уход для кожи головы' 
  },
  { 
    id: 'serv_3', 
    name: 'Smart-маникюр с покрытием Luxio', 
    category: 'Ногти', 
    price: 2600, 
    duration: '75 мин', 
    description: 'Аппаратная обработка, выравнивание ногтевой пластины, дизайн 2 пальцев' 
  },
  { 
    id: 'serv_4', 
    name: 'Глубокий СПА-уход "Абсолютное счастье"', 
    category: 'Уход', 
    price: 4900, 
    duration: '90 мин', 
    description: 'Многоступенчатое восстановление Lebel, ультразвуковой утюжок' 
  },
];

const DATES = [
  { day: 'Пн', num: '18', full: '18 августа' },
  { day: 'Вт', num: '19', full: '19 августа' },
  { day: 'Ср', num: '20', full: '20 августа' },
  { day: 'Чт', num: '21', full: '21 августа' },
  { day: 'Пт', num: '22', full: '22 августа' },
];

const TIME_SLOTS = ['11:00', '13:30', '15:00', '17:30', '19:00', '20:30'];

export const LuminaBookingTester: React.FC = () => {
  const [step, setStep] = useState<'service' | 'specialist' | 'datetime' | 'confirmation' | 'success'>('service');
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist>(SPECIALISTS[0]);
  const [selectedDate, setSelectedDate] = useState<string>('18 августа');
  const [selectedTime, setSelectedTime] = useState<string>('13:30');
  const [paymentType, setPaymentType] = useState<'deposit' | 'full' | 'salon'>('deposit');
  const [userName, setUserName] = useState<string>('Виктория');
  const [userPhone, setUserPhone] = useState<string>('+7 (999) 450-12-88');
  const [tgNotificationEnabled, setTgNotificationEnabled] = useState<boolean>(true);

  const handleFinishBooking = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#00E5FF', '#F472B6', '#A78BFA']
      });
    } catch {}
    setStep('success');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start justify-center p-1 sm:p-4">
      {/* Phone Mockup Frame */}
      <div className="w-full max-w-[310px] xs:max-w-[335px] sm:max-w-[360px] rounded-[34px] sm:rounded-[44px] border-[4px] sm:border-[7px] border-slate-900 bg-slate-950 p-2 sm:p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] ring-1 ring-slate-800">
        
        {/* Dynamic Island & Speaker */}
        <div className="mx-auto flex items-center justify-between w-24 sm:w-28 h-3.5 sm:h-4 rounded-full bg-slate-900 px-2.5 mb-2">
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-slate-800" />
          <div className="h-1 sm:h-1.5 w-8 sm:w-10 rounded-full bg-slate-800" />
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-pink-500/40" />
        </div>

        {/* Telegram Header */}
        <div className="pt-2 pb-2 px-2 border-b border-white/10 bg-[#1c1c22] rounded-t-[24px] sm:rounded-t-[28px] flex items-center justify-between">
          <div className="text-[11px] sm:text-xs text-[#00E5FF] font-semibold cursor-pointer" onClick={() => setStep('service')}>
            {step !== 'service' ? '‹ Назад' : 'Закрыть'}
          </div>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center gap-1">
              <span>Lumina Beauty & SPA</span>
              <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            </div>
            <p className="text-[8px] sm:text-[9px] text-gray-400 font-mono">TMA • Онлайн-запись</p>
          </div>
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-gray-400 font-mono">
            {step === 'service' && '1/4'}
            {step === 'specialist' && '2/4'}
            {step === 'datetime' && '3/4'}
            {step === 'confirmation' && '4/4'}
            {step === 'success' && '✓'}
          </div>
        </div>

        {/* Mini App Body */}
        <div className="h-[390px] sm:h-[430px] overflow-y-auto rounded-b-[24px] sm:rounded-b-[28px] bg-[#141418] p-2.5 sm:p-3 text-gray-100 relative text-xs">
          
          {/* STEP 1: SERVICE SELECTION */}
          {step === 'service' && (
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent border border-pink-500/30">
                <div className="flex items-center gap-1.5 text-[#00E5FF] font-bold">
                  <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                  <span>Выберите услугу студии:</span>
                </div>
                <p className="text-[10px] text-gray-300 mt-0.5">Кэшбэк 10% бонусами на следующий визит</p>
              </div>

              <div className="space-y-2">
                {SERVICES.map((serv) => (
                  <div
                    key={serv.id}
                    onClick={() => {
                      setSelectedService(serv);
                      setStep('specialist');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                      selectedService.id === serv.id
                        ? 'border-pink-500/80 bg-pink-500/10'
                        : 'border-white/10 bg-[#1c1c22] hover:border-pink-400/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-pink-400 uppercase font-semibold block">
                          {serv.category} • {serv.duration}
                        </span>
                        <h4 className="font-bold text-white text-xs mt-0.5 group-hover:text-pink-300 transition-colors">
                          {serv.name}
                        </h4>
                        <p className="text-[10px] text-gray-400 mt-1 leading-snug">
                          {serv.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="font-bold text-sm text-white font-mono">
                        {serv.price.toLocaleString('ru-RU')} ₽
                      </div>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-[#00E5FF] group-hover:translate-x-1 transition-transform">
                        <span>Выбрать</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SPECIALIST SELECTION */}
          {step === 'specialist' && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-1 border-b border-white/10">
                <span className="text-[11px] font-bold text-white">Выберите мастера:</span>
                <span className="text-[10px] text-gray-400">{selectedService.name}</span>
              </div>

              <div className="space-y-2">
                {SPECIALISTS.map((spec) => (
                  <div
                    key={spec.id}
                    onClick={() => {
                      setSelectedSpecialist(spec);
                      setStep('datetime');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group flex items-center justify-between ${
                      selectedSpecialist.id === spec.id
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                        : 'border-white/10 bg-[#1c1c22] hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#282832] text-2xl border border-white/10">
                        {spec.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs">{spec.name}</h4>
                        <p className="text-[10px] text-gray-400">{spec.role}</p>
                        <div className="flex items-center gap-2 mt-1 text-[10px]">
                          <span className="flex items-center text-amber-400 font-bold">
                            <Star className="h-3 w-3 fill-amber-400 mr-0.5" />
                            {spec.rating}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">{spec.reviewsCount} отзывов</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {step === 'datetime' && (
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-white block mb-2">Дата визита:</span>
                <div className="grid grid-cols-5 gap-1.5">
                  {DATES.map((d) => (
                    <button
                      key={d.num}
                      onClick={() => setSelectedDate(d.full)}
                      className={`p-2 rounded-xl text-center border transition-all ${
                        selectedDate === d.full
                          ? 'border-[#00E5FF] bg-[#00E5FF] text-black font-black'
                          : 'border-white/10 bg-[#1c1c22] text-gray-300 hover:border-white/30'
                      }`}
                    >
                      <span className="text-[9px] uppercase block opacity-80">{d.day}</span>
                      <span className="text-sm font-bold block">{d.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-white block mb-2">Свободные окна мастера:</span>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 rounded-xl text-center font-mono font-bold text-xs border transition-all ${
                        selectedTime === t
                          ? 'border-pink-400 bg-pink-500 text-white shadow-md'
                          : 'border-white/10 bg-[#1c1c22] text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep('confirmation')}
                  className="w-full py-2.5 rounded-xl bg-[#00E5FF] text-black font-bold flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-all"
                >
                  <span>Продолжить оформление</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION */}
          {step === 'confirmation' && (
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-[#1c1c22] p-3 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-gray-400 text-[10px]">Услуга:</span>
                  <span className="font-bold text-white text-[11px] text-right">{selectedService.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-gray-400 text-[10px]">Мастер:</span>
                  <span className="font-bold text-white text-[11px]">{selectedSpecialist.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-gray-400 text-[10px]">Дата и время:</span>
                  <span className="font-bold text-[#00E5FF] font-mono">{selectedDate}, {selectedTime}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-300 font-bold">Итого:</span>
                  <span className="text-base font-black text-white font-mono">{selectedService.price} ₽</span>
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <span className="text-[10px] text-gray-400 block mb-1.5">Способ подтверждения:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPaymentType('deposit')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'deposit'
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                        : 'border-white/10 bg-[#1c1c22] text-gray-400'
                    }`}
                  >
                    <span className="font-bold text-[10px] block">Предоплата 500 ₽</span>
                    <span className="text-[9px] text-gray-400">Гарантия брони</span>
                  </button>

                  <button
                    onClick={() => setPaymentType('full')}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      paymentType === 'full'
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                        : 'border-white/10 bg-[#1c1c22] text-gray-400'
                    }`}
                  >
                    <span className="font-bold text-[10px] text-[#00E5FF] block">Полная оплата СБП</span>
                    <span className="text-[9px] text-gray-400">{selectedService.price} ₽</span>
                  </button>
                </div>
              </div>

              {/* Telegram Auto-Reminder Toggle */}
              <div 
                onClick={() => setTgNotificationEnabled(!tgNotificationEnabled)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c1c22] border border-white/10 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#00E5FF]" />
                  <span className="text-[10px] text-gray-200">Напоминание в Telegram за 3 часа</span>
                </div>
                <div className={`h-4 w-7 rounded-full p-0.5 transition-colors ${tgNotificationEnabled ? 'bg-[#00E5FF]' : 'bg-gray-700'}`}>
                  <div className={`h-3 w-3 rounded-full bg-black transition-transform ${tgNotificationEnabled ? 'translate-x-3' : 'translate-x-0'}`} />
                </div>
              </div>

              <button
                onClick={handleFinishBooking}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-[#00E5FF] text-black font-black text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="h-4 w-4 stroke-[3]" />
                <span>Подтвердить запись</span>
              </button>
            </div>
          )}

          {/* STEP 5: SUCCESS STATE */}
          {step === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-6 px-2 text-center flex flex-col items-center justify-center space-y-3"
            >
              <div className="h-16 w-16 rounded-full bg-pink-500/20 border-2 border-pink-400 flex items-center justify-center text-pink-300 animate-bounce">
                <Check className="h-9 w-9 stroke-[3]" />
              </div>
              <h3 className="text-base font-black text-white">Вы успешно записаны!</h3>
              <p className="text-gray-300 text-[11px] max-w-[260px]">
                Бронь #{Math.floor(10000 + Math.random() * 90000)} зафиксирована. Мастер <span className="font-bold text-white">{selectedSpecialist.name}</span> ждет вас <span className="text-[#00E5FF] font-bold">{selectedDate} в {selectedTime}</span>.
              </p>

              <div className="rounded-xl bg-[#1c1c22] border border-white/10 p-2.5 w-full text-left space-y-1 text-[10px]">
                <div className="text-gray-400 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-pink-400" />
                  <span>Москва, ул. Тверская, 14 (Студия Lumina)</span>
                </div>
                <div className="text-gray-400 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  <span>Календарь синхронизирован с Telegram Bot</span>
                </div>
              </div>

              <button
                onClick={() => setStep('service')}
                className="mt-2 text-xs font-bold text-[#00E5FF] hover:underline"
              >
                ← Записаться на другую услугу
              </button>
            </motion.div>
          )}

        </div>
        
        {/* Home Indicator */}
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-slate-700" />
      </div>

      {/* Feature & Technical Highlights Sidebar */}
      <div className="w-full max-w-md space-y-4 text-slate-300 text-xs">
        <div className="p-4 rounded-3xl border border-white/10 bg-[#16161b] space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Что получает бизнес в таком решении:
            </h4>
          </div>
          
          <ul className="space-y-2.5 text-gray-300">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <span><strong>0% пропущенных записей:</strong> Telegram-бот автоматически отправляет напоминания за 24 ч и за 3 ч с возможностью подтвердить или перенести визит.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <span><strong>Снижение неявок (No-Show) на 68%:</strong> Встроенный модуль предоплаты или резерва через СБП и банковские карты дисциплинирует клиентов.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <span><strong>Синхронизация с YClients / 1C:</strong> Прямая интеграция с CRM салона без дублирования расписания и ручной работы администратора.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <span><strong>Умный кэшбэк и отзывы:</strong> Запрос оценки после визита и начисление бонусов прямо на баланс в мессенджере.</span>
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-3xl border border-white/10 bg-[#16161b] flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 block font-mono">ТЕХНОЛОГИЧЕСКИЙ СТЕК:</span>
            <span className="font-bold text-white text-xs">React 19 • TMA SDK • YClients API • Node.js</span>
          </div>
          <div className="rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 px-3 py-1.5 text-xs font-mono font-bold text-[#00E5FF]">
            MVP за 10 дней
          </div>
        </div>
      </div>
    </div>
  );
};
