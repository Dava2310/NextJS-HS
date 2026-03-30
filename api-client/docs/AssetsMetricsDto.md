# AssetsMetricsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**total** | **number** | Total number of non-deleted assets in the system | [default to undefined]
**availables** | **number** | Number of assets that are not assigned to any employee | [default to undefined]
**assigned** | **number** | Number of assets currently assigned to an employee | [default to undefined]
**disponibility** | **number** | Share of assets that are unassigned, as a percentage (0–100) | [default to undefined]
**popularCategory** | **string** | Name of the category that holds the most assets; N/A when there are no categories | [default to undefined]

## Example

```typescript
import { AssetsMetricsDto } from './api';

const instance: AssetsMetricsDto = {
    total,
    availables,
    assigned,
    disponibility,
    popularCategory,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
