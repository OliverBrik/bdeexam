import './style.css';

type Priority = 'low' | 'medium' | 'high';

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

renderTodos();