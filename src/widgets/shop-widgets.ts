import { BaseWidget } from '@/index';
import {
    Field,
    SliderField,
    ImageField,
    RadioField
} from '@/components/app-form/field';
import {h, VNodeChild} from 'vue';

export class ShopWidget extends BaseWidget {

    fields: Field[]
    getLabel() {
        return '图片橱窗';
    }

    constructor() {
        super();
        this.fields = [
            new SliderField('上下边距', 0, 50),
            new SliderField('左右边距', 0, 50),
            new RadioField('布局方式', [{ value: '2', label: '堆积两列'}, { value: '3', label: '堆积三列'}, { value: '4', label: '堆积四列'}]),
            new ImageField(''),
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
        const paddLeft = this.fields[1].model as string;
        const count = this.fields[2].model as number;
        let imgInfo = this.fields[3].model as any[];
        if(!imgInfo) {
            imgInfo = [{ url: '', imageSrc: require('@/assets/image/banner-1.jpg') }]
        }
        const style = {
            display: 'grid',
            gridTemplateColumns: `repeat(${count}, 1fr)`,
            gridGap: '5px',
            padding: `${paddTop || 0}px ${paddLeft || 0}px`,
            fontSize: '0'
        }
        return h('div', {
            style
        }, imgInfo.map(p => h('div', {}, h('img', {
                src: p.imageSrc,
                alt: 'default',
                style: { width: `100%` }
            }) )))
    }
}
