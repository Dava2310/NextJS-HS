import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { columns } from './columns';
import type { AssetVM } from '@/app/assets/_logic';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeAsset(overrides: Partial<AssetVM> = {}): AssetVM {
  return {
    id: '1',
    name: 'ThinkPad X1',
    sku: 'TP-X1-001',
    description: 'Business ultrabook',
    model: 'X1 Carbon',
    brand: 'Lenovo',
    categoryId: '1',
    categoryName: 'Laptops',
    employeeId: '2',
    employeeName: 'Jane Doe',
    createdAt: '2025-01-01T00:00:00.000Z',
    status: 'Active',
    ...overrides,
  };
}

function getCell(columnId: string, asset: AssetVM) {
  const col = columns.find(
    (c) => ('id' in c ? c.id : 'accessorKey' in c ? c.accessorKey : undefined) === columnId
  );
  if (!col || !('cell' in col) || typeof col.cell !== 'function') return null;
  return col.cell({ row: { original: asset } } as never);
}

function renderCell(columnId: string, asset: AssetVM) {
  const cell = getCell(columnId, asset);
  const { container } = render(<>{cell}</>);
  return container;
}

// ── Column definitions ────────────────────────────────────────────────────────

describe('columns', () => {
  it('defines 6 columns', () => {
    expect(columns).toHaveLength(6);
  });

  describe('model column', () => {
    it('combines brand and model into a single string', () => {
      renderCell('model', makeAsset({ brand: 'Lenovo', model: 'X1 Carbon' }));
      expect(screen.getByText('Lenovo X1 Carbon')).toBeTruthy();
    });
  });

  describe('status column', () => {
    it('shows "Available" when employeeName is empty or "None"', () => {
      renderCell('status', makeAsset({ employeeName: '' }));
      expect(screen.getByText('Available')).toBeTruthy();

      renderCell('status', makeAsset({ employeeName: 'None' }));
      expect(screen.getAllByText('Available').length).toBeGreaterThanOrEqual(1);
    });

    it('shows "In Use" when the asset has an assigned employee', () => {
      renderCell('status', makeAsset({ employeeName: 'Jane Doe' }));
      expect(screen.getByText('In Use')).toBeTruthy();
    });
  });

  describe('custodian column', () => {
    it('returns "—" when employeeName is empty or "None"', () => {
      expect(getCell('employeeName', makeAsset({ employeeName: '' }))).toBe('—');
      expect(getCell('employeeName', makeAsset({ employeeName: 'None' }))).toBe('—');
    });

    it('returns the employee name when assigned', () => {
      expect(getCell('employeeName', makeAsset({ employeeName: 'Jane Doe' }))).toBe('Jane Doe');
    });
  });
});
