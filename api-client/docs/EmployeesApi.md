# EmployeesApi

All URIs are relative to _http://localhost_

| Method                                                        | HTTP request               | Description                                 |
| ------------------------------------------------------------- | -------------------------- | ------------------------------------------- |
| [**employeesControllerCreate**](#employeescontrollercreate)   | **POST** /employees        | Creates a new Employee.                     |
| [**employeesControllerFindAll**](#employeescontrollerfindall) | **GET** /employees         | Gets all the Employee from the database.    |
| [**employeesControllerFindOne**](#employeescontrollerfindone) | **GET** /employees/{id}    | Find a single Employee from the database.   |
| [**employeesControllerRemove**](#employeescontrollerremove)   | **DELETE** /employees/{id} | Soft deletes an Employee from the database. |
| [**employeesControllerUpdate**](#employeescontrollerupdate)   | **PATCH** /employees/{id}  | Updates an existing Employee.               |

# **employeesControllerCreate**

> EmployeeResponseDto employeesControllerCreate(createEmployeeDto)

### Example

```typescript
import { EmployeesApi, Configuration, CreateEmployeeDto } from './api';

const configuration = new Configuration();
const apiInstance = new EmployeesApi(configuration);

let createEmployeeDto: CreateEmployeeDto; //Data for the new Employee.

const { status, data } = await apiInstance.employeesControllerCreate(createEmployeeDto);
```

### Parameters

| Name                  | Type                  | Description                | Notes |
| --------------------- | --------------------- | -------------------------- | ----- |
| **createEmployeeDto** | **CreateEmployeeDto** | Data for the new Employee. |       |

### Return type

**EmployeeResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                        | Response headers |
| ----------- | ---------------------------------- | ---------------- |
| **201**     | Employee created successfully.     | -                |
| **400**     | Invalid data for the new Employee. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **employeesControllerFindAll**

> Array<EmployeeResponseDto> employeesControllerFindAll()

### Example

```typescript
import { EmployeesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new EmployeesApi(configuration);

const { status, data } = await apiInstance.employeesControllerFindAll();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<EmployeeResponseDto>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description            | Response headers |
| ----------- | ---------------------- | ---------------- |
| **200**     | The list of Employees. | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **employeesControllerFindOne**

> EmployeeResponseDto employeesControllerFindOne()

### Example

```typescript
import { EmployeesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new EmployeesApi(configuration);

let id: number; //ID of the Employee. (default to undefined)

const { status, data } = await apiInstance.employeesControllerFindOne(id);
```

### Parameters

| Name   | Type         | Description         | Notes                 |
| ------ | ------------ | ------------------- | --------------------- |
| **id** | [**number**] | ID of the Employee. | defaults to undefined |

### Return type

**EmployeeResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                 | Response headers |
| ----------- | --------------------------- | ---------------- |
| **200**     | Data of the found Employee. | -                |
| **404**     | Employee not found.         | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **employeesControllerRemove**

> MessageResponseDto employeesControllerRemove()

### Example

```typescript
import { EmployeesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new EmployeesApi(configuration);

let id: number; // (default to undefined)

const { status, data } = await apiInstance.employeesControllerRemove(id);
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

| Status code | Description                   | Response headers |
| ----------- | ----------------------------- | ---------------- |
| **200**     | Employee deleted succesfully. | -                |
| **404**     | Employee not found.           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **employeesControllerUpdate**

> EmployeeResponseDto employeesControllerUpdate(updateEmployeeDto)

### Example

```typescript
import { EmployeesApi, Configuration, UpdateEmployeeDto } from './api';

const configuration = new Configuration();
const apiInstance = new EmployeesApi(configuration);

let id: number; //ID of the Employee. (default to undefined)
let updateEmployeeDto: UpdateEmployeeDto; //The new attributes for the Employee.

const { status, data } = await apiInstance.employeesControllerUpdate(id, updateEmployeeDto);
```

### Parameters

| Name                  | Type                  | Description                          | Notes                 |
| --------------------- | --------------------- | ------------------------------------ | --------------------- |
| **updateEmployeeDto** | **UpdateEmployeeDto** | The new attributes for the Employee. |                       |
| **id**                | [**number**]          | ID of the Employee.                  | defaults to undefined |

### Return type

**EmployeeResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                    | Response headers |
| ----------- | ------------------------------ | ---------------- |
| **200**     | Employee updated successfully. | -                |
| **400**     | Invalid data for the Employee. | -                |
| **404**     | Employee not found.            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
