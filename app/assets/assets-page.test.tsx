import { afterEach, describe, it, expect, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

afterEach(cleanup);

vi.mock('./_logic', () => ({
  assetsQueryKey: ['assets'],
  getAssets: vi.fn(() => new Promise(() => {})),
}));
vi.mock('./_components', () => ({ columns: [] }));
vi.mock('@/components/ui/data-table', () => ({ DataTable: () => null }));
vi.mock('@/components/dashboard-shell', () => ({
  DashboardShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { AssetsPage } from './assets-page';

function renderWithQueryClient(ui: React.ReactElement) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}

// ── AssetsPage ────────────────────────────────────────────────────────────────

describe('AssetsPage', () => {
  it('renders the "New asset" button linking to /assets/new', () => {
    renderWithQueryClient(<AssetsPage />);
    const link = screen.getByRole('link', { name: /New asset/i });
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/assets/new');
  });
});
