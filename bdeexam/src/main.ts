import './style.css'
import { setupCounter } from './counter'
import { initializeColorPicker } from './features/color-picker'

type Priority = 'low' | 'medium' | 'high';
type TodoFilter = 'all' | 'completed' | 'not-completed' | Priority;

interface Todo {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
}

let todos: Todo[] = [];
let currentFilter: TodoFilter = 'all';

const todoInput = document.getElementById('todo-input');

if (!(todoInput instanceof HTMLInputElement)) {
  throw new Error('Todo input element was not found.');
}

const priorityInput = document.getElementById('priority-input');

if (!(priorityInput instanceof HTMLSelectElement)) {
  throw new Error('Priority input element was not found.');
}

const todoForm = document.querySelector('.todo-form');

if (!(todoForm instanceof HTMLFormElement)) {
  throw new Error('Todo form element was not found.');
}

const todoList = document.getElementById('todo-list');

if (!(todoList instanceof HTMLUListElement)) {
  throw new Error('Todo list element was not found.');
}
const counterButton = document.getElementById('counter-button') as HTMLButtonElement;

setupCounter(counterButton);

initializeColorPicker(document);

const createFilterInput = (): HTMLSelectElement => {
  const existingFilterInput = document.getElementById('filter-input');

  if (existingFilterInput instanceof HTMLSelectElement) {
    return existingFilterInput;
  }

  const label = document.createElement('label');
  label.htmlFor = 'filter-input';
  label.textContent = 'Filter tasks:';

  const filterSelect = document.createElement('select');
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
    const option = document.createElement('option');
    option.value = filter.value;
    option.textContent = filter.label;
    filterSelect.appendChild(option);
  });

  todoForm.insertAdjacentElement('afterend', label);
  label.insertAdjacentElement('afterend', filterSelect);

  return filterSelect;
};

const filterInput = createFilterInput();

const addTodo = (text: string, priority: Priority): void => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    priority,
    completed: false
  };

  todos.push(newTodo);
  renderTodos();
};

const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
};

const toggleTodoCompleted = (id: number): void => {
  todos = todos.map(todo =>
    todo.id === id
      ? { ...todo, completed: !todo.completed }
      : todo
  );

  renderTodos();
};

const getFilteredTodos = (): Todo[] => {
  switch (currentFilter) {
    case 'completed':
      return todos.filter(todo => todo.completed);

    case 'not-completed':
      return todos.filter(todo => !todo.completed);

    case 'low':
    case 'medium':
    case 'high':
      return todos.filter(todo => todo.priority === currentFilter);

    case 'all':
      return todos;
  }
};

const renderTodos = (): void => {
  todoList.innerHTML = '';

  getFilteredTodos().forEach(todo => {
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    const text = document.createElement('span');
    text.textContent = todo.text;

    if (todo.completed) {
      text.className = 'completed';
    }

    const priority = document.createElement('span');
    priority.className = `priority priority-${todo.priority}`;
    priority.textContent = `${todo.priority} priority`;

    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';

    completeButton.addEventListener('click', () => {
      toggleTodoCompleted(todo.id);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      removeTodo(todo.id);
    });

    listItem.append(
      text,
      priority,
      completeButton,
      removeButton
    );

    todoList.appendChild(listItem);
  });
};

todoForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  const priority = priorityInput.value as Priority;

  if (text === '') {
    return;
  }

  addTodo(text, priority);

  todoInput.value = '';
  priorityInput.value = 'medium';
});

filterInput.addEventListener('change', () => {
  currentFilter = filterInput.value as TodoFilter;
  renderTodos();
});

renderTodos();