'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DashboardShell } from '@/components/dashboard-shell';
import { DataTable } from '@/components/ui/data-table';

import { columns } from './_components';
import { EmployeeForm } from './_components/form';
import { employeesQueryKey, getEmployees } from './_logic';

export default function EmployeePage() {
  const {
    data: employees = [],
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: employeesQueryKey,
    queryFn: getEmployees,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // Reacting to API success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Employees loaded successfully');
    }
  }, [isSuccess]);

  // Reacting to API error
  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : 'Error loading employees');
    }
  }, [isError, error]);

  return (
    <DashboardShell title="Employees">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable columns={columns} data={employees} />
        <EmployeeForm />
      </div>
    </DashboardShell>
  );
}
