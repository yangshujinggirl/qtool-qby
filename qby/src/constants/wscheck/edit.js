import React from 'react';
import { Input,message ,Button} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

class WscheckEdit extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '序号',
			dataIndex: 'index'
		  }, {
			title: '商品条码',
			dataIndex: 'pdSkuBarcode'
		  }, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		  }, {
			title: '规格',
			dataIndex: 'pdSkuDisplayName'
		  },{
			title: '批次',
			dataIndex: 'lotStr'
		  },{
			title: '库位',
			dataIndex: 'wsBinCode'
		  },{
			title: '商品数量',
			dataIndex: 'qty',
			render: (text, record, index) => {
			  return (
				  <div className={record.datasuccess?null:'data_waring'}>
				  <Input  onChange={this.qtyChange.bind(this,index)} placeholder='输入数量'/>
				  </div>
			  )}
		  }];
	}
	infofetch=(id)=>{
		this.props.dispatch({
			type:'wscheck/infofetch',
			payload:{code:'qerp.web.ws.check.info',values:{wsCheckId:id}}
		})
	}
	qtyChange=(index,e)=>{
		//把更新model中的数据
		const str=/^[0-9]*$/
		const values=e.target.value
		const patt=str.test(values)
		if(patt){
			this.props.dispatch({
				type:'wscheck/successqtydetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'wscheck/errqtydetails',
				payload:{index,values}
			})
			message.error('数量只能数字',.8);
		}
	}

	
	

	hindClick=()=>{
		const values={
			wsCheckId:this.props.data.wsCheckId,
			checkInputDetails:this.props.details
		}
		const result=GetServerData('qerp.web.ws.check.input',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				message.success('盘点完成',.8);
				const wsCheckId=this.props.data.wsCheckId
				const paneitem={title:'盘点差异',key:'70000edit'+this.props.data.wsCheckId+'diff',componkey:'70000editfiff',data:{wsCheckId:wsCheckId}}
				this.props.dispatch({
					  type:'tab/firstAddTab',
					  payload:paneitem
				})
			}
		})

		

		
	}

	hindCancel=()=>{
		this.delecttab()
	}

	//删除当前tab
	delecttab=()=>{
		this.props.dispatch({
			type:'wscheck/delete',
			payload:'70000edit'+this.props.data.wsCheckId
		})
	}



		render() {
				return (
					<div>
						<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
						<div className='mt10 mb10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
						<Button onClick={this.hindCancel.bind(this)}>取消</Button>
						<Button  type="primary" className='ml10' onClick={this.hindClick.bind(this)}>确定</Button>
					</div>
				);
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsCheckId)
	}
		
}

function mapStateToProps(state) {
		const {cardtitle,cardlist,detailstitle,details} = state.wscheck;
		return {cardtitle,cardlist,detailstitle,details};
}

export default connect(mapStateToProps)(WscheckEdit);



