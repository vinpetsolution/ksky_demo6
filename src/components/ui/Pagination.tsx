'use client';

import {
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi';
import { cn } from '@/utils/classNames';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const WINDOW_SIZE = 5;

/** Ví dụ: trang 1 → 1–5, trang 2 → 2–6, trang 3 → 3–7; gần cuối thì dịch start lùi để đủ 5 ô (nếu có). */
const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  if (totalPages <= 0) return [];
  if (totalPages <= WINDOW_SIZE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage;
  if (start + WINDOW_SIZE - 1 > totalPages) {
    start = totalPages - WINDOW_SIZE + 1;
  }

  return Array.from({ length: WINDOW_SIZE }, (_, i) => start + i);
};

const paginationHoverEffectClass = cn(
  'relative overflow-hidden',
  "before:pointer-events-none before:absolute before:top-[-40%] before:left-[-120%] before:h-[220%] before:w-[70%] before:rotate-[25deg] before:content-['']",
  'before:bg-[linear-gradient(90deg,transparent,rgb(255_255_255/0.05),rgb(255_120_180/0.18),rgb(255_255_255/0.05),transparent)]',
  'before:transition-[left] before:duration-700 before:ease-out',
  'hover:before:left-[160%] transition-all duration-[350ms] ease',
  'hover:shadow-[0_16px_30px_rgb(0_0_0/0.38),0_0_22px_rgb(184_46_102/0.10)]',
  'disabled:hover:before:left-[-120%] disabled:hover:shadow-none',
);

const navButtonClass = cn(
  'flex lg:size-10 size-8 shrink-0 items-center justify-center rounded-lg p-0! md:h-10 md:w-10',
  paginationHoverEffectClass,
);

const pageButtonClass = cn(
  'flex lg:size-10 size-8 shrink-0 items-center justify-center rounded-lg p-0! text-xs font-bold md:h-10 md:w-10 md:text-sm',
  paginationHoverEffectClass,
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 0) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <div className={cn('inline-flex items-center gap-1 md:gap-2', className)}>
      {/* <Button
        variant="darkPink"
        disabled={!canGoFirst}
        onClick={() => onPageChange(1)}
        className={navButtonClass}
        aria-label="Trang đầu"
      >
        <HiChevronDoubleLeft className="text-base md:text-lg" />
      </Button> */}

      <Button
        variant="darkPink"
        disabled={!canGoPrev}
        onClick={() => onPageChange(currentPage - 1)}
        className={navButtonClass}
        aria-label="Trang trước"
      >
        <HiChevronLeft className="text-base md:text-lg" />
      </Button>

      <div className="flex items-center gap-1 px-0.5 md:gap-2 md:px-1">
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            variant={page === currentPage ? 'pink' : 'darkPink'}
            onClick={() => onPageChange(page)}
            className={pageButtonClass}
            aria-label={`Trang ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        type="button"
        variant="darkPink"
        disabled={!canGoNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={navButtonClass}
        aria-label="Trang sau"
      >
        <HiChevronRight className="text-base md:text-lg" />
      </Button>

      {/* <Button
        type="button"
        variant="darkPink"
        disabled={!canGoLast}
        onClick={() => onPageChange(totalPages)}
        className={navButtonClass}
        aria-label="Trang cuối"
      >
        <HiChevronDoubleRight className="text-base md:text-lg" />
      </Button> */}
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
