import { describe, it, expect } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { decrement, increment } from './counter.service';
import Home from './page';

// Wrapper to make TooltipProvider to work
function renderHome() {
  return render(
    <TooltipProvider>
      <Home />
    </TooltipProvider>,
  );
}

const counterHeadingRole = { level: 1 as const, name: /^Counter:/ };

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
    renderHome();
    expect(screen.getByRole('heading', counterHeadingRole)).toBeDefined();
    expect(screen.getByTestId('increment-button')).toBeDefined();
    expect(screen.getByTestId('decrement-button')).toBeDefined();
    expect(screen.getByTestId('clear-button')).toBeDefined();
  });

  it('Buttons have correct text content', () => {
    const { container } = renderHome();
    const scope = within(container);
    expect(scope.getByTestId('increment-button').textContent).toBe('Increment');
    expect(scope.getByTestId('decrement-button').textContent).toBe('Decrement');
    expect(scope.getByTestId('clear-button').textContent).toBe('Clear');
  });

  it('Counter increments when clicking the button', () => {
    const { container } = renderHome();
    const scope = within(container);

    const button = scope.getByTestId('increment-button');
    fireEvent.click(button);

    const heading = scope.getByRole('heading', counterHeadingRole);
    expect(heading.textContent).toBe('Counter: 1');
  });

  it('Counter decrements when clicking the button', () => {
    const { container } = renderHome();
    const scope = within(container);

    const button = scope.getByTestId('decrement-button');
    fireEvent.click(button);

    const heading = scope.getByRole('heading', counterHeadingRole);
    expect(heading.textContent).toBe('Counter: -1');
  });

  it('Counter clears when clicking the clear button', () => {
    const { container } = renderHome();
    const scope = within(container);

    const incrementButton = scope.getByTestId('increment-button');
    const clearButton = scope.getByTestId('clear-button');
    const heading = scope.getByRole('heading', counterHeadingRole);

    for (let i = 0; i < 5; i++) {
      fireEvent.click(incrementButton);
    }
    expect(heading.textContent).toBe('Counter: 5');

    fireEvent.click(clearButton);
    expect(heading.textContent).toBe('Counter: 0');
  });
});
