import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, Timer, Flame, ShoppingCart, Check, Plus, 
  Sparkles, RefreshCw, Trophy, Zap, Play, Pause, RotateCcw, Star 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Exercise {
  id: string;
  name: string;
  sets: { id: number; weight: string; reps: string; completed: boolean }[];
}

interface Supplement {
  id: string;
  name: string;
  price: number;
  category: string;
  emoji: string;
  rating: number;
}

const SUPPLEMENTS: Supplement[] = [
  { id: 's1', name: 'Whey Isolate 100% (Ваниль)', price: 2890, category: 'Протеин', emoji: '🥛', rating: 4.9 },
  { id: 's2', name: 'Creatine Monohydrate 300g', price: 1450, category: 'Сила', emoji: '⚡', rating: 5.0 },
  { id: 's3', name: 'BCAA 2:1:1 Recovery (Лайм)', price: 1690, category: 'Восстановление', emoji: '🍋', rating: 4.8 },
  { id: 's4', name: 'Ultra Omega-3 + D3', price: 1190, category: 'Витамины', emoji: '💊', rating: 4.9 },
];

export const FitTrackTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workout' | 'store' | 'streak'>('workout');
  
  // Workout State
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 'e1',
      name: 'Жим штанги лежа',
      sets: [
        { id: 1, weight: '80 кг', reps: '10 повт.', completed: true },
        { id: 2, weight: '85 кг', reps: '8 повт.', completed: true },
        { id: 3, weight: '90 кг', reps: '6 повт.', completed: false },
      ]
    },
    {
      id: 'e2',
      name: 'Разводка гантелей под углом',
      sets: [
        { id: 1, weight: '22 кг', reps: '12 повт.', completed: false },
        { id: 2, weight: '24 кг', reps: '10 повт.', completed: false },
      ]
    }
  ]);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerTotal, setTimerTotal] = useState(45);

  // Store Cart
  const [cart, setCart] = useState<Record<string, number>>({ 's1': 1 });
  const [boughtMessage, setBoughtMessage] = useState<string | null>(null);

  // Streak state
  const [streakDays, setStreakDays] = useState(14);
  const [streakClaimed, setStreakClaimed] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        confetti({ particleCount: 40, spread: 40, origin: { y: 0.6 }, colors: ['#00E5FF', '#34D399'] });
      } catch {}
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleSetCompleted = (exerciseId: string, setId: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id !== exerciseId) return ex;
      return {
        ...ex,
        sets: ex.sets.map(s => s.id === setId ? { ...s, completed: !s.completed } : s)
      };
    }));
    // Auto-start rest timer
    setTimerSeconds(45);
    setTimerTotal(45);
    setIsTimerRunning(true);
  };

  const handleBuySupplement = (supp: Supplement) => {
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 }, colors: ['#00E5FF', '#34D399'] });
    } catch {}
    setBoughtMessage(`Заказ оформлен: ${supp.name} (${supp.price} ₽)`);
    setTimeout(() => setBoughtMessage(null), 3500);
  };

  const handleClaimStreak = () => {
    if (streakClaimed) return;
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#00E5FF', '#38BDF8', '#ffffff'] });
    } catch {}
    setStreakDays(prev => prev + 1);
    setStreakClaimed(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start justify-center p-1 sm:p-4">
      
      {/* Smartphone TMA Frame Simulator */}
      <div className="w-full max-w-[310px] xs:max-w-[335px] sm:max-w-[360px] rounded-[34px] sm:rounded-[42px] border-[4px] sm:border-[5px] border-[#2c2c36] bg-[#121215] p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10 relative overflow-hidden">
        
        {/* Dynamic Island bar */}
        <div className="mx-auto w-20 sm:w-24 h-3.5 sm:h-4 rounded-full bg-[#1e1e24] flex items-center justify-between px-2.5 sm:px-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2a2a35]" />
          <span className="h-1 w-7 sm:w-8 rounded-full bg-[#2a2a35]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]/60" />
        </div>

        {/* TMA Header */}
        <div className="rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-white/5 p-2 sm:p-2.5 mb-2 sm:mb-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#00E5FF] font-semibold text-[11px]">Закрыть</span>
            <div className="flex flex-col">
              <span className="font-bold text-white text-[11px] sm:text-xs leading-tight flex items-center gap-1">
                FitTrack Pro
                <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF]" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-gray-400 font-mono">TMA Fitness v3.1</span>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-[#00E5FF]/20 px-2 py-0.5 text-[9px] font-mono text-[#00E5FF] font-bold">
            <Flame className="h-3 w-3 fill-current text-amber-400" />
            <span>{streakDays} ДНЕЙ</span>
          </div>
        </div>

        {/* Animated TMA Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-[#1c1c22] border border-white/5 mb-2 sm:mb-2.5">
          {[
            { id: 'workout', label: '🏋️ Дневник' },
            { id: 'store', label: '🛒 БАДы' },
            { id: 'streak', label: '🔥 Чекин' },
          ].map(t => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`relative flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                  isActive ? 'text-black font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFitTrackTab"
                    className="absolute inset-0 bg-[#00E5FF] rounded-lg"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TMA Screen Body */}
        <div className="h-[380px] sm:h-[400px] overflow-y-auto rounded-xl sm:rounded-2xl bg-[#16161b] p-2 sm:p-3 text-white relative">
          <AnimatePresence mode="wait">
            
            {/* View 1: Workout Diary & Rest Timer */}
            {activeTab === 'workout' && (
              <motion.div
                key="workout-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                {/* Rest Timer Widget */}
                <div className="rounded-xl bg-[#1e1e26] border border-[#00E5FF]/30 p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center">
                      <Timer className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 font-mono block">ТАЙМЕР ОТДЫХА:</span>
                      <span className="text-sm font-black text-white font-mono">{timerSeconds} сек</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1.5 rounded-lg bg-[#00E5FF] text-black font-bold hover:scale-105"
                    >
                      {isTimerRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(45);
                        setIsTimerRunning(false);
                      }}
                      className="p-1.5 rounded-lg bg-[#282832] text-gray-300 hover:text-white"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Exercises List */}
                <div className="space-y-2.5">
                  {exercises.map(ex => (
                    <div key={ex.id} className="rounded-xl bg-[#1e1e26] border border-white/5 p-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Dumbbell className="h-3.5 w-3.5 text-[#00E5FF]" />
                          {ex.name}
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono">3 подхода</span>
                      </div>

                      <div className="space-y-1">
                        {ex.sets.map(s => (
                          <div
                            key={s.id}
                            onClick={() => toggleSetCompleted(ex.id, s.id)}
                            className={`flex items-center justify-between p-1.5 rounded-lg text-[10px] cursor-pointer transition-all ${
                              s.completed 
                                ? 'bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-white font-bold' 
                                : 'bg-[#282832] border border-transparent text-gray-300 hover:border-white/10'
                            }`}
                          >
                            <span className="font-mono text-gray-400">Сет {s.id}</span>
                            <span>{s.weight}</span>
                            <span>{s.reps}</span>
                            <div className={`h-4 w-4 rounded flex items-center justify-center ${s.completed ? 'bg-[#00E5FF] text-black' : 'border border-white/20'}`}>
                              {s.completed && <Check className="h-3 w-3 stroke-[3]" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] text-gray-400 text-center">
                  💡 Нажмите на подход, чтобы отметить выполнение и запустить таймер
                </div>
              </motion.div>
            )}

            {/* View 2: Supplement Store */}
            {activeTab === 'store' && (
              <motion.div
                key="store-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10">
                  <span className="font-bold text-white">Спортивное питание</span>
                  <span className="text-[10px] font-mono text-[#00E5FF]">⚡ Быстрый заказ • СБП</span>
                </div>

                {boughtMessage && (
                  <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2 text-center text-xs text-emerald-300 font-bold">
                    ✓ {boughtMessage}
                  </div>
                )}

                <div className="space-y-2">
                  {SUPPLEMENTS.map(s => (
                    <div key={s.id} className="rounded-xl bg-[#1e1e26] border border-white/5 p-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-9 w-9 rounded-lg bg-[#282832] flex items-center justify-center text-xl shrink-0">
                          {s.emoji}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-[11px] font-bold text-white truncate">{s.name}</h4>
                          <span className="text-[9px] text-gray-400">{s.category} • ★ {s.rating}</span>
                          <div className="text-[10px] font-bold text-[#00E5FF] font-mono">{s.price} ₽</div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleBuySupplement(s)}
                        className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#00E5FF] text-black font-bold text-[9px] flex items-center gap-1 hover:scale-105 transition-transform"
                      >
                        <span>Купить в 1 клик</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* View 3: Daily Streak */}
            {activeTab === 'streak' && (
              <motion.div
                key="streak-view"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4 space-y-4"
              >
                <div className="h-16 w-16 rounded-full bg-amber-500/20 border-2 border-amber-400 mx-auto flex items-center justify-center text-3xl animate-bounce">
                  🔥
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{streakDays} Дней Подряд!</h3>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Ежедневный чекин тренировок дает +15% персональную скидку на БАДы и 500 XP.
                  </p>
                </div>

                <div className="rounded-xl bg-[#1e1e26] p-3 border border-white/5 flex justify-around">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, idx) => (
                    <div key={day} className="flex flex-col items-center gap-1">
                      <span className="text-[9px] text-gray-500">{day}</span>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                        idx < 5 ? 'bg-[#00E5FF] text-black' : idx === 5 ? 'bg-amber-400 text-black' : 'border border-white/20 text-gray-500'
                      }`}>
                        {idx < 6 ? '✓' : '•'}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleClaimStreak}
                  disabled={streakClaimed}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 ${
                    streakClaimed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-[#00E5FF] text-black hover:scale-105 shadow-[0_5px_20px_rgba(0,229,255,0.3)]'
                  }`}
                >
                  <Trophy className="h-4 w-4" />
                  <span>{streakClaimed ? '✓ Награда за сегодня получена' : 'Забрать награду за чекин (+500 XP)'}</span>
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>

      {/* Feature highlight commentary sidebar */}
      <div className="w-full lg:w-80 rounded-3xl border border-white/10 bg-[#1c1c22] p-5 space-y-4 text-xs">
        <div className="flex items-center gap-2 text-[#00E5FF] font-mono text-[11px] font-bold">
          <Sparkles className="h-4 w-4" />
          <span>ЧТО ВЫ ТЕСТИРУЕТЕ В ЭТОМ КЕЙСЕ:</span>
        </div>

        <ul className="space-y-2.5 text-gray-300">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Геймификация фитнеса:</strong> Интерактивный учет подходов, весов и таймер отдыха.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Оплата в 1 клик:</strong> Покупка витаминов и спортивного питания через СБП.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Серии чекинов (Retention):</strong> Мотивация возвращаться в бот каждый день.</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Плавные категории:</strong> Мгновенное переключение без фризов.</span>
          </li>
        </ul>

        <div className="rounded-2xl bg-[#22222a] p-3 border border-white/5">
          <span className="text-[10px] text-gray-400 block font-mono">РЕЗУЛЬТАТ КЛИЕНТА:</span>
          <div className="text-base font-black text-[#00E5FF] mt-0.5">x4.2 рост LTV клиента</div>
          <p className="text-[10px] text-gray-400 mt-1">48% клиентов продолжают вести тренировки и регулярно докупать добавки на 30-й день.</p>
        </div>
      </div>

    </div>
  );
};
