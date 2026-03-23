# CreateEmployeeDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**fullName** | **string** | Employee full name | [default to undefined]
**employeeCode** | **string** | Unique employee code (exactly 10 characters) | [default to undefined]
**email** | **string** | Employee email address | [default to undefined]
**password** | **string** | Employee password | [default to undefined]
**roleId** | **number** | Role identifier (foreign key) | [default to undefined]

## Example

```typescript
import { CreateEmployeeDto } from './api';

const instance: CreateEmployeeDto = {
    fullName,
    employeeCode,
    email,
    password,
    roleId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
