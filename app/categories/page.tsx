'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

import { DashboardShell } from '@/components/dashboard-shell';
import { DataTable } from '@/components/ui/data-table';

import { CategoryForm, columns } from './_components';
import { categoriesQueryKey, getCategories } from './_logic';

export default function CategoriesPage() {
  const {
    data: categories = [],
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // Reacting to API success
  useEffect(() => {
    if (isSuccess) {
      toast.success('Categories loaded successfully');
    }
  }, [isSuccess]);

  // Reacting to API error
  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : 'Error loading categories');
    }
  }, [isError, error]);

  return (
    <DashboardShell title="Categories">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <DataTable columns={columns} data={categories} filterColumns={['name']} />
        <CategoryForm />
      </div>
    </DashboardShell>
  );
}
