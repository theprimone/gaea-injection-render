import * as React from 'react';
import _get from 'lodash/get';

export default class Preview {
  /**
   * 基础组件
   */
  public componentClasses = new Map<string, React.ComponentClass<any>>();

  /**
   * 已实例化在编辑区域组件的集合
   */
  public instances = new Map<string, any>();

  /**
   * 根节点的唯一 id
   */
  public rootInstanceKey: string;

  /**
   * 全局参数
   */
  public params: any = {};

  /**
   * 用户设置
   */
  public settings: any = {};

  /**
   * 事件回调
   */
  public callback: any = () => { };

  /**
   * 设置基础组件
   */
  public addComponentClass(componentClass: React.ComponentClass<any>) {
    this.componentClasses.set(_get(componentClass, 'defaultProps.editSetting.key'), componentClass);
  }

  /**
   * 设置根节点唯一 id
   */
  public setRootUniqueId(uniqueId: string) {
    this.rootInstanceKey = uniqueId;
  }

  public setParams(params: any) {
    this.params = params;
  }

  public setSettings(settings: any) {
    this.settings = settings;
  }
}
