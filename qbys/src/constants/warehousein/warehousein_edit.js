import React from 'react';
import { Input,message ,Button} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import Forminput from '../../components/input/forminput';

class WarehouseinEdit extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '商品条码',
			dataIndex: 'pdBarcode'
		  }, {
			title: '商品名称',
			dataIndex: 'pdName'
		  }, {
			title: '商品规格',
			dataIndex: 'pdSkuType'
		  },{
			title: '预订数量',
			dataIndex: 'qty'
		  },{
			title: '已收数量',
			dataIndex: 'qtyReceived'
		  },{
		    title: '到货数量',
		    dataIndex: 'qtyInput',
		    render: (text, record,index) => {
		    	return (
					<div className={record.qtysuccess?null:'data_waring'}>
						<Input defaultValue={text} onBlur={this.qtyChange.bind(this,index)}/>
					</div>
				);
			}
		},{
		    title: '生产日期',
		    dataIndex: 'productDate',
		    render: (text, record,index) => {
		    	return (
					<div className={record.datasuccess?null:'data_waring'}> 
						<Input defaultValue={text} onBlur={this.productDateChange.bind(this,index)}/>
					</div>
					 
				);
			}
		}];
	}

	infofetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'wsin/infofetch',
			payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:wsAsnId}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
	qtyChange=(index,e)=>{
		//把更新model中的数据
		const str=/^[0-9]*$/
		const values=e.target.value
		const patt=str.test(values)
		if(patt){
			this.props.dispatch({
				type:'wsin/successqtydetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'wsin/errqtydetails',
				payload:index
			})
			message.error('数量只能数字');
		}
	}

	productDateChange=(index,e)=>{
		const values=e.target.value
		//请求数据，判断填写是否ok
		// 成功
		this.props.dispatch({
			type:'wsin/successdetails',
			payload:{index,values}
		})
		//失败
		// this.props.dispatch({
		// 	type:'wsin/errdetails',
		// 	payload:index
		// })
	}


    render() {
        return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mt10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<div className='mt10'>
					<label>收货库位:</label>
					<Input style={{width:'200px',marginLeft:'10px'}}/>
					<Button className='ml10'>确定</Button>
				</div>
			</div>
        );
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsOrderId)
	}
    
}

function mapStateToProps(state) {
	console.log(state)
    const {cardtitle,cardlist,detailstitle,details,logstitle,logs} = state.wsin;
    return {cardtitle,cardlist,detailstitle,details,logstitle,logs};
}

export default connect(mapStateToProps)(WarehouseinEdit);
 


