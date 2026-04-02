import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./_logic', () => ({
  assetsMetricsQueryKey: ['dashboard', 'assets-metrics'] as const,
  assetTimeSeriesQueryKey: (y: number) => ['dashboard', 'asset-time-series', y] as const,
  getAssetsMetrics: vi.fn().mockResolvedValue({
    total: 48,
    availables: 12,
    assigned: 36,
    disponibility: 25,
    popularCategory: 'Laptops',
  }),
  getAssetTimeSeries: vi.fn().mockResolvedValue([
    { month: 'January', total: 2 },
    { month: 'February', total: 5 },
  ]),
}));

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

function renderWithQueryClient(ui: React.ReactElement) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

describe('Dashboard page', () => {
  it('renders the dashboard page', () => {
    renderWithQueryClient(<Page />);
    expect(screen.getByTestId('dashboard-shell')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Dashboard' }).textContent).toBe('Dashboard');
  });
});
