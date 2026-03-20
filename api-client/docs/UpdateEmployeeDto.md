# UpdateEmployeeDto

## Properties

| Name             | Type       | Description                                  | Notes                             |
| ---------------- | ---------- | -------------------------------------------- | --------------------------------- |
| **fullName**     | **string** | Employee full name                           | [optional] [default to undefined] |
| **employeeCode** | **string** | Unique employee code (exactly 10 characters) | [optional] [default to undefined] |
| **email**        | **string** | Employee email address                       | [optional] [default to undefined] |
| **password**     | **string** | Employee password                            | [optional] [default to undefined] |

## Example

```typescript
import { UpdateEmployeeDto } from './api';

const instance: UpdateEmployeeDto = {
  fullName,
  employeeCode,
  email,
  password,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
