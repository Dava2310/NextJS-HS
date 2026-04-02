import type { Metadata } from 'next';

import { EditAssetPage } from './edit-asset-page';

export const metadata: Metadata = {
  title: 'Edit Asset',
};

export default function EditAssetRoute() {
  return <EditAssetPage />;
}
