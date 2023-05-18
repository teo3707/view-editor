import { defineComponent, h, isVNode, VNodeChild } from 'vue';

export default defineComponent<{ content: VNodeChild }>((props, ctx) => {
  return () => {
    const content = ctx.attrs.content;
    if (isVNode(content)) {
      return h(ctx.attrs.content, ctx.attrs);
    }

    return h({ render: () =>content });
  }
});
