import { BaseWidget } from '@/index';
import {
    Field,
    SliderField,
    ColorField, TripleField,
} from '@/components/app-form/field';
import {h, VNodeChild} from 'vue';

export class CountBarWidget extends BaseWidget {

    fields: Field[]
    getLabel() {
        return '计数条';
    }

    constructor() {
        super();
        this.fields = [
            new SliderField('上下边距', 0, 50),
            new TripleField('文字'),
            new SliderField('字体大小', 12, 30),
            new ColorField('背景颜色'),
            new ColorField('字体颜色'),
            new ColorField('数字颜色'),
        ]
    }

    render(): VNodeChild {
        switch (this.context.type) {
            case 'preview':
                return this.renderPreview();
        }
    }

    renderPreview() {
        const paddTop = this.fields[0].model as string;
        const textList = this.fields[1].model as any[];
        const fontSize = this.fields[2].model as string;
        const backgroundColor = this.fields[3].model as string;
        const color = this.fields[4].model as string;
        const numColor = this.fields[5].model as string;
        const style = {
            padding: `${paddTop || 0}px 0px`,
            textAlign: 'center',
            color,
            backgroundColor,
            fontSize:  `${fontSize}px` || '13px'
        }
        return h('div', {
            style
        }, [
            h('span', {}, textList ? textList[0] : '目前已有'),
            h('span', {
                style: { color: numColor }
            }, textList ? textList[1] : '100'),
            h('span', {},textList ? textList[2] : '人参与活动'),
        ])
    }
}
