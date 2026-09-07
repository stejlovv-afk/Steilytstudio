import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Plus, Minus, Check, Flame, Sparkles, Send, ArrowRight, 
  Clock, MapPin, Tag, RefreshCw, Star, Award, ShieldCheck, ChevronRight,
  SlidersHorizontal, Phone, MessageSquare, Bike, UtensilsCrossed, AlertCircle,
  Gift, Heart, Info, CheckCircle2, ChevronDown, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface CustomModifier {
  id: string;
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  category: 'burgers' | 'combos' | 'drinks' | 'desserts';
  price: number;
  calories: string;
  emoji: string;
  image: string;
  popular?: boolean;
  isNew?: boolean;
  description: string;
  ingredients: string[];
  donenessOptions?: string[];
  availableModifiers?: CustomModifier[];
}

interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedDoneness?: string;
  selectedModifiers: CustomModifier[];
  noOnions?: boolean;
  noSauce?: boolean;
  itemKey: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'b1',
    name: 'Cyber Burger Supreme',
    category: 'burgers',
    price: 490,
    calories: '580 ккал',
    emoji: '🍔',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
    popular: true,
    description: 'Флагманский бургер с сочной котлетой из мраморной говядины Black Angus, трюфельным айоли и чеддером.',
    ingredients: ['Мраморная говядина Black Angus', 'Трюфельный айоли', 'Чеддер 12 мес.', 'Карамелизированный лук', 'Пышная бриошь'],
    donenessOptions: ['Medium', 'Medium Well', 'Well Done'],
    availableModifiers: [
      { id: 'm1', name: 'Двойной сыр Чеддер', price: 60 },
      { id: 'm2', name: 'Хрустящий бекон', price: 80 },
      { id: 'm3', name: 'Халапеньо гриль', price: 45 },
      { id: 'm4', name: 'Трюфельный соус Extra', price: 55 }
    ]
  },
  {
    id: 'b2',
    name: 'TMA Truffle Bacon',
    category: 'burgers',
    price: 540,
    calories: '640 ккал',
    emoji: '🥓',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
    popular: true,
    description: 'Двойной хрустящий бекон, выдержанный благородный сыр Дорблю и фирменный клюквенный джем.',
    ingredients: ['Двойной бекон', 'Соус Дорблю', 'Красный маринованный лук', 'Свежая руккола', 'Бриошь'],
    donenessOptions: ['Medium Well', 'Well Done'],
    availableModifiers: [
      { id: 'm1', name: 'Двойной сыр Чеддер', price: 60 },
      { id: 'm2', name: 'Экстра бекон', price: 80 },
      { id: 'm4', name: 'Трюфельный соус', price: 55 }
    ]
  },
  {
    id: 'b3',
    name: 'Neon Vegan Burger',
    category: 'burgers',
    price: 420,
    calories: '410 ккал',
    emoji: '🥑',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80',
    isNew: true,
    description: '100% растительная котлета Beyond Meat, свежее гуакамоле, томаты черри и соус манго-халапеньо.',
    ingredients: ['Котлета Beyond Meat', 'Гуакамоле из авокадо Хасс', 'Томаты кумато', 'Шпинат', 'Безглютеновая булочка'],
    availableModifiers: [
      { id: 'm5', name: 'Экстра гуакамоле', price: 75 },
      { id: 'm3', name: 'Халапеньо', price: 45 }
    ]
  },
  {
    id: 'c1',
    name: 'Комбо "PRO Девелопер"',
    category: 'combos',
    price: 690,
    calories: '820 ккал',
    emoji: '🍱',
    image: 'https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=400&q=80',
    popular: true,
    description: 'Сбалансированный обед: Cyber Burger, хрустящий картофель фри с розмарином, соус и освежающая Nitro Cola.',
    ingredients: ['Cyber Burger (Black Angus)', 'Картофель Фри с морской солью', 'Craft Nitro Cola 0.5л', 'Сырный дип'],
    donenessOptions: ['Medium', 'Medium Well', 'Well Done'],
    availableModifiers: [
      { id: 'm1', name: 'Двойной сыр в бургер', price: 60 },
      { id: 'm2', name: 'Хрустящий бекон', price: 80 }
    ]
  },
  {
    id: 'c2',
    name: 'Комбо "Cyber Fitness"',
    category: 'combos',
    price: 640,
    calories: '510 ккал',
    emoji: '🥗',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    description: 'Протеиновый боул с лососем су-вид, киноа, авокадо и детокс-матча тоник без сахара.',
    ingredients: ['Лосось су-вид', 'Киноа с эдамаме', 'Авокадо Хасс', 'Matcha Tonic 0.33л'],
    availableModifiers: [
      { id: 'm5', name: 'Экстра лосось (+50г)', price: 140 },
      { id: 'm5a', name: 'Семена чиа', price: 30 }
    ]
  },
  {
    id: 'd1',
    name: 'Craft Nitro Cola',
    category: 'drinks',
    price: 190,
    calories: '120 ккал',
    emoji: '🥤',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
    description: 'Крафтовая кола из натурального ореха колы, настоянная на азоте с веточкой свежей мяты.',
    ingredients: ['Экстракт ореха колы', 'Мята перечная', 'Азотная подача', 'Тростниковый сахар']
  },
  {
    id: 'd2',
    name: 'Matcha Tonic Zero',
    category: 'drinks',
    price: 240,
    calories: '45 ккал',
    emoji: '🍵',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
    description: 'Японская церемониальная матча Uji, фреш лайма и натуральный тоник без сахара.',
    ingredients: ['Церемониальная матча из Киото', 'Фреш лайма', 'Тоник без калорий']
  },
  {
    id: 's1',
    name: 'Cyber Donut Salted Caramel',
    category: 'desserts',
    price: 220,
    calories: '290 ккал',
    emoji: '🍩',
    image: 'https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=400&q=80',
    description: 'Теплый пончик с жидким центром из соленой карамели, посыпанный съедобным кондитерским золотом.',
    ingredients: ['Соленая карамель fleur de sel', 'Сливочный крем маскарпоне', 'Пищевое золото']
  }
];

