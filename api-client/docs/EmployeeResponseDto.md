# EmployeeResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique employee identifier | [readonly] [default to undefined]
**fullName** | **string** | Employee full name | [default to undefined]
**employeeCode** | **string** | Unique employee code | [default to undefined]
**email** | **string** | Employee email address | [default to undefined]
**createdAt** | **string** | When the record was created | [default to undefined]
**deletedAt** | **string** | Soft-delete timestamp; null while the record is active | [default to undefined]

## Example

```typescript
import { EmployeeResponseDto } from './api';

const instance: EmployeeResponseDto = {
    id,
    fullName,
    employeeCode,
    email,
    createdAt,
    deletedAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
