<template>
  <div class="triple-wrapper">
    <div class="triple-container">
      <el-input v-model="preText" placeholder="请输入前文字" style="width: 35%" />
      <el-input-number :min="1" :max="1000" v-model="num"  placeholder="请输入基础数字" />
      <el-input v-model="appendText" placeholder="请输入后文字" style="width: 35%" />
    </div>
    <p class="triple-tip">数字为基础数据，根据表单提交数自动更新</p>
    <el-radio-group v-model="radio1" class="ml-4">
      <el-radio label="1" size="large">增加</el-radio>
      <el-radio label="2" size="large">减少</el-radio>
    </el-radio-group>
    <p class="triple-tip" v-if="radio1 === '1'">增加：基础数据增加实际值。</p>
    <p class="triple-tip" v-else>倒序：基础数据减少实际值。</p>
  </div>
</template>

<script lang="ts" setup generic="ModelValue = unknown">
import {ref, watch} from 'vue';
const num = ref<number>(100);
const preText = ref<string>('目前已有');
const appendText = ref<string>('人参与活动');
const radio1 = ref<string>('1');

let modelValue = defineModel<ModelValue>();

watch(radio1, value => {
  console.log('10101010101010', value);
    if (value === '2') {
      preText.value = '目前仅剩';
      appendText.value = '优惠券';
    } else {
      preText.value = '目前已有';
      appendText.value = '人参与活动';
    }
})

watch(preText, value => {
  modelValue.value = [ value, num.value, appendText.value ];
}, { immediate: true });

watch(num, value => {
  modelValue.value = [ preText.value, value, appendText.value ];
}, { immediate: true });

watch(appendText, value => {
  modelValue.value = [ preText.value, num.value, value ];
}, { immediate: true });

</script>

<style lang="less" scoped>
 .triple-wrapper {

   .triple-container {
     display: flex;
     align-items: center;
   }

   .triple-tip {
     margin: 0.5rem 0;
     color: #999;
     font-size: var(--el-font-size-small)
   }

 }
</style>
