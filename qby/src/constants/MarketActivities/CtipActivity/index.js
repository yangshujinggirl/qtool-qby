import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from "dva";
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination';
import FilterForm from '../components/ActivityFilterForm';
import CommonActivityIndex from '../components/CommonActivityIndex';
import { columnsIndex } from '../components/ActivityColumns';
import { getDeleteApi, getEnableApi } from '../../../services/marketActivities/ctipActivity';

import './index.less';


const { confirm } = Modal;

class CtipActivity extends CommonActivityIndex {
  componentDidMount() {
    this.initData()
  }
  initData(values) {
    let params = {
      channel:1
    }
    params = values?{...params,...values}:params;
    this.props.dispatch({
      type:'ctipActivity/fetchList',
      payload:params
    });
  }
  goInfo=(record)=> {
    const { componkey } = this.props;
    const paneitem = {
      title: "C端活动详情",
      key: `${componkey}TwoInfo${record.promotionId}`,
      componkey: `${componkey}TwoInfo`,
      parentKey:componkey,
      data: {
        promotionId:record.promotionId
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
      key: `${componkey}TwoOne${record.promotionId}`,
      componkey: `${componkey}TwoOne`,
      parentKey:componkey,
      data: {
        parentKey:componkey,
        promotionId:record.promotionId,
        promotionType:record.promotionType,
      }
    };
    console.log(paneitem)
    this.props.dispatch({
      type: "tab/firstAddTab",
      payload: paneitem
    });
  }
  goDelete=(record)=> {
    confirm({
      content: '是否确认删除活动',
      onOk() {
        getDeleteApi({promotionId:record.promotionId})
        .then((res) => {
          if(res.code == '0') {
            this.successCallback();
            message.success('删除成功')
          }
        })
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
        getEnableApi({promotionId:record.promotionId,operationType:1})
        .then((res) => {
          if(res.code == '0') {
            this.successCallback();
            message.success('作废成功')
          }
        })
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
        getEnableApi({promotionId:record.promotionId,operationType:2})
        .then((res) => {
          if(res.code == '0') {
            this.successCallback();
            message.success('强制结束成功')
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  successCallback=()=> {
    //更新列表
    this.initData()
  }
  creatActivity=()=> {
    const { componkey } = this.props;
    const paneitem = {
      title: "新建C端活动",
      key: `${componkey}TwoOne`,
      componkey: `${componkey}TwoOne`,
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
  render() {
    const { dataList, dataPag } =this.props;
    return(
      <div className="cTip-activity-pages qtools-components-pages">
        <FilterForm
          onChange={this.handleFormChange}
          submit={this.submitSearch}/>
        <div className="handel-btn-lists">
          <Button
            size="large"
            type="primary"
            onClick={()=>this.creatActivity()}>新建活动</Button>
        </div>
        <Qtable
          dataSource = {dataList}
          columns = {columnsIndex}
          onOperateClick={this.handleOperateClick}/>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="2"
            onShowSizeChange={this.changePageSize}
            data={dataPag}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { ctipActivity } = state;
  return ctipActivity;
}

export default  connect(mapStateToProps)(CtipActivity);
