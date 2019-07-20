import React , { Component } from 'react';
import { Modal }from 'antd';
import './index.less';


class TabsMod extends Component {
  onChange = (el,activiKey) => {
    if(el.key == activiKey) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      onOk:()=>{
        this.props.onOk(el.key);
      },
      onCancel:()=> {
        this.props.onCancel(el.key);
      },
    });
  };
  render() {
    const { activiKey } =this.props;
    return(
      <div className={`part-tabs ${this.props.className}`}>
        {
          this.props.panes.map((el,index) => (
            <p
              key={el.key}
              className={`tab-bar-item ${el.key==activiKey?'tab-bar-activity':''}`}
              onClick={()=>this.onChange(el,activiKey)}>{el.title}</p>
          ))
        }
      </div>
    )
  }
}

export default TabsMod;
