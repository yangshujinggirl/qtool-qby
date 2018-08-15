import React,{Component} from 'react'
import {Icon,Card,Modal} from 'antd'
import Cards from '../../../components/card/baseCard'
import DataTable from '../../../components/table/datatable'

class AppBase extends Component{
  constructor(props){
    super(props)

    this.state={
      data1:[
        {title:'注册总用户数',value:22},
        {title:'今日注册用户数',value:22},
        {title:'总流水',value:22},
        {title:'今日流水',value:22},
      ],
      data2:[
        {title:'下单总用户数',value:22},
        {title:'今日下单用户数',value:22},
        {title:'总下单订单数',value:22},
        {title:'今日下单订单数',value:22},
        {title:'总完成订单数',value:22},
        {title:'今日完成订单数',value:22},
      ],
    }

    this.columns = [{
        title: '订单状态',
        dataIndex: 'index'
      },{
        title: '订单数',
        dataIndex: 'code'
      },{
        title: '订单总金额',
        dataIndex: 'barcode'
    }]

    this.dataSource = [
      {
        index:1,
        code:1,
        barcode:1
      }
    ]

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
				<p>【总完成订单数】：“用户已提货”状态订单总数</p>
				<p>【今日完成订单数】：查询当日更新为“用户已提货”状态的订单总数</p>
			</div>
			),
			onOk() {},
		});
	};
  render(){
    return(
      <div>
        <div className='clearfix mb10'>
          <p className='fl'>数据更新于: 2018</p>
          <p className='fr pointer'>数据定义说明
            <Icon type="question-circle-o" onClick={this.desinfo} style={{color:"#ED6531",marginLeft:"4px"}}/>
          </p>
        </div>
        <Cards data={this.state.data1}/>
        <div className="mt10">
          <Cards data={this.state.data2}/>
        </div>
        <div className='mt10'>
					<p style={{marginBottom:"10px",marginTop:"20px"}}>当前各订单状态数据</p>
					<DataTable
            columns = { this.columns }
            dataSource = { this.dataSource }
          />
				</div>
      </div>
    )
  }
}
export default AppBase
