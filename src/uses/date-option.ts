import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useDateOptions() {
  const { t } = useI18n();
  const shortcuts = computed(() => [
    {
      text: t('date.today'),
      value: () => {
        const start = new Date();
        return [start, start];
      },
    },
    {
      text: t('date.yesterday'),
      value: () => {
        const start = new Date();
        const end = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 - 86400);
        return [start, end];
      },
    },
    {
      text: t('date.this_week'),
      value: () => {
        const now = new Date();
        const start = now.getDate() - now.getDay() + 1; // First day is the day of the month - the day of the week
        const end = start + 6; // last day is the first day + 6
        return [new Date(now.setDate(start)), new Date(now.setDate(end))];
      },
    },
    {
      text: t('date.last_week'),
      value: () => {
        const now = new Date();
        const start = now.getDate() - now.getDay() - 7 + 1; // First day is the day of the month - the day of the week
        const end = now.getDate() - now.getDay(); // last day is the first day + 6
        return [new Date(now.setDate(start)), new Date(now.setDate(end))];
      },
    },
    {
      text: t('date.last_14_days'),
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
        return [start, end];
      },
    },
    {
      text: t('date.last_30_days'),
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        return [start, end];
      },
    },
    {
      text: t('date.this_month'),
      value: () => {
        const now = new Date();
        return [new Date(now.getFullYear(), now.getMonth(), 1), new Date(now.getFullYear(), now.getMonth() + 1, 0)];
      },
    },
    {
      text: t('date.last_month'),
      value: () => {
        const now = new Date();
        return [new Date(now.getFullYear(), now.getMonth() - 1, 1), new Date(now.getFullYear(), now.getMonth(), 0)];
      },
    },
    {
      text: t('date.last_3_months'),
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        return [start, end];
      },
    },
    {
      text: t('date.last_6_months'),
      value: () => {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
        return [start, end];
      },
    },
    {
      text: t('date.this_year'),
      value: () => {
        const now = new Date();
        return [new Date(now.getFullYear(), 0, 1), new Date(now.getFullYear(), 12, 0)];
      },
    },
  ]);

  return { shortcuts };
}
