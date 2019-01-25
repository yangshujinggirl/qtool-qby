
import {GetServerData} from '../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
import {removeSpace} from '../../utils/meth';
import SpTable from './table';
import SearchForms from './search';
const confirm = Modal.confirm;


class OperateIndex extends React.Component{
	addNew = () =>{
		const paneitem={title:'新建门店',key:'403000edit',componkey:'403000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
	}

	exportData = (type,data) => {
		removeSpace(data);
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
							payload:{code:'qerp.web.sys.doc.list',values:{limit:16,currentPage:0}}
						});
					},
					onCancel() {

					},
	  			});
			}
		})

	}

  	render(){
		const rolelists=this.props.data.rolelists
		//新增门店
		const addorder=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.shop.save"
		});
		//导出数据
		const expontdata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sys.doc.task"
		});
		//门店详情
		const mdDetail=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.sp.shop.info"
		});
     	return(
        	<div className='content_box'>
                <SearchForms/>
				{
					addorder?
					<Button
					type="primary"
					size='large'
					className='mt20 mr10'
					onClick={this.addNew}
				>
					新建门店
				</Button>
				:null
				}
				{
					expontdata?
					<Button
					type="primary"
					size='large'
					className='mt20 mr10'
					onClick={this.exportData.bind(this,21,this.props.values)}
				>
					导出数据
				</Button>
				:null

				}
             	<div className='mt15'><SpTable mdDetail={mdDetail} addorderobj={addorder}/></div>
        	</div>
      	)
	}
}

function mapStateToProps(state) {
    const {values} = state.operatesp;
    return {values};
}
export default connect(mapStateToProps)(OperateIndex);
