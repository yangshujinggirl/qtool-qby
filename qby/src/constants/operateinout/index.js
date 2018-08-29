import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
//search
import OperateinoutSearch from './search';
//table
import OperateinoutTable from './table';
//导出的弹框
import Appmodelone from '../ordermd/modal';
const confirm = Modal.confirm;

class OperateinoutIndex extends React.Component{
    state = {};
    //导出数据
	exportData = () => {
		const values={
			type:20,
			downloadParam:this.props.operateinout.values,
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
  		const rolelists=this.props.data.rolelists
  		//导出数据
  		const expontdata=rolelists.find((currentValue,index)=>{
  			return currentValue.url=="qerp.web.sys.doc.task"
  		})
      console.log(this.props.operateinout.values)
     	return(
        	<div className='content_box'>
            <OperateinoutSearch/>
            {
              expontdata?
              <Button
                type="primary"
                size='large'
                className='mt20'
                onClick={this.exportData.bind(this)}>
                导出数据
              </Button>
              :null
            }

            <div className='mt15'><OperateinoutTable/></div>
          </div>
      	)
	}

	componentDidMount(){}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(OperateinoutIndex);
