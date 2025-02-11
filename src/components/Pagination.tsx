import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  type: string;
}

const Pagination = ({ currentPage, totalPages, onPageChange, type }: PaginationProps) => {
  
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show around the current page
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    // Generate the range of pages
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add dots and the first page
    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    // Add dots and the last page
    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      {/* First Page Button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-900 text-white hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition"
      >
        <ChevronsLeft className="h-5 w-5" />
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-900 text-white hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-white hover:bg-red-600'
              }`}
            >
              {currentPage}
            </button>
          ) : (
            <span className="text-gray-500">...</span>
          )}
        </React.Fragment>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="p-2 rounded-lg bg-gray-900 text-white hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => {
          if (type === 'movies' && totalPages.movies) {
            onPageChange(totalPages.movies);
          } else if (type === 'series' && totalPages.series) {
            onPageChange(totalPages.series);
          } else {
            console.error('Invalid totalPages or type:', { totalPages, type });
          }
        }}
        className="p-2 rounded-lg bg-gray-900 text-white hover:bg-red-600 disabled:opacity-50 disabled:hover:bg-gray-900 transition"
      >
        <ChevronsRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
