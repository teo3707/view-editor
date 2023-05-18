<template>
  <div :class="isPreview ? 'preview-main' : 'main'">
    <el-card>
      <el-tag v-for="WidgetClass in rootWidget.widgets"
              @click="addWidget(new WidgetClass())"
              size="large"
              class="addable-widget"
      >
        <vnode-render :content="new WidgetClass().getLabel()"/>
      </el-tag>
    </el-card>

    <div class="simulator-phone">
      <div class="simulator-phone-content">
        <div v-for="widget in widgets" :key="widget.id"
             @click="currentEditWidget = widget"
             class="preview-widget"
        >
          <vnode-render :content="widget.render()"/>
        </div>
      </div>
    </div>

    <el-card>
      <el-form v-if="currentEditWidget" class="configurable-fields">
        <div v-for="field in currentEditWidget.fields" :key="field.id">
          <Field :render="field.render.bind(field)" v-model="field.model"/>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { Context, RootWidget, Widget } from '@/types';
import {
  defineComponent,
  getCurrentInstance,
  inject,
  Ref,
  ref,
  watch,
} from 'vue';
import { CONTEXT_SYMBOL } from '@/index';

const Field = defineComponent((props, ctx) => {
  return () => ctx.attrs.render(ctx.attrs)
});

defineProps<{
  rootWidget: RootWidget
}>();

const ctx = inject<Context>(CONTEXT_SYMBOL);

const currentEditWidget: Ref<Widget> = ref(null);

watch(() => currentEditWidget.value?.fields.map(f => f.model), () => {
  instance.proxy.$forceUpdate();
})

const widgets = defineModel<Widget[]>({ default: [] });

const instance = getCurrentInstance();
const addWidget = (widget: Widget) => {
  widgets.value.push(widget);
  currentEditWidget.value = widget;
  instance.proxy.$forceUpdate();
}

const isPreview = ctx.type === 'preview';

</script>

<style lang="less">
.main {
  width: 100%;
  height: 100%;
}

.preview-main {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr max-content 1fr;

  & > * {
    margin: 12px;
    height: min-content;
    &:nth-of-type(2) {

    }
  }
}

.simulator-phone {
  @phone-border-height: 36px;
  @phone-border-width: 12px;
  position: relative;
  padding: @phone-border-height @phone-border-width;
  border: 1px solid black;
  border-radius: 16px;
  background-color: black;

  &:after {
    @home-btn-size: 18px;
    content: '';
    position: absolute;
    width: @home-btn-size;
    height: @home-btn-size;
    left: 0;
    right: 0;
    bottom: calc((@phone-border-height - @home-btn-size) / 2);
    margin: auto;
    background-color: black;
    border: 2px solid silver;
    border-radius: 50%;
  }

  .simulator-phone-content {
    position: relative; // 部件定位的父元素
    width: 375px;
    height: 667px;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
  }
}

.configurable-fields {
  display: grid;
  gap: 12px;
  font-size: 16px;
}

.addable-widget {
  cursor: pointer;
}

.preview-widget {
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border: 1px dotted var(--el-color-primary);
  }
}
</style>
