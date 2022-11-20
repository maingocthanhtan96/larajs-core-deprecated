<template>
  <el-button type="primary" @click="visible = true">Dialog</el-button>
  <BaseDialog v-model="visible">
    <template #header>Dialog</template>
    Content in here
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button type="primary" @click="visible = false">Confirm</el-button>
      </span>
    </template>
  </BaseDialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
