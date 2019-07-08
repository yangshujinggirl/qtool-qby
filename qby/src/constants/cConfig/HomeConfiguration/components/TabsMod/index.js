import React , { Component } from 'react';
import { Modal }from 'antd';
import './index.less';


class TabsMod extends Component {
  onChange = activiKey => {
    Modal.confirm({
      title: '请离开页面前保存当前操作?',
      content: 'Some descriptions',
      onOk:()=>{
        this.props.onOk(activiKey);
      },
      onCancel:()=> {
        this.props.onCancel(activiKey);
      },
    });
  };
  render() {
    const { activiKey } =this.props;
    return(
      <div className="part-tabs">
        {
          this.props.panes.map((el,index) => (
            <p
              key={el.key}
              className={`tab-bar-item ${el.key==activiKey?'tab-bar-activity':''}`}
              onClick={()=>this.onChange(el.key)}>{el.title}</p>
          ))
        }
      </div>
    )
  }
}

export default TabsMod;
