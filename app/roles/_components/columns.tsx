'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
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

import { RoleVM } from '../_logic';
import { RoleForm } from './form';

function RoleRowActions({ role }: { role: RoleVM }) {
  const [editOpen, setEditOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

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
        </DropdownMenuContent>
      </DropdownMenu>
      <RoleForm
        readOnly={readOnly}
        role={role}
        open={editOpen}
        onOpenChange={handleDialogOpenChange}
      />
    </>
  );
}

export const columns: ColumnDef<RoleVM>[] = [
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
    accessorKey: 'roleCode',
    header: 'Role Code',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => <RoleRowActions role={row.original} />,
  },
];
