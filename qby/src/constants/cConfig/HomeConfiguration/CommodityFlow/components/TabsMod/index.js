import React, { Component } from 'react';
import { Tabs, Button, Form, Input, Icon, Modal } from 'antd';
import { connect } from 'dva';
import DragTabCard from '../DragTabCard';
import MyTagControlContext from '../../../components/MyTagControlContext';
import './index.less';



class Field extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstIn:true,
      key:this.props.tabs.length
    }
  }
  componentWillReceiveProps(props) {
    if(this.state.firstIn) {
      let keys = props.tabs.length;
      keys--;
      this.setState({ key: keys })
    }
  }
  //切换查详情
  handleToggle =(e,value)=> {
    const { selectkey } =this.props;
    e.stopPropagation()
    if(e.target.tagName=='INPUT') {
      return;
    }
    if(selectkey==value.key) {
      return;
    }
    Modal.confirm({
      title: '温馨提示',
      content: '切换页面请确认保存',
      onOk:()=>{
        this.props.onOk(value);
      },
      onCancel:()=> {
        this.props.onCancel(value);
      },
    });
  }
  //新增
  handleAdd=()=> {
    let { tabs, addKey } =this.props;
    tabs.push({ key:addKey, tabId:null, firstIn:false });
    addKey++;
    this.props.dispatch({
      type:'commodityFlow/getAddKey',
      payload:addKey
    });
    this.updateTabs(tabs)
  }
  //删除
  handleDelete=(e,record)=> {
    e.stopPropagation()
    let { tabs, selectkey } =this.props;
    tabs = tabs.filter(item => item.key !== record.key);
    if(tabs.length==0) {
      this.props.dispatch({
        type:'commodityFlow/resetData',
        payload:{}
      })
      return;
    }
    if(selectkey==record.key&&tabs.length>0) {
      selectkey = tabs[0].key;
      this.props.dispatch({
        type:'commodityFlow/fetchGoodsList',
        payload:{tabId:tabs[0].tabId,selectkey}
      })
    }
    this.updateTabs(tabs)
  }
  validator = (rule, value, callback) => {
    const { tabs } =this.props;
    let index = tabs.findIndex((el) => {
      return el.name == value
    })
    if (index!='-1') {
      callback('Tab名称不可重复')
    }else {
      callback()
    }
  }
  moveRow = (dragIndex, hoverIndex) => {
    let { tabs } =this.props;
    // let temp = tabs.splice(dragIndex,1);
    //     tabs.splice(hoverIndex, 0, ...temp);
    let tempHover = tabs[dragIndex];
    let tempDrag = tabs[hoverIndex];
    tabs.splice(hoverIndex, 1, tempHover);
    tabs.splice(dragIndex, 1, tempDrag);
    this.updateTabs(tabs)
  };
  updateTabs(tabs) {
    this.props.dispatch({
      type:'commodityFlow/getTabs',
      payload:tabs
    })
  }
  render() {
    const { tabs, selectkey } =this.props;
    return (
      <div className="part-same tabs-mod-wrap">
        <p className="part-head">设置商品流tab</p>
        {
          tabs.map((el,index)=> (
            <DragTabCard
              tabs={tabs}
              selectkey={selectkey}
              key={index}
              item={el}
              index={index}
              form={this.props.form}
              validator={this.validator}
              handleToggle={this.handleToggle}
              handleDelete={this.handleDelete}
              moveRow={this.moveRow}/>
          ))
        }
        <Button
          disabled={tabs.length>=10?true:false}
          onClick={this.handleAdd}
          size="large"
          type="primary">
            新增Tab({tabs.length}/10)
        </Button>
      </div>
    );
  }
}

let FieldF = Form.create({
  onValuesChange(props, changedFields, allFields) {
    let { tabsField } =allFields;
    let { tabs } =props;
    tabs =tabs.map((el,index) => {
      tabsField.map((item,idx) => {
        if(index == idx) {
          el={...el,...item}
        }
      })
      return el;
    })
    props.dispatch({
      type:'commodityFlow/getTabs',
      payload:tabs
    })
  },
  mapPropsToFields(props) {
    return {
      tabs: Form.createFormField(props.tabs),
    };
  }
})(Field);
FieldF = MyTagControlContext(FieldF);

function mapStateToProps(state) {
  const { commodityFlow } =state;
  return commodityFlow;
}


export default connect(mapStateToProps)(FieldF);
