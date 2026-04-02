import { describe, it, expect } from 'vitest';
import { categoryFormSchema, toCategoryVM, toCategoryVMList } from './index';
import type { CategoryResponseDto } from '@/api-client';

// ── Helpers ───────────────────────────────────────────────────────────────────

function validInput() {
  return { name: 'Laptops', code: 'lap-001', description: 'Portable computers' };
}

function makeDto(overrides: Partial<CategoryResponseDto> = {}): CategoryResponseDto {
  return {
    id: 1,
    name: 'Laptops',
    code: 'lap-001',
    description: 'Portable computers',
    createdAt: '2025-01-01T00:00:00.000Z',
    deletedAt: null,
    ...overrides,
  } as CategoryResponseDto;
}

// ── categoryFormSchema ────────────────────────────────────────────────────────

describe('categoryFormSchema', () => {
  describe('name', () => {
    it('rejects an empty name', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), name: '' }).success).toBe(false);
    });

    it('rejects a name longer than 100 characters', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), name: 'a'.repeat(101) }).success).toBe(
        false
      );
    });

    it('accepts a name of exactly 100 characters', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), name: 'a'.repeat(100) }).success).toBe(
        true
      );
    });
  });

  describe('code', () => {
    it('accepts a simple alphanumeric code', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'ABC123' }).success).toBe(true);
    });

    it('accepts a hyphen-separated code', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'cat-001' }).success).toBe(true);
    });

    it('rejects an empty code', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: '' }).success).toBe(false);
    });

    it('rejects a code longer than 32 characters', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'a'.repeat(33) }).success).toBe(
        false
      );
    });

    it('rejects a code with spaces', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'cat 001' }).success).toBe(
        false
      );
    });

    it('rejects a code with a leading hyphen', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: '-cat' }).success).toBe(false);
    });

    it('rejects a code with a trailing hyphen', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'cat-' }).success).toBe(false);
    });

    it('rejects a code with consecutive hyphens', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), code: 'cat--001' }).success).toBe(
        false
      );
    });
  });

  describe('description', () => {
    it('rejects an empty description', () => {
      expect(categoryFormSchema.safeParse({ ...validInput(), description: '' }).success).toBe(
        false
      );
    });

    it('rejects a description longer than 100 characters', () => {
      expect(
        categoryFormSchema.safeParse({ ...validInput(), description: 'a'.repeat(101) }).success
      ).toBe(false);
    });

    it('accepts a description of exactly 100 characters', () => {
      expect(
        categoryFormSchema.safeParse({ ...validInput(), description: 'a'.repeat(100) }).success
      ).toBe(true);
    });
  });
});

// ── toCategoryVM ──────────────────────────────────────────────────────────────

describe('toCategoryVM', () => {
  it('maps all fields from the DTO', () => {
    const vm = toCategoryVM(makeDto());

    expect(vm.id).toBe('1');
    expect(vm.name).toBe('Laptops');
    expect(vm.code).toBe('lap-001');
    expect(vm.description).toBe('Portable computers');
    expect(vm.createdAt).toBe('2025-01-01T00:00:00.000Z');
  });

  it('sets status to Active when deletedAt is null', () => {
    expect(toCategoryVM(makeDto({ deletedAt: null })).status).toBe('Active');
  });

  it('sets status to Inactive when deletedAt is set', () => {
    expect(toCategoryVM(makeDto({ deletedAt: '2025-06-01T00:00:00.000Z' })).status).toBe(
      'Inactive'
    );
  });
});

// ── toCategoryVMList ──────────────────────────────────────────────────────────

describe('toCategoryVMList', () => {
  it('maps every DTO in the list', () => {
    const vms = toCategoryVMList([makeDto({ id: 1 }), makeDto({ id: 2, name: 'Monitors' })]);

    expect(vms).toHaveLength(2);
    expect(vms[0].id).toBe('1');
    expect(vms[1].name).toBe('Monitors');
  });

  it('returns an empty array for an empty input', () => {
    expect(toCategoryVMList([])).toEqual([]);
  });
});
