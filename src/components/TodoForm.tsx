import React, { useState } from 'react';
import { Plus, Calendar, Flag, Tag, Sparkles } from 'lucide-react';
import { Priority, Category } from '../types';

interface TodoFormProps {
  onAdd: (todo: {
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    dueDate: string;
  }) => void;
}

const CATEGORIES: { id: Category; label: string; color: string }[] = [
  { id: 'arbejde', label: 'Arbejde', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  { id: 'personligt', label: 'Personligt', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { id: 'indkøb', label: 'Indkøb', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  { id: 'studie', label: 'Studie', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  { id: 'helbred', label: 'Helbred', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
];

const PRIORITIES: { id: Priority; label: string; color: string }[] = [
  { id: 'low', label: 'Lav', color: 'text-textSecondary hover:text-white' },
  { id: 'medium', label: 'Mellem', color: 'text-warning' },
  { id: 'high', label: 'Høj', color: 'text-error' },
];

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('arbejde');
  const [dueDate, setDueDate] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setDueDate('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-surface border border-border rounded-2xl shadow-xl p-5 mb-8 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Tilføj en ny opgave... (Tryk Enter for hurtig tilføjelse)"
            className="w-full bg-transparent text-white placeholder-textSecondary focus:outline-none text-base md:text-lg font-medium"
          />
          <button
            type="submit"
            disabled={!title.trim()}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Tilføj</span>
          </button>
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4 animate-fadeIn">
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Selector */}
              <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-xl border border-border">
                <Tag className="w-4 h-4 text-textSecondary" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="bg-transparent text-white text-xs md:text-sm font-medium focus:outline-none cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-surface text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Selector */}
              <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-xl border border-border">
                <Flag className="w-4 h-4 text-textSecondary" />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Priority)}
                  className="bg-transparent text-white text-xs md:text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="low" className="bg-surface text-white">Lav prioritet</option>
                  <option value="medium" className="bg-surface text-white">Mellem prioritet</option>
                  <option value="high" className="bg-surface text-white">Høj prioritet</option>
                </select>
              </div>

              {/* Due Date Picker */}
              <div className="flex items-center gap-1.5 bg-background/60 px-3 py-1.5 rounded-xl border border-border text-xs md:text-sm text-textSecondary">
                <Calendar className="w-4 h-4 text-textSecondary" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent text-white text-xs md:text-sm focus:outline-none cursor-pointer color-scheme-dark"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-xs text-textSecondary hover:text-white transition-colors ml-auto"
            >
              Luk ekstra felter
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
