export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const toggleCompleted = (todos: Todo[], id: number): Todo[] =>
  todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );