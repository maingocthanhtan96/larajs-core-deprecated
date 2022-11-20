<template>
  <VueHoverMask>
    <div style="width: 100px; height: 100px">
      <img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        style="object-fit: cover; max-width: 100%; height: 100%"
        alt=""
      />
    </div>
    <template #action>
      <el-button :icon="Delete" type="danger" />
    </template>
  </VueHoverMask>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue';
</script>
