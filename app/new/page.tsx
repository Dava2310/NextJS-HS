'use client';

import { useState } from 'react';

import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';
import { decrement, increment } from './counter.service';

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <DashboardShell title="Counter app">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <h1>Counter: {counter}</h1>
        <Button testId="increment-button" onClick={() => setCounter(increment(counter))}>
          Increment
        </Button>
        <Button testId="decrement-button" onClick={() => setCounter(decrement(counter))}>
          Decrement
        </Button>
        <Button testId="clear-button" onClick={() => setCounter(0)}>
          Clear
        </Button>
      </div>
    </DashboardShell>
  );
}
