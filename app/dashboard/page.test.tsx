import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/chart-area-interactive', () => ({
  ChartAreaInteractive: () => null,
}));

vi.mock('@/components/data-table-v2', () => ({
  DataTable: () => null,
}));

vi.mock('@/components/section-cards', () => ({
  SectionCards: () => null,
}));

vi.mock('@/components/dashboard-shell', () => ({
  DashboardShell: ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div data-testid="dashboard-shell">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

import Page from './page';

describe('Dashboard page', () => {
  it('renders the dashboard page', () => {
    render(<Page />);
    expect(screen.getByTestId('dashboard-shell')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Dashboard' }).textContent).toBe('Dashboard');
  });
});
