import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './data-table';

afterEach(cleanup);

// ── Helpers ───────────────────────────────────────────────────────────────────

type Row = { name: string; email: string };

const columns: ColumnDef<Row>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

const data: Row[] = [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
];

// ── DataTable ─────────────────────────────────────────────────────────────────

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('renders a row for each data item', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('bob@example.com')).toBeTruthy();
  });

  it('shows "No results." when data is empty', () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText('No results.')).toBeTruthy();
  });

  it('renders a filter input when filterColumns is provided', () => {
    render(<DataTable columns={columns} data={data} filterColumns={['email']} />);
    expect(screen.getByPlaceholderText('Filter email...')).toBeTruthy();
  });

  it('does not render filter inputs when filterColumns is omitted', () => {
    render(<DataTable columns={columns} data={data} />);
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('disables the Previous button on the first page', () => {
    render(<DataTable columns={columns} data={data} />);
    const prev = screen.getByRole('button', { name: 'Previous' });
    expect(prev.hasAttribute('disabled')).toBe(true);
  });
});
