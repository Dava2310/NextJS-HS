# UpdateAssetDto

## Properties

| Name            | Type       | Description                                            | Notes                             |
| --------------- | ---------- | ------------------------------------------------------ | --------------------------------- |
| **name**        | **string** | Name of the asset                                      | [optional] [default to undefined] |
| **sku**         | **string** | Unique stock keeping unit (SKU) code for the asset     | [optional] [default to undefined] |
| **description** | **string** | Description of the asset                               | [optional] [default to undefined] |
| **model**       | **string** | Model of the asset                                     | [optional] [default to undefined] |
| **brand**       | **string** | Brand of the asset                                     | [optional] [default to undefined] |
| **categoryId**  | **number** | ID of the category this asset belongs to               | [optional] [default to undefined] |
| **employeeId**  | **number** | ID of the employee assigned as custodian of this asset | [optional] [default to undefined] |

## Example

```typescript
import { UpdateAssetDto } from './api';

const instance: UpdateAssetDto = {
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
