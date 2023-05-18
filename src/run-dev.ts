import { registerWidget, run } from '@/index';
import '@/run-dev.less';
import { Widget } from '@/types';

const widgets: {new(...args): Widget }[] = [];

registerWidget(widgets, 'TitleWidget').then(() => {
  run(document.getElementById('root'), {
    type: 'preview'
  }, widgets);
});

