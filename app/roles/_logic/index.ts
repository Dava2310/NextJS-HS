import { CreateRoleDto, RoleResponseDto, UpdateRoleDto } from '@/api-client';
import { apiClient } from '@/lib/api-client';
import { throwError } from '@/lib/error-utils';

// --- 1. TYPES (VM) ---
/**
 * Defines the view model for the Role Entity in the Frontend.
 */
export interface RoleVM {
  id: string;
  roleCode: string;
  name: string;
  description: string;
}

// --- 2. MAPPERS ---
/**
 * Maps an object in DTO response format of RoleResponseDto to RoleVM format.
 * @param dto The DTO from the API.
 * @returns The object in view model format for the frontend.
 */
export const toRoleVM = (dto: RoleResponseDto): RoleVM => ({
  id: dto.id.toString(),
  description: dto.description,
  name: dto.name,
  roleCode: dto.roleCode,
});

/**
 * Maps a list of DTOs response format of RoleResponseDTO[] to RoleVM[] format.
 * @param dtos The list of DTOs from the API.
 * @returns The list of objects in view model format for the frontend
 */
export const toRoleVMList = (dtos: RoleResponseDto[]): RoleVM[] => dtos.map(toRoleVM);

// --- 3. API CALLS ---
export const getRoles = async (): Promise<RoleVM[]> => {
  try {
    const response = await apiClient.roles.rolesControllerFindAll();
    return toRoleVMList(response.data);
  } catch (error) {
    throwError(error, 'There was an error getting the list of roles.');
  }
};

export const getRole = async (id: number): Promise<RoleVM> => {
  try {
    const response = await apiClient.roles.rolesControllerFindOne({ id });
    return toRoleVM(response.data);
  } catch (error) {
    throwError(error, 'There was an error getting the data from the role.');
  }
};

export const createRole = async (
  data: CreateRoleDto
): Promise<{ message: string; newData: RoleVM }> => {
  try {
    const response = await apiClient.roles.rolesControllerCreate({ createRoleDto: data });

    // 1. Mapping the new data returned
    const newData = toRoleVM(response.data);

    // 2. Returning the new data and a general message
    return {
      message: 'Role created successfully.',
      newData,
    };
  } catch (error) {
    throwError(error, 'There was an error creating the role.');
  }
};

export const updateRole = async (
  id: number,
  data: UpdateRoleDto
): Promise<{ message: string; updatedData: RoleVM }> => {
  try {
    const response = await apiClient.roles.rolesControllerUpdate({ id, updateRoleDto: data });

    // 1. Mapping the updated data returned
    const updatedData = toRoleVM(response.data);

    // 2. Returning the updated data and a general message
    return {
      message: 'Role updated succcessfully.',
      updatedData,
    };
  } catch (error) {
    throwError(error, 'There was an error updating the role.');
  }
};
