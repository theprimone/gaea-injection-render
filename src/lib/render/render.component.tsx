import * as _ from 'lodash';
import * as React from 'react';
import ViewportStore from '../store/viewport';
import Helper from './helper/helper.component';
import { Props, State } from './render.type';

function setViewportByValue(props: Props) {
  const { componentClasses = [], value } = props;
  const result = new ViewportStore();
  // 设置基础组件
  componentClasses.forEach(componentClass => {
    result.addComponentClass(componentClass);
  });

  // 设置外部传参 todo
  result.setParams({});

  // 设置页面
  if (value) {
    Object.keys(value).forEach(instanceKey => {
      const instanceInfo = value[instanceKey];
      result.instances.set(instanceKey, instanceInfo);

      // 设置根 mapUniqueKey
      if (instanceInfo.parentInstanceKey === null) {
        result.setRootUniqueId(instanceKey);
      }
    });
  }
  return result;
}

export class GaeaInjectionRender extends React.Component<Props, State> {
  public static defaultProps = new Props();

  public static getDerivedStateFromProps(props: Props, state: State) {
    const { value: newValue } = props;
    const { value } = state;
    if (!_.isEqual(newValue, value)) {
      return {
        viewport: setViewportByValue(props),
      }
    }
    return null;
  }

  public state = new State();

  public render() {
    if (!this.state.viewport.rootInstanceKey) {
      return null;
    }
    
    return <Helper viewport={this.state.viewport} instanceKey={this.state.viewport.rootInstanceKey} />;
  }
}
