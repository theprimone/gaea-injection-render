export class Props {
  public editSetting = {
    key: 'gaea-button',
    name: 'Button',
    editors: [
      'Layout',
      {
        type: 'box-editor'
      },
      'Function',
      {
        field: 'text',
        text: 'Text',
        type: 'string'
      },
    ],
    events: [
      {
        text: 'OnClick',
        field: 'onClick'
      }
    ]
  };

  public style: React.CSSProperties = {};
  public text: string = 'Button Text';
  public onClick = () => {
    //
  };
}

export class State {}
