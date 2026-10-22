import './style.css'
import { toggleCompleted } from './features/toggle-completed'
import type { Todo } from './features/toggle-completed'


// structure of the data schema
let todos: Todo[] = [];

const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;

const addTodo = (text:string):void => {
  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  todos.push(newTodo);

  renderTodos();
}

const renderTodos = ():void => {
  // clears the current list of todos - test later
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
    todoList.appendChild(li);
  });
}

renderTodos();

todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
  }


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
