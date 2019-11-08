import * as React from 'react';
import { Props, State } from './type';

export class Button extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <button
        style={this.props.style}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
