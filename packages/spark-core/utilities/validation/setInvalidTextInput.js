/* global document */
const buildErrorContainer = (errorContainer, iconName, message) => {
  const errorIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  errorIcon.classList.add('sprk-c-Icon', 'sprk-c-Icon--m', 'sprk-b-ErrorIcon');
  const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  const errorText = document.createElement('span');
  useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${iconName}`);
  errorIcon.appendChild(useElement);
  errorText.textContent = message;
  errorContainer.appendChild(errorIcon);
  errorContainer.appendChild(errorText);
  return errorContainer;
};

const setInvalidTextInput = (inputContainer, defaultErrorMessage) => {
  const overrideErrorMessage = inputContainer.getAttribute('data-sprk-input-invalid-content');
  const input = inputContainer.querySelector('input');
  const errorContainer = inputContainer.querySelector('.sprk-b-ErrorContainer');

  input.classList.add('sprk-b-TextInput--error');
  input.setAttribute('aria-invalid', 'true');

  if (errorContainer) {
    input.setAttribute('aria-describedby', errorContainer.getAttribute('id'));
    errorContainer.innerHTML = '';
    buildErrorContainer(errorContainer, 'exclamation', overrideErrorMessage || defaultErrorMessage);
  }
};

export { setInvalidTextInput as default };
