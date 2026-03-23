'use client';

import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';

import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AssetVM, assetsQueryKey, deleteAsset } from '../_logic';

function AssetRowActions({ asset }: { asset: AssetVM }) {
  const queryClient = useQueryClient();

  const handleDelete = () => {
    toast.promise(deleteAsset(parseInt(asset.id, 10)), {
      duration: 3000,
      loading: 'Loading...',
      success: (message) => {
        queryClient.setQueryData<AssetVM[]>(
          assetsQueryKey,
          (prev) => prev?.filter((a) => a.id !== asset.id) ?? prev
        );
        return message;
      },
      error: (error) => error.message,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/assets/${asset.id}/edit`}>Update</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/assets/${asset.id}/edit?view=1`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<AssetVM>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
  },
  {
    accessorKey: 'model',
    header: 'Model',
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="block max-w-[220px] truncate" title={row.original.description}>
        {row.original.description}
      </span>
    ),
  },
  {
    accessorKey: 'categoryId',
    header: 'Category ID',
  },
  {
    accessorKey: 'employeeId',
    header: 'Custodian ID',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <AssetRowActions asset={row.original} />,
  },
];
