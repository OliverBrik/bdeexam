import { describe, expect, it } from 'vitest';
import { initializeColorPicker } from './color-picker';

describe('color picker', () => {
  it('updates the body background while the color is being selected', () => {
    document.body.innerHTML = '<input type="color" id="colorPicker" value="#ff0000">';

    initializeColorPicker(document);

    const colorPicker = document.getElementById('colorPicker') as HTMLInputElement;
    colorPicker.value = '#00ff00';
    colorPicker.dispatchEvent(new Event('input'));

    expect(document.body.style.backgroundColor).toBe('rgb(0, 255, 0)');
  });
});
