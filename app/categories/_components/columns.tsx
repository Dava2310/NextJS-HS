'use client';

import { useState } from 'react';
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

import { CategoryVM, deleteCategory, categoriesQueryKey } from '../_logic';
import { CategoryForm } from '.';

function CategoryRowActions({ category }: { category: CategoryVM }) {
  const [editOpen, setEditOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    toast.promise(deleteCategory(parseInt(category.id)), {
      duration: 3000,
      loading: 'Loading...',
      success: (message) => {
        queryClient.setQueryData<CategoryVM[]>(
          categoriesQueryKey,
          (prev) => prev?.filter((e) => e.id !== category.id) ?? prev
        );
        return message;
      },
      error: (error) => error.message,
    });
  };

  const handleView = () => {
    setReadOnly(true);
    setEditOpen(true);
  };

  /** Clear view mode when the dialog closes (overlay click, Escape, success, etc.). */
  const handleDialogOpenChange = (open: boolean) => {
    setEditOpen(open);
    if (!open) {
      setReadOnly(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={() => {
              setReadOnly(false);
              setEditOpen(true);
            }}
          >
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleView}>View</DropdownMenuItem>
          <DropdownMenuItem onSelect={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CategoryForm
        readOnly={readOnly}
        category={category}
        open={editOpen}
        onOpenChange={handleDialogOpenChange}
      />
    </>
  );
}

export const columns: ColumnDef<CategoryVM>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
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
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryRowActions category={row.original} />,
  },
];
