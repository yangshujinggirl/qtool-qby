import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import { connect } from "dva";
import moment from 'moment';
import Qtable from '../../../components/Qtable/index'; //表单
import Qpagination from '../../../components/Qpagination';
import FilterForm from '../components/ActivityFilterForm';
import { columnsIndex } from '../components/ActivityColumns';
import CommonActivityIndex from '../components/CommonActivityIndex';
import { getDeleteApi, getEnableApi } from '../../../services/marketActivities/ctipActivity';

import './index.less';


const { confirm } = Modal;

class CtipActivity extends CommonActivityIndex {
  componentDidMount() {
    this.initData()
  }
  initData(values) {
    let params = {
      channel:2
    }
    params = values?{...params,...values}:params;
    this.props.dispatch({
      type:'btipActivity/fetchList',
      payload:params
    });
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
      title: "编辑B端活动",
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
        getDeleteApi({mktActivityId:record.mktActivityId})
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
      title:"作废后，此活动将不会出现在B端Q掌柜是否确认作废？",
      content: '是否确认作废？',
      onOk() {
        getEnableApi({mktActivityId:record.mktActivityId})
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
      title:"强制结束后，B端Q掌柜活动即停止，所有活动商品都将不享受此活动优惠。",
      content: '是否确认强制结束？',
      onOk() {
        getEnableApi({mktActivityId:record.mktActivityId})
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
      title: "新建B端活动",
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
            onClick={()=>this.creatActivity()}>新建B端活动</Button>
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
  const { btipActivity } = state;
  return btipActivity;
}

export default  connect(mapStateToProps)(CtipActivity);
