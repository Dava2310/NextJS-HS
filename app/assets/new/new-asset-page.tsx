'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { toast } from 'sonner';

import { DashboardShell } from '@/components/dashboard-shell';
import { Button } from '@/components/ui/button';

import { CategoryVM, getCategories } from '@/app/categories/_logic';
import { EmployeeVM, getEmployees } from '@/app/employees/_logic';

import { AssetForm } from '../_components/form';

export function NewAssetPage() {
  const [categories, setCategories] = useState<CategoryVM[]>([]);
  const [employees, setEmployees] = useState<EmployeeVM[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(await getCategories());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error loading categories');
      }
    };
    const fetchEmployees = async () => {
      try {
        setEmployees(await getEmployees());
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error loading employees');
      }
    };
    void fetchCategories();
    void fetchEmployees();
  }, []);

  return (
    <DashboardShell title="New asset">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        <Button variant="ghost" size="sm" className="w-fit gap-2 px-0" asChild>
          <Link href="/assets">
            <ArrowLeftIcon className="size-4" aria-hidden />
            Back to assets
          </Link>
        </Button>
        <AssetForm categories={categories} employees={employees} />
      </div>
    </DashboardShell>
  );
}
