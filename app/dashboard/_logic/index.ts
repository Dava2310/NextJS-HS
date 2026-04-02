import { AssetCreationTimeSeriesPointDto, AssetsMetricsDto } from '@/api-client';
import { apiClient } from '@/lib/api-client';
import { throwError } from '@/lib/error-utils';

export const assetsMetricsQueryKey = ['dashboard', 'assets-metrics'] as const;

export const assetTimeSeriesQueryKey = (year: number) =>
  ['dashboard', 'asset-time-series', year] as const;

// --- API CALLS ---
export const getAssetsMetrics = async (): Promise<AssetsMetricsDto> => {
  try {
    const response = await apiClient.statistics.statisticsControllerAssetsMetrics();
    return response.data;
  } catch (error) {
    throwError(error, 'There was an error getting the metrics data.');
  }
};

/**
 * Gets the Time Series data for Asset creation history from the API
 * @param year The year to get history creation
 * @returns An array of points containing month and total
 */
export const getAssetTimeSeries = async (
  year: number
): Promise<AssetCreationTimeSeriesPointDto[]> => {
  try {
    const response = await apiClient.assets.assetsControllerGetAssetCreationTimeSeriesByYear({
      year,
    });
    return response.data;
  } catch (error) {
    throwError(
      error,
      'There was an error getting the time series data for Asset creation history.'
    );
  }
};
