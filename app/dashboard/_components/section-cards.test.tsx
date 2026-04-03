import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';

afterEach(cleanup);
import type { AssetsMetricsDto } from '@/api-client';
import { SectionCards } from './section-cards';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeMetrics(overrides: Partial<AssetsMetricsDto> = {}): AssetsMetricsDto {
  return {
    total: 48,
    availables: 12,
    assigned: 36,
    disponibility: 25,
    popularCategory: 'Laptops',
    ...overrides,
  };
}

// ── SectionCards ──────────────────────────────────────────────────────────────

describe('SectionCards', () => {
  it('renders all 5 card headings', () => {
    render(<SectionCards metrics={makeMetrics()} />);

    expect(screen.getByText('Total assets')).toBeTruthy();
    expect(screen.getByText('Available')).toBeTruthy();
    expect(screen.getByText('Assigned')).toBeTruthy();
    expect(screen.getByText('Disponibility')).toBeTruthy();
    expect(screen.getByText('Popular category')).toBeTruthy();
  });

  it('displays the correct metric values', () => {
    render(<SectionCards metrics={makeMetrics()} />);

    expect(screen.getByText('48')).toBeTruthy();
    expect(screen.getByText('12')).toBeTruthy();
    expect(screen.getByText('36')).toBeTruthy();
    expect(screen.getByText('25%')).toBeTruthy();
    expect(screen.getByText('Laptops')).toBeTruthy();
  });

  it('formats a non-integer disponibility to one decimal place', () => {
    render(<SectionCards metrics={makeMetrics({ disponibility: 33.333 })} />);
    expect(screen.getByText('33.3%')).toBeTruthy();
  });

  it('shows "N/A" when popularCategory is empty', () => {
    render(<SectionCards metrics={makeMetrics({ popularCategory: '' })} />);
    expect(screen.getByText('N/A')).toBeTruthy();
  });
});
