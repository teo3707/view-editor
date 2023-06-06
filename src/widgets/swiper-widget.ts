import { BaseWidget } from '@/index';
import {
    Field,
    SliderField,
    ImageField,
    RadioField
} from '@/components/app-form/field';
import {h, VNodeChild} from 'vue';
import {ElCarousel, ElCarouselItem} from "element-plus";

export class SwiperWidget extends BaseWidget {

    fields: Field[]
    getLabel() {
        return '轮播图';
    }

    constructor() {
        super();
        this.fields = [
            new SliderField('上下边距', 0, 50),
            new SliderField('左右边距', 0, 50),
            new ImageField(''),
            new RadioField('轮播模式', [{ value: 'card', label: '卡片'}, { value: '', label: '正常'}])
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
        let imgInfo = this.fields[2].model as any[];
        if(!imgInfo) {
            imgInfo = [{ url: '', imageSrc: require('@/assets/image/banner-1.jpg') }]
        }
        // const type = this.fields[3].model as string;
        // console.log('000000000000', type)
        const style = {
            padding: `${paddTop || 0}px ${paddLeft || 0}px`,
            fontSize: '0'
        }
        return h('div', {
            style
        }, h(ElCarousel, {
           height: '200px',
        }, imgInfo.map(p => h(ElCarouselItem, {}, h('img', {
            src: p.imageSrc || require('@/assets/image/banner-1.jpg'),
            alt: 'default',
            style: { width: '100%' },
        })))));
    }
}
