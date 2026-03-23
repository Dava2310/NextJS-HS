'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';

import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';

import { AssetForm } from '../../_components/form';
import { getAsset, type AssetVM } from '../../_logic';

function routeIdParam(id: string | string[] | undefined): string {
  if (id === undefined) return '';
  return Array.isArray(id) ? (id[0] ?? '') : id;
}

function EditAssetContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const idParam = routeIdParam(params.id);
  const id = parseInt(idParam, 10);
  const readOnly = searchParams.get('view') === '1';
  const invalidId = !idParam || !Number.isFinite(id) || id <= 0;

  const [asset, setAsset] = useState<AssetVM | null>(null);
  const [loading, setLoading] = useState(!invalidId);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (invalidId) return;

    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      setLoading(true);
      setLoadError(null);
      setAsset(null);

      void getAsset(id)
        .then((data) => {
          if (!cancelled) setAsset(data);
        })
        .catch((err: unknown) => {
          if (!cancelled) {
            setAsset(null);
            setLoadError(err instanceof Error ? err.message : 'Could not load asset.');
          }
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    });

    return () => {
      cancelled = true;
    };
  }, [invalidId, id]);

  return (
    <DashboardShell title={readOnly ? 'View asset' : 'Edit asset'}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <Button variant="ghost" size="sm" className="w-fit gap-2 px-0" asChild>
          <Link href="/assets">
            <ArrowLeftIcon className="size-4" aria-hidden />
            Back to assets
          </Link>
        </Button>

        {invalidId ? (
          <p className="text-destructive text-sm">Invalid asset ID.</p>
        ) : loadError ? (
          <p className="text-destructive text-sm">{loadError}</p>
        ) : loading ? (
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            Loading asset…
          </div>
        ) : asset ? (
          <AssetForm key={asset.id} asset={asset} readOnly={readOnly} />
        ) : null}
      </div>
    </DashboardShell>
  );
}

function EditAssetFallback() {
  return (
    <DashboardShell title="Asset">
      <div className="text-muted-foreground flex items-center gap-2 px-4 text-sm md:px-6">
        <Loader2Icon className="size-4 animate-spin" aria-hidden />
        Loading…
      </div>
    </DashboardShell>
  );
}

export default function EditAssetPage() {
  return (
    <Suspense fallback={<EditAssetFallback />}>
      <EditAssetContent />
    </Suspense>
  );
}
