import React, { useState } from 'react';
import { 
  TrendingUp, ArrowUpRight, DollarSign, Activity, RefreshCw, 
  CheckCircle2, Shield, ArrowRightLeft, Sparkles, Layers, Sliders 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const GlobalTradeTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'terminal' | 'verification'>('calculator');
  
  // Yield Calculator state
  const [investmentAmount, setInvestmentAmount] = useState<number>(25000);
  const [durationMonths, setDurationMonths] = useState<number>(12);
  const [riskTier, setRiskTier] = useState<'conservative' | 'balanced' | 'aggressive'>('balanced');

  // Terminal Swap state
  const [fromAsset, setFromAsset] = useState<'USDT' | 'BTC' | 'TON'>('USDT');
  const [toAsset, setToAsset] = useState<'USDT' | 'BTC' | 'TON'>('TON');
  const [swapAmount, setSwapAmount] = useState<number>(1500);
  const [recentTransactions, setRecentTransactions] = useState<Array<{ id: string; type: string; amount: string; timestamp: string }>>([
    { id: 'tx_9981', type: 'SWAP', amount: '1,500 USDT → 272.7 TON', timestamp: '10 сек назад' },
    { id: 'tx_9980', type: 'BUY', amount: '0.045 BTC ($4,250)', timestamp: '2 мин назад' },
  ]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  // Yield calculations
  const annualRates: Record<string, number> = {
    conservative: 0.145, // 14.5%
    balanced: 0.284,     // 28.4%
    aggressive: 0.442,   // 44.2%
  };

  const currentRate = annualRates[riskTier];
  const monthlyRate = currentRate / 12;
  const projectedReturn = Math.round(investmentAmount * Math.pow(1 + monthlyRate, durationMonths));
  const netProfit = projectedReturn - investmentAmount;
  const growthPercent = ((netProfit / investmentAmount) * 100).toFixed(1);

  // Asset price assumptions
  const assetRates: Record<string, number> = {
    USDT: 1,
    BTC: 94500,
    TON: 5.5,
  };

  const handleSwap = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#00E5FF', '#38BDF8', '#34D399']
        });
      } catch {
        // fallback
      }
      const fromRate = assetRates[fromAsset];
      const toRate = assetRates[toAsset];
      const received = ((swapAmount * fromRate) / toRate).toFixed(2);
      const newTx = {
        id: `tx_${Math.floor(1000 + Math.random() * 9000)}`,
        type: 'SWAP',
        amount: `${swapAmount} ${fromAsset} → ${received} ${toAsset}`,
        timestamp: 'Только что'
      };
      setRecentTransactions(prev => [newTx, ...prev.slice(0, 3)]);
      setExecutionMessage(`Ордер исполнен за 0.04 сек! Получено ${received} ${toAsset}`);
      setTimeout(() => setExecutionMessage(null), 4000);
    }, 600);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-center lg:items-start justify-center p-1 sm:p-4 w-full">
      
      {/* Desktop Laptop Web Simulator */}
      <div className="w-full max-w-full sm:max-w-[560px] rounded-2xl sm:rounded-3xl border border-white/10 bg-[#16161b] p-2.5 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-white/10 gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div className="rounded-full bg-[#1e1e24] px-2.5 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-mono text-gray-300 flex items-center gap-1.5 border border-white/5 truncate max-w-[170px] sm:max-w-none">
            <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://app.global-trade.capital</span>
          </div>

          <div className="flex items-center gap-1 text-[8px] sm:text-[9px] font-mono text-[#00E5FF] shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>99 SPEED</span>
          </div>
        </div>

        {/* Tab Navigation with smooth motion transitions */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#1c1c22] border border-white/5 mb-3 sm:mb-4">
          {[
            { id: 'calculator', label: '📊 Доходность' },
            { id: 'terminal', label: '⚡ Своп' },
            { id: 'verification', label: '🛡️ Верификация' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-all text-center min-h-[34px] flex items-center justify-center ${
                  isActive ? 'text-black font-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlobalTradeTab"
                    className="absolute inset-0 bg-[#00E5FF] rounded-lg sm:rounded-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 truncate block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Body */}
        <div className="min-h-[320px] sm:min-h-[340px] rounded-xl sm:rounded-2xl bg-[#1c1c22] p-3 sm:p-4 border border-white/5 text-white">
          <AnimatePresence mode="wait">
            
            {/* View 1: Yield Calculator */}
            {activeTab === 'calculator' && (
              <motion.div
                key="calc-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gray-400">ИНТЕРАКТИВНЫЙ РАСЧЕТ ДОХОДНОСТИ:</span>
                  <span className="text-xs font-bold text-[#00E5FF]">{riskTier.toUpperCase()} STRATEGY</span>
                </div>

                {/* Amount Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300">Сумма инвестиций:</span>
                    <span className="text-[#00E5FF] font-mono">${investmentAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#282832] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-mono">
                    <span>$1,000</span>
                    <span>$50,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Months Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300">Срок размещения:</span>
                    <span className="text-white font-mono">{durationMonths} мес.</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={36}
                    step={1}
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#282832] rounded-lg appearance-none cursor-pointer accent-[#00E5FF]"
                  />
                </div>

                {/* Strategy Selector */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { id: 'conservative', label: 'Консервативная', rate: '14.5%' },
                    { id: 'balanced', label: 'Сбалансированная', rate: '28.4%' },
                    { id: 'aggressive', label: 'High-Yield', rate: '44.2%' },
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setRiskTier(s.id as any)}
                      className={`p-2 rounded-xl border text-left transition-all ${
                        riskTier === s.id
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                          : 'border-white/5 bg-[#22222a] text-gray-400'
                      }`}
                    >
                      <div className="text-[10px] font-bold truncate">{s.label}</div>
                      <div className="text-[11px] font-black text-[#00E5FF]">{s.rate} / год</div>
                    </button>
                  ))}
                </div>

                {/* Result Card */}
                <div className="rounded-2xl bg-[#22222a] border border-[#00E5FF]/20 p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Прогнозируемый капитал:</span>
                    <div className="text-2xl font-black text-white font-mono">
                      ${projectedReturn.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 block font-bold">Чистая прибыль:</span>
                    <div className="text-base font-black text-emerald-400 font-mono">
                      +${netProfit.toLocaleString()} (+{growthPercent}%)
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* View 2: Live Trading & Swap */}
            {activeTab === 'terminal' && (
              <motion.div
                key="terminal-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Activity className="h-4 w-4 text-[#00E5FF]" />
                    Мгновенный обмен активов (0.04s execution)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">● LIVE MARKET</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-[#22222a] p-2.5 border border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-1">Вы отдаете:</span>
                    <div className="flex items-center justify-between">
                      <input
                        type="number"
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(Number(e.target.value))}
                        className="w-20 bg-transparent text-sm font-bold text-white font-mono outline-none"
                      />
                      <select
                        value={fromAsset}
                        onChange={(e) => setFromAsset(e.target.value as any)}
                        className="bg-[#282832] text-xs font-bold text-[#00E5FF] rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                        <option value="TON">TON</option>
                      </select>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#22222a] p-2.5 border border-white/5">
                    <span className="text-[10px] text-gray-400 block mb-1">Вы получаете (расчет):</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-emerald-400 font-mono">
                        {((swapAmount * assetRates[fromAsset]) / assetRates[toAsset]).toFixed(2)}
                      </span>
                      <select
                        value={toAsset}
                        onChange={(e) => setToAsset(e.target.value as any)}
                        className="bg-[#282832] text-xs font-bold text-[#00E5FF] rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="TON">TON</option>
                        <option value="USDT">USDT</option>
                        <option value="BTC">BTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSwap}
                  disabled={isExecuting}
                  className="w-full py-3 rounded-xl bg-[#00E5FF] text-black font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_5px_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2"
                >
                  {isExecuting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRightLeft className="h-4 w-4 stroke-[2.5]" />
                  )}
                  <span>{isExecuting ? 'Исполнение ордера...' : `Выполнить обмен ${swapAmount} ${fromAsset}`}</span>
                </button>

                {executionMessage && (
                  <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/40 p-2 text-center text-xs text-emerald-300 font-bold">
                    ✓ {executionMessage}
                  </div>
                )}

                {/* Recent Transaction Log */}
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-gray-400 uppercase">Последние транзакции:</span>
                  {recentTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between text-[10px] text-gray-300 py-0.5">
                      <span className="font-mono text-[#00E5FF]">{tx.id}</span>
                      <span>{tx.amount}</span>
                      <span className="text-gray-500">{tx.timestamp}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* View 3: B2B Verification */}
            {activeTab === 'verification' && (
              <motion.div
                key="verification-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3 text-xs"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Институциональный комплаенс B2B готов</span>
                </div>
                <p className="text-gray-300 text-[11px] leading-relaxed">
                  Платформа интегрирована с европейскими финансовыми регуляторами, автоматической проверкой KYC/AML и мгновенным выставлением инвойсов.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-[#22222a] p-2.5 border border-white/5">
                    <span className="text-[10px] text-gray-400">KYC Verification:</span>
                    <div className="font-bold text-white mt-0.5">Автоматическая (30 сек)</div>
                  </div>
                  <div className="rounded-xl bg-[#22222a] p-2.5 border border-white/5">
                    <span className="text-[10px] text-gray-400">API Latency:</span>
                    <div className="font-bold text-[#00E5FF] mt-0.5">&lt; 45ms</div>
                  </div>
                </div>

                <div className="rounded-xl bg-gradient-to-r from-[#00E5FF]/10 to-transparent p-3 border border-[#00E5FF]/20">
                  <div className="font-bold text-white text-xs">PageSpeed 99/100 подтвержден</div>
                  <div className="text-[10px] text-gray-400 mt-1">Оптимизированный серверный рендеринг Next.js 15 и CDN кэширование на 320+ edge нодах.</div>
                </div>
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
            <CheckCircle2 className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Интерактивный FinTech калькулятор:</strong> Мгновенный пересчет сложного процента при смене ползунков.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Плавные переходы табов:</strong> Мягкая анимация Framer Motion между модулями платформы.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>Торговый симулятор:</strong> Тестирование свопа валют с живым фидбеком и реестром ордеров.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
            <span><strong>PageSpeed 99/100:</strong> Микросекундный отклик интерфейса без перезагрузок.</span>
          </li>
        </ul>

        <div className="rounded-2xl bg-[#22222a] p-3 border border-white/5">
          <span className="text-[10px] text-gray-400 block font-mono">РЕЗУЛЬТАТ КЛИЕНТА:</span>
          <div className="text-base font-black text-[#00E5FF] mt-0.5">8.4% конверсия в B2B заявку</div>
          <p className="text-[10px] text-gray-400 mt-1">Рост целевых регистраций институциональных клиентов на 300% в первый месяц запуска.</p>
        </div>
      </div>

    </div>
  );
};
