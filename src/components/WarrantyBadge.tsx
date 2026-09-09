import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WarrantyBadgeProps {
  onOpenWarranty?: () => void;
  text?: string;
  className?: string;
}

export const WarrantyBadge: React.FC<WarrantyBadgeProps> = ({
  onOpenWarranty,
  text = 'гарантия 12 месяцев',
  className = '',
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 align-middle ${className}`}>
      <span>{text}</span>
      {onOpenWarranty && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenWarranty();
          }}
          title="Нажмите, чтобы узнать, что входит в гарантию"
          aria-label="Что входит в гарантию"
          className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-100 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/80 dark:hover:bg-blue-600 dark:text-blue-300 dark:hover:text-white transition-all transform hover:scale-110 shadow-xs cursor-pointer"
        >
          <span className="text-[10px] font-black leading-none select-none">!</span>
        </button>
      )}
    </span>
  );
};
