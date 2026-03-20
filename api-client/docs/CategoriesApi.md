# CategoriesApi

All URIs are relative to _http://localhost_

| Method                                                          | HTTP request                | Description                            |
| --------------------------------------------------------------- | --------------------------- | -------------------------------------- |
| [**categoriesControllerCreate**](#categoriescontrollercreate)   | **POST** /categories        | Create a new category                  |
| [**categoriesControllerFindAll**](#categoriescontrollerfindall) | **GET** /categories         | Gets all categories from the database. |
| [**categoriesControllerFindOne**](#categoriescontrollerfindone) | **GET** /categories/{id}    | Finds a single category.               |
| [**categoriesControllerRemove**](#categoriescontrollerremove)   | **DELETE** /categories/{id} | Removes logically a category.          |
| [**categoriesControllerUpdate**](#categoriescontrollerupdate)   | **PATCH** /categories/{id}  | Updates a single category.             |

# **categoriesControllerCreate**

> CategoryResponseDto categoriesControllerCreate(createCategoryDto)

### Example

```typescript
import { CategoriesApi, Configuration, CreateCategoryDto } from './api';

const configuration = new Configuration();
const apiInstance = new CategoriesApi(configuration);

let createCategoryDto: CreateCategoryDto; //The data for the new category

const { status, data } = await apiInstance.categoriesControllerCreate(createCategoryDto);
```

### Parameters

| Name                  | Type                  | Description                   | Notes |
| --------------------- | --------------------- | ----------------------------- | ----- |
| **createCategoryDto** | **CreateCategoryDto** | The data for the new category |       |

### Return type

**CategoryResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **201**     | Category created successfully. | -                |
| **400**     | Invalid data.                  | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **categoriesControllerFindAll**

> Array<CategoryResponseDto> categoriesControllerFindAll()

### Example

```typescript
import { CategoriesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CategoriesApi(configuration);

const { status, data } = await apiInstance.categoriesControllerFindAll();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<CategoryResponseDto>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description             | Response headers |
| ----------- | ----------------------- | ---------------- |
| **200**     | List of the categories. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **categoriesControllerFindOne**

> CategoryResponseDto categoriesControllerFindOne()

### Example

```typescript
import { CategoriesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CategoriesApi(configuration);

let id: number; //Unique identifier of the category. (default to undefined)

const { status, data } = await apiInstance.categoriesControllerFindOne(id);
```

### Parameters

| Name   | Type         | Description                        | Notes                 |
| ------ | ------------ | ---------------------------------- | --------------------- |
| **id** | [**number**] | Unique identifier of the category. | defaults to undefined |

### Return type

**CategoryResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | Data of the found category.      | -                |
| **404**     | Category not found or not valid. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **categoriesControllerRemove**

> MessageResponseDto categoriesControllerRemove()

### Example

```typescript
import { CategoriesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new CategoriesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.categoriesControllerRemove(id);
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] |             | defaults to undefined |

### Return type

**MessageResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | Category removed succesfully.    | -                |
| **404**     | Category not found or not valid. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **categoriesControllerUpdate**

> CategoryResponseDto categoriesControllerUpdate(updateCategoryDto)

### Example

```typescript
import { CategoriesApi, Configuration, UpdateCategoryDto } from './api';

const configuration = new Configuration();
const apiInstance = new CategoriesApi(configuration);

let id: number; //Unique identifier for the category. (default to undefined)
let updateCategoryDto: UpdateCategoryDto; //New data for the category.

const { status, data } = await apiInstance.categoriesControllerUpdate(id, updateCategoryDto);
```

### Parameters

| Name                  | Type                  | Description                         | Notes                 |
| --------------------- | --------------------- | ----------------------------------- | --------------------- |
| **updateCategoryDto** | **UpdateCategoryDto** | New data for the category.          |                       |
| **id**                | [**number**]          | Unique identifier for the category. | defaults to undefined |

### Return type

**CategoryResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                      | Response headers |
| ----------- | -------------------------------- | ---------------- |
| **200**     | Category updated successfully.   | -                |
| **400**     | Invalid data.                    | -                |
| **404**     | Category not found or not valid. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
