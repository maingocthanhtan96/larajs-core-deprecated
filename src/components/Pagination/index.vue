<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { scrollTo } from '@/utils';

export interface Props {
  total: number;
  page?: number;
  limit?: number;
  pageSizes?: number[];
  layout?: string;
  background?: boolean;
  autoScroll?: boolean;
  hidden?: boolean;
  scrollTo?: number;
}

const props = withDefaults(defineProps<Props>(), {
  page: 1,
  limit: 25,
  pageSizes: () => [10, 25, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false,
  scrollTo: 0,
});
const emit = defineEmits<{
  (e: 'pagination', data: any): void;
  (e: 'update:page', page: number): void;
  (e: 'update:limit', limit: number): void;
}>();
const currentPage = computed({
  get: () => props.page,
  set: val => emit('update:page', val),
});
const pageSize = computed({
  get: () => props.limit,
  set: val => emit('update:limit', val),
});
const handleSizeChange = (val: number) => {
  emit('pagination', { page: currentPage.value, limit: val });
  if (props.autoScroll) {
    scrollTo(props.scrollTo, 800);
  }
};
const handleCurrentChange = (val: number) => {
  emit('pagination', { page: val, limit: pageSize.value });
  if (props.autoScroll) {
    scrollTo(props.scrollTo, 800);
  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  display: flex;
  background: var(--bg-primary);
  padding: 2.6rem 0;
  overflow-x: auto;
  &.hidden {
    display: none;
  }
}
</style>
