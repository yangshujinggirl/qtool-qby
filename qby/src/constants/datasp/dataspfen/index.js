
import {GetServerData} from '../../../services/services';
import {Getexpont} from '../../../services/expont';
import { Button, Icon,Modal } from 'antd';
import { connect } from 'dva';
import DataspfenTable from './table';
import DataspfenSearch from './search';
const confirm = Modal.confirm;

class DataspfenIndex extends React.Component{
	state = {};

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

  	render(){
		const adminType=eval(sessionStorage.getItem('adminType'));
     	return(
        	<div>
                <DataspfenSearch/>
                    <Button 
						type="primary" 
						size='large'
						className='mt10'
						onClick={this.exportData.bind(this,57,this.props.values)}
					>
                        导出数据
					</Button>
             		<div className='mt15'><DataspfenTable/></div>
        	</div>
      	)
  	}
}

function mapStateToProps(state) {
	const {values} = state.dataspfen;
    return {values};
}

export default connect(mapStateToProps)(DataspfenIndex);
