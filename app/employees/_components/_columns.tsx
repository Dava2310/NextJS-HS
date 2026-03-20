import { ColumnDef } from '@tanstack/react-table';
import { EmployeeVM } from '../_logic';

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
];
