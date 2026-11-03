export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
}

export const createTodo = (text: string, priority: Priority): Todo => ({
  id: Date.now(),
  text,
  priority,
  completed: false
});