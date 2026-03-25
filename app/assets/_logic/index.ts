import { CreateAssetDto, AssetResponseDto, UpdateAssetDto } from '@/api-client';
import { apiClient } from '@/lib/api-client';
import { throwError } from '@/lib/error-utils';
import * as z from 'zod';

// --- 1. TYPES (VM) ---
/**
 * Defines the view model for the Asset entity in the Frontend.
 */
export interface AssetVM {
  id: string;
  sku: string;
  name: string;
  description: string;
  model: string;
  brand: string;
  categoryId: string;
  employeeId: string;
  status: 'Active' | 'Inactive';
}

// --- 2. MAPPERS ---
/**
 * Maps an object in DTO response format of AssetResponseDto to AssetVM format.
 * @param dto The DTO from the API.
 * @returns The object in view model format for the frontend.
 */
export const toAssetVM = (dto: AssetResponseDto): AssetVM => ({
  id: dto.id.toString(),
  brand: dto.brand,
  categoryId: dto.categoryId.toString(),
  description: dto.description,
  employeeId: dto.employeeId.toString(),
  model: dto.model,
  name: dto.name,
  sku: dto.sku,
  status: 'Active',
});

/**
 * Maps a list of DTOs response format of AssetResponseDTO[] to AssetVM[] format.
 * @param dtos The list of DTOs from the API.
 * @returns The list of objects in view model format for the frontend
 */
export const toAssetVMList = (dtos: AssetResponseDto[]): AssetVM[] => dtos.map(toAssetVM);

// --- 3. API CALLS ---
/** React Query key for the assets list — keep in sync with consumers. */
export const assetsQueryKey = ['assets'] as const;

export const getAssets = async (): Promise<AssetVM[]> => {
  try {
    const response = await apiClient.assets.assetsControllerFindAll();
    return toAssetVMList(response.data);
  } catch (error) {
    throwError(error, 'There was an error getting the list of assets.');
  }
};

export const getAsset = async (id: number): Promise<AssetVM> => {
  try {
    const response = await apiClient.assets.assetsControllerFindOne({ id });
    return toAssetVM(response.data);
  } catch (error) {
    console.error(error);
    throwError(error, 'There was an error getting the data from the asset.');
  }
};

export const createAsset = async (
  data: CreateAssetDto
): Promise<{ message: string; newData: AssetVM }> => {
  try {
    const response = await apiClient.assets.assetsControllerCreate({ createAssetDto: data });

    // 1. Mapping the new data returned
    const newData = toAssetVM(response.data);

    // 2. Returning the new data and a general message
    return {
      message: 'Asset created successfully.',
      newData,
    };
  } catch (error) {
    throwError(error, 'There was an error creating the asset.');
  }
};

export const updateAsset = async (
  id: number,
  data: UpdateAssetDto
): Promise<{ message: string; updatedData: AssetVM }> => {
  try {
    const response = await apiClient.assets.assetsControllerUpdate({ id, updateAssetDto: data });

    // 1. Mapping the updated data returned
    const updatedData = toAssetVM(response.data);

    // 2. Returning the updated data and a general message
    return {
      message: 'Asset updated successfully.',
      updatedData,
    };
  } catch (error) {
    throwError(error, 'There was an error updating the asset.');
  }
};

export const deleteAsset = async (id: number): Promise<string> => {
  try {
    const response = await apiClient.assets.assetsControllerRemove({ id });
    return response.data.message;
  } catch (error) {
    throwError(error, 'There was an error deleting the asset.');
  }
};

// --- 4. FORMS SCHEMAS ---
/** Matches CreateAssetDto: IDs stay as strings for selects; parse with `parseInt` on submit. */
const requiredTrimmedString = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be at most ${max} characters`);

const positiveIdString = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .regex(/^\d+$/, `${label} must be a valid selection`)
    .refine((v) => parseInt(v, 10) > 0, `${label} must be a valid selection`);

export const assetFormSchema = z
  .object({
    name: requiredTrimmedString('Name', 255),
    sku: z
      .string()
      .trim()
      .min(1, 'SKU is required')
      .max(64, 'SKU must be at most 64 characters')
      .refine((s) => !/\s/.test(s), 'SKU cannot contain spaces')
      .regex(
        /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/,
        'SKU may only use letters, numbers, hyphens, and underscores'
      ),
    description: requiredTrimmedString('Description', 500),
    model: requiredTrimmedString('Model', 120),
    brand: requiredTrimmedString('Brand', 120),
    categoryId: positiveIdString('Category'),
    employeeId: positiveIdString('Custodian'),
  })
  .superRefine((data, ctx) => {
    if (data.model.toLowerCase() === data.brand.toLowerCase()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Model and brand must differ',
        path: ['model'],
      });
    }
    const skuCompact = data.sku.replace(/[-_]/g, '').toLowerCase();
    const nameCompact = data.name.replace(/\s+/g, '').toLowerCase();
    if (skuCompact.length > 0 && skuCompact === nameCompact) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'SKU must not match the asset name',
        path: ['sku'],
      });
    }
  });
