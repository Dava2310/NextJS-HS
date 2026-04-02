import type { Metadata } from 'next';

import { EmployeesPage } from './employees-page';

export const metadata: Metadata = {
  title: 'Employees',
};

export default function EmployeesRoute() {
  return <EmployeesPage />;
}
