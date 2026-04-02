'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ChartAreaInteractive } from './_components/chart-area-interactive';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './_components/columns';
import { DashboardShell } from '@/components/dashboard-shell';
import { SectionCards } from './_components/section-cards';

import {
  assetTimeSeriesQueryKey,
  assetsMetricsQueryKey,
  getAssetsMetrics,
  getAssetTimeSeries,
} from './_logic';
import { type AssetVM, getAssets } from '@/app/assets/_logic';

export function DashboardPage() {
  const year = new Date().getFullYear();

  const [assets, setAssets] = useState<AssetVM[]>([]);

  useEffect(() => {
    void getAssets()
      .then(setAssets)
      .catch((err: unknown) => {
        toast.error(err instanceof Error ? err.message : 'Error loading assets');
      });
  }, []);

  const {
    data: metrics,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: assetsMetricsQueryKey,
    queryFn: getAssetsMetrics,
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: timeSeries = [],
    isError: timeSeriesError,
    error: timeSeriesErr,
    isPending: timeSeriesPending,
  } = useQuery({
    queryKey: assetTimeSeriesQueryKey(year),
    queryFn: () => getAssetTimeSeries(year),
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : 'Error loading asset metrics');
    }
  }, [isError, error]);

  useEffect(() => {
    if (timeSeriesError) {
      toast.error(
        timeSeriesErr instanceof Error
          ? timeSeriesErr.message
          : 'Error loading asset creation history'
      );
    }
  }, [timeSeriesError, timeSeriesErr]);

  return (
    <DashboardShell title="Dashboard">
      <div className="@container/main flex flex-1 flex-col gap-6">
        {isPending ? (
          <div className="mx-4 h-40 animate-pulse rounded-xl bg-muted lg:mx-6" aria-hidden />
        ) : metrics ? (
          <SectionCards metrics={metrics} />
        ) : null}
        {timeSeriesPending ? (
          <div className="mx-4 h-[318px] animate-pulse rounded-xl bg-muted lg:mx-6" aria-hidden />
        ) : (
          <ChartAreaInteractive data={timeSeries} year={year} />
        )}
        <DataTable columns={columns} data={assets} />
      </div>
    </DashboardShell>
  );
}
