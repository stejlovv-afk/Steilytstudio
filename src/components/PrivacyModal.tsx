import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, CheckSquare, Copy, Check } from 'lucide-react';

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
    if (activeTab === 'privacy') {
      textToCopy = privacyPolicyText;
    } else if (activeTab === 'terms') {
      textToCopy = termsOfServiceText;
    } else {
      textToCopy = consentText;
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
                Юридическая документация
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                Соответствие 152-ФЗ РФ и ГК РФ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={copyCurrentText}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all min-h-[38px]"
              title="Скопировать текст текущего документа"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs">Скопировано</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Копировать</span>
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
            <span>1. Политика конфиденциальности</span>
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
            <span>2. Пользовательское соглашение</span>
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
            <span>3. Согласие на обработку ПД</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans select-text">
          
          {/* Note Banner */}
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs flex items-center gap-2.5">
            <span className="font-mono font-bold bg-amber-500/20 px-2 py-0.5 rounded-md text-[10px]">152-ФЗ РФ</span>
            <span>Места для персональных реквизитов выделены квадратными скобками: <code className="font-mono font-bold bg-amber-200 dark:bg-amber-950/60 px-1 py-0.5 rounded text-amber-950 dark:text-amber-200">[Вот так]</code></span>
          </div>

          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                  ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Дата публикации: <span className="font-mono font-semibold text-slate-900 dark:text-white">[«01» января 2026 г.]</span> | Редакция 2.0
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Общие положения</h5>
                <p className="mt-1">
                  1.1. Настоящая Политика конфиденциальности и обработки персональных данных (далее — «Политика») определяет порядок сбора, хранения, обработки, передачи и защиты персональных данных Пользователей сайта (далее — «Сайт»).
                </p>
                <p className="mt-1">
                  1.2. Оператором персональных данных является: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[ИП / Самозанятый ФИО полностью, ИНН: Ваш ИНН]</span>, адрес электронной почты для взаимодействия: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[Ваш Email]</span>.
                </p>
                <p className="mt-1">
                  1.3. Заполнение форм обратной связи, оформление заявки или расчет стоимости в интерактивном калькуляторе означает полное и безоговорочное согласие Пользователя с настоящей Политикой.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Состав собираемых персональных данных</h5>
                <p className="mt-1">
                  Оператор осуществляет обработку следующих данных, добровольно предоставляемых Пользователем:
                </p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Имя, контактное имя или псевдоним Пользователя;</li>
                  <li>Номер контактного телефона;</li>
                  <li>Имя пользователя (username / никнейм) в мессенджере Telegram;</li>
                  <li>Адрес электронной почты (e-mail);</li>
                  <li>Файлы cookie (куки), IP-адрес, технические данные об устройстве и браузере.</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Цели обработки персональных данных</h5>
                <p className="mt-1">
                  Обработка персональных данных осуществляется исключительно в следующих целях:
                </p>
                <ul className="list-disc pl-5 mt-1.5 space-y-1">
                  <li>Установление и поддержание оперативной связи с клиентом (включая сообщения в Telegram и телефонные звонки);</li>
                  <li>Расчет стоимости и сроков реализации проекта (Telegram Mini Apps, веб-сайты, боты, Web3);</li>
                  <li>Подготовка и отправка индивидуального коммерческого предложения, презентаций и предварительного ТЗ;</li>
                  <li>Заключение, исполнение и юридическое сопровождение договора на разработку и соглашения о неразглашении (NDA);</li>
                  <li>Техническая поддержка и улучшение качества работы Сайта.</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Безопасность и непередача третьим лицам</h5>
                <p className="mt-1">
                  4.1. Оператор принимает все необходимые организационные, правовые и программно-технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования и копирования.
                </p>
                <p className="mt-1">
                  4.2. <strong>Обязательство о конфиденциальности:</strong> Оператор обязуется не передавать, не продавать и не раскрывать персональные данные Пользователей третьим лицам, за исключением случаев, прямо предусмотренных действующим законодательством Российской Федерации.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">5. Права пользователя и порядок отзыва согласия</h5>
                <p className="mt-1">
                  5.1. Пользователь имеет право на получение полной информации о порядке обработки его персональных данных, их уточнение, блокирование или удаление.
                </p>
                <p className="mt-1">
                  5.2. Согласие на обработку персональных данных может быть отозвано Пользователем в любой момент путем направления письменного уведомления в свободной форме на адрес электронной почты Оператора: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[Ваш Email]</span> с темой письма «Отзыв согласия на обработку персональных данных».
                </p>
                <p className="mt-1">
                  5.3. Оператор прекращает обработку и безвозвратно уничтожает персональные данные в течение 10 (десяти) рабочих дней с момента получения запроса.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                  ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ (ПРАВИЛА ПОЛЬЗОВАНИЯ САЙТОМ)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Регулирует условия использования материалов Сайта и оформления заявок
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">1. Предмет соглашения</h5>
                <p className="mt-1">
                  1.1. Настоящее Пользовательское соглашение (далее — «Соглашение») определяет условия и правила использования материалов, интерактивных модулей, калькуляторов и сервисов сайта <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[https://ваш-сайт.ru]</span> (далее — «Сайт»).
                </p>
                <p className="mt-1">
                  1.2. Администратором Сайта является: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[ИП / Самозанятый ФИО полностью, ИНН: Ваш ИНН]</span>.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">2. Отказ от ответственности и статус информации</h5>
                <p className="mt-1">
                  2.1. Все материалы, расчеты стоимости в интерактивном онлайн-калькуляторе, ориентировочные сроки реализации, описания услуг и демонстрационные примеры носят <strong>исключительно информационно-ознакомительный характер</strong> и ни при каких обстоятельствах не являются публичной офертой, определяемой положениями статьи 437 Гражданского кодекса Российской Федерации.
                </p>
                <p className="mt-1">
                  2.2. Итоговый перечень функционала, точная стоимость, сроки и условия выполнения работ фиксируются исключительно в индивидуальном договоре и техническом задании, подписанном сторонами.
                </p>
                <p className="mt-1">
                  2.3. Интерактивные кейсы и симуляторы Telegram Mini Apps на Сайте являются демонстрационными прототипами и образцами качества разработки, которые заказчик может получить при индивидуальном заказе.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">3. Интеллектуальная собственность</h5>
                <p className="mt-1">
                  3.1. Все элементы Сайта, включая общий дизайн, стили, анимации, интерактивные симуляторы, тексты, программный код, графические материалы и логотипы, являются объектами исключительных интеллектуальных прав Правообладателя и охраняются законодательством РФ.
                </p>
                <p className="mt-1">
                  3.2. <strong>Запрет на копирование:</strong> Любое полное или частичное копирование, воспроизведение, заимствование дизайна, программного кода или текстовых материалов Сайта без официального письменного согласия Правообладателя категорически запрещено и влечет ответственность в соответствии с законодательством РФ.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">4. Обратная связь и споры</h5>
                <p className="mt-1">
                  Все вопросы и претензии, связанные с работой Сайта, принимаются по адресу электронной почты: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[Ваш Email]</span> или через Telegram: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[@Steilyt]</span>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CONSENT UNDER FORMS */}
          {activeTab === 'consent' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h4 className="font-display text-base sm:text-lg font-black text-slate-950 dark:text-white">
                  СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Текст согласия субъекта персональных данных при отправке веб-форм
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h5 className="font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider mb-2">
                  Краткая формулировка под кнопкой формы:
                </h5>
                <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed italic">
                  «Нажимая кнопку, вы даете согласие на обработку персональных данных в соответствии с <span className="underline text-[#00B4D8] dark:text-[#00E5FF]">Политикой конфиденциальности (152-ФЗ)</span> и принимаете условия <span className="underline text-[#00B4D8] dark:text-[#00E5FF]">Пользовательского соглашения</span>.»
                </p>
              </div>

              <div>
                <h5 className="font-bold text-slate-950 dark:text-white text-sm">Полный текст юридического согласия:</h5>
                <p className="mt-1">
                  Отправляя форму обратной связи, контактный номер или данные через калькулятор на сайте, Пользователь в соответствии с требованиями статьи 9 Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных» выражает свободное, добровольное и информированное согласие Оператору: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[ИП / Самозанятый ФИО полностью, ИНН: Ваш ИНН]</span> на автоматизированную и неавтоматизированную обработку персональных данных (имя, телефон, Telegram username, e-mail, IP-адрес, cookies).
                </p>
                <p className="mt-2">
                  Согласие действует с момента отправки заявки до момента его отзыва путем направления заявления на электронную почту: <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold text-slate-900 dark:text-cyan-300 border border-slate-300 dark:border-slate-700">[Ваш Email]</span>.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Для связи по правовым вопросам: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">[Ваш Email]</span>
          </span>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyCurrentText}
              className="sm:hidden flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              {copied ? 'Скопировано!' : 'Копировать'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial rounded-xl bg-black dark:bg-[#00E5FF] px-6 py-2.5 text-xs font-black text-white dark:text-black hover:bg-slate-800 dark:hover:bg-cyan-300 transition-all shadow-md"
            >
              Закрыть документ
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const privacyPolicyText = `# ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ И ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
Оператор: [ИП / Самозанятый ФИО полностью, ИНН: Ваш ИНН]
Email: [Ваш Email]

1. ОБЩИЕ ПОЛОЖЕНИЯ
Настоящая Политика определяет порядок сбора, хранения, обработки, передачи и защиты персональных данных Пользователей сайта.

2. СОСТАВ СОБИРАЕМЫХ ДАННЫХ
- Имя, телефон, имя пользователя в Telegram, email, файлы cookie, IP-адрес.

3. ЦЕЛИ ОБРАБОТКИ
- Связь с клиентом, расчет стоимости проекта, отправка коммерческого предложения, подготовка и исполнение договора и NDA.

4. БЕЗОПАСНОСТЬ
- Обязательство не передавать данные третьим лицам, кроме случаев, предусмотренных законодательством РФ.

5. ОТЗЫВ СОГЛАСИЯ
- По запросу на email: [Ваш Email].`;

const termsOfServiceText = `# ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ
Администратор: [ИП / Самозанятый ФИО полностью, ИНН: Ваш ИНН]

1. ПРЕДМЕТ
Условия использования материалов сайта и отправки заявок.

2. ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
Все материалы и цены носят информационный характер и не являются публичной офертой (ст. 437 ГК РФ).

3. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ
Запрет на копирование дизайна, текстов и программного кода без письменного согласия.`;

const consentText = `Нажимая кнопку, вы даете согласие на обработку персональных данных в соответствии с Политикой конфиденциальности (152-ФЗ) и принимаете условия Пользовательского соглашения.`;
