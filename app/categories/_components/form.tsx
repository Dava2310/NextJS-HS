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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
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

import {
  createCategory,
  categoryFormSchema,
  categoriesQueryKey,
  updateCategory,
  type CategoryVM,
} from '../_logic';

type CategoryFormProps = {
  category?: CategoryVM;
  /** When set with onOpenChange, the dialog is controlled by the parent (e.g. row actions). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  readOnly?: boolean;
};

export function CategoryForm({
  category,
  open: openProp,
  onOpenChange,
  readOnly,
}: CategoryFormProps) {
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
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      code: category?.code ?? '',
      description: category?.description ?? '',
      name: category?.name ?? '',
    },
  });

  /**
   * Handles the onSubmit event for the form.
   * Calls the logic API function to create|update a Category.
   * @param data The data recoleted from the form.
   */
  function onSubmit(data: z.infer<typeof categoryFormSchema>) {
    if (!category) {
      toast.promise(createCategory(data), {
        duration: 3000,
        loading: 'Loading...',
        success: ({ message, newData }) => {
          queryClient.setQueryData<CategoryVM[]>(categoriesQueryKey, (prev) =>
            prev ? [...prev, newData] : [newData]
          );
          setOpenDialog(false);
          return message;
        },
        error: (error) => error.message,
      });
    } else {
      toast.promise(updateCategory(parseInt(category.id), data), {
        duration: 3000,
        loading: 'Cargando...',
        success: ({ message, updatedData }) => {
          queryClient.setQueryData<CategoryVM[]>(
            categoriesQueryKey,
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
        {!category && (
          <DialogTrigger asChild>
            <Button type="button" className="gap-2 shadow-sm">
              <PlusIcon data-icon="inline-start" />
              {category ? 'Update' : 'Create'} category
            </Button>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{category ? 'Update' : 'Create'} category</DialogTitle>
            <DialogDescription>Fill all the category neccesary information</DialogDescription>
          </DialogHeader>
          <div className="-mx-4 no-scrollbar max-h-[80vh] overflow-y-auto px-4">
            <Card>
              <CardContent>
                <form id="category-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="category-form-name">Category&#39;s Name</FieldLabel>
                          <Input
                            readOnly={readOnly}
                            {...field}
                            id="category-form-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Smartphones"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="code"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="category-form-code">Category Code</FieldLabel>
                          <Input
                            readOnly={readOnly}
                            {...field}
                            id="category-form-code"
                            aria-invalid={fieldState.invalid}
                            placeholder="cat-123456"
                            autoComplete="off"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="category-form-description">Description</FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="category-form-description"
                              placeholder="This is the asset's description category"
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
                    <Button type="submit" form="category-form">
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
