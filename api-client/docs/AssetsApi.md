# AssetsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**assetsControllerCreate**](#assetscontrollercreate) | **POST** /assets | Creates a new asset in the database.|
|[**assetsControllerFindAll**](#assetscontrollerfindall) | **GET** /assets | Returns a list of all assets in the database.|
|[**assetsControllerFindOne**](#assetscontrollerfindone) | **GET** /assets/{id} | Returns a single instance of an Asset.|
|[**assetsControllerFreeAsset**](#assetscontrollerfreeasset) | **PATCH** /assets/{id}/free | Frees an asset from the employee assigned.|
|[**assetsControllerGetAssetCreationTimeSeriesByYear**](#assetscontrollergetassetcreationtimeseriesbyyear) | **GET** /assets/creation-timeseries/{year} | Returns monthly counts of assets created in the given calendar year.|
|[**assetsControllerRemove**](#assetscontrollerremove) | **DELETE** /assets/{id} | Soft deletes the asset from the database.|
|[**assetsControllerUpdate**](#assetscontrollerupdate) | **PATCH** /assets/{id} | Updates an already existing Asset.|

# **assetsControllerCreate**
> AssetResponseDto assetsControllerCreate(createAssetDto)


### Example

```typescript
import {
    AssetsApi,
    Configuration,
    CreateAssetDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let createAssetDto: CreateAssetDto; //Data for the new asset.

const { status, data } = await apiInstance.assetsControllerCreate(
    createAssetDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createAssetDto** | **CreateAssetDto**| Data for the new asset. | |


### Return type

**AssetResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Asset created successfully. |  -  |
|**400** | Invalid data - SKU duplicated. |  -  |
|**404** | If Category or Employee assigned are not valid or not found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerFindAll**
> Array<AssetResponseDto> assetsControllerFindAll()


### Example

```typescript
import {
    AssetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

const { status, data } = await apiInstance.assetsControllerFindAll();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<AssetResponseDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all assets in DTO response format. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerFindOne**
> AssetResponseDto assetsControllerFindOne()


### Example

```typescript
import {
    AssetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let id: number; //Unique asset identifier in the database. (default to undefined)

const { status, data } = await apiInstance.assetsControllerFindOne(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Unique asset identifier in the database. | defaults to undefined|


### Return type

**AssetResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Data of the asset found. |  -  |
|**404** | Asset not found or not valid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerFreeAsset**
> MessageResponseDto assetsControllerFreeAsset()


### Example

```typescript
import {
    AssetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let id: number; //Unique asset identifier in the database. (default to undefined)

const { status, data } = await apiInstance.assetsControllerFreeAsset(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Unique asset identifier in the database. | defaults to undefined|


### Return type

**MessageResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Asset freed successfully. |  -  |
|**400** | Asset has no employee assigned. |  -  |
|**404** | Asset not found or not valid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerGetAssetCreationTimeSeriesByYear**
> Array<AssetCreationTimeSeriesPointDto> assetsControllerGetAssetCreationTimeSeriesByYear()


### Example

```typescript
import {
    AssetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let year: number; //Calendar year to aggregate (e.g. 2024). (default to undefined)

const { status, data } = await apiInstance.assetsControllerGetAssetCreationTimeSeriesByYear(
    year
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **year** | [**number**] | Calendar year to aggregate (e.g. 2024). | defaults to undefined|


### Return type

**Array<AssetCreationTimeSeriesPointDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Twelve entries, January through December, with creation totals per month. |  -  |
|**400** | Invalid year. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerRemove**
> MessageResponseDto assetsControllerRemove()


### Example

```typescript
import {
    AssetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let id: number; //Unique asset identifier in the database. (default to undefined)

const { status, data } = await apiInstance.assetsControllerRemove(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | Unique asset identifier in the database. | defaults to undefined|


### Return type

**MessageResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Asset soft deleted succesfully. |  -  |
|**404** | Asset/Category/Employee not found or not valid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **assetsControllerUpdate**
> AssetResponseDto assetsControllerUpdate(updateAssetDto)


### Example

```typescript
import {
    AssetsApi,
    Configuration,
    UpdateAssetDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AssetsApi(configuration);

let id: number; //Unique asset identifier in the database. (default to undefined)
let updateAssetDto: UpdateAssetDto; //New data for the Asset.

const { status, data } = await apiInstance.assetsControllerUpdate(
    id,
    updateAssetDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateAssetDto** | **UpdateAssetDto**| New data for the Asset. | |
| **id** | [**number**] | Unique asset identifier in the database. | defaults to undefined|


### Return type

**AssetResponseDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Asset updated successfully. |  -  |
|**400** | Invalid data - SKU duplicated. |  -  |
|**404** | Asset/Category/Employee not found or not valid. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

