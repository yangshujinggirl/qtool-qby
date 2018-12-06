import React,{Component} from 'react'
import {Icon,Card,Modal} from 'antd'
import Cards from '../../../components/card/baseCard'
import DataTable from '../../../components/table/datatable'
import {getAppBaseApi} from '../../../services/dataapp/appBase'
class AppBase extends Component{
  constructor(props){
    super(props)

    this.state={
      dataSource:[],
      data1:[],
      data2:[],
    }
    this.columns = [{
        title: '订单状态',
        dataIndex: 'orderstatusStr'
      },{
        title: '订单数',
        dataIndex: 'sumOrders'
      },{
        title: '订单总金额',
        dataIndex: 'orderAmount'
    }]
  }
  componentWillMount(){
    getAppBaseApi().then(res=>{
      if(res.code =='0'){
        this.initData(res);
      }
    })
  }
  //初始化数据
  initData(res){
    let dataSource = res.iRpQtoolsAppData.qtOrders;
    let {
      userTotal,
      userTodayTotal,
      sumTurnover,
      currentTurnover,
      sumUserCosumes,
      currentUsercosumes,
      totalOrders,
      currentOrders,
      totalFinishedOrders,
      currentFinishedOrders
    } = res.iRpQtoolsAppData;
    let data1 = [
      {title:'注册总用户数',value:userTotal},
      {title:'今日注册用户数',value:userTodayTotal},
      {title:'总流水',value:sumTurnover},
      {title:'今日流水',value:currentTurnover},
    ];
    let data2 = [
      {title:'下单总用户数',value:sumUserCosumes},
      {title:'今日下单用户数',value:currentUsercosumes},
      {title:'总下单订单数',value:totalOrders},
      {title:'今日下单订单数',value:currentOrders},
      {title:'总完成订单数',value:totalFinishedOrders},
      {title:'今日完成订单数',value:currentFinishedOrders},
    ];
    dataSource.map((item,index)=>{
      item.key = index;
    });
    this.setState({
      data1,
      data2,
      dataSource
    });
  }

  desinfo=()=>{
		Modal.info({
			title: 'App数据更新：显示查询时刻数据',
			content: (
			<div className='lists'>
				<p>【注册总用户数】：截至目前注册的总用户人数</p>
				<p>【今日注册用户数】：查询当日注册用户人数</p>
				<p>【总流水】：所有支付过的订单支付总金额</p>
				<p>【今日流水】：查询当日内支付的订单的支付总金额</p>
				<p>【下单总用户数】：所有成功提交订单的用户人数</p>
				<p>【今日下单用户数】：查询当日成功提交订单的用户人数</p>
				<p>【总下单订单数】：所有成功提交的订单数</p>
				<p>【今日下单订单数】：查询当日成功提交的订单数</p>
				<p>【总完成订单数】：“已完成”状态订单总数</p>
				<p>【今日完成订单数】：查询当日更新为“已完成”的状态的订单总数</p>
			</div>
			),
			onOk() {},
		});
	};
  render(){
    const { data1, data2, dataSource } = this.state;
    return(
      <div>
        <div className='clearfix mb10'>
          <p className='fr pointer' onClick={this.desinfo} >数据定义说明
            <Icon type="question-circle-o" style={{color:"#ED6531",marginLeft:"4px"}}/>
          </p>
        </div>
        <Cards data={data1}/>
        <div className="mt10">
          <Cards data={data2}/>
        </div>
        <div className='mt10'>
					<p style={{marginBottom:"10px",marginTop:"20px"}}>当前各订单状态数据</p>
					<DataTable
            columns={ this.columns }
            dataSource={ dataSource }
          />
				</div>
      </div>
    )
  }
}
export default AppBase
