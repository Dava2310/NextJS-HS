import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CategoryForm } from './form';

afterEach(cleanup);

vi.mock('sonner', () => ({ toast: { promise: vi.fn(), success: vi.fn(), error: vi.fn() } }));

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderWithQueryClient(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

// ── CategoryForm ──────────────────────────────────────────────────────────────

describe('CategoryForm', () => {
  it('renders the "Create Category" trigger button', () => {
    renderWithQueryClient(<CategoryForm />);
    expect(screen.getByRole('button', { name: /Create Category/i })).toBeTruthy();
  });

  it('shows all form fields after opening the dialog', () => {
    renderWithQueryClient(<CategoryForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Category/i }));

    expect(screen.getByLabelText("Category's Name")).toBeTruthy();
    expect(screen.getByLabelText('Category Code')).toBeTruthy();
    expect(screen.getByLabelText('Description')).toBeTruthy();
  });

  it('does not render the trigger button when a category prop is provided', () => {
    const category = {
      id: '1',
      name: 'Laptops',
      code: 'lap-001',
      description: 'Portable computers',
      status: 'Active' as const,
      createdAt: '2025-01-01T00:00:00.000Z',
    };
    renderWithQueryClient(<CategoryForm category={category} open={true} onOpenChange={() => {}} />);
    expect(screen.queryByRole('button', { name: /Create Category/i })).toBeNull();
  });
});
