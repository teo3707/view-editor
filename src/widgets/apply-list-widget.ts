import { BaseWidget } from '@/index';
import {
    Field,
    SliderField,
    TextField,
    ColorField,
} from '@/components/app-form/field';
import {h, VNodeChild} from 'vue';

export class ApplyListWidget extends BaseWidget {

    fields: Field[]
    getLabel() {
        return '报名列表';
    }

    constructor() {
        super();
        this.fields = [
            new TextField('标题文字', '最新报名客户'),
            new SliderField('上下边距', 0, 50),
            new SliderField('左右边距', 0, 50),
            new ColorField('字体颜色'),
        ]
    }

    render(): VNodeChild {
        switch (this.context.type) {
            case 'preview':
                return this.renderPreview();
        }
    }

    renderPreview() {
        const title = this.fields[0].model as string;
        const paddTop = this.fields[1].model as string;
        const paddLeft = this.fields[2].model as string;
        const color = this.fields[3].model as string;
        const style = {
            fontSize: '0',
            padding: `${paddTop || 0}px ${paddLeft || 0}px`,
        }
        return h('div', {
            style
        }, [
            h('p', {
                style: {
                    color,
                    fontSize: '1.3rem',
                    textAlign: 'center',
                    margin: '0.5rem 0',

                }
            }, title || '最新报名客户'),
            ...[1,2,3,4,5].map(p => h('div', {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90%',
                    margin: '0 auto',
                }
            }, [
                h('p', {
                    style: { fontSize: '1rem' }
                }, '张**'),
                h('p', {
                    style: { fontSize: '1rem' }
                }, '177****2344'),
                h('p', {
                    style: { fontSize: '1rem' }
                }, '已参与'),
            ] ))
        ])
    }
}
