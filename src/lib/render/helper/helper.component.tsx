import _get from 'lodash/get';
import _merge from 'lodash/merge';
import * as React from 'react';
import { Props, State } from './helper.type';

export default class RenderHelper extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  // 内部组件实例
  public wrappedInstance: React.ReactInstance;

  public render() {
    const { viewport, instanceKey } = this.props;
    // 从 store 找到自己信息
    const instanceInfo = viewport.instances.get(instanceKey);

    // 获取当前要渲染的组件 class
    const componentClass = viewport.componentClasses.get(instanceInfo.gaeaKey);

    // 子元素
    let childs: React.ReactElement<any>[] | null = null;

    const isContainer = _get(componentClass, 'defaultProps.editSetting.isContainer');
    // 是否可以有子元素
    if (isContainer && instanceInfo.childs) {
      console.log(this.props.viewport)
      childs = instanceInfo.childs.map((childKey: any) => {
        const childProps: any = {
          key: childKey,
          viewport: this.props.viewport,
          instanceKey: childKey,
        };
        return React.createElement(RenderHelper, childProps);
      });
    }

    let props: any = {};

    // render 模式就是 preview 模式
    props.isPreview = true;

    props.ref = (ref: React.ReactInstance) => {
      this.wrappedInstance = ref;
    };

    // 注入 props
    _merge(props, _get(instanceInfo, 'data.props') || {});

    console.log('instanceKey', this.props.instanceKey, 'props', this.props);
    return componentClass ? React.createElement(
      componentClass,
      _merge({ instanceKey: this.props.instanceKey }, componentClass.defaultProps, props),
      childs
    ) : null;
  }
}
