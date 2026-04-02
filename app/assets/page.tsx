import type { Metadata } from 'next';

import { AssetsPage } from './assets-page';

export const metadata: Metadata = {
  title: 'Assets',
};

export default function AssetsRoute() {
  return <AssetsPage />;
}
