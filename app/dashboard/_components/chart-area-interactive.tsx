'use client';

import * as React from 'react';
import type { AssetCreationTimeSeriesPointDto } from '@/api-client';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const description = 'Asset creation by month';

const chartConfig = {
  total: {
    label: 'Assets created',
    color: 'var(--primary)',
  },
} satisfies ChartConfig;

export type TimeSeriesRange = '3m' | '6m' | 'year';

export type ChartAreaInteractiveProps = {
  /** Monthly points for `year` from the API (any order; sorted inside the chart). */
  data: AssetCreationTimeSeriesPointDto[];
  /** Calendar year the series belongs to (drives “last N months” when that year is current). */
  year: number;
};

function monthIndexFromName(monthName: string): number {
  const t = Date.parse(`${monthName} 1, 2000`);
  if (Number.isNaN(t)) return 12;
  return new Date(t).getMonth();
}

function sortByCalendarMonth(points: AssetCreationTimeSeriesPointDto[]) {
  return [...points].sort((a, b) => monthIndexFromName(a.month) - monthIndexFromName(b.month));
}

function filterPointsByRange(
  points: AssetCreationTimeSeriesPointDto[],
  range: TimeSeriesRange,
  year: number
): AssetCreationTimeSeriesPointDto[] {
  const sorted = sortByCalendarMonth(points);
  if (range === 'year') return sorted;

  const n = range === '3m' ? 3 : 6;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (year === currentYear) {
    const startMonth = Math.max(0, currentMonth - (n - 1));
    return sorted.filter((p) => {
      const m = monthIndexFromName(p.month);
      return m >= startMonth && m <= currentMonth;
    });
  }

  if (year < currentYear) {
    const startMonth = 12 - n;
    return sorted.filter((p) => monthIndexFromName(p.month) >= startMonth);
  }

  return [];
}

const rangeLabels: Record<TimeSeriesRange, string> = {
  '3m': 'Last 3 months',
  '6m': 'Last 6 months',
  year: 'Whole year',
};

export function ChartAreaInteractive({ data, year }: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState<TimeSeriesRange>('year');

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('3m');
    }
  }, [isMobile]);

  const filteredData = React.useMemo(
    () => filterPointsByRange(data, timeRange, year),
    [data, timeRange, year]
  );

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Asset creations</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            New assets per month ({year}) — {rangeLabels[timeRange].toLowerCase()}
          </span>
          <span className="@[540px]/card:hidden">{rangeLabels[timeRange]}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => v && setTimeRange(v as TimeSeriesRange)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="3m">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="year">Whole year</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(v) => setTimeRange(v as TimeSeriesRange)}>
            <SelectTrigger
              className="flex w-44 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Time range"
            >
              <SelectValue placeholder={rangeLabels.year} />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="3m" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                Last 6 months
              </SelectItem>
              <SelectItem value="year" className="rounded-lg">
                Whole year
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData} margin={{ left: 12, right: 12 }}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.9} />
                <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const t = Date.parse(`${String(value)} 1, 2000`);
                if (Number.isNaN(t)) return String(value).slice(0, 3);
                return new Date(t).toLocaleDateString('en-US', { month: 'short' });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent labelFormatter={(value) => String(value)} indicator="dot" />
              }
            />
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillTotal)"
              stroke="var(--color-total)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
