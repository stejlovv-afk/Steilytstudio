import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, CheckSquare, Copy, Check, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type LegalDocTab = 'privacy' | 'terms' | 'consent';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalDocTab;
}

export const PrivacyModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'privacy' 
}) => {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  const [activeTab, setActiveTab] = useState<LegalDocTab>(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCopied(false);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  const copyCurrentText = () => {
    let textToCopy = '';
    if (isRu) {
      if (activeTab === 'privacy') textToCopy = privacyPolicyTextRu;
      else if (activeTab === 'terms') textToCopy = termsOfServiceTextRu;
      else textToCopy = consentTextRu;
    } else {
      if (activeTab === 'privacy') textToCopy = privacyPolicyTextEn;
      else if (activeTab === 'terms') textToCopy = termsOfServiceTextEn;
      else textToCopy = consentTextEn;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] p-4 sm:p-8 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[92vh] flex flex-col">
        
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between pb-3 sm:pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 shrink-0">
              {activeTab === 'privacy' && <Shield className="h-4 w-4 sm:h-5 sm:w-5" />}
              {activeTab === 'terms' && <FileText className="h-4 w-4 sm:h-5 sm:w-5" />}
              {activeTab === 'consent' && <CheckSquare className="h-4 w-4 sm:h-5 sm:w-5" />}
            </div>
            <div>
              <h3 className="font-display text-base sm:text-xl font-black text-slate-950 dark:text-white">
                {isRu ? 'Юридическая документация' : 'Legal Documentation'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                {isRu ? 'Соответствие 152-ФЗ РФ и ГК РФ' : 'GDPR & International Privacy Standards'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={copyCurrentText}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all min-h-[38px]"
              title={isRu ? 'Скопировать текст текущего документа' : 'Copy current document text'}
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs">
                    {isRu ? 'Скопировано' : 'Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{isRu ? 'Копировать' : 'Copy'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all touch-manipulation"
              aria-label="Close legal modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Shield className="h-3.5 w-3.5" />
            <span>{isRu ? '1. Политика конфиденциальности' : '1. Privacy Policy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{isRu ? '2. Пользовательское соглашение' : '2. Terms of Service'}</span>
          </button>

          <button
            onClick={() => setActiveTab('consent')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'consent'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckSquare className="h-3.5 w-3.5" />
            <span>{isRu ? '3. Согласие и Cookies' : '3. Consent & Cookies'}</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
          
          {/* Note Banner */}
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-blue-950 dark:text-blue-200 text-xs flex items-start gap-2.5">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold block">
                {isRu ? 'Официальный контактный адрес:' : 'Official Data Contact:'}{' '}
                <code className="font-mono font-bold bg-blue-100 dark:bg-blue-900/60 px-1.5 py-0.5 rounded text-blue-900 dark:text-blue-100">
                  Steilytstudio@gmail.com
                </code>
              </span>
              <p className="text-[11px] text-blue-800 dark:text-blue-300">
                {isRu 
                  ? 'Политика составлена в строгом соответствии со ст. 9 и ст. 18.1 Федерального закона 152-ФЗ «О персональных данных» и нормами ГК РФ.'
                  : 'Prepared in full accordance with GDPR (General Data Protection Regulation) and international consumer protection standards.'}
              </p>
            </div>
          </div>

          {/* ======================= RUSSIAN CONTENT ======================= */}
          {isRu ? (
            <>
              {/* TAB 1: PRIVACY POLICY (RU) */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Редакция от {new Date().getFullYear()} г. | Соответствие Федеральному закону № 152-ФЗ
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Общие положения и оператор данных</h5>
                    <p className="mt-1">
                      1.1. Настоящая Политика конфиденциальности и обработки персональных данных (далее — «Политика») определяет порядок сбора, хранения, обработки, передачи и защиты информации о Пользователях веб-сайта Steilyt Studio (далее — «Сайт»).
                    </p>
                    <p className="mt-1">
                      1.2. Оператором обработки персональных данных является: <strong>Steilyt Studio / Веб-разработчик</strong> (при необходимости официального договора с юрлицом: ИП / Самозанятый, реквизиты предоставляются в коммерческом предложении и договоре). Официальный адрес электронной почты для юридических запросов и связи: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span>, Telegram: <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">@Steilyt</span>.
                    </p>
                    <p className="mt-1">
                      1.3. Отправка заявки через форму обратной связи, расчет в интерактивном калькуляторе или обращение в мессенджер означает безоговорочное согласие Пользователя с условиями настоящей Политики.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Состав собираемых персональных данных</h5>
                    <p className="mt-1">
                      Оператор осуществляет обработку следующих категорий данных, добровольно предоставляемых Пользователем:
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                      <li>Имя или псевдоним контактного лица;</li>
                      <li>Контактный номер телефона;</li>
                      <li>Имя пользователя (username / никнейм) в мессенджере Telegram;</li>
                      <li>Адрес электронной почты (e-mail);</li>
                      <li>Описание параметров проекта и расчетные предпочтения из калькулятора;</li>
                      <li>Технические данные: файлы cookie (cookies), обезличенный IP-адрес, тип браузера и устройства.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Цели обработки персональных данных</h5>
                    <p className="mt-1">
                      Обработка персональных данных осуществляется исключительно в следующих законных целях:
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                      <li>Установление и поддержание деловой связи с клиентом (включая сообщения в Telegram и звонки);</li>
                      <li>Расчет сметы, сроков и архитектуры проектов (Telegram Mini Apps, корпоративные сайты, боты);</li>
                      <li>Подготовка персонализированного коммерческого предложения, презентаций и спецификации;</li>
                      <li>Согласование условий договора на разработку и соглашения о неразглашении конфиденциальной информации (NDA);</li>
                      <li>Обеспечение корректной работы интерактивных демо и симуляторов на Сайте.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Безопасность и непередача третьим лицам</h5>
                    <p className="mt-1">
                      4.1. Оператор применяет современные организационные, правовые и программные средства защиты информации от несанкционированного доступа, изменения, уничтожения или распространения.
                    </p>
                    <p className="mt-1">
                      4.2. <strong>Гарантия нераспространения:</strong> Оператор гарантирует, что персональные данные ни при каких обстоятельствах не продаются, не сдаются в аренду и не передаются маркетинговым агентствам или сторонним сервисам, за исключением установленных законодательством РФ случаев.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">5. Права субъекта и отзыв согласия</h5>
                    <p className="mt-1">
                      5.1. Пользователь имеет право на подтверждение факта обработки данных, уточнение, блокировку или удаление своих сведений.
                    </p>
                    <p className="mt-1">
                      5.2. Согласие может быть отозвано в любой момент путем направления письменного запроса на email: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span> с темой «Отзыв согласия на обработку данных». Данные будут безвозвратно удалены в течение 10 рабочих дней.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: TERMS OF SERVICE (RU) */}
              {activeTab === 'terms' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ И УСЛОВИЯ ОБСЛУЖИВАНИЯ
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Регулирует порядок использования Сайта, демонстрационных модулей и калькулятора
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Общие положения</h5>
                    <p className="mt-1">
                      1.1. Настоящее Пользовательское соглашение (далее — «Соглашение») регламентирует отношения между Steilyt Studio (далее — «Администратор») и Пользователем Сайта.
                    </p>
                    <p className="mt-1">
                      1.2. Контактный адрес Администратора: <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">Steilytstudio@gmail.com</span>, Telegram: <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">@Steilyt</span>.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Отказ от ответственности и статус расчетов калькулятора</h5>
                    <p className="mt-1">
                      2.1. Все материалы, расчеты стоимости в интерактивном онлайн-калькуляторе, сроки реализации и примеры кейсов носят <strong>исключительно информационный характер</strong> и ни при каких обстоятельствах не являются публичной офертой в соответствии со статьей 437 Гражданского кодекса РФ.
                    </p>
                    <p className="mt-1">
                      2.2. Итоговая фиксированная стоимость и точный состав функционала утверждаются исключительно в индивидуальном техническом задании (ТЗ) и договоре на разработку.
                    </p>
                    <p className="mt-1">
                      2.3. Интерактивный симулятор Telegram Mini App на главной странице является демонстрационным прототипом интерфейса и логики работы мини-приложений.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Защита авторских прав и интеллектуальной собственности</h5>
                    <p className="mt-1">
                      3.1. Дизайн сайта, программный код интерактивных симуляторов, тексты, фирменные элементы Steilyt Studio являются объектами интеллектуальной собственности и охраняются законодательством РФ и международными договорами.
                    </p>
                    <p className="mt-1">
                      3.2. Любое несанкционированное копирование исходного кода, заимствование графических элементов или плагиат структуры без письменного разрешения Администратора запрещены.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Порядок разрешения споров</h5>
                    <p className="mt-1">
                      Любые вопросы или обращения рассматриваются в досудебном порядке путем обращения на электронную почту <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">Steilytstudio@gmail.com</span> в срок до 10 рабочих дней.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CONSENT (RU) */}
              {activeTab === 'consent' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ И ИСПОЛЬЗОВАНИЕ COOKIES
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      В соответствии со ст. 9 Федерального закона от 27.07.2006 № 152-ФЗ
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider mb-2">
                      Формулировка под формой отправки:
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed italic">
                      «Нажимая кнопку, вы даете согласие на обработку персональных данных в соответствии с <span className="underline text-blue-600 dark:text-cyan-400">Политикой конфиденциальности (152-ФЗ)</span> и принимаете условия <span className="underline text-blue-600 dark:text-cyan-400">Пользовательского соглашения</span>.»
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">Текст официального согласия:</h5>
                    <p className="mt-1">
                      Отправляя заявку через форму на Сайте, Пользователь свободно, своей волей и в своем интересе дает конкретное, информированное и сознательное согласие Steilyt Studio на автоматизированную и неавтоматизированную обработку предоставленных персональных данных (имя, номер телефона, Telegram username, e-mail, файлы cookie).
                    </p>
                    <p className="mt-2">
                      Согласие действует с момента отправки формы до момента его отзыва по заявлению на электронную почту: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span>.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">Использование файлов Cookie:</h5>
                    <p className="mt-1">
                      Сайт использует файлы cookie исключительно для сохранения выбранной темы оформления (светлая/темная), выбранного языка интерфейса (RU/EN) и корректной работы симулятора. Пользователь может отключить cookies в настройках своего браузера.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ======================= ENGLISH CONTENT ======================= */
            <>
              {/* TAB 1: PRIVACY POLICY (EN) */}
              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      PRIVACY POLICY & DATA PROTECTION NOTICE
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Effective {new Date().getFullYear()} | GDPR & International Privacy Compliant
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. General Overview & Data Controller</h5>
                    <p className="mt-1">
                      1.1. This Privacy Policy outlines how Steilyt Studio ("we", "our", or "the Operator") collects, uses, retains, and protects personal data obtained from visitors and prospective clients ("User" or "you") through our website.
                    </p>
                    <p className="mt-1">
                      1.2. The Data Controller responsible for your information is: <strong>Steilyt Studio</strong>. For any legal inquiries, data protection questions, or requests, contact our designated privacy address: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span> or via Telegram: <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">@Steilyt</span>.
                    </p>
                    <p className="mt-1">
                      1.3. By submitting an inquiry, interacting with our cost calculator, or testing our interactive demos, you acknowledge and agree to the data practices described in this Policy.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Categories of Information Collected</h5>
                    <p className="mt-1">
                      We only collect information that you voluntarily provide when requesting a project consultation or quote:
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                      <li>Full name or preferred contact name;</li>
                      <li>Direct contact phone number;</li>
                      <li>Telegram handle / username (@username);</li>
                      <li>Email address (e.g. for proposals and formal communication);</li>
                      <li>Project specifications and preferences selected in our interactive calculator;</li>
                      <li>Standard technical telemetry: essential cookies (theme/language preferences), browser type, and anonymized IP address.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Legal Basis & Purposes of Data Processing</h5>
                    <p className="mt-1">
                      Pursuant to Article 6 of the GDPR and equivalent international privacy standards, your data is processed strictly for legitimate pre-contractual and communicative purposes:
                    </p>
                    <ul className="list-disc pl-5 mt-1.5 space-y-1">
                      <li>Establishing fast, direct communication via Telegram or email regarding your inquiry;</li>
                      <li>Calculating accurate commercial estimates, timelines, and technical architectures for Telegram Mini Apps and web solutions;</li>
                      <li>Preparing personalized proposals, scopes of work (SOW), and mutual Non-Disclosure Agreements (NDAs);</li>
                      <li>Contractual execution, project delivery, and post-launch technical warranty support;</li>
                      <li>Ensuring the stability, security, and responsive performance of interactive web modules.</li>
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Data Security & Third-Party Non-Disclosure</h5>
                    <p className="mt-1">
                      4.1. We enforce robust technical and organizational safeguards (TLS/HTTPS encryption, access controls, restricted storage) to protect all submitted data against unauthorized access, loss, alteration, or disclosure.
                    </p>
                    <p className="mt-1">
                      4.2. <strong>Zero Third-Party Sale Policy:</strong> We do not sell, rent, monetize, or disclose your personal details to marketing networks or third-party data aggregators. Data is accessible solely to our core development and client management team.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">5. Your Data Rights & Consent Revocation (GDPR Rights)</h5>
                    <p className="mt-1">
                      5.1. Under applicable privacy regulations (including GDPR Articles 15–22), you hold the right to access your stored information, request rectification of inaccuracies, or demand complete erasure ("Right to be Forgotten").
                    </p>
                    <p className="mt-1">
                      5.2. You may withdraw your consent and request immediate data deletion at any time by emailing us at <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span> with the subject line "Data Erasure Request". All associated records will be permanently purged within 10 business days.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: TERMS OF SERVICE (EN) */}
              {activeTab === 'terms' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      TERMS OF SERVICE & WEBSITE CONDITIONS
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Governing website usage, project calculator estimates, and intellectual property
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Introduction & Acceptance</h5>
                    <p className="mt-1">
                      1.1. These Terms of Service ("Terms") govern your use of this website, its interactive calculators, simulators, and communication channels operated by Steilyt Studio.
                    </p>
                    <p className="mt-1">
                      1.2. Official correspondence email: <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">Steilytstudio@gmail.com</span>.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Non-Binding Nature of Online Estimates</h5>
                    <p className="mt-1">
                      2.1. The cost estimates generated by our online interactive calculator, as well as timeline approximations and showcase figures, are provided for <strong>illustrative and informational planning purposes only</strong>.
                    </p>
                    <p className="mt-1">
                      2.2. They do not constitute a legally binding commercial contract until technical specifications, deliverables, and payment schedules are finalized in a formal written contract signed by both parties.
                    </p>
                    <p className="mt-1">
                      2.3. Interactive simulator components (such as the Telegram Food Delivery simulator) are interactive demonstration prototypes illustrating UI/UX quality and workflow capabilities.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Intellectual Property Protection</h5>
                    <p className="mt-1">
                      3.1. All original interface designs, custom interactive components, illustrations, styling architectures, and written copy on this website are the proprietary property of Steilyt Studio and are protected under international copyright treaties.
                    </p>
                    <p className="mt-1">
                      3.2. Unlawful scraping, unauthorized reproduction, wholesale duplication of custom visual assets, or uncredited code copying is strictly prohibited.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Contact & Inquiries</h5>
                    <p className="mt-1">
                      If you have questions regarding these terms, please contact our team directly at <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">Steilytstudio@gmail.com</span> or via Telegram at <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">@Steilyt</span>.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: CONSENT & COOKIES (EN) */}
              {activeTab === 'consent' && (
                <div className="space-y-4">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      CONSENT TO DATA PROCESSING & COOKIE POLICY
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Transparent consent disclosure under GDPR Art. 7 and ePrivacy Directive
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <h5 className="font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider mb-2">
                      Submission Button Form Consent Notice:
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed italic">
                      "By clicking the button you agree to our <span className="underline text-blue-600 dark:text-cyan-400">Privacy Policy</span> and acknowledge our <span className="underline text-blue-600 dark:text-cyan-400">Terms of Service</span>."
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">Formal Consent Declaration:</h5>
                    <p className="mt-1">
                      By submitting a contact form, requesting an estimate, or providing your contact channels, you freely and explicitly grant Steilyt Studio permission to process your contact credentials (name, phone number, Telegram username, email) exclusively for responding to your inquiry and delivering project consultations.
                    </p>
                    <p className="mt-2">
                      This consent remains valid until you formally withdraw it by sending a brief notification to <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-blue-600 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">Steilytstudio@gmail.com</span>.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-950 dark:text-white text-sm">Cookie & Local Storage Usage:</h5>
                    <p className="mt-1">
                      Our website utilizes local storage and minimal session cookies solely for functional purposes: preserving your preferred color theme (Dark / Light) and language selection (RU / EN). We do not track cross-site advertising identifiers.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {isRu ? 'Для связи по правовым вопросам:' : 'For legal and data inquiries:'}{' '}
            <a 
              href="mailto:Steilytstudio@gmail.com" 
              className="font-mono font-bold text-blue-600 dark:text-cyan-400 hover:underline"
            >
              Steilytstudio@gmail.com
            </a>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyCurrentText}
              className="sm:hidden flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              {copied ? (isRu ? 'Скопировано!' : 'Copied!') : (isRu ? 'Копировать' : 'Copy')}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial rounded-xl bg-slate-950 dark:bg-blue-600 px-6 py-2.5 text-xs font-black text-white hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-md"
            >
              {isRu ? 'Закрыть документ' : 'Close Document'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Raw markdown/plain-text exports for clipboard copy:
const privacyPolicyTextRu = `# ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
Оператор: Steilyt Studio / Веб-разработчик
Email: Steilytstudio@gmail.com
Telegram: @Steilyt

1. ОБЩИЕ ПОЛОЖЕНИЯ
Настоящая Политика определяет порядок сбора, хранения, обработки, передачи и защиты персональных данных Пользователей сайта.

2. СОСТАВ СОБИРАЕМЫХ ДАННЫХ
- Имя, номер телефона, имя пользователя в Telegram (@username), email, параметры проекта, файлы cookie, IP-адрес.

3. ЦЕЛИ ОБРАБОТКИ
- Оперативная связь, расчет стоимости проекта, составление коммерческого предложения, согласование ТЗ и подготовка договора / NDA.

4. БЕЗОПАСНОСТЬ И КОНФИДЕНЦИАЛЬНОСТЬ
- Данные защищены современными методами шифрования. Оператор обязуется не передавать данные третьим лицам.

5. ОТЗЫВ СОГЛАСИЯ
- По письменному запросу на email: Steilytstudio@gmail.com. Срок удаления — до 10 рабочих дней.`;

const termsOfServiceTextRu = `# ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
Администратор: Steilyt Studio
Email: Steilytstudio@gmail.com
Telegram: @Steilyt

1. ПРЕДМЕТ
Условия использования материалов сайта, интерактивных симуляторов и оформления заявок.

2. ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все расчеты стоимости в онлайн-калькуляторе носят ознакомительный характер и не являются публичной офертой (ст. 437 ГК РФ).

3. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ
Запрет на копирование дизайна, симуляторов, текстов и программного кода без письменного согласия правообладателя.`;

const consentTextRu = `Нажимая кнопку, вы даете согласие на обработку персональных данных в соответствии с Политикой конфиденциальности (152-ФЗ) и принимаете условия Пользовательского соглашения. Контактный email: Steilytstudio@gmail.com.`;

const privacyPolicyTextEn = `# PRIVACY POLICY & DATA PROTECTION NOTICE
Data Controller: Steilyt Studio
Email: Steilytstudio@gmail.com
Telegram: @Steilyt

1. GENERAL PROVISIONS
This Privacy Policy outlines how Steilyt Studio collects, stores, and protects personal data in compliance with GDPR and international data privacy regulations.

2. COLLECTED INFORMATION
- Contact name, phone number, Telegram handle (@username), email address, project parameters, technical cookies.

3. PURPOSES OF PROCESSING
- Fast communication, tailored project estimation, bespoke commercial proposals, contracts, and NDA execution.

4. SECURITY & NON-DISCLOSURE
- Strict confidentiality: data is never sold or shared with third parties. Encrypted protocols applied.

5. YOUR RIGHTS & ERASURE
- Right of access, rectification, and erasure (GDPR Art. 17). To withdraw consent or delete data, contact: Steilytstudio@gmail.com.`;

const termsOfServiceTextEn = `# TERMS OF SERVICE
Operator: Steilyt Studio
Email: Steilytstudio@gmail.com
Telegram: @Steilyt

1. SCOPE
Governs access to website content, interactive demos, calculators, and consultation requests.

2. ESTIMATES DISCLAIMER
Online calculator outputs and demo metrics are non-binding and provided for informational planning purposes only. Formal quotes require signed specifications.

3. INTELLECTUAL PROPERTY
All custom designs, interactive components, copy, and code are protected by copyright laws. Unauthorized reproduction is prohibited.`;

const consentTextEn = `By submitting this form, you consent to the processing of your contact details in accordance with our Privacy Policy (GDPR compliant) and accept our Terms of Service. Contact: Steilytstudio@gmail.com.`;
