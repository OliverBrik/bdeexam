import type { Todo } from './task-priority';

export type TodoFilter = 'all' | 'completed' | 'not-completed' | Todo['priority'];

export const createFilterInput = (
  documentRoot: Document,
  form: HTMLFormElement
): HTMLSelectElement => {
  const existingFilterInput = documentRoot.getElementById('filter-input');

  if (existingFilterInput instanceof HTMLSelectElement) {
    return existingFilterInput;
  }

  const label = documentRoot.createElement('label');
  label.htmlFor = 'filter-input';
  label.textContent = 'Filter tasks:';

  const filterSelect = documentRoot.createElement('select');
  filterSelect.id = 'filter-input';

  const filters: Array<{ value: TodoFilter; label: string }> = [
    { value: 'all', label: 'All tasks' },
    { value: 'completed', label: 'Completed' },
    { value: 'not-completed', label: 'Not completed' },
    { value: 'low', label: 'Low priority' },
    { value: 'medium', label: 'Medium priority' },
    { value: 'high', label: 'High priority' }
  ];

  filters.forEach(filter => {
    const option = documentRoot.createElement('option');
    option.value = filter.value;
    option.textContent = filter.label;
    filterSelect.appendChild(option);
  });

  form.insertAdjacentElement('afterend', label);
  label.insertAdjacentElement('afterend', filterSelect);

  return filterSelect;
};

export const filterTodos = (
  todos: Todo[],
  filter: TodoFilter
): Todo[] => {
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'not-completed':
      return todos.filter(todo => !todo.completed);
    case 'low':
    case 'medium':
    case 'high':
      return todos.filter(todo => todo.priority === filter);
    case 'all':
      return todos;
  }
};
