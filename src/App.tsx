import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import { Todo, Priority, Category, FilterStatus, SortOption } from './types';
import { playSuccessSound } from './utils/sound';
import { CheckCircle, ShieldCheck, Heart } from 'lucide-react';

const INITIAL_TODOS: Todo[] = [
  {
    id: '1',
    title: 'Gennemgå ugentlig projektplan',
    description: 'Sørg for at alle deadlines for Q2 er opdateret og tildelt teammedlemmer.',
    completed: false,
    priority: 'high',
    category: 'arbejde',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Køb ind til aftensmad',
    description: 'Frisk grøntsager, avokado, fuldkornsbrød og olivenolie.',
    completed: true,
    priority: 'medium',
    category: 'indkøb',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    title: 'Morgenmeditation og træning',
    description: '30 minutters styrketræning efterfulgt af 10 minutters åndedrætsøvelser.',
    completed: false,
    priority: 'low',
    category: 'helbred',
    dueDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  },
];

export function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('danish_todos_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse todos from localStorage', e);
      }
    }
    return INITIAL_TODOS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');

  useEffect(() => {
    localStorage.setItem('danish_todos_v1', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (newTodoData: {
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    dueDate: string;
  }) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      ...newTodoData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const nextCompleted = !todo.completed;
          if (nextCompleted) {
            playSuccessSound();
          }
          return { ...todo, completed: nextCompleted };
        }
        return todo;
      })
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter and Sort logic
  const filteredTodos = todos.filter((todo) => {
    // Status filter
    if (statusFilter === 'active' && todo.completed) return false;
    if (statusFilter === 'completed' && !todo.completed) return false;

    // Category filter
    if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = todo.title.toLowerCase().includes(query);
      const matchDesc = todo.description?.toLowerCase().includes(query) || false;
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortOption === 'date-desc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortOption === 'date-asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortOption === 'priority') {
      const weight = { high: 3, medium: 2, low: 1 };
      return weight[b.priority] - weight[a.priority];
    }
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  return (
    <div className="min-h-screen bg-background text-text flex flex-col selection:bg-primary selection:text-white">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        <Header completedCount={completedCount} totalCount={totalCount} />

        <TodoForm onAdd={handleAddTodo} />

        <TodoFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          totalCount={totalCount}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <TodoList
          todos={filteredTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onClearCompleted={handleClearCompleted}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-textSecondary mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Dine opgaver gemmes sikkert lokalt i din browser.</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Lavet med</span>
            <Heart className="w-3.5 h-3.5 text-accent fill-accent/20" />
            <span>til produktive dage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
