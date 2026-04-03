import { describe, it, expect } from 'vitest';
import { assetFormSchema, toAssetVM } from './index';
import type { AssetResponseDto } from '@/api-client';

// ── Helpers ───────────────────────────────────────────────────────────────────

function validInput() {
  return {
    name: 'ThinkPad X1',
    sku: 'TP-X1-001',
    description: 'Business ultrabook',
    model: 'X1 Carbon',
    brand: 'Lenovo',
    categoryId: '1',
    employeeId: '2',
  };
}

function makeDto(overrides: Partial<AssetResponseDto> = {}): AssetResponseDto {
  return {
    id: 1,
    name: 'ThinkPad X1',
    sku: 'TP-X1-001',
    description: 'Business ultrabook',
    model: 'X1 Carbon',
    brand: 'Lenovo',
    categoryId: 1,
    categoryName: 'Laptops',
    employeeId: 2,
    employeeName: 'Jane Doe',
    createdAt: '2025-01-01T00:00:00.000Z',
    deletedAt: null,
    ...overrides,
  } as AssetResponseDto;
}

// ── assetFormSchema ───────────────────────────────────────────────────────────

describe('assetFormSchema', () => {
  it('accepts a fully valid input', () => {
    expect(assetFormSchema.safeParse(validInput()).success).toBe(true);
  });

  describe('name', () => {
    it('rejects an empty name', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), name: '' }).success).toBe(false);
    });

    it('rejects a name longer than 255 characters', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), name: 'a'.repeat(256) }).success).toBe(
        false
      );
    });
  });

  describe('sku', () => {
    it('accepts alphanumeric with hyphens and underscores', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), sku: 'SKU_001-A' }).success).toBe(true);
    });

    it('rejects an empty SKU', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), sku: '' }).success).toBe(false);
    });

    it('rejects a SKU with spaces', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), sku: 'SKU 001' }).success).toBe(false);
    });

    it('rejects a SKU longer than 64 characters', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), sku: 'A'.repeat(65) }).success).toBe(
        false
      );
    });
  });

  describe('categoryId and employeeId', () => {
    it('rejects a non-numeric categoryId', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), categoryId: 'none' }).success).toBe(
        false
      );
    });

    it('rejects zero as employeeId', () => {
      expect(assetFormSchema.safeParse({ ...validInput(), employeeId: '0' }).success).toBe(false);
    });
  });

  describe('cross-field rules (superRefine)', () => {
    it('rejects when model and brand are identical (case-insensitive)', () => {
      const result = assetFormSchema.safeParse({
        ...validInput(),
        model: 'lenovo',
        brand: 'Lenovo',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.map((i) => i.path[0])).toContain('model');
      }
    });

    it('rejects when SKU compacted equals name compacted', () => {
      const result = assetFormSchema.safeParse({
        ...validInput(),
        name: 'ThinkPad',
        sku: 'Think-Pad',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.map((i) => i.path[0])).toContain('sku');
      }
    });
  });
});

// ── toAssetVM ─────────────────────────────────────────────────────────────────

describe('toAssetVM', () => {
  it('maps all fields from the DTO', () => {
    const vm = toAssetVM(makeDto());

    expect(vm.id).toBe('1');
    expect(vm.name).toBe('ThinkPad X1');
    expect(vm.sku).toBe('TP-X1-001');
    expect(vm.description).toBe('Business ultrabook');
    expect(vm.model).toBe('X1 Carbon');
    expect(vm.brand).toBe('Lenovo');
    expect(vm.categoryId).toBe('1');
    expect(vm.categoryName).toBe('Laptops');
    expect(vm.employeeId).toBe('2');
    expect(vm.employeeName).toBe('Jane Doe');
    expect(vm.createdAt).toBe('2025-01-01T00:00:00.000Z');
  });

  it('sets status to Active when deletedAt is null', () => {
    expect(toAssetVM(makeDto({ deletedAt: null })).status).toBe('Active');
  });

  it('sets status to Inactive when deletedAt is set', () => {
    expect(toAssetVM(makeDto({ deletedAt: '2025-06-01T00:00:00.000Z' })).status).toBe('Inactive');
  });

  it('sets employeeId to "0" when employeeId is null', () => {
    expect(toAssetVM(makeDto({ employeeId: null as unknown as number })).employeeId).toBe('0');
  });
});
