import React from 'react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`)

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter display starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");
});

test('clicking button increments counter', () => {
  const wrapper = setup();

  // Find the button
  const button = findByTestAttr(wrapper, 'increment-button');

  // Click the button
  button.simulate('click');

  // find the display, and thest that the number has been incremented
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
});

test('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button');
  expect(button.length).toBe(1);
});

test('clicking button decrements counter', () => {
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");
});

test("Don't decrement counter when click on decrements and counter is 0", () => {
  const wrapper = setup();

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");
});

test('display error message when trying to decrement below 0', () => {
  const wrapper = setup();

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(1);
});

test('hide error message when increment the counter', () => {
  const wrapper = setup();

  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');

  const errorMessage = findByTestAttr(wrapper, 'error-message');
  expect(errorMessage.length).toBe(0);
})
