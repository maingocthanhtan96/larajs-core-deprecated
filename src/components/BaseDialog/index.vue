<script setup lang="tsx">
import { useWindowSize } from '@vueuse/core';
import { screen } from '@larajs/core';
import { useSlots, useAttrs, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['update:modelValue']);
const { width } = useWindowSize();
const slots = useSlots();
const attrs = useAttrs();

const dialogVisibleComputed = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const Dialog = () => (
  <el-dialog v-model={dialogVisibleComputed.value} fullscreen={width.value <= screen.xs} {...attrs}>
    {{
      header: () => slots.header?.(),
      default: () => slots.default?.(),
      footer: () => slots.footer?.(),
    }}
  </el-dialog>
);
</script>

<template>
  <Dialog />
</template>
