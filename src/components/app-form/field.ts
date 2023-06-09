import { h, VNodeChild } from 'vue';
import { uuid } from '@/utils';
import { ElCol, ElInput, ElRow, ElSlider, ElColorPicker, ElRadioGroup, ElRadio } from 'element-plus';
import SegmentedControl from '@/components/segmented-control.vue';
import ImagePicker from '@/components/image-picker.vue';
import TripleInput from '@/components/triple-input.vue'

/**
 * 可以编辑的字段通过v-model绑定，变更时更新预览视图
 */
export interface FieldProps<Value = unknown> {
  modelValue: Value
  'onUpdate:modelValue'(newValue: Value): void
}

type InputRender<ModelValue=unknown> = (modelProps: FieldProps<ModelValue>) => VNodeChild

/**
 * 可以编辑的字段配置
 */
export interface Field<Value=unknown> {
  id: string

  /**
   * 显示的label
   */
  getLabel(): VNodeChild

  /**
   * 渲染可以编辑的属性
   * @param props
   */
  render: InputRender<Value>

  /**
   * v-model的值，简单的绑定在对象上，方面获取
   */
  model: Value
}



abstract class LabeledField<ModelValue = unknown> implements Field {
  id: string;
  label: VNodeChild
  inputRender: InputRender<ModelValue>
  model: ModelValue

  protected constructor(label: VNodeChild, inputRender: InputRender<ModelValue>) {
    this.id = uuid('labeled_field');
    this.label = label;
    this.inputRender = inputRender;
    this.getLabel = this.getLabel.bind(this);
  }

  getLabel(): VNodeChild {
    return this.label;
  }

  render(props: FieldProps<ModelValue>): VNodeChild {
    return h(ElRow, {
      gutter: 10,
      align: 'middle',
    }, [
      h(ElCol, { span: this.label ? 6 : 0 }, this.getLabel),
      h(ElCol, { span: this.label ? 18 : 24 }, () => this.inputRender(props))
    ]);
  }

}

export class TextField extends LabeledField<string> {
   constructor(label: VNodeChild, defaultValue?: string) {
    super(label, props => h(ElInput, {
      ...props,
      value: defaultValue || '',
      placeholder: typeof label === 'string' ? `请输入${label}` : '请输入'
    }));
  }
}

export class SliderField extends LabeledField<number> {
  constructor(label: VNodeChild, min = 12, max = 48) {
    super(label, props => h(ElSlider, {
      ...props,
      min,
      max,
    }));
  }
}

export class SegmentsField<ModelValue> extends LabeledField<ModelValue> {
  constructor(label: VNodeChild, choices: {label: VNodeChild, value: ModelValue}[]) {
    super(label, props => h(SegmentedControl, {
      ...props,
      options: choices,
    }));
  }
}

export class ColorField<ModelValue> extends LabeledField<ModelValue> {
  constructor(label: VNodeChild) {
    super(label, props => h(ElColorPicker, {
      ...props,
    }));
  }
}

export class ImageField<ModelValue> extends LabeledField<ModelValue> {
  constructor(label: VNodeChild, options?: any[]) {
    super(label, props => h(ImagePicker, {
      ...props, ...options
    }));
  }
}

export class RadioField extends LabeledField<number> {
  constructor(label: VNodeChild, options: object[]) {
    super(label, props => h(ElRadioGroup, {
      ...props,
    }, options.map(p => h(ElRadio, {
      label: p.value,
    }, h('p', p.label)))));
  }
}

export class TripleField<ModelValue> extends LabeledField<ModelValue> {
  constructor(label: VNodeChild) {
    super(label, props => h(TripleInput, {
      ...props
    }));
  }
}
