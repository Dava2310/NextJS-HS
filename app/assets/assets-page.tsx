'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PlusIcon } from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

import { columns } from './_components';
import { assetsQueryKey, getAssets } from './_logic';

export function AssetsPage() {
  const {
    data: assets = [],
    isSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: assetsQueryKey,
    queryFn: getAssets,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Assets loaded successfully');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : 'Error loading assets');
    }
  }, [isError, error]);

  return (
    <DashboardShell title="Assets">
      <div className="@container/main flex flex-1 flex-col gap-4">
        <div className="flex justify-end">
          <Button asChild className="gap-2 shadow-sm">
            <Link href="/assets/new">
              <PlusIcon className="size-4" aria-hidden />
              New asset
            </Link>
          </Button>
        </div>
        <DataTable columns={columns} data={assets} filterColumns={['name', 'sku']} />
      </div>
    </DashboardShell>
  );
}
