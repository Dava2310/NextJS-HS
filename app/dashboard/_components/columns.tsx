'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CircleCheckIcon, UserRoundIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import type { AssetVM } from '@/app/assets/_logic';

export const columns: ColumnDef<AssetVM>[] = [
  {
    accessorKey: 'name',
    header: 'Asset',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    id: 'model',
    header: 'Model',
    cell: ({ row }) => (
      <span>
        {row.original.brand} {row.original.model}
      </span>
    ),
  },
  {
    accessorKey: 'categoryName',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.original.categoryName}
      </Badge>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const available = !row.original.employeeName || row.original.employeeName === 'None';
      return (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {available ? (
            <CircleCheckIcon className="fill-green-500 dark:fill-green-400" />
          ) : (
            <UserRoundIcon className="text-blue-500 dark:text-blue-400" />
          )}
          {available ? 'Available' : 'In Use'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'employeeName',
    header: 'Custodian',
    cell: ({ row }) => {
      const name = row.original.employeeName;
      return !name || name === 'None' ? '—' : name;
    },
  },
];
