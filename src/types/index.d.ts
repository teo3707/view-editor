/**
 * 部件构建的上下文
 */
import { VNodeChild } from 'vue';
import { Field } from '@/components/app-form/field';

/**
 * 渲染上下文
 */
export type Context = {
  type: 'preview' | 'production'
}

export interface MiniComponent {
  render(): VNodeChild
  id?: string
}

/**
 * 部件
 */
export interface Widget extends MiniComponent {
  /**
   * 部件显示的标题
   */
  getLabel(): VNodeChild

  /**
   * 部件属性编辑列表
   */
  fields: Field[]
}

export type Plugin = {
  install(root: RootWidget)
}

/**
 * 根部件，调用更部件的{@code insert}方法，添加子部件进行渲染
 */
export interface RootWidget  extends MiniComponent {

  widgets: {new(...args):Widget }[]

  setContext(ctx: Context)

  /**
   * 安装拖拽等插件
   * @param plugin
   */
  applyPlugin(plugin: Plugin)
}

declare module '*.vue' {
}
