import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    errors: {},
    loading: false,
  }),
  actions: {
    setErrors(errors: any) {
      this.errors = errors;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});