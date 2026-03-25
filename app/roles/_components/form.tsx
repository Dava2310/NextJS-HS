'use client';
import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { useCallback, useState } from 'react';

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

import { createRole, roleFormSchema, roleQueryKey, updateRole, type RoleVM } from '../_logic';

type RoleFormProps = {
  role?: RoleVM;
  /** When set with onOpenChange, the dialog is controlled by the parent (e.g. row actions). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  readOnly?: boolean;
};

export function RoleForm({ role, open: openProp, onOpenChange, readOnly }: RoleFormProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined && onOpenChange !== undefined;
  const openDialog = isControlled ? openProp : internalOpen;
  const setOpenDialog = useCallback(
    (next: boolean) => {
      if (isControlled) {
        onOpenChange(next);
      } else {
        setInternalOpen(next);
      }
    },
    [isControlled, onOpenChange]
  );

  const queryClient = useQueryClient();

  // Form definition
  const form = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      roleCode: role?.roleCode ?? '',
      description: role?.description ?? '',
      name: role?.name ?? '',
    },
  });

  function onSubmit(data: z.infer<typeof roleFormSchema>) {
    if (!role) {
      toast.promise(createRole(data), {
        duration: 3000,
        loading: 'Loading...',
        success: ({ message, newData }) => {
          queryClient.setQueryData<RoleVM[]>(roleQueryKey, (prev) =>
            prev ? [...prev, newData] : [newData]
          );
          setOpenDialog(false);
          return message;
        },
        error: (error) => error.message,
      });
    } else {
      toast.promise(updateRole(parseInt(role.id), data), {
        duration: 3000,
        loading: 'Loading...',
        success: ({ message, updatedData }) => {
          queryClient.setQueryData<RoleVM[]>(
            roleQueryKey,
            (prev) => prev?.map((e) => (e.id === updatedData.id ? updatedData : e)) ?? prev
          );
          setOpenDialog(false);
          return message;
        },
        error: (error) => error.message,
      });
    }
  }

  return (
    <div className="self-end">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {!role && (
          <DialogTrigger asChild>
            <Button type="button" className="gap-2 shadow-sm">
              <PlusIcon data-icon="inline-start" />
              {role ? 'Update' : 'Create'} role
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{role ? 'Update' : 'Create'} role</DialogTitle>
            <DialogDescription>Fill all the role neccesary information</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
            <Card>
              <CardContent>
                <form id="role-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="role-form-name">Role&#39;s Name</FieldLabel>
                          <Input
                            readOnly={readOnly}
                            {...field}
                            id="role-form-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Administrator"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="roleCode"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="role-form-code">Role Code</FieldLabel>
                          <Input
                            readOnly={readOnly}
                            {...field}
                            id="role-form-code"
                            aria-invalid={fieldState.invalid}
                            placeholder="administrator"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          <FieldDescription>Internal role code</FieldDescription>
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="role-form-description">Description</FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="role-form-description"
                              placeholder="This is the system administrator role"
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={fieldState.invalid}
                              readOnly={readOnly}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value.length}/100 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </form>
              </CardContent>
              {!readOnly && (
                <CardFooter>
                  <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                      Reset
                    </Button>
                    <Button type="submit" form="role-form">
                      Submit
                    </Button>
                  </Field>
                </CardFooter>
              )}
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
