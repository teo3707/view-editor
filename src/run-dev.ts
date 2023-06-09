import { registerWidget, run } from '@/index';
import '@/run-dev.less';
import { Widget } from '@/types';

const widgets: {new(...args): Widget }[] = [];

const renderWidgets: string[] = [
  'TitleWidget',
  'SinglePictureWidget',
  'SwiperWidget',
  'ShopWidget',
  'ApplyListWidget',
  'CountBarWidget'
];

registerWidget(widgets, renderWidgets).then(() => {
  run(document.getElementById('root'), {
    type: 'preview'
  }, widgets);
});

