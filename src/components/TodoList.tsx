import React from 'react';
import { 
  Check, 
  Trash2, 
  Calendar, 
  Flag, 
  Tag, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ListTodo
} from 'lucide-react';
import { Todo, Priority, Category } from '../types';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
}

const CATEGORY_COLORS: Record<Category, string> = {
  arbejde: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  personligt: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  indkøb: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  studie: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  helbred: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
};

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onClearCompleted 
}) => {
  const completedCount = todos.filter(t => t.completed).length;

  if (todos.length === 0) {
    return (
      <div className="bg-surface/50 border border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-textSecondary mb-4 shadow-inner">
          <ListTodo className="w-8 h-8 text-primary/70" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">Ingen opgaver fundet</h3>
        <p className="text-textSecondary text-sm max-w-sm">
          Du har ingen opgaver der matcher dine nuværende filtre. Tilføj en ny opgave ovenfor for at komme i gang!
        </p>
      </div>
    );
  }

  const isOverdue = (dateStr?: string) => {
    if (!dateStr) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateStr < today;
  };

  return (
    <div className="space-y-3">
      {todos.map((todo) => {
        const overdue = !todo.completed && isOverdue(todo.dueDate);

        return (
          <div
            key={todo.id}
            className={`group relative bg-surface border ${
              todo.completed 
                ? 'border-border/40 opacity-75 bg-surface/40' 
                : overdue 
                ? 'border-error/40 bg-error/5' 
                : 'border-border hover:border-primary/40'
            } rounded-2xl p-4 md:p-5 transition-all duration-200 shadow-sm hover:shadow-md flex items-start gap-4`}
          >
            {/* Checkbox button */}
            <button
              onClick={() => onToggle(todo.id)}
              className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                todo.completed
                  ? 'bg-success border-success text-white shadow-lg shadow-success/20'
                  : 'border-border bg-background hover:border-primary text-transparent'
              }`}
              aria-label={todo.completed ? 'Marker som ikke fuldført' : 'Marker som fuldført'}
            >
              <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${todo.completed ? 'scale-100' : 'scale-0'}`} />
            </button>

            {/* Todo Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`text-base font-medium text-white transition-all ${
                    todo.completed ? 'line-through text-textSecondary' : ''
                  }`}
                >
                  {todo.title}
                </span>

                {/* Category badge */}
                <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${CATEGORY_COLORS[todo.category]} capitalize`}>
                  {todo.category}
                </span>

                {/* Priority Indicator */}
                {todo.priority === 'high' && (
                  <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-error/10 text-error border border-error/20">
                    <Flag className="w-3 h-3" /> Høj
                  </span>
                )}
                {todo.priority === 'medium' && (
                  <span className="flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                    <Flag className="w-3 h-3" /> Mellem
                  </span>
                )}
              </div>

              {todo.description && (
                <p className={`text-sm text-textSecondary mb-2 line-clamp-2 ${todo.completed ? 'line-through' : ''}`}>
                  {todo.description}
                </p>
              )}

              {/* Metadata tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-textSecondary mt-2">
                {todo.dueDate && (
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${
                    overdue 
                      ? 'bg-error/20 text-error font-semibold' 
                      : 'bg-background/80 border border-border'
                  }`}>
                    {overdue ? <AlertCircle className="w-3.5 h-3.5" /> : <Calendar className="w-3.5 h-3.5" />}
                    <span>{todo.dueDate}</span>
                    {overdue && <span>(Overskredet)</span>}
                  </span>
                )}
                
                <span className="flex items-center gap-1 text-textSecondary/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(todo.createdAt).toLocaleDateString('da-DK', { day: 'numeric', month: 'short' })}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onDelete(todo.id)}
                className="p-2 rounded-xl text-textSecondary hover:text-error hover:bg-error/10 transition-colors"
                title="Slet opgave"
                aria-label="Slet opgave"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}

      {completedCount > 0 && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onClearCompleted}
            className="text-xs font-medium text-textSecondary hover:text-error transition-colors px-3 py-1.5 rounded-lg hover:bg-error/10 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Ryd fuldførte opgaver ({completedCount})</span>
          </button>
        </div>
      )}
    </div>
  );
};
