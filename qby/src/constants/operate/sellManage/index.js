import React , { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button,Tooltip, Popover, Icon, Modal } from 'antd';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import FilterForm from './components/FilterForm';
import columns from './columns';
import {timeForMats} from '../../../utils/meth';
import { exportDataApi } from '../../../services/orderCenter/userOrders'

import './index.less';

const confirm = Modal.confirm;

class SellManage extends Component {
  constructor(props) {
    super(props);
    this.state={
      fields: {
         spShopName:'',
         deliveryType:'',
         dateTimeST:'',
         dateTimeET:'',
         incomeStatus:'',
         costType:'',
         rangePicker:'',
       },
    }
  }
  componentDidMount() {
    this.getNowFormatDate()
  }
  getNowFormatDate = () => {
   const startRpDate=timeForMats(30).t2;
   const endRpDate=timeForMats(30).t1;
   const {fields} = this.state;
   this.setState({
     fields:{
       ...fields,
       dateTimeST:startRpDate,
       dateTimeET:endRpDate,
       }
     },function(){
       this.searchData({
         dateTimeST:startRpDate,
         dateTimeET:endRpDate
       });
   })
  }
  //双向绑定表单
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //分页
  changePage = (currentPage) => {
    currentPage--;
    const { fields } = this.state;
    const paramsObj ={...{currentPage},...fields}
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'sellManage/fetchList',
      payload: values
    });
  }
  //导出数据
  exportData =()=> {
    let { rangePicker, ...params} = this.state.fields;
    if(rangePicker&&rangePicker.length>0) {
      params.dateTimeST = moment(rangePicker[0]).format('YYYY-MM-DD HH:mm:ss');
      params.dateTimeET = moment(rangePicker[1]).format('YYYY-MM-DD HH:mm:ss');
    }
    const values ={type:78,downloadParam:{...params}}
    exportDataApi(values)
    .then(res => {
      if(res.code == '0'){
        confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk:()=> {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						this.props.dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						this.props.dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
  			});
      }
    },err => {
      message.error('导出数据失败')
    })
  }
  //操作
  handleOperateClick(record) {
    let componkey = '207000';
    const paneitem = {
      title:'订单详情',
      key:`${componkey}edit`+record.orderId,
      componkey:`${componkey}edit`,
      data:{
        pdSpuId:record.orderId,
      }
    }
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    })
  }
  render() {
    //导出数据按钮是否显示
		const exportSellorderData=this.props.data.rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
    const { fields } =this.state;
    const { data, list } =this.props.sellManage;
    let content=(
      <div className="sell-manage-tips-modal">
        <p className="label">1、若配送方式为：门店自提<span className="field">销售收款【结算金额】：商品金额*0.994</span></p>
        <p className="label">2、若配送方式为：同城配送<span className="field">销售收款【结算金额】：（商品金额+用户支付配送费）*0.994-顺丰返回实际费用</span></p>
        <p className="field" style={{marginTop:'-5px'}}>（ps.骑士接单后门店取消，需要扣除门店9元配送费）</p>
        <p className="label">3、若配送方式为：快递邮寄<span className="field">销售收款【结算金额】：（商品金额+用户支付快递费）*0.994</span></p>
        <p className="label">【销售退款】</p>
        <p className="label">1、若配送方式为：门店自提<span className="field">销售退款【结算金额】：退款商品金额之和*0.994</span></p>
        <p className="label">2、若配送方式为：同城配送<span className="field">销售收款【结算金额】：退款商品金额之和*0.994</span></p>
        <p className="label">3、若配送方式为：快递邮寄<span className="field">销售收款【结算金额】：退款商品金额之和*0.994</span></p>
      </div>
    )
    return(
      <div className="sell-manage-pages">
        <FilterForm
          {...fields}
          submit={this.searchData}
          onValuesChange={this.handleFormChange}/>
          <div className="handel-action">
            {
              exportSellorderData &&
              <Button
                size="large"
                type="primary"
                onClick={()=>this.exportData()}>导出数据</Button>
            }
            <div className="rules">
              <Popover content={content} title="销售收款计算规则" trigger="hover" placement="leftTop">
                <div>销售收款计算规则<Icon type="question" /></div>
              </Popover>
            </div>
          </div>
        <Qtable
          onOperateClick={this.handleOperateClick.bind(this)}
          columns={columns}
          dataSource={list}/>
        {
          list.length>0&&
          <Qpagination
            sizeOptions="1"
            onShowSizeChange={this.changePageSize}
            data={data}
            onChange={this.changePage}/>
        }
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { sellManage } =state;
  return {sellManage};
}
export default connect(mapStateToProps)(SellManage);
