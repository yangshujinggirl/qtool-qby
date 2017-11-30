import React from 'react';
import { Input,message ,Button} from 'antd';
import { connect } from 'dva';
import Cardlist from '../../components/table/cardlist';
import TableCanEdit from '../../components/table/table_edit';
import Forminput from '../../components/input/forminput';

class WsmoveUser extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '序号',
			dataIndex: 'key'
		  }, {
			title: '商品条码',
			dataIndex: 'pdSpuBarcode'
		  }, {
			title: '商品名称',
			dataIndex: 'pdSpuName'
		  }, {
			title: '规格',
			dataIndex: 'pdSkuDisplayName'
		  },{
			title: '批次',
			dataIndex: 'wsLotProductDate'
		  },{
			title: '库位',
			dataIndex: 'fromBinCode'
		  },{
			title: '可移数量',
			dataIndex: 'originalQty'
		  },{
		    title: '实移数量',
		    dataIndex: 'qty',
		    render: (text, record,index) => {
		    	return (
					<div className={record.datasuccess?null:'data_waring'}>
						<Input defaultValue={text} onChange={this.qtyChange.bind(this,index)}/>
					</div>
				);
			}
		},{
		    title: '实移库位',
		    dataIndex: 'binCode',
		    render: (text, record,index) => {
		    	return (
					<div>
						<Input defaultValue={text} onBlur={this.toBinCodeChange.bind(this,index)}/>
					</div>
				);
			}
		}]
	}



	









	infoFetch=(wsAsnId)=>{
		this.props.dispatch({
			type:'wsmove/infofetch',
			payload:{code:'qerp.web.ws.move.info',values:{wsMoveId:wsAsnId}}
		})
		this.props.dispatch({ type: 'tab/loding', payload:true}) 
	}
	qtyChange=(index,e)=>{
		const str=/^[0-9]*$/
		const values=e.target.value
		const patt=str.test(values)
		if(patt){
			this.props.dispatch({
				type:'wsmove/successinfodetails',
				payload:{index,values}
			})

		}else{
			this.props.dispatch({
				type:'wsmove/errinfodetails',
				payload:{index,values}
			})
			message.error('数量只能数字');
		}
	}

	toBinCodeChange=(index,e)=>{
		const values=e.target.value
		this.props.dispatch({
			type:'wsmove/detailstoBinCode',
			payload:{index,values}
		})
	}

	Hindclickcanse=()=>{

	}
	Hindclick=()=>{
		const value={
			wsMoveId:this.props.data.wsMoveId,
			wsMoveInputDetails:this.props.details
		  }
		  this.props.dispatch({
			type:'wsmove/save',
			payload:{code:'qerp.web.ws.move.finish',values:value}
		})



	}
    render() {
        return (
			<div>
				<Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/>
				<div className='mb10'><TableCanEdit columns={this.columns} dataSources={this.props.details}/></div>
				<Button style={{margin:'15px'}} onClick={this.Hindclickcanse.bind(this)}>取消</Button>
          		<Button style={{margin:'15px 15px 15px 0'}} onClick={this.Hindclick.bind(this)}>确定</Button>
			</div>
        );
	}
	componentDidMount(){
		this.infoFetch(this.props.data.wsMoveId)
	}
    
}

function mapStateToProps(state) {
	console.log(state)
    const {cardtitle,cardlist,detailstitle,details,logstitle,logs} = state.wsmove;
    return {cardtitle,cardlist,detailstitle,details,logstitle,logs};
}



export default connect(mapStateToProps)(WsmoveUser);
