
import {GetServerData} from '../../services/services';
import { Button, Icon,Modal,message } from 'antd';
import { connect } from 'dva';
import OrderdbTable from './table';
import OrderdbSearch from './search';
import Appmodelone from '../ordermd/modal';
const confirm = Modal.confirm;

class OrderdbIndex extends React.Component{
	state = {
		searchvalue:null,
        datasource:[],
        total:0,
        currentPage:0,
        limit:15,
        selectedRowKeys:[],
        selectedRows:[]
	};

	//导出数据
	exportData = (type,data) => {
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {
						
					},
	  			});
			}
		})
	
	}

	addNew = () =>{
		const goodsInfo=[{
            key: 0,
            code:'',
            qty: '',
            codeline:true,
            qtyline:true,
        }]
		const paneitem={title:'新建调拨单',key:'206000edit',componkey:'206000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});

		this.props.dispatch({
            type:'orderdb/syncGoodsInfo',
            payload:goodsInfo
		})
	  }

	//强制完成
	mandatoryOrder=()=>{
		if (this.state.selectedRows.length < 1) {
			message.error('请选择调拨单',.8)
			return;
		}  
		const values={wsAsnId:this.state.selectedRows[0].wsAsnId}
		const result=GetServerData('qerp.web.sp.ws.asn.finish',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				this.setState({
					selectedRowKeys:[],
					selectedRows:[]
				},function(){
					this.hindSearch(this.state.searchvalue)
				})
			}
		})
	}
	//table搜索
	hindSearch=(values)=>{
		values.limit=this.state.limit
		values.currentPage=this.state.currentPage
		const result=GetServerData('qerp.web.sp.exchange.query',values)
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var dbdatas = json.exchanges;
				for(var i=0;i<dbdatas.length;i++){
					dbdatas[i].key=i;
				}
				this.setState({
					searchvalue:values,
					datasource:dbdatas,
					total:json.total,
					currentPage:json.currentPage,
					limit:json.limit,
					selectedRowKeys:[],
					selectedRows:[]
				})
			}
		}) 
	}

	//获得分页当前limit,currentPage
	getPageSize=(limit,currentPage)=>{
        this.setState({
            limit:limit,
            currentPage:currentPage
        },function(){
            this.hindSearch(this.state.searchvalue)
        })
    }

	//获得选中行数据
	getSelectDate=(selectedRowKeys,selectedRows)=>{
		this.setState({
			selectedRowKeys:selectedRowKeys,
			selectedRows:selectedRows
		})
	}

  	render(){
		const rolelists=this.props.data.rolelists
		// //新增
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.exchange.save"
		})
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		})
		//强制完成
		const overorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.ws.asn.finish"
		})
     	return(
        	<div className='content_box'>
                <OrderdbSearch OrderdbFormSearch={this.hindSearch.bind(this)}/>
					{
						overorder?
						<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.mandatoryOrder.bind(this)}
					>
						强制完成
					</Button>
					:null

					}
					{
						addorder?
						<Button
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.addNew}
					>
						新建调拨单
					</Button>
					:null
					}
					{
						expontdata?
						<Button 
						type="primary" 
						size='large'
						className='mt20 mr10'
						onClick={this.exportData.bind(this,17,this.state.searchvalue)}
					>
						导出数据
					</Button>
					:null
					}
             		<div className='mt15'>
					  <OrderdbTable 
					    overorderobj={overorder}
						getPageSizeDate={this.getPageSize.bind(this)}
                        total={this.state.total} 
                        limit={this.state.limit} 
                        currentPage={this.state.currentPage}
                        datasource={this.state.datasource}
                        getSelectDate={this.getSelectDate.bind(this)}
                        selectedRowKeys={this.state.selectedRowKeys}  
					  />
					</div>
        	</div>
      	)
    }
    
}


export default connect()(OrderdbIndex);
