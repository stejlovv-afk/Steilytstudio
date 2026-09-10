import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Heart, Star, Plus, Minus, Check, ArrowRight,
  ShieldCheck, Truck, Sparkles, RefreshCw, Tag, X, ChevronRight,
  CreditCard, CheckCircle2, SlidersHorizontal, Eye, Box, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: 'hoodies' | 'sneakers' | 'accessories' | 'gadgets';
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeEn?: string;
  colors: string[];
  colorsEn: string[];
  sizes: string[];
  stockLeft: number;
  description: string;
  descriptionEn: string;
  composition: string;
  compositionEn: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Худи Oversize Heavyweight "Nordic"',
    nameEn: 'Oversize Heavyweight Hoodie "Nordic"',
    category: 'hoodies',
    price: 4890,
    oldPrice: 6200,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80',
    badge: 'Хит продаж',
    badgeEn: 'Bestseller',
    colors: ['Графит', 'Черный', 'Молочный'],
    colorsEn: ['Charcoal', 'Black', 'Milk'],
    sizes: ['S', 'M', 'L', 'XL'],
    stockLeft: 4,
    description: 'Плотный хлопковый футер 480 г/м² с мягким брашированным начесом. Двойной капюшон держит форму.',
    descriptionEn: 'Heavyweight 480 gsm cotton fleece with brushed fleece lining. Double-layered structured hood.',
    composition: '85% органический хлопок, 15% полиэстер',
    compositionEn: '85% organic cotton, 15% polyester'
  },
  {
    id: 'p2',
    name: 'Кроссовки Tech Runner Pro Air',
    nameEn: 'Tech Runner Pro Air Sneakers',
    category: 'sneakers',
    price: 8490,
    oldPrice: 10900,
    rating: 5.0,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    badge: '-22%',
    badgeEn: '-22%',
    colors: ['Серый/Синий', 'Черный'],
    colorsEn: ['Grey/Navy', 'Black'],
    sizes: ['40', '41', '42', '43', '44'],
    stockLeft: 2,
    description: 'Амортизирующая подошва CloudFoam с цепким резиновым протектором. Водоотталкивающий дышащий верх.',
    descriptionEn: 'CloudFoam cushioned sole with high-traction rubber outsole. Water-repellent breathable upper.',
    composition: 'Технологичный рипстоп, пена EVA, резина',
    compositionEn: 'Technical ripstop, EVA foam, rubber outsole'
  },
  {
    id: 'p3',
    name: 'Городской рюкзак Roll-Top Waterproof',
    nameEn: 'Roll-Top Waterproof Urban Backpack',
    category: 'accessories',
    price: 3990,
    rating: 4.85,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    badge: 'Новинка',
    badgeEn: 'New Arrival',
    colors: ['Матовый черный', 'Олива'],
    colorsEn: ['Matte Black', 'Olive'],
    sizes: ['24L'],
    stockLeft: 7,
    description: 'Герметичный влагозащитный рюкзак с отдельным мягким отсеком под ноутбук 16" и потайным карманом.',
    descriptionEn: 'Sealed waterproof pack with padded 16" laptop sleeve and concealed anti-theft pocket.',
    composition: 'Cordura 600D с влагозащитной пропиткой',
    compositionEn: 'Cordura 600D with water-repellent coating'
  },
  {
    id: 'p4',
    name: 'Беспроводные наушники SoundCore ANC',
    nameEn: 'SoundCore ANC Wireless Headphones',
    category: 'gadgets',
    price: 5290,
    oldPrice: 6990,
    rating: 4.95,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    badge: 'Топ звук',
    badgeEn: 'Top Audio',
    colors: ['Космический серый', 'Белый'],
    colorsEn: ['Space Grey', 'White'],
    sizes: ['Universal'],
    stockLeft: 5,
    description: 'Активное гибридное шумоподавление до 38 дБ, 40 часов автономной работы и быстрая зарядка Type-C.',
    descriptionEn: 'Hybrid active noise cancellation up to 38 dB, 40-hour playtime and rapid USB-C fast charging.',
    composition: 'Титан, экокожа с эффектом памяти',
    compositionEn: 'Titanium drivers, memory foam synthetic leather'
  },
];

