import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from "dva";
import Qtable from '../../../components/Qtable/index'; //表单
import FilterForm from './components/FilterForm/index.js';
import {columnsIndex} from './columns/index.js';
import Qpagination from '../../../components/Qpagination';
import './index.less';


const { confirm } = Modal;

class CtipActivity extends Component {
  constructor(props) {
    super(props);
  }
  handleOperateClick=(record, type)=> {
    switch (type) {
      case "info":
        this.goInfo(record);
        break;
      case "edit":
        this.goEdit(record);
        break;
      case "delete":
        this.goDelete(record);
        break;
      case "cancel":
        this.goCancel(record);
        break;
      case "zuofei":
        this.goZuofei(record);
        break;
      case "forcedEnd":
        this.goForcedEnd(record);
        break;
    }
  }
  goInfo=(record)=> {
    const { componkey } = this.props;
    const paneitem = {
      title: "C端活动详情",
      key: `${componkey}levelTwoInfo${record.homepageId}`,
      componkey: `${componkey}levelTwoInfo`,
      parentKey:componkey,
      data: {
        key: `${componkey}levelTwo${record.homepageId}`,
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  goEdit=(record)=> {
    const { componkey } = this.props;
    const paneitem = {
      title: "编辑C端活动",
      key: `${componkey}levelTwoOne${record.homepageId}`,
      componkey: `${componkey}levelTwoOne`,
      parentKey:componkey,
      data: {
        parentKey:componkey,
        key: `${componkey}levelTwo${record.homepageId}`,
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  goDelete=(record)=> {
    confirm({
      content: '是否确认删除活动',
      onOk() {
        this.successCallback()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  goCancel=(record)=> {
    confirm({
      content: '是否确认撤销审核',
      onOk() {
        console.log('OK');
        this.successCallback()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  goZuofei=(record)=> {
    confirm({
      title:"作废后，此活动将不会出现在C端App和小程序",
      content: '是否确认作废？',
      onOk() {
        this.successCallback()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  goForcedEnd=(record)=> {
    confirm({
      title:"强制结束后，C端App和小程序活动即停止，所有活动商品都将不享受此活动优惠。",
      content: '是否确认强制结束？',
      onOk() {
        console.log('OK');
        this.successCallback()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  successCallback=()=> {
    //更新列表
  }
  creatActivity=()=> {
    const { componkey } = this.props;
    const paneitem = {
      title: "新建C端活动",
      key: `${componkey}levelTwoOne`,
      componkey: `${componkey}levelTwoOne`,
      parentKey:componkey,
      data: {
        parentKey:componkey,
      }
    };
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  submit=(values)=> {
    console.log(values)
  }
  render() {
    return(
      <div className="cTip-activity-pages qtools-components-pages">
        <FilterForm submit={this.submit}/>
        <div className="handel-btn-lists">
          <Button
            size="large"
            type="primary"
            onClick={()=>this.creatActivity()}>新建活动</Button>
        </div>
        <Qtable
          dataSource = {[{key:1,name:'123'}]}
          columns = {columnsIndex}
          onOperateClick={this.handleOperateClick}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { ctipActivity } = state;
  return ctipActivity;
}

export default  connect(mapStateToProps)(CtipActivity);
