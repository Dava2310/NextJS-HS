'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Home() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <Button onClick={() => setCounter(counter + 1)}>Increment</Button>
      <Button onClick={() => setCounter(counter - 1)}>Decrement</Button>
    </div>
  );
}
