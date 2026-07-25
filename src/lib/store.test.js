import { beforeEach, describe, expect, it, vi } from 'vitest';
import { loadState, saveState } from './store';

describe('local storage helpers', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      data: {},
      getItem(key) {
        return this.data[key] || null;
      },
      setItem(key, value) {
        this.data[key] = value;
      }
    });
  });

  it('loads fallback when saved state is missing', () => {
    expect(loadState('missing', ['fallback'])).toEqual(['fallback']);
  });

  it('loads fallback when saved state is invalid json', () => {
    localStorage.data.broken = '{';
    expect(loadState('broken', { ok: true })).toEqual({ ok: true });
  });

  it('saves json state', () => {
    saveState('cart', [{ productId: 'shirt' }]);
    expect(JSON.parse(localStorage.data.cart)).toEqual([{ productId: 'shirt' }]);
  });
});
