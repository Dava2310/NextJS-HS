'use client';

import type { AssetsMetricsDto } from '@/api-client';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LayersIcon, PackageIcon, PercentIcon, TagIcon, UsersIcon } from 'lucide-react';

export type SectionCardsProps = {
  metrics: AssetsMetricsDto;
};

/** Stack title + badge vertically on narrow cards so outline badges are not clipped (Card uses overflow-hidden). */
const cardHeaderLayout =
  '@max-[340px]/card:has-data-[slot=card-action]:grid-cols-1 @max-[340px]/card:[&_[data-slot=card-action]]:col-start-1 @max-[340px]/card:[&_[data-slot=card-action]]:row-start-3 @max-[340px]/card:[&_[data-slot=card-action]]:row-span-1 @max-[340px]/card:[&_[data-slot=card-action]]:justify-self-start';

/** Lets the header grid shrink so long badge copy wraps instead of clipping (badge default is nowrap + fixed height). */
const metricCardActionClass = 'min-w-0 max-w-full';
const metricBadgeClassName =
  'h-auto min-h-5 max-w-full shrink overflow-visible whitespace-normal py-1 leading-snug items-start';

export function SectionCards({ metrics }: SectionCardsProps) {
  const { total, availables, assigned, disponibility, popularCategory } = metrics;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3 @6xl/main:grid-cols-5 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader className={cardHeaderLayout}>
          <CardDescription>Total assets</CardDescription>
          <CardTitle className="min-w-0 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total.toLocaleString()}
          </CardTitle>
          <CardAction className={metricCardActionClass}>
            <Badge variant="outline" className={metricBadgeClassName}>
              <PackageIcon className="size-3.5 shrink-0" />
              All
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">Non-deleted assets in the system</div>
          <div className="text-muted-foreground">Complete inventory count</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className={cardHeaderLayout}>
          <CardDescription>Available</CardDescription>
          <CardTitle className="min-w-0 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {availables.toLocaleString()}
          </CardTitle>
          <CardAction className={metricCardActionClass}>
            <Badge variant="outline" className={metricBadgeClassName}>
              <LayersIcon className="size-3.5 shrink-0" />
              Unassigned
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">Not assigned to any employee</div>
          <div className="text-muted-foreground">Ready to assign</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className={cardHeaderLayout}>
          <CardDescription>Assigned</CardDescription>
          <CardTitle className="min-w-0 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {assigned.toLocaleString()}
          </CardTitle>
          <CardAction className={metricCardActionClass}>
            <Badge variant="outline" className={metricBadgeClassName}>
              <UsersIcon className="size-3.5 shrink-0" />
              In use
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">Linked to an employee</div>
          <div className="text-muted-foreground">Currently allocated</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className={cardHeaderLayout}>
          <CardDescription>Disponibility</CardDescription>
          <CardTitle className="min-w-0 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {Number.isInteger(disponibility) ? `${disponibility}%` : `${disponibility.toFixed(1)}%`}
          </CardTitle>
          <CardAction className={metricCardActionClass}>
            <Badge variant="outline" className={metricBadgeClassName}>
              <PercentIcon className="size-3.5 shrink-0" />
              Unassigned share
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">Share of assets that are unassigned</div>
          <div className="text-muted-foreground">0–100% of inventory</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className={cardHeaderLayout}>
          <CardDescription>Popular category</CardDescription>
          <CardTitle className="min-w-0 line-clamp-2 text-2xl font-semibold @[250px]/card:text-3xl">
            {popularCategory || 'N/A'}
          </CardTitle>
          <CardAction className={metricCardActionClass}>
            <Badge variant="outline" className={metricBadgeClassName}>
              <TagIcon className="size-3.5 shrink-0" />
              Top
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">Category with the most assets</div>
          <div className="text-muted-foreground">N/A when there are no categories</div>
        </CardFooter>
      </Card>
    </div>
  );
}
