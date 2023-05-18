<template>
  <div class="segmented-control">
    <div v-for="option in options" :key="option.value"
         @click="modelValue = option.value"
         :class="{'selected-option': modelValue === option.value}"
    >
      <vnode-render :content="option.label" />
    </div>
  </div>
</template>

<script lang="ts" setup generic="ModelValue = unknown">
import { VNodeChild } from 'vue';

defineProps<{
  options: { label: VNodeChild, value: ModelValue}[]
}>()

const modelValue = defineModel<ModelValue>();
</script>

<style lang="less">
.segmented-control {
  @primary-color: var(--el-color-primary, lightskyblue);
  display: flex;
  border: 2px solid @primary-color;
  border-radius: 8px;
  width: min-content;
  color: @primary-color;

  & > * {
    padding: 4px 8px;
  }

  .selected-option {
    color: white;
    background-color: @primary-color;
  }
}
</style>
