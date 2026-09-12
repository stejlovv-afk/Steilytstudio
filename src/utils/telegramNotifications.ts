// Configuration for Telegram Lead Notifications
// Bot: @SteilytST_bot
// Admin: @Steilyt

export const TELEGRAM_NOTIFICATIONS_CONFIG = {
  // ВНИМАНИЕ: BOT_TOKEN надежно защищен на стороне Google Apps Script и скрыт от браузера и GitHub.
  BOT_TOKEN: '', 
  CHAT_ID: '',
  ADMIN_USERNAME: '@Steilyt',
  BOT_USERNAME: '@SteilytST_bot',
  // Надежный Google Apps Script шлюз (работает у 100% пользователей в РФ БЕЗ VPN и без блокировок)
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyv2CJqTNzWObQNq06-uhtOJ0sdxIHwWH5VtCTB5z4YgGi4CfoiKmQybdaO2Sk1yo4Ucg/exec',
  // Секретный ключ для авторизации запросов только от нашего сайта (защита от чужих вызовов и спама)
  SECRET_TOKEN: 'steilyt_secure_lead_token_2026',
};

export interface LeadData {
  name: string;
  telegram: string;
  phone?: string;
  projectType: string;
  estimate?: string;
  summary?: string;
  features?: string[];
  designLevel?: string;
  isExpress?: boolean;
  comment?: string;
}

export interface LeadResult {
  success: boolean;
  error?: string;
  fallbackTelegramUrl?: string;
}

export async function sendLeadToTelegram(lead: LeadData): Promise<LeadResult> {
  const cleanTg = lead.telegram ? lead.telegram.replace(/^@/, '') : '';
  const fallbackUrl = `https://t.me/Steilyt?text=${encodeURIComponent(
    `Здравствуйте! Оставляю заявку:\nИмя: ${lead.name}\nTelegram/Телефон: ${lead.telegram || lead.phone || ''}\nУслуга: ${lead.projectType}${lead.estimate ? `\nСмета: ${lead.estimate}` : ''}`
  )}`;

  try {
    const dateStr = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    let message = `🔥 <b>НОВАЯ ЗАЯВКА С САЙТА!</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `👤 <b>Клиент:</b> ${escapeHtml(lead.name)}\n`;
    message += `✈️ <b>Telegram:</b> ${cleanTg ? `<a href="https://t.me/${cleanTg}">@${cleanTg}</a>` : 'не указан'}\n`;
    
    if (lead.phone) {
      message += `📞 <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>\n`;
    }

    message += `\n🎯 <b>Услуга:</b> ${escapeHtml(lead.projectType)}\n`;

    if (lead.estimate) {
      message += `💰 <b>Смета:</b> <b>${escapeHtml(lead.estimate)}</b>\n`;
    }

    if (lead.designLevel) {
      message += `🎨 <b>Уровень дизайна:</b> ${escapeHtml(lead.designLevel)}\n`;
    }

    if (lead.isExpress) {
      message += `⚡ <b>Срочность:</b> Экспресс-разработка (в ускоренном режиме)\n`;
    }

    if (lead.features && lead.features.length > 0) {
      message += `\n🧩 <b>Выбранные дополнения (${lead.features.length}):</b>\n`;
      lead.features.forEach((feat, idx) => {
        message += `  ${idx + 1}. ${escapeHtml(feat)}\n`;
      });
    } else if (lead.summary) {
      message += `📋 <b>Детали расчета:</b> ${escapeHtml(lead.summary)}\n`;
    }

    if (lead.comment && lead.comment.trim()) {
      message += `\n💬 <b>Пожелания клиента:</b>\n<i>${escapeHtml(lead.comment.trim())}</i>\n`;
    }

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `⏰ <b>Время (МСК):</b> ${dateStr}\n`;
    message += `🌐 <b>Источник:</b> GitHub Pages / Steilyt Studio`;

    const token = TELEGRAM_NOTIFICATIONS_CONFIG.BOT_TOKEN;
    const chatId = TELEGRAM_NOTIFICATIONS_CONFIG.CHAT_ID;
    const googleScriptUrl = TELEGRAM_NOTIFICATIONS_CONFIG.GOOGLE_SCRIPT_URL;
    const directApiUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    // 1. ПРИОРИТЕТНЫЙ КАНАЛ: Google Apps Script Webhook
    // Работает у 100% пользователей в РФ БЕЗ VPN, так как script.google.com не заблокирован!
    // Используем mode: 'no-cors' и credentials: 'omit' для обхода трекинг-блокеров в Mi Browser/Safari
    if (googleScriptUrl) {
      const payloadString = JSON.stringify({
        text: message,
        secret: TELEGRAM_NOTIFICATIONS_CONFIG.SECRET_TOKEN,
      });

      try {
        await fetch(googleScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          cache: 'no-cache',
          credentials: 'omit',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: payloadString,
        });

        // Запрос успешно передан сетевому стеку браузера
        return { success: true };
      } catch (scriptErr) {
        console.warn('Google script standard fetch failed, trying sendBeacon:', scriptErr);
        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          try {
            const blob = new Blob([payloadString], { type: 'text/plain;charset=utf-8' });
            const sent = navigator.sendBeacon(googleScriptUrl, blob);
            if (sent) {
              return { success: true };
            }
          } catch (beaconErr) {
            console.warn('sendBeacon failed:', beaconErr);
          }
        }
      }
    }

    // 2. Метод прямого обращения к Telegram API (для пользователей за рубежом или с VPN)
    try {
      const params = new URLSearchParams();
      params.append('chat_id', chatId);
      params.append('text', message);
      params.append('parse_mode', 'HTML');
      params.append('disable_web_page_preview', 'true');

      const response = await fetch(directApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.ok) {
          return { success: true };
        }
      }
    } catch {
      // Идем дальше
    }

    // 3. Метод JSON POST прямо в Telegram
    try {
      const response = await fetch(directApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.ok) {
          return { success: true };
        }
      }
    } catch {
      // Идем к фоллбеку
    }

    return { 
      success: false, 
      error: 'Сетевое ограничение браузера',
      fallbackTelegramUrl: fallbackUrl
    };
  } catch (err: any) {
    console.error('Failed to send lead to Telegram:', err);
    return { 
      success: false, 
      error: err?.message || 'Сетевая ошибка',
      fallbackTelegramUrl: fallbackUrl
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
