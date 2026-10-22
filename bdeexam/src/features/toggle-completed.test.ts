import { describe, expect, it } from 'vitest';
import { toggleCompleted, type Todo } from './toggle-completed';

describe('toggleCompleted', () => {
  it('marks an active todo as completed', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Study', completed: false }
    ];

    const result = toggleCompleted(todos, 1);

    expect(result[0].completed).toBe(true);
  });

  it('marks a completed todo as active again', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Study', completed: true }
    ];

    const result = toggleCompleted(todos, 1);

    expect(result[0].completed).toBe(false);
  });

  it('does not change todos with another id', () => {
    const todos: Todo[] = [
      { id: 1, text: 'Study', completed: false },
      { id: 2, text: 'Read', completed: false }
    ];

    const result = toggleCompleted(todos, 1);

    expect(result[1]).toEqual(todos[1]);
  });
});
