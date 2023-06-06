import { BaseWidget } from '@/index';
import {
  Field,
  SegmentsField,
  SliderField,
  TextField,
  ColorField
} from '@/components/app-form/field';
import { h, VNodeChild } from 'vue';
import FormatAlignLeft from 'vue-material-design-icons/FormatAlignLeft.vue';
import FormatAlignCenter from 'vue-material-design-icons/FormatAlignCenter.vue';
import FormatAlignRight from 'vue-material-design-icons/FormatAlignRight.vue';

export class TitleWidget extends BaseWidget {

  fields: Field[]
  getLabel() {
    return '标题';
  }

  constructor() {
    super();
    this.fields = [
      new TextField('标题'),
      new SegmentsField('对齐方式', [
        { label: h(FormatAlignLeft), value: 'left' },
        { label: h(FormatAlignCenter), value: 'center' },
        { label: h(FormatAlignRight), value: 'right' },
      ]),
      new SliderField('字体大小'),
      new ColorField('字体颜色'),
      new ColorField('背景颜色'),
    ]
  }

  render(): VNodeChild {
    switch (this.context.type) {
      case 'preview':
        return this.renderPreview();
    }
  }

  renderPreview() {
    const fontSizeField = this.fields[2] as Field<string>;
    const fontSize = /^[0-9]+$/.test(fontSizeField.model) ? fontSizeField.model + 'px' : undefined;
    const textAlign = this.fields[1].model as string;
    const color = this.fields[3].model as string;
    const bgColor = this.fields[4].model as string;
    return h('div', {
      style: {
        fontSize,
        textAlign,
        color,
        backgroundColor: bgColor
      }
    }, (this.fields[0] as Field<string>).model || '这里显示输入的标题')
  }
}
