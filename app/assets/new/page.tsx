import type { Metadata } from 'next';

import { NewAssetPage } from './new-asset-page';

export const metadata: Metadata = {
  title: 'New Asset',
};

export default function NewAssetRoute() {
  return <NewAssetPage />;
}
