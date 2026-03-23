import { CreateEmployeeDto, EmployeeResponseDto, UpdateEmployeeDto } from '@/api-client';
import { apiClient } from '@/lib/api-client';
import { throwError } from '@/lib/error-utils';
import * as z from 'zod';

// --- 1. TYPES (VM) ---
/**
 * Defines the view model for the Employee entity in the Frontend.
 */
export interface EmployeeVM {
  id: string;
  fullName: string;
  employeeCode: string;
  email: string;
  status: 'Active' | 'Inactive';
}

// --- 2. MAPPERS ---
/**
 * Maps an object in DTO response format of EmployeeResponseDto to EmployeeVM format.
 * @param dto The DTO from the API.
 * @returns The object in view model format for the frontend.
 */
export const toEmployeeVM = (dto: EmployeeResponseDto): EmployeeVM => ({
  id: dto.id.toString(),
  email: dto.email,
  employeeCode: dto.employeeCode,
  fullName: dto.fullName,
  status: 'Active',
});

/**
 * Maps a list of DTOs response format of EmployeeResponseDTO[] to EmployeeVM[] format.
 * @param dtos The list of DTOs from the API.
 * @returns The list of objects in view model format for the frontend
 */
export const toEmployeeVMList = (dtos: EmployeeResponseDto[]): EmployeeVM[] =>
  dtos.map(toEmployeeVM);

// --- 3. API CALLS ---
/** React Query key for the employees list — keep in sync with consumers. */
export const employeesQueryKey = ['employees'] as const;

export const getEmployees = async (): Promise<EmployeeVM[]> => {
  try {
    const response = await apiClient.employees.employeesControllerFindAll();
    return toEmployeeVMList(response.data);
  } catch (error) {
    throwError(error, 'There was an error getting the list of employees.');
  }
};

export const getEmployee = async (id: number): Promise<EmployeeVM> => {
  try {
    const response = await apiClient.employees.employeesControllerFindOne({ id });
    return toEmployeeVM(response.data);
  } catch (error) {
    throwError(error, 'There was an error getting the data from the employee.');
  }
};

export const createEmployee = async (
  data: CreateEmployeeDto
): Promise<{ message: string; newData: EmployeeVM }> => {
  try {
    const response = await apiClient.employees.employeesControllerCreate({
      createEmployeeDto: data,
    });

    // 1. Mapping the new data returned
    const newData = toEmployeeVM(response.data);

    // 2. Returning the new data and a general message
    return {
      message: 'Employee created succesfully.',
      newData,
    };
  } catch (error) {
    throwError(error, 'There was an error creating the new employee.');
  }
};

export const updateEmployee = async (
  id: number,
  data: UpdateEmployeeDto
): Promise<{ message: string; updatedData: EmployeeVM }> => {
  try {
    const response = await apiClient.employees.employeesControllerUpdate({
      updateEmployeeDto: data,
      id,
    });

    // 1. Mapping the updated data returned
    const updatedData = toEmployeeVM(response.data);

    // 2. Returning the updated data an a general message
    return {
      message: 'Employee updated succesfully.',
      updatedData,
    };
  } catch (error) {
    throwError(error, 'There was an error updating the employee.');
  }
};

export const deleteEmployee = async (id: number): Promise<string> => {
  try {
    const response = await apiClient.employees.employeesControllerRemove({ id });
    return response.data.message;
  } catch (error) {
    throwError(error, 'There was an error deleting the employee.');
  }
};

// --- 4. FORMS SCHEMAS ---
export const employeesFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(120, 'Full name must be at most 120 characters')
    .regex(/^[\p{L}\p{M}\s'.-]+$/u, "Full name may only contain letters, spaces, and . ' -"),
  employeeCode: z
    .string()
    .trim()
    .length(10, 'Employee code must be exactly 10 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Employee code may only contain letters and numbers'),
  email: z.string().trim().pipe(z.email('Enter a valid email address')),
  password: z
    .string()
    .refine(
      (s) => s.length === 0 || s.length >= 8,
      'Password must be at least 8 characters when provided'
    ),
  roleId: z
    .string()
    .trim()
    .min(1, 'Role is required')
    .regex(/^\d+$/, 'Role must be a valid selection')
    .refine((v) => parseInt(v, 10) > 0, 'Role must be a valid selection'),
});
