import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EmployeeForm } from './form';

afterEach(cleanup);

vi.mock('sonner', () => ({ toast: { promise: vi.fn(), success: vi.fn(), error: vi.fn() } }));

// ── Helpers ───────────────────────────────────────────────────────────────────

function renderWithQueryClient(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

// ── EmployeeForm ──────────────────────────────────────────────────────────────

describe('EmployeeForm', () => {
  it('renders the "Create Employee" trigger button', () => {
    renderWithQueryClient(<EmployeeForm />);
    expect(screen.getByRole('button', { name: /Create Employee/i })).toBeTruthy();
  });

  it('shows all form fields after opening the dialog', () => {
    renderWithQueryClient(<EmployeeForm />);
    fireEvent.click(screen.getByRole('button', { name: /Create Employee/i }));

    expect(screen.getByLabelText('Employee Full Name')).toBeTruthy();
    expect(screen.getByLabelText('Email')).toBeTruthy();
    expect(screen.getByLabelText('Employee Code')).toBeTruthy();
    expect(screen.getByLabelText('Employee Password')).toBeTruthy();
    expect(screen.getByLabelText('Role ID')).toBeTruthy();
  });

  it('does not render the trigger button when an employee prop is provided', () => {
    const employee = {
      id: '1',
      fullName: 'Jane Doe',
      employeeCode: 'EMP0000001',
      email: 'jane@example.com',
      status: 'Active' as const,
      createdAt: '2025-01-01T00:00:00.000Z',
    };
    renderWithQueryClient(<EmployeeForm employee={employee} open={true} onOpenChange={() => {}} />);
    expect(screen.queryByRole('button', { name: /Create Employee/i })).toBeNull();
  });
});
