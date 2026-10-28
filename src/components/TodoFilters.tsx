import React from 'react';
import { Search, SlidersHorizontal, CheckCircle2, Circle, ListFilter } from 'lucide-react';
import { FilterStatus, Category, SortOption } from '../types';

interface TodoFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: FilterStatus;
  setStatusFilter: (s: FilterStatus) => void;
  categoryFilter: Category | 'all';
  setCategoryFilter: (c: Category | 'all') => void;
  sortOption: SortOption;
  setSortOption: (s: SortOption) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  sortOption,
  setSortOption,
  totalCount,
  activeCount,
  completedCount,
}) => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-4 md:p-5 mb-6 shadow-lg space-y-4">
      {/* Search and Sort row */}
      <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-textSecondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Søg i opgaver..."
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-textSecondary focus:outline-none focus:border-primary transition-all"
          />
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <SlidersHorizontal className="w-4 h-4 text-textSecondary shrink-0" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="bg-background border border-border rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-all cursor-pointer w-full sm:w-auto"
          >
            <option value="date-desc">Nyeste først</option>
            <option value="date-asc">Ældste først</option>
            <option value="priority">Prioritet (Høj-Lav)</option>
            <option value="title">Alfabetisk (A-Å)</option>
          </select>
        </div>
      </div>

      {/* Filter Tabs & Categories */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-border/60">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 bg-background p-1 rounded-xl border border-border w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              statusFilter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'text-textSecondary hover:text-white'
            }`}
          >
            Alle ({totalCount})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              statusFilter === 'active'
                ? 'bg-primary text-white shadow-md'
                : 'text-textSecondary hover:text-white'
            }`}
          >
            Aktive ({activeCount})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
              statusFilter === 'completed'
                ? 'bg-primary text-white shadow-md'
                : 'text-textSecondary hover:text-white'
            }`}
          >
            Fuldførte ({completedCount})
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs text-textSecondary shrink-0 flex items-center gap-1">
            <ListFilter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {['all', 'arbejde', 'personligt', 'indkøb', 'studie', 'helbred'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as Category | 'all')}
              className={`text-xs px-3 py-1 rounded-lg border transition-all capitalize whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-primary/20 text-primary border-primary/40 font-semibold'
                  : 'bg-background text-textSecondary border-border hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Alle' : cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
