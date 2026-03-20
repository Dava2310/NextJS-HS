# CreateRoleDto

## Properties

| Name            | Type       | Description                               | Notes                  |
| --------------- | ---------- | ----------------------------------------- | ---------------------- |
| **roleCode**    | **string** | Unique role code in the application level | [default to undefined] |
| **name**        | **string** | Official name for the role in user level  | [default to undefined] |
| **description** | **string** | Description for the role in user level    | [default to undefined] |

## Example

```typescript
import { CreateRoleDto } from './api';

const instance: CreateRoleDto = {
  roleCode,
  name,
  description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
