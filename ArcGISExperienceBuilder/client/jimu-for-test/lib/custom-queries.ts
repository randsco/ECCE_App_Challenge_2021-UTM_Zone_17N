import { buildQueries } from '@testing-library/react'

const queryAllBySelector = (...args) => {
  const [container, selector] = args;
  if(!container){
    console.error('Unexpected: container is empty');
  }
  return container.querySelectorAll(selector);
};

const getMultipleError = (c, selector) =>
  `Found multiple elements with the selector of: ${selector}`
const getMissingError = (c, selector) =>
  `Unable to find an element with the selector of: ${selector}`

const [
  queryBySelector,
  getAllBySelector,
  getBySelector,
  findBySelector,
] = buildQueries(queryAllBySelector, getMultipleError, getMissingError)

export {
  queryAllBySelector,
  queryBySelector,
  getAllBySelector,
  getBySelector,
  findBySelector
}