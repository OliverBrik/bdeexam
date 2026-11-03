import './style.css'
import { initializeColorPicker } from './features/color-picker'
import { toggleCompleted } from './features/toggle-completed'
import type { Todo } from './features/toggle-completed'
import './style.css';

type Priority = 'low' | 'medium' | 'high';

// structure of the data schema
interface Todo {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
}

let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const priorityInput = document.getElementById('priority-input') as HTMLSelectElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

initializeColorPicker(document);

const addTodo = (text:string):void => {
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

const renderTodos = (): void => {
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <div>
        <button class="complete-button">${todo.completed ? 'Undo' : 'Complete'}</button>
        <button class="remove-button">Remove</button>
      </div>
    `;
    addRemoveButtonListener(li, todo.id);
    addToggleCompletedButtonListener(li, todo.id);

    const text = document.createElement('span');
    text.textContent = todo.text;

    const priority = document.createElement('span');
    priority.className = `priority priority-${todo.priority}`;
    priority.textContent = `${todo.priority} priority`;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () => {
      removeTodo(todo.id);
    });

    li.append(text, priority, removeButton);
    todoList.appendChild(li);
  });
};

todoForm.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  const priority = priorityInput.value as Priority;

  if (text !== '') {
    addTodo(text, priority);
    todoInput.value = '';
    priorityInput.value = 'medium';
  }
});


})

const addRemoveButtonListener = (li: HTMLLIElement, id: number):void => {
  const removeButton = li.querySelector('.remove-button');
  removeButton?.addEventListener('click', () => {removeTodo(id)});
    
}

const addToggleCompletedButtonListener = (li: HTMLLIElement, id: number):void => {
  const completeButton = li.querySelector('.complete-button');
  completeButton?.addEventListener('click', () => {
    todos = toggleCompleted(todos, id);
    renderTodos();
  });
}

const removeTodo = (id:number):void => {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}
renderTodos();