export const FitTrackTester: React.FC = () => {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  const [activeTab, setActiveTab] = useState<'catalog' | 'cart' | 'order-success'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected product modal
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  // Favorites
  const [favorites, setFavorites] = useState<Record<string, boolean>>({ p1: true });
  
  // Cart state
  const [cart, setCart] = useState<Array<{
    product: Product;
    quantity: number;
    color: string;
    size: string;
  }>>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      color: 'Графит',
      size: 'L'
    }
  ]);

  // Promo code
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0); // percent
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Delivery & payment selection
  const [deliveryType, setDeliveryType] = useState<'cdek_point' | 'courier'>('cdek_point');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'split'>('sbp');
  const [orderNumber, setOrderNumber] = useState<number>(78492);
  const [trackNumber, setTrackNumber] = useState<string>('CDEK-884029104');

  // Interactive scenario prompt trigger
  const [interactiveAlert, setInteractiveAlert] = useState<string | null>(null);

  const showInteractiveAlert = (msg: string) => {
    setInteractiveAlert(msg);
    setTimeout(() => setInteractiveAlert(null), 3500);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      showInteractiveAlert(
        next[id] 
          ? (isRu ? 'Товар добавлен в избранное ❤️' : 'Added to favorites ❤️') 
          : (isRu ? 'Товар удален из избранного' : 'Removed from favorites')
      );
      return next;
    });
  };

  const openDetail = (prod: Product) => {
    setDetailProduct(prod);
    const colors = isRu ? prod.colors : prod.colorsEn;
    setSelectedColor(colors[0] || prod.colors[0]);
    setSelectedSize(prod.sizes[0]);
  };

  const addToCartFromDetail = () => {
    if (!detailProduct) return;
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === detailProduct.id && item.color === selectedColor && item.size === selectedSize
      );
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          product: detailProduct,
          quantity: 1,
          color: selectedColor,
          size: selectedSize
        }
      ];
    });
    setDetailProduct(null);
    const prodName = isRu ? detailProduct.name : detailProduct.nameEn;
    showInteractiveAlert(
      isRu ? `«${prodName}» добавлен в корзину! 🛍️` : `"${prodName}" added to cart! 🛍️`
    );
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        next.splice(index, 1);
      } else {
        next[index].quantity = newQty;
      }
      return next;
    });
  };

  const handleApplyPromo = () => {
    if (promoInput.trim().toUpperCase() === 'SALE15' || promoInput.trim().toUpperCase() === 'START') {
      setAppliedDiscount(15);
      setPromoMessage(isRu ? 'Промокод применен: скидка 15% 🎉' : 'Promo code applied: 15% discount 🎉');
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {}
    } else {
      setPromoMessage(isRu ? 'Попробуйте промокод: SALE15' : 'Try promo code: SALE15');
    }
  };

  // Calculations
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (appliedDiscount / 100));
  const deliveryCost = rawSubtotal >= 5000 ? 0 : 350;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + deliveryCost);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#2563EB', '#38BDF8', '#10B981']
      });
    } catch {}
    const newId = Math.floor(70000 + Math.random() * 20000);
    setOrderNumber(newId);
    setTrackNumber(`CDEK-${Math.floor(100000000 + Math.random() * 900000000)}`);
    setActiveTab('order-success');
  };

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const nameToSearch = isRu ? p.name : `${p.name} ${p.nameEn}`;
    const descToSearch = isRu ? p.description : `${p.description} ${p.descriptionEn}`;
    const matchesSearch = nameToSearch.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          descToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const categories = [
    { id: 'all', label: isRu ? 'Все товары' : 'All Products' },
    { id: 'hoodies', label: isRu ? 'Худи' : 'Hoodies' },
    { id: 'sneakers', label: isRu ? 'Обувь' : 'Footwear' },
    { id: 'accessories', label: isRu ? 'Рюкзаки' : 'Bags' },
    { id: 'gadgets', label: isRu ? 'Гаджеты' : 'Gadgets' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-5 sm:gap-7 items-center lg:items-start justify-center p-1 sm:p-4">
      
      {/* Smartphone TMA Frame Simulator */}
      <div className="w-full max-w-[320px] xs:max-w-[340px] sm:max-w-[365px] rounded-[38px] sm:rounded-[46px] border-[6px] sm:border-[8px] border-[#161B28] bg-[#0A0D14] p-2.5 sm:p-3.5 shadow-2xl ring-1 ring-blue-900/30 relative overflow-hidden">
        
        {/* Dynamic Island / Speaker notch */}
        <div className="mx-auto flex items-center justify-between w-26 sm:w-30 h-4 rounded-full bg-[#111622] px-3 mb-2.5 border border-white/5 shadow-inner">
          <div className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          <div className="h-1 w-10 sm:w-12 rounded-full bg-slate-800" />
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500/50" />
          </div>
        </div>

        {/* Telegram Top App Header */}
        <div className="pt-2 pb-2.5 px-3 border-b border-white/10 bg-[#121826] rounded-t-[24px] sm:rounded-t-[30px] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setActiveTab('catalog')}
              className="text-[11px] text-blue-400 font-semibold hover:text-blue-300 transition-colors flex items-center gap-0.5"
            >
              {activeTab === 'catalog' ? (
                <span className="text-slate-400 font-normal">{isRu ? 'Закрыть' : 'Close'}</span>
              ) : (
                <>
                  <span className="text-xs">‹</span>
                  <span>{isRu ? 'В магазин' : 'Store'}</span>
                </>
              )}
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-black text-white flex items-center justify-center gap-1">
              <span>Nordic Store</span>
              <span className="h-3 w-3 rounded-full bg-blue-500 text-[8px] text-white flex items-center justify-center font-mono">✓</span>
            </div>
            <p className="text-[8px] sm:text-[9px] text-slate-400">
              {isRu ? 'Telegram Mini App • бот онлайн' : 'Telegram Mini App • Bot online'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'cart' ? 'catalog' : 'cart')}
              className="relative p-1.5 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-600 transition-all"
              title={isRu ? 'Открыть корзину' : 'Open cart'}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-blue-600 text-white text-[8px] font-black flex items-center justify-center shadow-md shadow-blue-600/40">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mini App Body */}
        <div className="h-[400px] sm:h-[455px] overflow-y-auto rounded-b-[24px] sm:rounded-b-[30px] bg-gradient-to-b from-[#0E1320] via-[#0A0D15] to-[#080B12] p-2.5 sm:p-3 text-slate-100 relative scrollbar-none text-xs">
          
          {/* Notification Alert Toast */}
          <AnimatePresence>
            {interactiveAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-2 inset-x-3 z-40 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-1.5 px-3 rounded-xl shadow-xl shadow-blue-900/40 text-[10px] text-center border border-blue-400/30"
              >
                {interactiveAlert}
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 1: CATALOG */}
          {activeTab === 'catalog' && (
            <div className="space-y-3 pb-12">
              
              {/* Promo Banner Streetwear Edition */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-700 to-cyan-700 p-3 text-white shadow-lg shadow-blue-950/50 relative overflow-hidden border border-blue-400/20">
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.5 rounded bg-white/20 text-[8px] font-black tracking-widest uppercase backdrop-blur-xs">
                      LIMITED DROP
                    </span>
                    <span className="text-[8px] text-blue-200 font-mono">// FW 2026</span>
                  </div>
                  <h3 className="font-display font-black text-sm sm:text-base leading-tight">
                    {isRu ? 'Скидка -15% на всё' : '15% Off Sitewide'}
                  </h3>
                  <p className="text-[10px] text-blue-100 mt-0.5 flex items-center gap-1">
                    {isRu ? 'Промокод:' : 'Promo code:'}{' '}
                    <button 
                      onClick={() => {
                        setPromoInput('SALE15');
                        showInteractiveAlert(isRu ? 'Промокод SALE15 скопирован!' : 'Promo code SALE15 copied!');
                      }}
                      className="font-mono font-bold bg-white/20 hover:bg-white/30 px-1.5 py-0.2 rounded underline cursor-pointer"
                    >
                      SALE15
                    </button>
                  </p>
                </div>
                <Sparkles className="absolute -right-2 -bottom-2 h-16 w-16 text-white/10 pointer-events-none" />
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={isRu ? 'Поиск по каталогу...' : 'Search catalog...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#131929] border border-blue-900/30 text-[11px] text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Categories Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'bg-[#131826] text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Products 2-Column Grid */}
              <div className="grid grid-cols-2 gap-2">
                {filteredProducts.map(prod => {
                  const badge = isRu ? prod.badge : (prod.badgeEn || prod.badge);
                  const prodName = isRu ? prod.name : prod.nameEn;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => openDetail(prod)}
                      className="group rounded-2xl bg-[#111726] border border-blue-950/60 p-2 flex flex-col justify-between hover:border-blue-500/50 hover:bg-[#141B2D] transition-all cursor-pointer relative shadow-sm"
                    >
                      {/* Badge */}
                      {badge && (
                        <span className="absolute top-3 left-3 z-10 rounded-md bg-blue-600 px-1.5 py-0.5 text-[8px] font-black text-white shadow-md shadow-blue-600/30">
                          {badge}
                        </span>
                      )}

                      {/* Favorite Heart */}
                      <button
                        onClick={(e) => toggleFavorite(prod.id, e)}
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-slate-300 hover:text-red-400 backdrop-blur-xs transition-colors"
                      >
                        <Heart 
                          className={`h-3 w-3 ${favorites[prod.id] ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                      </button>

                      {/* Product Image */}
                      <div className="w-full h-28 rounded-xl overflow-hidden bg-slate-950 mb-2 relative">
                        <img
                          src={prod.image}
                          alt={prodName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-1 text-[9px] text-amber-400 font-bold mb-0.5">
                          <Star className="h-2.5 w-2.5 fill-amber-400" />
                          <span>{prod.rating}</span>
                          <span className="text-slate-500 font-normal">({prod.reviewsCount})</span>
                        </div>
                        <h4 className="text-[11px] font-bold text-slate-200 line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {prodName}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-1">
                          <span className="text-xs font-black text-white font-mono">{prod.price.toLocaleString('ru-RU')} ₽</span>
                          {prod.oldPrice && (
                            <span className="text-[9px] text-slate-500 line-through font-mono">
                              {prod.oldPrice.toLocaleString('ru-RU')} ₽
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Add Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openDetail(prod);
                        }}
                        className="mt-2 w-full py-1.5 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white text-[10px] font-bold flex items-center justify-center gap-1 transition-all border border-blue-500/30"
                      >
                        <Plus className="h-3 w-3" />
                        <span>{isRu ? 'Выбрать' : 'Select'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* PRODUCT DETAIL MODAL OVERLAY */}
          <AnimatePresence>
            {detailProduct && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="absolute inset-0 z-30 bg-[#0E1320] p-3 overflow-y-auto flex flex-col justify-between scrollbar-none"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-wider flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      <span>{isRu ? 'Карточка товара' : 'Product Details'}</span>
                    </span>
                    <button
                      onClick={() => setDetailProduct(null)}
                      className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Photo */}
                  <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 mb-3 relative border border-blue-900/30">
                    <img
                      src={detailProduct.image}
                      alt={isRu ? detailProduct.name : detailProduct.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 rounded-lg bg-black/80 px-2 py-0.5 text-[9px] text-emerald-400 font-bold backdrop-blur-md flex items-center gap-1 border border-emerald-500/20">
                      <Box className="h-2.5 w-2.5" />
                      <span>
                        {isRu 
                          ? `Осталось ${detailProduct.stockLeft} шт. на складе` 
                          : `${detailProduct.stockLeft} in stock`}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-black text-white leading-snug">
                    {isRu ? detailProduct.name : detailProduct.nameEn}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-base font-black text-blue-400 font-mono">
                      {detailProduct.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {detailProduct.oldPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        {detailProduct.oldPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                  </div>

                  <p className="text-[10px] text-slate-300 mt-2 leading-relaxed">
                    {isRu ? detailProduct.description : detailProduct.descriptionEn}
                  </p>

                  <div className="mt-2 text-[9px] text-slate-400">
                    <span className="text-slate-500">{isRu ? 'Состав:' : 'Materials:'}</span>{' '}
                    {isRu ? detailProduct.composition : detailProduct.compositionEn}
                  </div>

                  {/* Color Selector */}
                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">
                      {isRu ? 'Цвет:' : 'Color:'} <span className="text-white">{selectedColor}</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      {(isRu ? detailProduct.colors : detailProduct.colorsEn).map((col, cIdx) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColor(col)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold border transition-all ${
                            selectedColor === col
                              ? 'border-blue-500 bg-blue-600/30 text-white font-bold'
                              : 'border-slate-800 bg-[#141A29] text-slate-400'
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-3">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">
                      {isRu ? 'Размер:' : 'Size:'} <span className="text-white">{selectedSize}</span>
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {detailProduct.sizes.map(s => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                            selectedSize === s
                              ? 'border-blue-500 bg-blue-600 text-white shadow-md shadow-blue-600/30'
                              : 'border-slate-800 bg-[#141A29] text-slate-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guarantee info */}
                  <div className="mt-3 p-2 rounded-xl bg-[#131929] border border-blue-900/30 flex items-center gap-2 text-[9px] text-slate-300">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>
                      {isRu 
                        ? 'Примерка в СДЭК перед оплатой • Бесплатный возврат 14 дней' 
                        : 'Try-on before payment • Free 14-day returns'}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-2">
                  <button
                    onClick={addToCartFromDetail}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>
                      {isRu ? 'Добавить в корзину •' : 'Add to Cart •'} {detailProduct.price.toLocaleString('ru-RU')} ₽
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TAB 2: CART */}
          {activeTab === 'cart' && (
            <div className="space-y-3 pb-8">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-black text-white">{isRu ? `Корзина (${totalItemsCount})` : `Cart (${totalItemsCount})`}</span>
                <button
                  onClick={() => setCart([])}
                  className="text-[10px] text-slate-400 hover:text-red-400"
                >
                  {isRu ? 'Очистить' : 'Clear'}
                </button>
              </div>

              {/* Free delivery progress */}
              <div className="p-2.5 rounded-xl bg-[#121828] border border-blue-900/30">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-slate-300">
                    {rawSubtotal >= 5000 
                      ? (isRu ? '🎉 Бесплатная доставка СДЭК активирована!' : '🎉 Free delivery unlocked!') 
                      : (isRu ? `До бесплатной доставки: ${5000 - rawSubtotal} ₽` : `Add ${5000 - rawSubtotal} ₽ for free delivery`)}
                  </span>
                  <Truck className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (rawSubtotal / 5000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <ShoppingBag className="h-10 w-10 mx-auto mb-2 opacity-40 text-blue-400" />
                  <p className="text-xs font-medium text-slate-400">{isRu ? 'Корзина пуста' : 'Cart is empty'}</p>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="mt-3 px-4 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-[10px] shadow-md shadow-blue-600/30"
                  >
                    {isRu ? 'Перейти к покупкам' : 'Browse Catalog'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((cItem, idx) => (
                    <div
                      key={`${cItem.product.id}-${idx}`}
                      className="p-2.5 rounded-xl bg-[#121828] border border-blue-900/30 flex items-center justify-between gap-2"
                    >
                      <img
                        src={cItem.product.image}
                        alt={isRu ? cItem.product.name : cItem.product.nameEn}
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-lg object-cover bg-slate-950 shrink-0 border border-white/5"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-[11px] font-bold text-white truncate">
                          {isRu ? cItem.product.name : cItem.product.nameEn}
                        </h4>
                        <div className="text-[9px] text-slate-400">
                          {cItem.color} • {cItem.size}
                        </div>
                        <div className="text-[11px] font-black text-blue-400 mt-0.5 font-mono">
                          {(cItem.product.price * cItem.quantity).toLocaleString('ru-RU')} ₽
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-1.5 py-0.5 shrink-0">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="h-4 w-4 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-[10px] font-bold text-white w-3 text-center">
                          {cItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="h-4 w-4 flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Promo Code Input */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder={isRu ? 'Промокод (SALE15)' : 'Promo code (SALE15)'}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-[#121828] border border-blue-900/30 text-[10px] text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white text-[10px] font-bold border border-blue-500/40"
                    >
                      {isRu ? 'Применить' : 'Apply'}
                    </button>
                  </div>
                  {promoMessage && (
                    <p className="text-[9px] text-emerald-400 font-semibold">{promoMessage}</p>
                  )}

                  {/* Delivery Selection */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-400">{isRu ? 'Способ доставки:' : 'Delivery Method:'}</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setDeliveryType('cdek_point')}
                        className={`p-2 rounded-xl border text-left text-[10px] transition-all ${
                          deliveryType === 'cdek_point'
                            ? 'border-blue-500 bg-blue-600/30 text-white font-bold'
                            : 'border-slate-800 bg-[#121828] text-slate-400'
                        }`}
                      >
                        <div>{isRu ? 'Пункт СДЭК' : 'Pickup Point'}</div>
                        <div className="text-[8px] text-slate-400">
                          {isRu ? '1-2 дня • Бесплатно от 5000 ₽' : '1-2 days • Free from 5000 ₽'}
                        </div>
                      </button>

                      <button
                        onClick={() => setDeliveryType('courier')}
                        className={`p-2 rounded-xl border text-left text-[10px] transition-all ${
                          deliveryType === 'courier'
                            ? 'border-blue-500 bg-blue-600/30 text-white font-bold'
                            : 'border-slate-800 bg-[#121828] text-slate-400'
                        }`}
                      >
                        <div>{isRu ? 'Курьер до двери' : 'Courier delivery'}</div>
                        <div className="text-[8px] text-slate-400">{isRu ? 'С примеркой 15 мин' : '15 min try-on'}</div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-bold text-slate-400">{isRu ? 'Способ оплаты:' : 'Payment Method:'}</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setPaymentMethod('sbp')}
                        className={`p-2 rounded-xl border text-left text-[10px] transition-all flex items-center justify-between ${
                          paymentMethod === 'sbp'
                            ? 'border-blue-500 bg-blue-600/30 text-white font-bold'
                            : 'border-slate-800 bg-[#121828] text-slate-400'
                        }`}
                      >
                        <span>{isRu ? '⚡ СБП в 1 клик' : '⚡ Faster Payments'}</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 rounded font-bold">0%</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 rounded-xl border text-left text-[10px] transition-all ${
                          paymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-600/30 text-white font-bold'
                            : 'border-slate-800 bg-[#121828] text-slate-400'
                        }`}
                      >
                        <span>{isRu ? 'Картой онлайн' : 'Card Online'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Total Calculations */}
                  <div className="p-2.5 rounded-xl bg-[#121828] border border-blue-900/30 space-y-1 text-[10px]">
                    <div className="flex justify-between text-slate-400">
                      <span>{isRu ? 'Товары:' : 'Subtotal:'}</span>
                      <span className="font-mono">{rawSubtotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>{isRu ? `Скидка (${appliedDiscount}%):` : `Discount (${appliedDiscount}%):`}</span>
                        <span className="font-mono">-{discountAmount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>{isRu ? 'Доставка:' : 'Delivery:'}</span>
                      <span>{deliveryCost === 0 ? (isRu ? 'Бесплатно' : 'Free') : `${deliveryCost} ₽`}</span>
                    </div>
                    <div className="flex justify-between font-black text-xs text-white pt-1 border-t border-slate-800">
                      <span>{isRu ? 'К оплате:' : 'Total due:'}</span>
                      <span className="text-blue-400 font-mono">{grandTotal.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span>
                      {isRu 
                        ? `Оплатить через СБП • ${grandTotal.toLocaleString('ru-RU')} ₽` 
                        : `Pay via FPS • ${grandTotal.toLocaleString('ru-RU')} ₽`}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDER SUCCESS */}
          {activeTab === 'order-success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-5 px-2 text-center flex flex-col items-center justify-center space-y-3"
            >
              <div className="h-14 w-14 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <Check className="h-8 w-8 stroke-[3]" />
              </div>
              <h3 className="text-base font-black text-white">
                {isRu ? `Заказ #${orderNumber} оплачен!` : `Order #${orderNumber} paid!`}
              </h3>
              <p className="text-slate-300 text-[11px] max-w-[250px]">
                {isRu 
                  ? 'Оплата через СБП прошла моментально. Чек и статус отправлены вам в чат с ботом.' 
                  : 'Instant payment received. Receipt and tracking info sent to your Telegram chat.'}
              </p>

              {/* Delivery Tracker Card */}
              <div className="rounded-xl bg-[#121828] border border-blue-900/30 p-2.5 w-full text-left space-y-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{isRu ? 'Трек-номер СДЭК:' : 'Courier Tracking #:'}</span>
                  <span className="font-mono font-bold text-blue-400">{trackNumber}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{isRu ? 'Передано на сборку на складе (Москва)' : 'Dispatched to fulfillment hub'}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-1/3 rounded-full" />
                </div>
                <div className="flex justify-between text-[8px] text-slate-500">
                  <span className="text-blue-400 font-bold">{isRu ? 'Сборка' : 'Packing'}</span>
                  <span>{isRu ? 'В пути' : 'In transit'}</span>
                  <span>{isRu ? 'Готов к выдаче' : 'Ready'}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('catalog')}
                className="mt-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
              >
                {isRu ? '← Вернуться в магазин' : '← Return to Store'}
              </button>
            </motion.div>
          )}

        </div>

        {/* Bottom bar Home Indicator */}
        <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-slate-700" />
      </div>

      {/* Side Test Guide & Highlights for Business Owner */}
      <div className="w-full max-w-md space-y-3.5 text-slate-700 dark:text-slate-300 text-xs">
        <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-blue-200/80 dark:border-blue-900/40 bg-white dark:bg-[#0D121F] shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white uppercase tracking-wider">
              {isRu ? 'Что получает интернет-магазин в Telegram:' : 'What an e-commerce brand gains in Telegram:'}
            </h4>
          </div>

          <ul className="space-y-2.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'х3 повторных покупок:' : '3x Repeat Purchases:'}</strong>{' '}
                {isRu 
                  ? 'Клиенту не нужно искать ваш сайт в браузере или логиниться заново — магазин всегда под рукой в списке чатов Telegram.' 
                  : 'Customers do not have to search browser tabs or remember passwords — your shop sits permanently pinned in Telegram.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Оплата СБП в 1 клик:' : '1-Click Bank App Checkout:'}</strong>{' '}
                {isRu 
                  ? 'Покупатель не вводит данные карты вручную — телефон сам открывает банковское приложение для подтверждения за 3 секунды.' 
                  : 'Zero manual card entry required — the system triggers banking app deep-links for 3-second biometric checkout.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Синхронизация с 1С, МойСклад и СДЭК:' : '1C / Inventory & Courier Sync:'}</strong>{' '}
                {isRu 
                  ? 'Остатки обновляются автоматически, а трек-номера отправляются покупателям ботом без участия менеджера.' 
                  : 'Stock balances update automatically in real-time, while tracking numbers are sent via bot with zero manual effort.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>{isRu ? 'Бесплатные рассылки акций:' : 'Zero-cost Targeted Broadcasts:'}</strong>{' '}
                {isRu 
                  ? 'Вы можете бесплатно оповещать постоянных покупателей о новинках и скидках прямо в личные сообщения Telegram.' 
                  : 'Directly reach previous customers with personalized push alerts in Telegram with zero per-message SMS costs.'}
              </span>
            </li>
          </ul>

          {/* Quick Scenario Buttons */}
          <div className="pt-3 border-t border-slate-100 dark:border-blue-900/30 space-y-2">
            <span className="text-[11px] font-bold text-slate-900 dark:text-white block">
              {isRu ? 'Попробуйте в симуляторе прямо сейчас:' : 'Try in the interactive demo now:'}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('catalog');
                  openDetail(PRODUCTS[0]);
                }}
                className="p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-left border border-blue-200/60 dark:border-blue-900/40 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '1. Открыть товар' : '1. Open Product'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">
                  {isRu ? 'Выбрать размер и цвет' : 'Choose size & color'}
                </div>
              </button>

              <button
                onClick={() => {
                  setActiveTab('cart');
                  setPromoInput('SALE15');
                  handleApplyPromo();
                }}
                className="p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 text-left border border-blue-200/60 dark:border-blue-900/40 hover:border-blue-500 transition-colors"
              >
                <div className="font-bold text-slate-900 dark:text-white text-[10px]">
                  {isRu ? '2. Промокод -15%' : '2. 15% Promo Code'}
                </div>
                <div className="text-[9px] text-slate-500 dark:text-slate-400">
                  {isRu ? 'Проверить скидку в корзине' : 'Apply discount in cart'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