export const UrbanLunchTester: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'burgers' | 'combos' | 'drinks' | 'desserts'>('all');
  
  // Cart state with detailed modifier configurations
  const [cart, setCart] = useState<CartItem[]>([
    {
      item: MENU_ITEMS[0],
      quantity: 1,
      selectedDoneness: 'Medium Well',
      selectedModifiers: [{ id: 'm2', name: 'Хрустящий бекон', price: 80 }],
      itemKey: 'b1-Medium Well-[m2]'
    },
    {
      item: MENU_ITEMS[5],
      quantity: 1,
      selectedModifiers: [],
      itemKey: 'd1--[]'
    }
  ]);

  const [orderStage, setOrderStage] = useState<'menu' | 'customize' | 'checkout' | 'success'>('menu');
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  
  // Customizer state
  const [customDoneness, setCustomDoneness] = useState<string>('Medium Well');
  const [customModifiers, setCustomModifiers] = useState<CustomModifier[]>([]);
  const [customNoOnions, setCustomNoOnions] = useState<boolean>(false);
  const [customNoSauce, setCustomNoSauce] = useState<boolean>(false);

  // Checkout state
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'cash'>('sbp');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Пресненская наб., д. 12, Башня Федерация');
  const [isDetectingGeo, setIsDetectingGeo] = useState<boolean>(false);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState<boolean>(false);
  const userLoyaltyBalance = 240; // 240 points available
  const pointsToApply = 200;

  // Live order progress tracking
  const [orderId, setOrderId] = useState<number>(4821);
  const [orderTimeElapsed, setOrderTimeElapsed] = useState<number>(0);
  const [deliveryStatusStep, setDeliveryStatusStep] = useState<number>(1); // 1: Accepted, 2: Chef cooking, 3: Courier on route, 4: Arrived
  const [hapticFeedbackTriggered, setHapticFeedbackTriggered] = useState(false);
  const [courierChatOpen, setCourierChatOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Все меню' },
    { id: 'burgers', label: '🍔 Бургеры' },
    { id: 'combos', label: '🍱 Комбо' },
    { id: 'drinks', label: '🥤 Напитки' },
    { id: 'desserts', label: '🍩 Десерты' },
  ] as const;

  // Haptic trigger effect
  const triggerHaptic = () => {
    setHapticFeedbackTriggered(true);
    setTimeout(() => setHapticFeedbackTriggered(false), 600);
  };

  // Open item customizer
  const handleOpenCustomizer = (item: MenuItem) => {
    triggerHaptic();
    setCustomizingItem(item);
    setCustomDoneness(item.donenessOptions ? item.donenessOptions[1] || item.donenessOptions[0] : '');
    setCustomModifiers([]);
    setCustomNoOnions(false);
    setCustomNoSauce(false);
    setOrderStage('customize');
  };

  // Add customized item to cart
  const handleSaveCustomizedItem = () => {
    if (!customizingItem) return;
    triggerHaptic();

    const modifierIds = customModifiers.map(m => m.id).sort().join(',');
    const key = `${customizingItem.id}-${customDoneness}-[${modifierIds}]-${customNoOnions ? 'noO' : ''}-${customNoSauce ? 'noS' : ''}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.itemKey === key);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        return copy;
      } else {
        return [
          ...prev,
          {
            item: customizingItem,
            quantity: 1,
            selectedDoneness: customDoneness || undefined,
            selectedModifiers: customModifiers,
            noOnions: customNoOnions,
            noSauce: customNoSauce,
            itemKey: key
          }
        ];
      }
    });

    setOrderStage('menu');
    setCustomizingItem(null);
  };

  // Quick add without customizer
  const handleQuickAdd = (item: MenuItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    triggerHaptic();

    const key = `${item.id}--[]`;
    setCart(prev => {
      const existing = prev.find(c => c.itemKey === key);
      if (existing) {
        return prev.map(c => c.itemKey === key ? { ...c, quantity: c.quantity + 1 } : c);
      } else {
        return [
          ...prev,
          {
            item,
            quantity: 1,
            selectedModifiers: [],
            itemKey: key
          }
        ];
      }
    });
  };

  // Cart item modifier adjustments
  const handleIncrementCartItem = (key: string) => {
    triggerHaptic();
    setCart(prev => prev.map(c => c.itemKey === key ? { ...c, quantity: c.quantity + 1 } : c));
  };

  const handleDecrementCartItem = (key: string) => {
    triggerHaptic();
    setCart(prev => {
      return prev
        .map(c => c.itemKey === key ? { ...c, quantity: c.quantity - 1 } : c)
        .filter(c => c.quantity > 0);
    });
  };

  // Geolocation auto-detect from Telegram profile
  const handleAutoDetectLocation = () => {
    triggerHaptic();
    setIsDetectingGeo(true);
    setTimeout(() => {
      setIsDetectingGeo(false);
      setDeliveryAddress('Москва, Пресненская наб., 12 (Москва-Сити, БЦ Восток)');
    }, 900);
  };

  // Calculations
  const totalItemsCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const rawSum = cart.reduce((sum, c) => {
    const modifiersCost = c.selectedModifiers.reduce((mSum, m) => mSum + m.price, 0);
    return sum + (c.item.price + modifiersCost) * c.quantity;
  }, 0);

  const promoDiscount = Math.round(rawSum * 0.15); // 15% promo
  const pointsDiscount = useLoyaltyPoints ? Math.min(pointsToApply, rawSum - promoDiscount) : 0;
  const finalPayable = Math.max(0, rawSum - promoDiscount - pointsDiscount);

  // Place order
  const handlePlaceOrder = () => {
    triggerHaptic();
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#38BDF8', '#10B981', '#ffffff']
      });
    } catch {}

    const newId = Math.floor(2000 + Math.random() * 7000);
    setOrderId(newId);
    setOrderStage('success');
    setDeliveryStatusStep(1);
    setOrderTimeElapsed(0);

    // Progression of live steps for realistic immersion
    setTimeout(() => setDeliveryStatusStep(2), 2500);
    setTimeout(() => setDeliveryStatusStep(3), 6500);
  };

  const handleResetDemo = () => {
    setCart([
      {
        item: MENU_ITEMS[0],
        quantity: 1,
        selectedDoneness: 'Medium Well',
        selectedModifiers: [{ id: 'm2', name: 'Хрустящий бекон', price: 80 }],
        itemKey: 'b1-Medium Well-[m2]'
      },
      {
        item: MENU_ITEMS[5],
        quantity: 1,
        selectedModifiers: [],
        itemKey: 'd1--[]'
      }
    ]);
    setOrderStage('menu');
    setCourierChatOpen(false);
  };

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col xl:flex-row gap-4 sm:gap-6 items-center xl:items-start justify-center p-1 sm:p-4 w-full max-w-5xl mx-auto">
      
      {/* Smartphone TMA Frame Simulator with dynamic lighting */}
      <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[365px] shrink-0 rounded-[34px] sm:rounded-[44px] border-[4px] sm:border-[6px] border-[#22222a] bg-[#0E0E12] p-2 sm:p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] ring-1 ring-white/10 relative overflow-hidden">
        
        {/* Dynamic Island / Speaker bar with camera lens reflection */}
        <div className="mx-auto w-24 sm:w-28 h-3.5 sm:h-4 rounded-full bg-[#1A1410] flex items-center justify-between px-2.5 sm:px-3 mb-2 border border-amber-500/10">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2E2218]" />
          <span className="h-1 w-8 sm:w-9 rounded-full bg-[#261B12]" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        </div>

        {/* TMA Top Navigation Header with Native Telegram UI */}
        <div className="rounded-xl sm:rounded-2xl bg-[#1A1410] border border-amber-500/15 p-2 sm:p-2.5 mb-2 sm:mb-2.5 flex items-center justify-between text-xs shadow-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button 
              onClick={handleResetDemo}
              className="text-amber-400 font-semibold text-[11px] hover:underline flex items-center gap-0.5"
            >
              <span>Закрыть</span>
            </button>
            <div className="h-3 w-px bg-white/15" />
            <div className="flex flex-col">
              <span className="font-bold text-white text-[11px] sm:text-xs leading-tight flex items-center gap-1">
                🍔 Urban Lunch
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="text-[8px] sm:text-[9px] text-amber-300/70 font-mono">TMA Bot v2.4</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5">
            {hapticFeedbackTriggered && (
              <span className="text-[8px] sm:text-[9px] font-mono font-bold text-amber-400 px-1.5 py-0.5 rounded bg-amber-500/15 animate-pulse">
                Haptic
              </span>
            )}
            <button 
              onClick={handleResetDemo}
              title="Сбросить состояние демо"
              className="p-1 sm:p-1.5 rounded-lg bg-[#281E16] text-amber-200/80 hover:text-white hover:bg-amber-600/30 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* TMA Screen Body */}
        <div className="h-[400px] sm:h-[460px] overflow-y-auto rounded-xl sm:rounded-2xl bg-[#120E0B] p-2 sm:p-3 text-white relative flex flex-col justify-between scrollbar-none border border-amber-950/40">
          
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: Interactive Menu with Category Filter & Dish Cards */}
            {orderStage === 'menu' && (
              <motion.div
                key="menu-view"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-3"
              >
                {/* Banner Promo & Loyalty Header */}
                <div className="rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 p-2.5 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                      <Flame className="h-4 w-4 fill-current" />
                    </div>
                    <div>
                      <div className="text-[11px] font-black text-white flex items-center gap-1">
                        Промокод BURGER15
                        <span className="rounded bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.2 text-[8px] font-black text-black">
                          -15%
                        </span>
                      </div>
                      <div className="text-[9px] text-gray-300">Ваш кэшбэк: <span className="text-amber-400 font-bold">240 баллов</span></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-0.5 justify-end">
                      <Clock className="h-2.5 w-2.5" /> 25-35 мин
                    </span>
                  </div>
                </div>

                {/* Animated Category Filter */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          triggerHaptic();
                          setActiveCategory(cat.id);
                        }}
                        className={`relative rounded-xl px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap transition-all ${
                          isActive 
                            ? 'text-black font-bold' 
                            : 'text-gray-400 bg-[#1E1712] hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeUrbanCat"
                            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
                            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Menu items list with Customizer Trigger */}
                <motion.div layout className="space-y-2.5 pb-14">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => {
                      const inCartCount = cart
                        .filter(c => c.item.id === item.id)
                        .reduce((sum, c) => sum + c.quantity, 0);

                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.96 }}
                          onClick={() => handleOpenCustomizer(item)}
                          className="group cursor-pointer rounded-2xl border border-amber-500/10 bg-[#1A1410] p-2.5 flex items-center justify-between hover:border-amber-500/40 hover:bg-[#221B15] transition-all"
                        >
                          <div className="flex items-center gap-2.5 min-w-0 flex-1">
                            <div className="relative h-12 w-12 rounded-xl bg-[#261E18] border border-amber-500/10 overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                              <img
                                src={item.image}
                                alt={item.name}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                              <span className="absolute bottom-0 right-0 text-[9px] bg-black/70 rounded-tl px-1">
                                {item.emoji}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pr-1">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                                  {item.name}
                                </h4>
                                {item.popular && (
                                  <span className="rounded bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30 text-[8px] font-bold px-1 py-0.2">Хит</span>
                                )}
                                {item.isNew && (
                                  <span className="rounded bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1 py-0.2">New</span>
                                )}
                              </div>
                              <p className="text-[9px] text-gray-400 line-clamp-1 mt-0.5">{item.description}</p>
                              
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="text-xs font-black text-amber-400 font-mono">{item.price} ₽</span>
                                <span className="text-[9px] text-gray-500 font-mono">{item.calories}</span>
                                {item.donenessOptions && (
                                  <span className="text-[8px] text-amber-300/80 border border-amber-500/20 px-1 rounded flex items-center gap-0.5">
                                    <SlidersHorizontal className="h-2 w-2 text-amber-400" /> Настроить
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Button */}
                          <div className="shrink-0 ml-1.5">
                            {inCartCount > 0 ? (
                              <div className="flex items-center gap-1 rounded-lg bg-amber-500/20 border border-amber-500/40 px-2 py-1 text-amber-400 text-[10px] font-bold">
                                <span>{inCartCount} в заказе</span>
                              </div>
                            ) : (
                              <button
                                onClick={(e) => {
                                  if (item.donenessOptions || item.availableModifiers) {
                                    handleOpenCustomizer(item);
                                  } else {
                                    handleQuickAdd(item, e);
                                  }
                                }}
                                className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#281E16] text-amber-200 group-hover:bg-gradient-to-r group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-black transition-all"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}

            {/* VIEW 2: Interactive Dish Customizer Bottom Sheet (Конструктор блюда) */}
            {orderStage === 'customize' && customizingItem && (
              <motion.div
                key="customize-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="space-y-3 pb-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <button 
                    onClick={() => setOrderStage('menu')}
                    className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 hover:underline"
                  >
                    ← Назад
                  </button>
                  <span className="text-xs font-bold text-white">Конструктор блюда</span>
                  <span className="h-4 w-4" />
                </div>

                {/* Dish Presentation Header */}
                <div className="rounded-2xl bg-[#1A1410] p-3 border border-amber-500/15 flex items-center gap-3">
                  <div className="h-14 w-14 rounded-xl bg-[#261E18] overflow-hidden shrink-0 border border-amber-500/20">
                    <img
                      src={customizingItem.image}
                      alt={customizingItem.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{customizingItem.name}</h3>
                    <p className="text-[9px] text-gray-400 mt-0.5">{customizingItem.description}</p>
                    <div className="text-xs font-mono font-black text-amber-400 mt-1">Базовая цена: {customizingItem.price} ₽</div>
                  </div>
                </div>

                {/* Doneness Selector (if applicable) */}
                {customizingItem.donenessOptions && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <Flame className="h-3 w-3 text-amber-400" /> Степень прожарки котлеты:
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {customizingItem.donenessOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => {
                            triggerHaptic();
                            setCustomDoneness(opt);
                          }}
                          className={`py-1.5 px-1 rounded-xl text-[9px] font-bold border transition-all ${
                            customDoneness === opt
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-400 shadow-sm'
                              : 'bg-[#201812] text-gray-400 border-white/5 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extra Modifiers / Toppings */}
                {customizingItem.availableModifiers && customizingItem.availableModifiers.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase flex items-center gap-1">
                      <Plus className="h-3 w-3 text-amber-400" /> Добавить топпинги:
                    </label>
                    <div className="space-y-1">
                      {customizingItem.availableModifiers.map((mod) => {
                        const isSelected = customModifiers.some(m => m.id === mod.id);
                        return (
                          <div
                            key={mod.id}
                            onClick={() => {
                              triggerHaptic();
                              if (isSelected) {
                                setCustomModifiers(prev => prev.filter(m => m.id !== mod.id));
                              } else {
                                setCustomModifiers(prev => [...prev, mod]);
                              }
                            }}
                            className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-amber-500/15 border-amber-500 text-white'
                                : 'bg-[#1A1410] border-white/5 text-gray-400 hover:border-amber-500/20'
                            }`}
                          >
                            <span className="text-[10px] font-semibold">{mod.name}</span>
                            <span className="text-[10px] font-mono font-bold text-amber-400">+{mod.price} ₽</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Exclude ingredients */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase">Особые пожелания:</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => {
                        triggerHaptic();
                        setCustomNoOnions(!customNoOnions);
                      }}
                      className={`p-1.5 rounded-xl border text-[9px] font-semibold text-center transition-all ${
                        customNoOnions 
                          ? 'border-orange-500/60 bg-orange-500/20 text-orange-300' 
                          : 'border-white/5 bg-[#1A1410] text-gray-400'
                      }`}
                    >
                      {customNoOnions ? '✕ Без лука' : '+ Без лука'}
                    </button>
                    <button
                      onClick={() => {
                        triggerHaptic();
                        setCustomNoSauce(!customNoSauce);
                      }}
                      className={`p-1.5 rounded-xl border text-[9px] font-semibold text-center transition-all ${
                        customNoSauce 
                          ? 'border-orange-500/60 bg-orange-500/20 text-orange-300' 
                          : 'border-white/5 bg-[#1A1410] text-gray-400'
                      }`}
                    >
                      {customNoSauce ? '✕ Без соуса' : '+ Соус отдельно'}
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleSaveCustomizedItem}
                  className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs hover:brightness-110 active:scale-98 transition-all flex items-center justify-between px-3 shadow-[0_4px_15px_rgba(245,158,11,0.35)]"
                >
                  <span>Добавить в заказ</span>
                  <span className="font-mono">
                    {customizingItem.price + customModifiers.reduce((s, m) => s + m.price, 0)} ₽
                  </span>
                </button>
              </motion.div>
            )}

            {/* VIEW 3: Interactive Checkout (СБП, Геолокация Telegram, Бонусы) */}
            {orderStage === 'checkout' && (
              <motion.div
                key="checkout-view"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3 pb-2"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <button 
                    onClick={() => setOrderStage('menu')}
                    className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 hover:underline"
                  >
                    ← В меню
                  </button>
                  <span className="text-xs font-bold text-white">Оформление заказа</span>
                  <span className="text-[10px] text-gray-400 font-mono">{totalItemsCount} поз.</span>
                </div>

                {/* Telegram Profile & Geolocation Card */}
                <div className="rounded-2xl bg-[#1A1410] p-2.5 border border-amber-500/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-300 text-[10px]">
                      <MapPin className="h-3 w-3 text-amber-400" />
                      <span className="font-bold">Адрес доставки:</span>
                    </div>
                    <button
                      onClick={handleAutoDetectLocation}
                      disabled={isDetectingGeo}
                      className="text-[9px] text-amber-400 hover:underline flex items-center gap-0.5 font-mono"
                    >
                      <Compass className={`h-2.5 w-2.5 ${isDetectingGeo ? 'animate-spin' : ''}`} />
                      <span>{isDetectingGeo ? 'Определяем...' : 'Из Telegram'}</span>
                    </button>
                  </div>
                  <div className="text-xs font-semibold text-white bg-[#120E0B] p-2 rounded-xl border border-amber-500/10">
                    {deliveryAddress}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <span>Курьер до двери</span>
                    <span className="text-emerald-400 font-bold">⏱ 25–35 минут</span>
                  </div>
                </div>

                {/* Cart Items List in Checkout */}
                <div className="rounded-2xl bg-[#1A1410] p-2.5 border border-amber-500/15 space-y-1.5 max-h-28 overflow-y-auto scrollbar-none">
                  {cart.map((c) => (
                    <div key={c.itemKey} className="flex items-center justify-between text-[10px] py-1 border-b border-white/5 last:border-0">
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="font-semibold text-white truncate flex items-center gap-1">
                          <span>{c.item.name}</span>
                          {c.selectedDoneness && (
                            <span className="text-[8px] text-gray-400">({c.selectedDoneness})</span>
                          )}
                        </div>
                        {c.selectedModifiers.length > 0 && (
                          <div className="text-[8px] text-amber-400 truncate">
                            +{c.selectedModifiers.map(m => m.name).join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleDecrementCartItem(c.itemKey)}
                          className="h-4 w-4 rounded bg-[#281E16] flex items-center justify-center text-gray-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-bold text-white w-3 text-center">{c.quantity}</span>
                        <button
                          onClick={() => handleIncrementCartItem(c.itemKey)}
                          className="h-4 w-4 rounded bg-[#281E16] flex items-center justify-center text-amber-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loyalty points toggle */}
                <div 
                  onClick={() => {
                    triggerHaptic();
                    setUseLoyaltyPoints(!useLoyaltyPoints);
                  }}
                  className={`rounded-2xl p-2.5 border flex items-center justify-between cursor-pointer transition-all ${
                    useLoyaltyPoints 
                      ? 'bg-amber-500/15 border-amber-500/40 text-white' 
                      : 'bg-[#1A1410] border-amber-500/10 text-gray-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Gift className={`h-4 w-4 ${useLoyaltyPoints ? 'text-amber-400' : 'text-gray-400'}`} />
                    <div>
                      <div className="text-[10px] font-bold text-white">Списать баллы лояльности</div>
                      <div className="text-[8px] text-gray-400">Доступно: {userLoyaltyBalance} баллов (-200 ₽)</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={useLoyaltyPoints}
                    onChange={() => {}}
                    className="h-4 w-4 accent-amber-500 rounded"
                  />
                </div>

                {/* Payment Method Selector (СБП, Карта, Курьеру) */}
                <div className="space-y-1">
                  <label className="text-[9px] font-mono text-gray-400 uppercase">Способ оплаты:</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'sbp', label: '⚡ СБП', sub: 'Без комиссии' },
                      { id: 'card', label: '💳 Карта', sub: 'МИР / Visa' },
                      { id: 'cash', label: '💵 Курьеру', sub: 'При получении' },
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          triggerHaptic();
                          setPaymentMethod(p.id as any);
                        }}
                        className={`p-1.5 rounded-xl border text-center transition-all ${
                          paymentMethod === p.id 
                            ? 'border-amber-400 bg-amber-500/20 text-white font-bold shadow-sm' 
                            : 'border-white/5 bg-[#1A1410] text-gray-400'
                        }`}
                      >
                        <div className="text-[9px] font-bold">{p.label}</div>
                        <div className="text-[7px] text-gray-400">{p.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total breakdown */}
                <div className="rounded-2xl bg-[#1A1410] p-2.5 border border-amber-500/15 space-y-1 text-[10px]">
                  <div className="flex justify-between text-gray-400">
                    <span>Сумма заказа:</span>
                    <span className="font-mono">{rawSum} ₽</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Промокод (-15%):</span>
                    <span className="font-mono">-{promoDiscount} ₽</span>
                  </div>
                  {useLoyaltyPoints && (
                    <div className="flex justify-between text-amber-400">
                      <span>Баллы лояльности:</span>
                      <span className="font-mono">-{pointsDiscount} ₽</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-400">
                    <span>Доставка:</span>
                    <span className="text-emerald-400 font-bold">0 ₽ (Бесплатно)</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/10 flex justify-between font-bold text-white text-xs">
                    <span>К оплате:</span>
                    <span className="text-amber-400 font-mono text-sm">{finalPayable} ₽</span>
                  </div>
                </div>

                {/* Main Action Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={totalItemsCount === 0}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs hover:brightness-110 active:scale-98 transition-all shadow-[0_5px_20px_rgba(245,158,11,0.35)] flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 fill-current" />
                  <span>Оплатить {finalPayable} ₽ через {paymentMethod === 'sbp' ? 'СБП' : paymentMethod === 'card' ? 'Карту' : 'Курьера'}</span>
                </button>
              </motion.div>
            )}

            {/* VIEW 4: Live Order Progress Tracking with Courier Status */}
            {orderStage === 'success' && (
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3 pb-2 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center text-emerald-400">
                  <Check className="h-6 w-6 stroke-[3]" />
                </div>
                
                <div>
                  <h3 className="text-xs font-black text-white">Заказ #{orderId} принят в работу!</h3>
                  <p className="text-[9px] text-gray-400 mt-0.5">Электронный чек 54-ФЗ отправлен в Telegram бот</p>
                </div>

                {/* Interactive Live Kitchen & Courier Timeline */}
                <div className="rounded-2xl bg-[#1A1410] p-3 border border-amber-500/15 text-left text-xs space-y-2.5">
                  <div className="flex items-center justify-between text-[9px] text-gray-400 font-mono">
                    <span className="flex items-center gap-1 text-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE СТАТУС ЗАКАЗА
                    </span>
                    <span className="text-amber-400 font-bold">⏱ 24 мин</span>
                  </div>

                  {/* Step indicators */}
                  <div className="space-y-2 text-[10px]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span className="text-gray-300 font-medium">Заказ подтвержден кухней (14:32)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {deliveryStatusStep >= 2 ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <UtensilsCrossed className="h-3.5 w-3.5 text-amber-400 animate-spin shrink-0" />
                      )}
                      <span className={deliveryStatusStep >= 2 ? 'text-white font-bold' : 'text-gray-400'}>
                        Шеф готовит бургеры на гриле
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {deliveryStatusStep >= 3 ? (
                        <Bike className="h-3.5 w-3.5 text-amber-400 animate-bounce shrink-0" />
                      ) : (
                        <span className="h-3.5 w-3.5 rounded-full border border-white/20 flex items-center justify-center text-[8px] text-gray-500 shrink-0">3</span>
                      )}
                      <span className={deliveryStatusStep >= 3 ? 'text-amber-400 font-bold' : 'text-gray-500'}>
                        Курьер Артем в пути к вам (11 мин)
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#242430] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00E5FF] to-emerald-400 transition-all duration-1000"
                      style={{ width: deliveryStatusStep === 1 ? '35%' : deliveryStatusStep === 2 ? '70%' : '92%' }}
                    />
                  </div>
                </div>

                {/* Courier Contact Card */}
                <div className="rounded-2xl bg-[#181820] p-2.5 border border-white/5 flex items-center justify-between text-left">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-full bg-[#242430] border border-white/10 flex items-center justify-center text-sm">
                      🚴‍♂️
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-white">Курьер Артем</div>
                      <div className="text-[8px] text-gray-400 flex items-center gap-1">
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" /> 4.98 • Электробайк
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setCourierChatOpen(!courierChatOpen)}
                      className="p-1.5 rounded-lg bg-[#281E16] text-amber-400 hover:bg-amber-500 hover:text-black transition-colors"
                      title="Написать в чат Telegram"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => triggerHaptic()}
                      className="p-1.5 rounded-lg bg-[#281E16] text-emerald-400 hover:bg-emerald-400 hover:text-black transition-colors"
                      title="Позвонить курьеру"
                    >
                      <Phone className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {courierChatOpen && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-2 rounded-xl bg-[#281E16] text-[9px] text-amber-200/90 text-left border border-amber-500/20"
                  >
                    💬 <strong>Курьер:</strong> «Уже забрал ваш заказ из ресторана! Буду через 10 минут, домофон работает?»
                  </motion.div>
                )}

                {/* Reset button */}
                <button
                  onClick={handleResetDemo}
                  className="w-full py-2 rounded-xl border border-amber-500/20 bg-[#1A1410] text-[10px] font-semibold text-gray-300 hover:text-white hover:border-amber-500 transition-all"
                >
                  Сделать новый заказ
                </button>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Bottom Cart Button (in menu view) */}
        {orderStage === 'menu' && (
          <div className="mt-2">
            <button
              onClick={() => {
                triggerHaptic();
                setOrderStage('checkout');
              }}
              disabled={totalItemsCount === 0}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all ${
                totalItemsCount > 0
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:brightness-110 shadow-[0_5px_20px_rgba(245,158,11,0.35)] active:scale-98'
                  : 'bg-[#1A1410] text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4" />
                <span>Корзина ({totalItemsCount})</span>
              </div>
              <span className="font-mono">{finalPayable} ₽</span>
            </button>
          </div>
        )}

      </div>

      {/* Feature highlight commentary & tech architecture sidebar */}
      <div className="w-full xl:w-96 rounded-3xl border border-amber-900/30 dark:border-amber-500/20 bg-white/95 dark:bg-[#16110D]/95 p-5 sm:p-6 space-y-4 text-xs shadow-xl backdrop-blur-md">
        
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/15">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-[11px] font-bold">
            <Sparkles className="h-4 w-4" />
            <span>АРХИТЕКТУРА КЕЙСА URBAN LUNCH</span>
          </div>
          <span className="text-[10px] rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono px-2 py-0.5 font-bold">
            Production Ready
          </span>
        </div>

        <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-[11px]">
          Полноценный ресторанный сервис внутри мессенджера Telegram с конверсией в повторный заказ в 3.8 раза выше, чем у нативных приложений.
        </p>

        <div className="space-y-2.5">
          <div className="text-[10px] font-mono uppercase text-amber-500/80 font-bold">
            Что реализовано в этом решении:
          </div>

          <ul className="space-y-2 text-slate-700 dark:text-gray-300">
            <li className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <SlidersHorizontal className="h-3 w-3" />
              </div>
              <div>
                <strong>Конструктор блюд и модификаторы:</strong> Выбор степени прожарки, добавление сыра/бекона, исключение аллергенов.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="h-3 w-3" />
              </div>
              <div>
                <strong>Автоподстановка профиля:</strong> Телефон и геолокация подтягиваются из Telegram в один тап без ручного ввода.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Gift className="h-3 w-3" />
              </div>
              <div>
                <strong>Кэшбэк и бонусы:</strong> Накопительная система баллов, стимулирующая клиентов заказывать каждую неделю.
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <div className="h-5 w-5 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bike className="h-3 w-3" />
              </div>
              <div>
                <strong>Сквозной трекинг кухни и курьера:</strong> Webhook-интеграция с iiko / 1C:Общепит с авто-статусами.
              </div>
            </li>
          </ul>
        </div>

        {/* Business Impact Card */}
        <div className="rounded-2xl bg-amber-500/10 dark:bg-[#201812] p-4 border border-amber-500/20 space-y-2">
          <span className="text-[10px] text-amber-400 block font-mono">РЕЗУЛЬТАТ ДЛЯ БИЗНЕСА:</span>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-lg font-black text-amber-400 font-mono">+30.4%</div>
              <div className="text-[10px] text-slate-600 dark:text-gray-400">Повторные заказы</div>
            </div>
            <div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">1.2 млн ₽</div>
              <div className="text-[10px] text-slate-600 dark:text-gray-400">Экономия на комиссиях агрегаторов</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-gray-400 pt-1">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
          <span>Готово к подключению к вашей CRM за 10 рабочих дней</span>
        </div>

      </div>

    </div>
  );
};
