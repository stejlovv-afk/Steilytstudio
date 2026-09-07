import React, { useState } from 'react';
import { 
  ShoppingBag, Plus, Minus, Check, Star, Zap, Flame, Shield, ArrowRight,
  Clock, MapPin, CheckCircle2, Bike, RefreshCw, Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface FoodItem {
  id: string;
  name: string;
  category: string;
  price: number;
  calories: string;
  time: string;
  rating: number;
  emoji: string;
  badge?: string;
}

const mockMenu: FoodItem[] = [
  { id: '1', name: 'Cyber Burger XL', category: 'Бургеры', price: 590, calories: '620 ккал', time: '15 мин', rating: 4.9, emoji: '🍔', badge: 'Топ' },
  { id: '2', name: 'Tokyo Salmon Bowl', category: 'Боулы', price: 680, calories: '480 ккал', time: '12 мин', rating: 5.0, emoji: '🥗', badge: 'Fresh' },
  { id: '3', name: 'Truffle Pizza Slice', category: 'Пицца', price: 420, calories: '390 ккал', time: '10 мин', rating: 4.8, emoji: '🍕' },
  { id: '4', name: 'Neon Matcha Latte', category: 'Напитки', price: 290, calories: '140 ккал', time: '5 мин', rating: 4.9, emoji: '🍵' },
];

export const TmaPhoneSimulator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [cart, setCart] = useState<{ [id: string]: number }>({ '1': 1, '4': 1 });
  const [orderStage, setOrderStage] = useState<'menu' | 'success'>('menu');
  const [orderId, setOrderId] = useState<number>(4892);
  const [orderStep, setOrderStep] = useState<number>(1);
  const [hapticPing, setHapticPing] = useState(false);

  const categories = ['Все', 'Бургеры', 'Боулы', 'Пицца', 'Напитки'];

  const triggerHaptic = () => {
    setHapticPing(true);
    setTimeout(() => setHapticPing(false), 500);
  };

  const filteredItems = activeCategory === 'Все'
    ? mockMenu
    : mockMenu.filter(item => item.category === activeCategory);

  const totalCount = Object.values(cart).reduce<number>((sum: number, count: number) => sum + count, 0);
  const rawSum = Object.entries(cart).reduce<number>((sum: number, [id, count]: [string, number]) => {
    const item = mockMenu.find(m => m.id === id);
    return sum + (item ? item.price * count : 0);
  }, 0);

  const discountedSum = Math.round(rawSum * 0.85); // 15% promo

  const addItem = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic();
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeItem = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic();
    setCart(prev => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleCheckout = () => {
    triggerHaptic();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00E5FF', '#38BDF8', '#ffffff']
      });
    } catch {}

    const newId = Math.floor(1000 + Math.random() * 9000);
    setOrderId(newId);
    setOrderStage('success');
    setOrderStep(1);

    setTimeout(() => setOrderStep(2), 2000);
  };

  const handleReset = () => {
    setCart({ '1': 1, '4': 1 });
    setOrderStage('menu');
  };

  return (
    <div id="tma-simulator-container" className="relative mx-auto w-full max-w-[310px] xs:max-w-[335px] sm:max-w-[365px]">
      {/* Subtle background glow ring */}
      <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-tr from-blue-500/15 via-transparent to-indigo-500/10 blur-2xl -z-10 pointer-events-none" />

      {/* Floating Badges with High Contrast */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden md:flex absolute -left-12 top-16 z-20 items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 backdrop-blur-md shadow-lg pointer-events-none"
      >
        <span className="flex h-2 w-2 rounded-full bg-blue-600" />
        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Внутри Telegram</span>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden md:flex absolute -right-10 bottom-24 z-20 items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 px-3.5 py-1.5 backdrop-blur-md shadow-lg pointer-events-none"
      >
        <Zap className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 fill-current" />
        <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Оплата СБП в 1 клик</span>
      </motion.div>

      {/* Smartphone Chassis - Sleek Deep Navy/Slate Frame */}
      <div className="relative rounded-[36px] sm:rounded-[44px] border-[5px] sm:border-[7px] border-slate-900 bg-slate-950 p-2 sm:p-3.5 shadow-2xl ring-1 ring-slate-800">
        
        {/* Speaker & Dynamic Island */}
        <div className="absolute left-1/2 top-3 sm:top-4 -translate-x-1/2 z-30 flex items-center justify-between w-24 sm:w-28 h-3.5 sm:h-4 rounded-full bg-slate-900 px-2.5 border border-white/5">
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-slate-800" />
          <div className="h-1 sm:h-1.5 w-8 sm:w-10 rounded-full bg-slate-800" />
          <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-blue-500/40" />
        </div>

        {/* Telegram Header Bar */}
        <div className="pt-4 sm:pt-5 pb-2 px-2 sm:px-2.5 border-b border-white/10 bg-[#1c1c24] rounded-t-[26px] sm:rounded-t-[32px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span onClick={handleReset} className="text-[11px] sm:text-xs text-blue-400 font-semibold cursor-pointer hover:underline">
                Закрыть
              </span>
            </div>
            <div className="text-center">
              <div className="text-[11px] sm:text-xs font-bold text-white flex items-center justify-center gap-1">
                <span>Доставка еды</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
              </div>
              <p className="text-[8px] sm:text-[9px] text-gray-400">Telegram Mini App</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleReset} 
                className="p-1 rounded-lg bg-[#282832] text-gray-300 hover:text-white active:scale-90 transition-transform"
                title="Сбросить симулятор"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Inside App Content */}
        <div className="h-[390px] sm:h-[435px] overflow-y-auto rounded-b-[26px] sm:rounded-b-[32px] bg-[#141419] p-2.5 sm:p-3 text-gray-100 relative scrollbar-none">
          
          <AnimatePresence mode="wait">
            {orderStage === 'menu' ? (
              <motion.div
                key="menu-stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5"
              >
                {/* Top Delivery & Promo Bar */}
                <div className="rounded-xl bg-[#1c1c24] border border-blue-500/20 p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                      <Flame className="h-3.5 w-3.5 fill-current" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-white truncate">Скидка 15% на первый заказ</div>
                      <div className="text-[9px] text-gray-400 flex items-center gap-1 truncate">
                        <MapPin className="h-2.5 w-2.5 text-blue-400" />
                        <span>Доставка за 25–35 минут</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-black text-white shrink-0">
                    -15%
                  </div>
                </div>

                {/* Navigation Category Pill */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        triggerHaptic();
                        setActiveCategory(cat);
                      }}
                      className={`text-[10px] font-medium px-2.5 py-1 rounded-xl whitespace-nowrap transition-all ${
                        activeCategory === cat
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-[#1c1c22] text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Menu Items Grid */}
                <div className="space-y-2 pb-14">
                  {filteredItems.map((item) => {
                    const count = cart[item.id] || 0;
                    return (
                      <div 
                        key={item.id}
                        className="group flex items-center justify-between rounded-xl border border-white/5 bg-[#1c1c22] p-2.5 hover:border-blue-500/40 transition-all"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#282832] text-2xl shrink-0 group-hover:scale-105 transition-transform">
                            {item.emoji}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <h4 className="text-xs font-semibold text-gray-200 truncate">{item.name}</h4>
                              {item.badge && (
                                <span className="text-[8px] font-bold bg-blue-500/20 text-blue-400 px-1 rounded">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-0.5">
                              <span>{item.calories}</span>
                              <span>•</span>
                              <span className="flex items-center text-amber-400">
                                <Star className="h-2.5 w-2.5 fill-amber-400 mr-0.5" />
                                {item.rating}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-blue-400 mt-1">{item.price} ₽</div>
                          </div>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1 shrink-0 ml-1.5">
                          {count > 0 ? (
                            <div className="flex items-center gap-1.5 rounded-lg bg-[#282832] border border-white/10 px-1.5 py-0.5">
                              <button
                                onClick={(e) => removeItem(item.id, e)}
                                className="text-gray-300 hover:text-white p-0.5"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-[11px] font-bold text-white px-1">{count}</span>
                              <button
                                onClick={(e) => addItem(item.id, e)}
                                className="text-blue-400 hover:text-white p-0.5"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => addItem(item.id, e)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* Success / Live Tracking Screen */
              <motion.div
                key="success-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-4 space-y-3 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400 animate-bounce">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Заказ #{orderId} оплачен!</h3>
                  <p className="text-[10px] text-gray-400 mt-0.5">Чек отправлен в Telegram. Оплата через СБП без комиссии.</p>
                </div>

                <div className="rounded-xl bg-[#1c1c22] p-3 border border-white/5 text-left text-xs space-y-2">
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <span>СТАТУС ЗАКАЗА:</span>
                    <span className="text-emerald-400 font-bold">ОПЛАЧЕН</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {orderStep === 1 ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="font-bold text-white text-xs">Готовится на кухне (12 мин)</span>
                      </>
                    ) : (
                      <>
                        <Bike className="h-4 w-4 text-blue-400 animate-bounce" />
                        <span className="font-bold text-blue-400 text-xs">Курьер везет заказ к вам</span>
                      </>
                    )}
                  </div>

                  <div className="w-full bg-[#282832] h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-1000 ${orderStep === 1 ? 'w-1/2' : 'w-4/5'}`} />
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2.5 rounded-xl border border-white/10 bg-[#1c1c22] text-xs font-semibold text-gray-300 hover:text-white hover:border-blue-500 transition-all"
                >
                  Вернуться в меню
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Telegram Native Fixed MainButton (Bottom Bar) */}
          {orderStage === 'menu' && (
            <div className="absolute bottom-2 left-2 right-2 z-30">
              <button
                onClick={handleCheckout}
                disabled={totalCount === 0}
                className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs flex items-center justify-between shadow-lg transition-all active:scale-[0.98] ${
                  totalCount > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Оформить заказ</span>
                </div>
                <div className="font-bold">
                  {totalCount > 0 ? `${discountedSum} ₽` : 'Корзина пуста'}
                </div>
              </button>
            </div>
          )}

        </div>

        {/* Home Indicator Bar */}
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-slate-700" />
      </div>

      {/* Caption under simulator */}
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Интерактивное демо Telegram-магазина • Добавьте блюда и нажмите «Оформить»
        </p>
      </div>
    </div>
  );
};
