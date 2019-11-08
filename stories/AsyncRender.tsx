import * as React from 'react';
import testComponents from './test-components';
import GaeaInjectionRender from '../src';

class Props { }

class State {
  public obj: any = {
    gaea_instance_1: {
      gaeaKey: 'gaea-container',
      data: { props: { style: { display: 'block', flexGrow: 1 } } },
      childs: ['gaea_instance_3'],
      parentInstanceKey: null
    },
    gaea_instance_3: { gaeaKey: 'gaea-button', data: { props: { text: '初始化' } }, childs: [], parentInstanceKey: 'gaea_instance_1' }
  };
}


export default class Page extends React.PureComponent<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public componentDidMount() {
    setTimeout(() => {
      this.setState({
        obj: {
          gaea_instance_1: {
            gaeaKey: 'gaea-container',
            data: { props: { style: { display: 'block', flexGrow: 1 } } },
            childs: ['gaea_instance_3'],
            parentInstanceKey: null
          },
          gaea_instance_3: { gaeaKey: 'gaea-button', data: { props: { text: '按钮更新' } }, childs: [], parentInstanceKey: 'gaea_instance_1' }
        }
      })
    }, 2000)
  }

  public render() {
    return (
      <GaeaInjectionRender
        componentClasses={testComponents}
        value={this.state.obj}
      />
    );
  }
}
