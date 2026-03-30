# StatisticsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**statisticsControllerAssetsMetrics**](#statisticscontrollerassetsmetrics) | **GET** /statistics/assets-metrics | Returns aggregate metrics about assets (totals, availability, popular category).|

# **statisticsControllerAssetsMetrics**
> AssetsMetricsDto statisticsControllerAssetsMetrics()


### Example

```typescript
import {
    StatisticsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new StatisticsApi(configuration);

const { status, data } = await apiInstance.statisticsControllerAssetsMetrics();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AssetsMetricsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Asset metrics for dashboards and reporting. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

