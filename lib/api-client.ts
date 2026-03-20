import {
  Configuration,
  AppApi,
  EmployeesApi,
  RolesApi,
  AssetsApi,
  CategoriesApi,
} from '@/api-client';
import { axiosInstance } from './axios';

const config = new Configuration({
  basePath: axiosInstance.defaults.baseURL,
});

export const apiClient = {
  app: new AppApi(config, undefined, axiosInstance),
  employees: new EmployeesApi(config, undefined, axiosInstance),
  roles: new RolesApi(config, undefined, axiosInstance),
  assets: new AssetsApi(config, undefined, axiosInstance),
  categories: new CategoriesApi(config, undefined, axiosInstance),
};
