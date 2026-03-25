'use client';

import { useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Cpu, FileText, FolderTree, Hash, Package, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

import { assetFormSchema, assetsQueryKey, createAsset, updateAsset, type AssetVM } from '../_logic';

type AssetFormProps = {
  asset?: AssetVM;
  readOnly?: boolean;
};

function toCreatePayload(data: z.infer<typeof assetFormSchema>) {
  return {
    name: data.name,
    sku: data.sku,
    description: data.description,
    model: data.model,
    brand: data.brand,
    categoryId: parseInt(data.categoryId, 10),
    employeeId: parseInt(data.employeeId, 10),
  };
}

export function AssetForm({ asset, readOnly }: AssetFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof assetFormSchema>>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: asset?.name ?? '',
      sku: asset?.sku ?? '',
      description: asset?.description ?? '',
      model: asset?.model ?? '',
      brand: asset?.brand ?? '',
      categoryId: asset?.categoryId ?? '',
      employeeId: asset?.employeeId ?? '',
    },
  });

  const headline = readOnly ? 'View asset' : asset ? 'Update asset' : 'Create asset';
  const subtitle = readOnly
    ? 'Asset details (read-only).'
    : 'Fill in the details below to register or update an asset.';

  function onSubmit(data: z.infer<typeof assetFormSchema>) {
    const payload = toCreatePayload(data);

    if (!asset) {
      toast.promise(createAsset(payload), {
        duration: 3000,
        loading: 'Loading...',
        success: ({ message, newData }) => {
          queryClient.setQueryData<AssetVM[]>(assetsQueryKey, (prev) =>
            prev ? [...prev, newData] : [newData]
          );
          router.push('/assets');
          return message;
        },
        error: (error) => error.message,
      });
    } else {
      toast.promise(updateAsset(parseInt(asset.id, 10), payload), {
        duration: 3000,
        loading: 'Loading...',
        success: ({ message, updatedData }) => {
          queryClient.setQueryData<AssetVM[]>(
            assetsQueryKey,
            (prev) => prev?.map((a) => (a.id === updatedData.id ? updatedData : a)) ?? prev
          );
          router.push('/assets');
          return message;
        },
        error: (error) => error.message,
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{headline}</h1>
        <p className="text-muted-foreground text-sm">{subtitle}</p>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package className="size-5 text-muted-foreground" aria-hidden />
            Asset information
          </CardTitle>
          <CardDescription>Fields marked as required are validated before submit.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form id="asset-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-name">Name</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <Package className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="MacBook Pro 14"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="sku"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-sku">SKU</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <Hash className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-sku"
                        aria-invalid={fieldState.invalid}
                        placeholder="LAPTOP-MBP14-001"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-description">Description</FieldLabel>
                    <InputGroup className="min-h-32">
                      <InputGroupAddon align="block-start">
                        <FileText className="text-muted-foreground" aria-hidden />
                        <InputGroupText>Long-form notes</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupTextarea
                        {...field}
                        id="asset-form-description"
                        placeholder="Condition, location, or other notes"
                        rows={5}
                        className="min-h-24"
                        aria-invalid={fieldState.invalid}
                        readOnly={readOnly}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/500 characters
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="model"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-model">Model</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <Cpu className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-model"
                        aria-invalid={fieldState.invalid}
                        placeholder="A2992"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="brand"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-brand">Brand</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <Building2 className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-brand"
                        aria-invalid={fieldState.invalid}
                        placeholder="Apple"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-category-id">Category ID</FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <FolderTree className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-category-id"
                        aria-invalid={fieldState.invalid}
                        placeholder="1"
                        inputMode="numeric"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    <FieldDescription>ID of the category this asset belongs to</FieldDescription>
                  </Field>
                )}
              />
              <Controller
                name="employeeId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="asset-form-employee-id">
                      Custodian (employee ID)
                    </FieldLabel>
                    <InputGroup className="h-10">
                      <InputGroupAddon align="inline-start">
                        <UserRound className="text-muted-foreground" aria-hidden />
                      </InputGroupAddon>
                      <InputGroupInput
                        readOnly={readOnly}
                        {...field}
                        id="asset-form-employee-id"
                        aria-invalid={fieldState.invalid}
                        placeholder="1"
                        inputMode="numeric"
                        autoComplete="off"
                      />
                    </InputGroup>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    <FieldDescription>
                      ID of the employee responsible for this asset
                    </FieldDescription>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        {!readOnly && (
          <CardFooter className="border-t">
            <Field orientation="horizontal" className="w-full justify-end">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Reset
              </Button>
              <Button type="submit" form="asset-form">
                Submit
              </Button>
            </Field>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
