import { Input,message ,Button} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import {GetServerData} from '../../services/services';

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
						<Input value={text} onChange={this.qtyChange.bind(this,index)} placeholder='输入数量'/>
					</div>
				);
			}
		},{
		    title: '效期管理',
		    dataIndex: 'lotDate',
		    render: (text, record,index) => {
		    	return (
					<div className={record.datasuccess?null:'data_waring'}> 
						<Input 
							value={text} 
							onBlur={this.productDateChange.bind(this,index,record)} 
							placeholder={(record.lotType=='1'&record.lotStatus=='1') ?'输入生产日期 例如：20170101':((record.lotType=='0'&record.lotStatus=='1')?'输入到期日期 例如：20170101':null)} 
							disabled={record.lotStatus=='0'?true:false}
							onChange={this.produChange.bind(this,index,record)}
							/>
					</div>
					 
				);
			}
		}];
	}

	infofetch=(id)=>{
		this.props.dispatch({
			type:'goods/infofetch',
			payload:{code:'qerp.web.ws.asn.detail',values:{wsAsnId:id}}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	qtyChange=(index,e)=>{
		//把更新model中的数据
		const str=/^[0-9]*$/
		const values=e.target.value
		const patt=str.test(values)
		if(patt){
			this.props.dispatch({
				type:'goods/successqtydetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'goods/errqtydetails',
				payload:{index,values}
			})
			message.error('数量只能数字',.8);
		}
	}
	productDateChange=(index,record,e)=>{
		const values=e.target.value
		const value={wsAsnDetailId:record.wsAsnDetailId,lotDate:values}
		const result=GetServerData('qerp.web.ws.asn.validate',value)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
					this.props.dispatch({
						type:'goods/successdetails',
						payload:{index,values}
					})
			}else{
				this.props.dispatch({
					type:'goods/errdetails',
					payload:{index,values}
				})
				
			}
		})
	}

	produChange=(index,record,e)=>{
		const values=e.target.value
		this.props.dispatch({
			type:'goods/successdetails',
			payload:{index,values}
		})
	}


	saveClick=()=>{
		const values={wsAsnId:this.props.data.wsAsnId,receiveDetails:this.props.details,binCode:this.props.binCode}
		const result=GetServerData('qerp.web.ws.asn.receive',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.delecttab()
				this.refresh()	
			}
		})
	}
	bincodeChange=(e)=>{
		this.props.dispatch({
			type:'goods/binCodevalue',
			payload:e.target.value
		})
	}
	//删除当前tab
	delecttab=()=>{
		this.props.dispatch({
			type:'goods/delete',
			payload:'10000edit'+this.props.data.wsAsnId
		})
	}
	initWarehouseList=(values,limit,currentPage)=>{
		values.limit=limit
		values.currentPage=currentPage
		this.props.dispatch({
			type:'goods/fetch',
			payload:{code:'qerp.web.ws.asn.query',values:values}
		})
		this.props.dispatch({type:'tab/loding',payload:true})
	}
	//刷新列表数据
	refresh=()=>{
		this.initWarehouseList(this.props.values,this.props.limit,0)
	}
    render() {
        return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mt10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<div className='mt10'>
					<label>收货库位:</label>
					<Input style={{width:'200px',marginLeft:'10px'}} value={this.props.binCode} onChange={this.bincodeChange.bind(this)}/>
					<Button className='ml10' type="primary" onClick={this.saveClick.bind(this)}>确定</Button>
				</div>
			</div>
        );
	}
	componentDidMount(){
		this.infofetch(this.props.data.wsAsnId)
		
	}
}

function mapStateToProps(state) {
    const {cardtitle,cardlist,details,binCode,values,limit,currentPage} = state.goods;
    return {cardtitle,cardlist,details,binCode,values,limit,currentPage};
}

export default connect(mapStateToProps)(WarehouseinEdit);
 


