'use client';

import React, { useEffect, useState } from 'react';

export interface SearchFilterBlockProps {
  placeholder?: string;
  showSearch?: boolean;
  showClear?: boolean;
  debounceMs?: number;
  filters?: Array<{
    key: string;
    label: string;
    options?: Array<{
      label: string;
      value: string;
    }>;
  }>;
}

const SearchFilterBlock: React.FC<SearchFilterBlockProps> = ({
  placeholder = 'Search...',
  showSearch = true,
  showClear = true,
  debounceMs = 300,
  filters = [],
}) => {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const t = setTimeout(() => {
      console.log('search', search);
      console.log('filters', activeFilters);
    }, debounceMs);

    return () => clearTimeout(t);
  }, [search, activeFilters, debounceMs]);

  return (
    <div className="w-full rounded-lg md:rounded-2xl border border-gray-300 p-3 sm:p-4 md:p-5 bg-white">
      <div className="flex flex-col gap-3 sm:gap-4 md:gap-4 md:flex-row md:items-center md:flex-wrap">
        {showSearch && (
          <input
            className="flex-1 min-w-[200px] sm:min-w-[240px] border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {filters.map((filter) => (
          <select
            key={filter.key}
            className="flex-1 min-w-[140px] sm:min-w-[160px] border border-gray-300 px-3 sm:px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setActiveFilters((p) => ({
                ...p,
                [filter.key]: e.target.value,
              }))
            }
          >
            <option value="">{filter.label}</option>
            {filter.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}

        {showClear && (
          <button
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            onClick={() => {
              setSearch('');
              setActiveFilters({});
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBlock;
