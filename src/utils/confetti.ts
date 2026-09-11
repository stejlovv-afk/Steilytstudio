import confetti from 'canvas-confetti';

/**
 * Safe wrapper around canvas-confetti.
 * Disables web workers (useWorker: false) to prevent MIUI / Mi Browser / EMUI
 * GPU buffer glitches where OffscreenCanvas transfer causes a full-viewport white flash.
 */
export function fireConfetti(options?: confetti.Options): void {
  if (typeof window === 'undefined') return;

  try {
    confetti({
      useWorker: false, // Prevents white screen glitch on Xiaomi / Mi Browser
      disableForReducedMotion: true,
      zIndex: 9999,
      ...options,
    });
  } catch (err) {
    console.warn('Confetti animation skipped:', err);
  }
}

export default fireConfetti;
