'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DashboardShell } from '@/components/dashboard-shell';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './_components';

import { getRoles } from './_logic';

export default function RolesPage() {
  const {
    data: roles = [],
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // Reacting to API success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Roles loaded successfully');
    }
  }, [isSuccess]);

  // Reacting to API error
  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : 'Error loading employees');
    }
  }, [isError, error]);

  return (
    <DashboardShell title="Roles">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable columns={columns} data={roles} filterColumns={['name', 'roleCode']} />
      </div>
    </DashboardShell>
  );
}
