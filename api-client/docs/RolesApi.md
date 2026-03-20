# RolesApi

All URIs are relative to _http://localhost_

| Method                                                | HTTP request          | Description                                       |
| ----------------------------------------------------- | --------------------- | ------------------------------------------------- |
| [**rolesControllerCreate**](#rolescontrollercreate)   | **POST** /roles       | Creates a new role in the database.               |
| [**rolesControllerFindAll**](#rolescontrollerfindall) | **GET** /roles        | Finds all the valid roles in the database.        |
| [**rolesControllerFindOne**](#rolescontrollerfindone) | **GET** /roles/{id}   | Finds a single instance of valid role by the ID.  |
| [**rolesControllerUpdate**](#rolescontrollerupdate)   | **PATCH** /roles/{id} | Updates an already existing role in the database. |

# **rolesControllerCreate**

> RoleResponseDto rolesControllerCreate(createRoleDto)

### Example

```typescript
import { RolesApi, Configuration, CreateRoleDto } from './api';

const configuration = new Configuration();
const apiInstance = new RolesApi(configuration);

let createRoleDto: CreateRoleDto; //The data for the new role

const { status, data } = await apiInstance.rolesControllerCreate(createRoleDto);
```

### Parameters

| Name              | Type              | Description               | Notes |
| ----------------- | ----------------- | ------------------------- | ----- |
| **createRoleDto** | **CreateRoleDto** | The data for the new role |       |

### Return type

**RoleResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **201**     | Role created successfully.              | -                |
| **400**     | Data invalid (e.g. roleCode duplicated) | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rolesControllerFindAll**

> Array<RoleResponseDto> rolesControllerFindAll()

### Example

```typescript
import { RolesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new RolesApi(configuration);

const { status, data } = await apiInstance.rolesControllerFindAll();
```

### Parameters

This endpoint does not have any parameters.

### Return type

**Array<RoleResponseDto>**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                              | Response headers |
| ----------- | ---------------------------------------- | ---------------- |
| **200**     | The list of roles in DTO response format | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rolesControllerFindOne**

> RoleResponseDto rolesControllerFindOne()

### Example

```typescript
import { RolesApi, Configuration } from './api';

const configuration = new Configuration();
const apiInstance = new RolesApi(configuration);

let id: number; //The unique identifier of the role in the database. (default to undefined)

const { status, data } = await apiInstance.rolesControllerFindOne(id);
```

### Parameters

| Name   | Type         | Description                                        | Notes                 |
| ------ | ------------ | -------------------------------------------------- | --------------------- |
| **id** | [**number**] | The unique identifier of the role in the database. | defaults to undefined |

### Return type

**RoleResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                        | Response headers |
| ----------- | -------------------------------------------------- | ---------------- |
| **200**     | The data of the role found in DTO response format. | -                |
| **404**     | Role not found or not valid.                       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **rolesControllerUpdate**

> RoleResponseDto rolesControllerUpdate(updateRoleDto)

### Example

```typescript
import { RolesApi, Configuration, UpdateRoleDto } from './api';

const configuration = new Configuration();
const apiInstance = new RolesApi(configuration);

let id: number; //The unique identifier of the role in the database. (default to undefined)
let updateRoleDto: UpdateRoleDto; //The new data for the role.

const { status, data } = await apiInstance.rolesControllerUpdate(id, updateRoleDto);
```

### Parameters

| Name              | Type              | Description                                        | Notes                 |
| ----------------- | ----------------- | -------------------------------------------------- | --------------------- |
| **updateRoleDto** | **UpdateRoleDto** | The new data for the role.                         |                       |
| **id**            | [**number**]      | The unique identifier of the role in the database. | defaults to undefined |

### Return type

**RoleResponseDto**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description                             | Response headers |
| ----------- | --------------------------------------- | ---------------- |
| **200**     | Role updated succesfully.               | -                |
| **400**     | Data invalid (e.g. roleCode duplicated) | -                |
| **404**     | Role not found or not valid.            | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
