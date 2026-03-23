'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { EmployeeVM, deleteEmployee, employeesQueryKey } from '../_logic';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { EmployeeForm } from './form';
import { toast } from 'sonner';

function EmployeeRowActions({ employee }: { employee: EmployeeVM }) {
  const [editOpen, setEditOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const queryClient = useQueryClient();

  const handleDelete = () => {
    toast.promise(deleteEmployee(parseInt(employee.id)), {
      duration: 3000,
      loading: 'Loading...',
      success: (message) => {
        queryClient.setQueryData<EmployeeVM[]>(
          employeesQueryKey,
          (prev) => prev?.filter((e) => e.id !== employee.id) ?? prev
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
      <EmployeeForm
        readOnly={readOnly}
        employee={employee}
        open={editOpen}
        onOpenChange={handleDialogOpenChange}
      />
    </>
  );
}

export const columns: ColumnDef<EmployeeVM>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'employeeCode',
    header: 'Employee Code',
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    id: 'actions',
    cell: ({ row }) => <EmployeeRowActions employee={row.original} />,
  },
];
