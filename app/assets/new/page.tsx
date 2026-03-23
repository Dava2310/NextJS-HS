'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';

import { AssetForm } from '../_components/form';

export default function NewAssetPage() {
  return (
    <DashboardShell title="New asset">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <Button variant="ghost" size="sm" className="w-fit gap-2 px-0" asChild>
          <Link href="/assets">
            <ArrowLeftIcon className="size-4" aria-hidden />
            Back to assets
          </Link>
        </Button>
        <AssetForm />
      </div>
    </DashboardShell>
  );
}
