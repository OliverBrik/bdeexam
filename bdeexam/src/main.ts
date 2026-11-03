import './style.css'
import { setupCounter } from './counter'
import { initializeColorPicker } from './features/color-picker'
import { createFilterInput, filterTodos } from './features/task-filter'
import type { TodoFilter } from './features/task-filter'
import { createTodo } from './features/task-priority'
import type { Priority, Todo } from './features/task-priority'

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

const filterInput = createFilterInput(document, todoForm);

const addTodo = (text: string, priority: Priority): void => {
  todos.push(createTodo(text, priority));
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

const renderTodos = (): void => {
  todoList.innerHTML = '';

  filterTodos(todos, currentFilter).forEach(todo => {
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
    completeButton.className = 'complete-button';
    completeButton.textContent = todo.completed ? 'Undo' : 'Complete';

    completeButton.addEventListener('click', () => {
      toggleTodoCompleted(todo.id);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'remove-button';
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