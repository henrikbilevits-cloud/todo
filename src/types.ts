export type Priority = 'low' | 'medium' | 'high';
export type Category = 'arbejde' | 'personligt' | 'indkøb' | 'studie' | 'helbred';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortOption = 'date-desc' | 'date-asc' | 'priority' | 'title';
