import { Context, Plugin, RootWidget, Widget } from '@/types';
import {
  createApp,
  h,
  inject,
  provide,
  VNodeChild
} from 'vue';
import AppPreview from '@/components/app-preview.vue';
import { Field } from '@/components/app-form/field';
import { uuid } from '@/utils';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VnodeRender from '@/components/vnode-render';

export function registerField() {

}


export async function registerWidget(container:  {new(...args): Widget }[], widget: string | string[]) {
  return import('@/widgets').then(widgets => {
    if (typeof widget === 'string') {
      widget = [widget];
    }
    for(const name of widget) {
      const clazz = widgets[name];
      if (!clazz) {
        throw new Error(`not implemented widget: ${name}`)
      }
      container.push(clazz);
    }
  });
}

/**
 * 上下文context的键
 */
export const CONTEXT_SYMBOL = '$$contextSymbol'

function Component(Ctr: { new(...args): any }): typeof Ctr {
  return class extends Ctr {
    constructor(...args) {
      super(...args);
      for (const fnName of [
        'render',
        'mounted'
      ]) {
        Object.assign(this, { [fnName]: this[fnName]?.bind(this) });
      }
    }
  }
}

@Component
export class BaseWidget implements Widget {
  id: string

  constructor() {
    this.id = uuid('widget');
  }

  fields: Field[]

  render(): VNodeChild {
    throw new Error('not implemented')
  }

  renderAttributeForm(): VNodeChild {
    throw new Error('not implemented')
  }

  getLabel(): VNodeChild {
    throw new Error('not implemented');
  };

  get context(): Context {
    return inject<Context>(CONTEXT_SYMBOL);
  }
}

export interface OnMounted {
  mounted(): void
}

/**
 * H5部件编辑预览、显示
 */
@Component
export class PreviewWidget implements RootWidget, OnMounted {
  widgets: {new(...args): Widget}[] = [];
  ctx: Context

  setContext(ctx: Context) {
    this.ctx = ctx;
  }

  render(): VNodeChild {
    return h(AppPreview, {
      rootWidget: this
    });
  }

  mounted() {
    console.log('mounted')
  }

  applyPlugin(plugin: Plugin) {
    plugin.install(this);
  }
}


export function run(dom: HTMLElement, ctx: Context, widgets: {new():Widget}[]) {
  const rootApp: PreviewWidget & { setup } = new PreviewWidget() as any;
  rootApp.widgets = widgets;
  const setup = rootApp.setup;
  rootApp.setup = function() {
    const res = setup?.();
    provide(CONTEXT_SYMBOL, ctx);
    rootApp.setContext(ctx);
    return res;
  }

  const app = createApp(rootApp);
  // for test
  app.use(ElementPlus);
  app.component('vnode-render', VnodeRender);

  app.mount(dom);
}
