import { ColumnDef } from '@tanstack/react-table';
import { RoleVM } from '../_logic';

export const columns: ColumnDef<RoleVM>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'roleCode',
    header: 'Role Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];
