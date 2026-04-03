import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

type Employee = {
  id: string;
  name: string;
  email: string;
  code: string;
  status: 'Active' | 'Inactive';
};

const columns: ColumnDef<Employee>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'code', header: 'Code' },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'Active' ? 'default' : 'outline'}>
        {row.original.status}
      </Badge>
    ),
  },
];

const employees: Employee[] = [
  {
    id: '1',
    code: '1234567890',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'Active',
  },
  { id: '2', code: '0987654321', name: 'Bob Smith', email: 'bob@example.com', status: 'Active' },
  {
    id: '3',
    code: '1122334455',
    name: 'Carol White',
    email: 'carol@example.com',
    status: 'Inactive',
  },
];

const meta: Meta = {
  title: 'UI/DataTable',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const WithData: Story = {
  render: () => <DataTable columns={columns} data={employees} filterColumns={['name', 'email']} />,
};

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} />,
};

export const NoFilter: Story = {
  render: () => <DataTable columns={columns} data={employees} />,
};
