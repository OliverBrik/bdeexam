export const initializeColorPicker = (documentRoot: Document): void => {
  const colorPicker = documentRoot.getElementById('colorPicker');

  if (!(colorPicker instanceof HTMLInputElement) || colorPicker.type !== 'color') {
    throw new Error('Color picker element with id "colorPicker" was not found.');
  }

  colorPicker.addEventListener('input', () => {
    documentRoot.body.style.backgroundColor = colorPicker.value;
  });
};
