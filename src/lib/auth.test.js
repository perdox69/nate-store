import { describe, expect, it } from 'vitest';
import { createMemberAccount, loginMemberAccount } from './auth';

const accounts = [
  {
    id: 'MEM-1',
    name: 'Mali',
    email: 'mali@example.com',
    password: 'secret123'
  }
];

describe('auth helpers', () => {
  it('creates a new member account and returns a public member', () => {
    const result = createMemberAccount({
      accounts: [],
      name: 'Nara',
      email: 'nara@example.com',
      password: 'pass1234'
    });

    expect(result.accounts[0]).toMatchObject({ name: 'Nara', email: 'nara@example.com', password: 'pass1234' });
    expect(result.member).toMatchObject({ name: 'Nara', email: 'nara@example.com' });
    expect(result.member.password).toBeUndefined();
  });

  it('rejects duplicate registration emails', () => {
    expect(() =>
      createMemberAccount({
        accounts,
        name: 'Mali',
        email: 'mali@example.com',
        password: 'secret123'
      })
    ).toThrow('อีเมลนี้สมัครสมาชิกแล้ว');
  });

  it('logs in with matching email and password', () => {
    const member = loginMemberAccount({
      accounts,
      email: 'mali@example.com',
      password: 'secret123'
    });

    expect(member).toEqual({ id: 'MEM-1', name: 'Mali', email: 'mali@example.com' });
  });

  it('rejects wrong login credentials', () => {
    expect(() =>
      loginMemberAccount({
        accounts,
        email: 'mali@example.com',
        password: 'wrongpass'
      })
    ).toThrow('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  });
});
