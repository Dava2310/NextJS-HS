# AssetResponseDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique asset identifier | [readonly] [default to undefined]
**sku** | **string** | Unique stock keeping unit (SKU) code for the asset | [default to undefined]
**name** | **string** | Name of the asset | [default to undefined]
**description** | **string** | Description of the asset | [default to undefined]
**model** | **string** | Model of the asset | [default to undefined]
**brand** | **string** | Brand of the asset | [default to undefined]
**categoryId** | **number** | Category identifier (foreign key) | [default to undefined]
**employeeId** | **number** | Employee identifier (foreign key) - assigned custodian | [default to undefined]
**createdAt** | **string** | When the record was created | [default to undefined]
**deletedAt** | **string** | Soft-delete timestamp; null while the record is active | [default to undefined]
**categoryName** | **string** |  | [default to undefined]
**employeeName** | **string** |  | [default to undefined]

## Example

```typescript
import { AssetResponseDto } from './api';

const instance: AssetResponseDto = {
    id,
    sku,
    name,
    description,
    model,
    brand,
    categoryId,
    employeeId,
    createdAt,
    deletedAt,
    categoryName,
    employeeName,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
