import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { decrement, increment } from './counter.service';
import Home from './page';

describe('Counter unit testing', () => {
  it('Increments the counter', () => {
    const counter = 1;
    expect(increment(counter)).toBe(2);
    expect(increment(counter, 2)).toBe(3);
  });
  it('Decrements the counter', () => {
    const counter = 10;
    expect(decrement(counter)).toBe(9);
    expect(decrement(counter, 10)).toBe(0);
  });
});

describe('Counter component testing', () => {
  it('Elements exists', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeDefined();
    expect(screen.getByTestId('increment-button')).toBeDefined();
    expect(screen.getByTestId('decrement-button')).toBeDefined();
    expect(screen.getByTestId('clear-button')).toBeDefined();
  });

  it('Buttons have correct text content', () => {
    const { container } = render(<Home />);
    const scope = within(container);
    expect(scope.getByTestId('increment-button').textContent).toBe('Increment');
    expect(scope.getByTestId('decrement-button').textContent).toBe('Decrement');
    expect(scope.getByTestId('clear-button').textContent).toBe('Clear');
  });

  it('Counter increments when clicking the button', () => {
    const { container } = render(<Home />);
    const scope = within(container);

    const button = scope.getByTestId('increment-button');
    fireEvent.click(button);

    const heading = scope.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Counter: 1');
  });

  it('Counter decrements when clicking the button', () => {
    const { container } = render(<Home />);
    const scope = within(container);

    const button = scope.getByTestId('decrement-button');
    fireEvent.click(button);

    const heading = scope.getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Counter: -1');
  });

  it('Counter clears when clicking the clear button', () => {
    const { container } = render(<Home />);
    const scope = within(container);

    const incrementButton = scope.getByTestId('increment-button');
    const clearButton = scope.getByTestId('clear-button');
    const heading = scope.getByRole('heading', { level: 1 });

    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementButton);
    }
    expect(heading.textContent).toBe('Counter: 5');

    fireEvent.click(clearButton);
    expect(heading.textContent).toBe('Counter: 0');
  });
});
