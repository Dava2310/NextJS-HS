import { Configuration, AppApi, EmployeesApi } from '@/api-client';
import { axiosInstance } from './axios';

const config = new Configuration({
  basePath: axiosInstance.defaults.baseURL,
});

export const apiClient = {
  app: new AppApi(config, undefined, axiosInstance),
  employees: new EmployeesApi(config, undefined, axiosInstance),
};
