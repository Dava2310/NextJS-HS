'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { throwError } from '@/lib/error-utils';

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);

  const tryApi = async () => {
    try {
      const response = await apiClient.app.appControllerHealth();
      setResponse(response.data.message);
    } catch (error) {
      throwError(error);
    }
  };

  return (
    <div>
      <h1>Test API</h1>
      <Button onClick={tryApi}>Try API</Button>
      {response && <p>{response}</p>}
    </div>
  );
}
