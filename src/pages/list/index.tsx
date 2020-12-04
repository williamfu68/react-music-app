import * as React from 'react';

export interface IAppProps {
    //强制规范数据类型   
    word:string,

}

export default class App extends React.Component<IAppProps> {
  public render() {
      
    return (
      <div>
        <h3>播放列表</h3>
      </div>
    );
  }
}
