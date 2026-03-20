'use client';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { createEmployee, employeesFormSchema, employeesQueryKey, type EmployeeVM } from '../_logic';

export function EmployeeForm() {
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  // Form definition
  const form = useForm<z.infer<typeof employeesFormSchema>>({
    resolver: zodResolver(employeesFormSchema),
    defaultValues: {
      email: '',
      employeeCode: '',
      fullName: '',
      password: '',
      roleId: '1',
    },
  });

  /**
   * Handles the onSubmit event for the form
   * Calls the logic API function to create an Employee
   */
  function onSubmit(data: z.infer<typeof employeesFormSchema>) {
    // Calling the API
    toast.promise(createEmployee({ ...data, roleId: parseInt(data.roleId) }), {
      duration: 3000,
      loading: 'Loading...',
      success: ({ message, newData }) => {
        queryClient.setQueryData<EmployeeVM[]>(employeesQueryKey, (prev) =>
          prev ? [...prev, newData] : [newData]
        );
        setOpenDialog(false);
        return message;
      },
      error: (error) => error.message,
    });
  }

  return (
    <div className="self-end">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button type="button" className="gap-2 shadow-sm">
            <PlusIcon data-icon="inline-start" />
            Create employee
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Employee</DialogTitle>
            <DialogDescription>Fill all the employee neccesary information</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
            <Card>
              <CardContent>
                <form id="employee-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="fullName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="employee-form-full-name">
                            Employee Full Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="employee-form-full-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Daniel Alberto Vetencourt Alvarez"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="employee-form-email">Email</FieldLabel>
                          <Input
                            {...field}
                            id="employee-form-email"
                            aria-invalid={fieldState.invalid}
                            placeholder="example@gmail.com"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          <FieldDescription>
                            Personal or corporative employee email
                          </FieldDescription>
                        </Field>
                      )}
                    />
                    <Controller
                      name="employeeCode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="employee-form-employee-code">
                            Employee Code
                          </FieldLabel>
                          <Input
                            {...field}
                            id="employee-form-employee-code"
                            aria-invalid={fieldState.invalid}
                            placeholder="ABCDE12345"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="employee-form-password">
                            Employee Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="employee-form-password"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            type="password"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="roleId"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="employee-form-role-id">Role ID</FieldLabel>
                          <Input
                            {...field}
                            id="employee-form-role-id"
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter>
                <Field orientation="horizontal">
                  <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Reset
                  </Button>
                  <Button type="submit" form="employee-form">
                    Submit
                  </Button>
                </Field>
              </CardFooter>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
