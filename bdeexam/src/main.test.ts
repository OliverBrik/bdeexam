import { describe, it, expect } from 'vitest';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const addTodo = (todos: Todo[], text: string) => {
    const newTodo: Todo = {
        id: 123,
        text,
        completed: false
    };
    return [...todos, newTodo]
}


const removeTodo = (todos: Todo[], id: number): Todo[] => {
    return todos.filter(todo => todo.id !== id);
}

describe('Todo List', () => {
    it('should add a new todo', () => {
        const todos: Todo[] = [];
        const result = addTodo(todos, 'Test Todo');
        expect(result.length).toBe(1);
        expect(result[0].text).toBe('Test Todo');
        expect(result[0].completed).toBe(false);
    });
    
})

