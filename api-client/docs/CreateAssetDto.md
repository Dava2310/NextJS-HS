# CreateAssetDto

## Properties

| Name            | Type       | Description                                            | Notes                  |
| --------------- | ---------- | ------------------------------------------------------ | ---------------------- |
| **name**        | **string** | Name of the asset                                      | [default to undefined] |
| **sku**         | **string** | Unique stock keeping unit (SKU) code for the asset     | [default to undefined] |
| **description** | **string** | Description of the asset                               | [default to undefined] |
| **model**       | **string** | Model of the asset                                     | [default to undefined] |
| **brand**       | **string** | Brand of the asset                                     | [default to undefined] |
| **categoryId**  | **number** | ID of the category this asset belongs to               | [default to undefined] |
| **employeeId**  | **number** | ID of the employee assigned as custodian of this asset | [default to undefined] |

## Example

```typescript
import { CreateAssetDto } from './api';

const instance: CreateAssetDto = {
  name,
  sku,
  description,
  model,
  brand,
  categoryId,
  employeeId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
