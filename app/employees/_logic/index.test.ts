import { describe, it, expect } from 'vitest';
import { employeesFormSchema, toEmployeeVM } from './index';
import type { EmployeeResponseDto } from '@/api-client';

// ── Helpers ───────────────────────────────────────────────────────────────────

function validInput() {
  return {
    fullName: 'Jane Doe',
    employeeCode: 'EMP0000001',
    email: 'jane@example.com',
    password: 'secret99',
    roleId: '1',
  };
}

function makeDto(overrides: Partial<EmployeeResponseDto> = {}): EmployeeResponseDto {
  return {
    id: 1,
    fullName: 'Jane Doe',
    employeeCode: 'EMP0000001',
    email: 'jane@example.com',
    createdAt: '2025-01-01T00:00:00.000Z',
    deletedAt: null,
    ...overrides,
  } as EmployeeResponseDto;
}

// ── employeesFormSchema ───────────────────────────────────────────────────────

describe('employeesFormSchema', () => {
  describe('fullName', () => {
    it('rejects a name shorter than 2 characters', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), fullName: 'A' }).success).toBe(false);
    });

    it('rejects a name longer than 120 characters', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), fullName: 'A'.repeat(121) }).success
      ).toBe(false);
    });

    it('accepts names with accented characters', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), fullName: 'José García' }).success
      ).toBe(true);
    });

    it('accepts names with apostrophes, hyphens, and dots', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), fullName: "O'Brien-Smith Jr." }).success
      ).toBe(true);
    });

    it('rejects a name with digits', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), fullName: 'Jane123' }).success).toBe(
        false
      );
    });
  });

  describe('employeeCode', () => {
    it('accepts an exactly 10-character alphanumeric code', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), employeeCode: 'ABC1234567' }).success
      ).toBe(true);
    });

    it('rejects a code shorter than 10 characters', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), employeeCode: 'SHORT' }).success
      ).toBe(false);
    });

    it('rejects a code longer than 10 characters', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), employeeCode: 'TOOLONGCODE' }).success
      ).toBe(false);
    });

    it('rejects a code with special characters', () => {
      expect(
        employeesFormSchema.safeParse({ ...validInput(), employeeCode: 'ABC-123456' }).success
      ).toBe(false);
    });
  });

  describe('email', () => {
    it('rejects a missing @ symbol', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), email: 'notanemail' }).success).toBe(
        false
      );
    });

    it('rejects an empty email', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), email: '' }).success).toBe(false);
    });
  });

  describe('password', () => {
    it('accepts an empty password (update mode)', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), password: '' }).success).toBe(true);
    });

    it('accepts a password of 8 or more characters', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), password: '12345678' }).success).toBe(
        true
      );
    });

    it('rejects a password between 1 and 7 characters', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), password: 'short' }).success).toBe(
        false
      );
    });
  });

  describe('roleId', () => {
    it('accepts a positive numeric string', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), roleId: '2' }).success).toBe(true);
    });

    it('rejects an empty roleId', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), roleId: '' }).success).toBe(false);
    });

    it('rejects a non-numeric roleId', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), roleId: 'admin' }).success).toBe(
        false
      );
    });

    it('rejects zero', () => {
      expect(employeesFormSchema.safeParse({ ...validInput(), roleId: '0' }).success).toBe(false);
    });
  });
});

// ── toEmployeeVM ──────────────────────────────────────────────────────────────

describe('toEmployeeVM', () => {
  it('maps all fields from the DTO', () => {
    const vm = toEmployeeVM(makeDto());

    expect(vm.id).toBe('1');
    expect(vm.fullName).toBe('Jane Doe');
    expect(vm.employeeCode).toBe('EMP0000001');
    expect(vm.email).toBe('jane@example.com');
    expect(vm.createdAt).toBe('2025-01-01T00:00:00.000Z');
  });

  it('sets status to Active when deletedAt is null', () => {
    expect(toEmployeeVM(makeDto({ deletedAt: null })).status).toBe('Active');
  });

  it('sets status to Inactive when deletedAt is set', () => {
    expect(toEmployeeVM(makeDto({ deletedAt: '2025-06-01T00:00:00.000Z' })).status).toBe(
      'Inactive'
    );
  });
});
