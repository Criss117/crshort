import { describe, it, expect } from 'vitest';

import { filtersReducer, GroupBy } from '../filters.store';

const baseState = {
  query: 'test',
  group: GroupBy.active,
  tag: '',
};

describe('filtersReducer', () => {
  describe('tag actions', () => {
    it('should set tag value on set:tag action', () => {
      const next = filtersReducer(baseState, {
        type: 'set:tag',
        payload: 'react',
      });
      expect(next.tag).toBe('react');
      expect(next.query).toBe('test');
      expect(next.group).toBe('active');
    });

    it('should reset tag to empty string on reset:tag action', () => {
      const state = { ...baseState, tag: 'react' };
      const next = filtersReducer(state, { type: 'reset:tag' });
      expect(next.tag).toBe('');
      expect(next.query).toBe('test');
      expect(next.group).toBe('active');
    });

    it('should clear tag on global reset action', () => {
      const state = { ...baseState, tag: 'react' };
      const next = filtersReducer(state, { type: 'reset' });
      expect(next.tag).toBe('');
      expect(next.query).toBe('');
      expect(next.group).toBe('all');
    });

    it('should clear tag on reset:query action', () => {
      const state = { ...baseState, tag: 'react' };
      const next = filtersReducer(state, { type: 'reset:query' });
      expect(next.tag).toBe('');
      expect(next.query).toBe('');
      expect(next.group).toBe('all');
    });

    it('should preserve other state properties when setting tag', () => {
      const next = filtersReducer(baseState, {
        type: 'set:tag',
        payload: 'vue',
      });
      expect(next).toEqual({
        query: 'test',
        group: 'active',
        tag: 'vue',
      });
    });
  });
});
