# RoleResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**roleCode** | **string** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**createdAt** | **string** | When the record was created | [default to undefined]
**deletedAt** | **string** | Soft-delete timestamp; null while the record is active | [default to undefined]

## Example

```typescript
import { RoleResponseDto } from './api';

const instance: RoleResponseDto = {
    id,
    roleCode,
    name,
    description,
    createdAt,
    deletedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
