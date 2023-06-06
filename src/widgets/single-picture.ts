import { BaseWidget } from '@/index';
import {
    Field,
    SliderField,
    ColorField,
    ImageField,
} from '@/components/app-form/field';
import {h, VNodeChild} from 'vue';

export class SinglePictureWidget extends BaseWidget {

    fields: Field[]
    getLabel() {
        return '单图片';
    }

    constructor() {
        super();
        this.fields = [
            new SliderField('上下边距', 0, 50),
            new SliderField('左右边距', 0, 50),
            new ColorField('背景颜色'),
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
        const bgColor = this.fields[2].model as string;
        const imgInfo = this.fields[3].model as any[];
        const style = {
            padding: `${paddTop || 0}px ${paddLeft || 0}px`,
            backgroundColor: bgColor,
        }
        return h('div', {
            style: { fontSize: '0'}
        }, imgInfo?.map(p => h('div', {
            style
        }, h('img', {
            src: p.imageSrc || require('@/assets/image/banner-1.jpg'),
            alt: 'default',
            style: { width: '100%' },
            // onClick: () => { p.url && (window.location.href = p.url) }
        }))) || h('div', {
            style
        }, h('img', {
            src: require('@/assets/image/banner-1.jpg'),
            alt: 'default',
            style: { width: '100%' },
            // onClick: () => { p.url && (window.location.href = p.url) }
        })));
    }
}
