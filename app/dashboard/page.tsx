'use client';

import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table-v2';
import { DashboardShell } from '@/components/dashboard-shell';
import { SectionCards } from '@/components/section-cards';

import data from './data.json';

export default function Page() {
  return (
    <DashboardShell title="Dashboard">
      <div className="@container/main flex flex-1 flex-col gap-6">
        <SectionCards />
        <ChartAreaInteractive />
        <DataTable data={data} />
      </div>
    </DashboardShell>
  );
}
