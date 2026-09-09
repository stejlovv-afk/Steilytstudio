// Configuration for Telegram Lead Notifications
// Bot: @SteilytST_bot
// Admin: @Steilyt (ID: 1786199451)

export const TELEGRAM_NOTIFICATIONS_CONFIG = {
  BOT_TOKEN: '8924169064:AAF7svvdT7_01RiHYl7kZt1K5qHkN_23JiQ',
  CHAT_ID: '1786199451',
  ADMIN_USERNAME: '@Steilyt',
  BOT_USERNAME: '@SteilytST_bot',
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

export async function sendLeadToTelegram(lead: LeadData): Promise<{ success: boolean; error?: string }> {
  try {
    const cleanTg = lead.telegram ? lead.telegram.replace(/^@/, '') : '';
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

    const url = `https://api.telegram.org/bot${TELEGRAM_NOTIFICATIONS_CONFIG.BOT_TOKEN}/sendMessage`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_NOTIFICATIONS_CONFIG.CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      console.error('Telegram API error:', data);
      return { success: false, error: data.description || 'Ошибка отправки в Telegram' };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Failed to send lead to Telegram:', err);
    return { success: false, error: err?.message || 'Сетевая ошибка' };
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
